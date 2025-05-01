"use client"

import { ComponentInstance, DeploymentResult, ProjectSettings } from '@/lib/types';
import { buildHtmlFromComponents } from './export';
import { nanoid } from 'nanoid';

export async function deployToNetlify(
  components: ComponentInstance[],
  settings: ProjectSettings
): Promise<DeploymentResult> {
  try {
    // Generate the HTML content from components
    const { html, css } = await buildHtmlFromComponents(components, settings);
    
    // Check if Netlify token exists
    const netlifyToken = process.env.NEXT_PUBLIC_NETLIFY_TOKEN;
    if (!netlifyToken) {
      throw new Error(
        "Netlify token not found. Please add NEXT_PUBLIC_NETLIFY_TOKEN to your .env file."
      );
    }
    
    // Create files for deployment
    const files = {
      'index.html': html,
      'styles.css': css,
      'favicon.ico': settings.favicon
    };

    // Function to create a unique site name
    const createUniqueSiteName = (baseName: string, suffix?: string) => {
      const name = baseName.toLowerCase().replace(/[^a-z0-9-]/g, '-');
      return suffix ? `${name}-${suffix}` : name;
    };

    // Try to create site with original name first
    let siteName = createUniqueSiteName(settings.title);
    let response = await fetch('https://api.netlify.com/api/v1/sites', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${netlifyToken}`
      },
      body: JSON.stringify({
        name: siteName,
        files,
        deploySettings: {
          dir: '/',
          functions: null,
          framework: null,
          cmd: null,
        }
      })
    });

    // If subdomain is taken, try with a random suffix
    if (response.status === 422) {
      const errorData = await response.json();
      if (errorData.errors?.subdomain?.includes('must be unique')) {
        // Generate a short random suffix
        const suffix = nanoid(6);
        siteName = createUniqueSiteName(settings.title, suffix);
        
        // Try again with the new name
        response = await fetch('https://api.netlify.com/api/v1/sites', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${netlifyToken}`
          },
          body: JSON.stringify({
            name: siteName,
            files,
            deploySettings: {
              dir: '/',
              functions: null,
              framework: null,
              cmd: null,
            }
          })
        });
      }
    }

    // Handle any remaining errors
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Deployment failed: ${errorData.message || response.statusText}`);
    }
    
    const deployData = await response.json();
    
    return {
      success: true,
      url: deployData.ssl_url || deployData.url,
    };
  } catch (error) {
    console.error('Deployment error:', error);
    return {
      success: false,
      url: '',
      error: error instanceof Error ? error.message : 'Unknown deployment error'
    };
  }
}