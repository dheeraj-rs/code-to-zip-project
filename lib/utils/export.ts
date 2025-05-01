"use client"

import { ComponentInstance, ExportOptions, ProjectSettings } from '@/lib/types';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import * as ComponentModules from '@/lib/components/component-modules';
import { renderComponentAstro } from './export-astro';
import { exportNextJsProject } from './export-next-clean';

// Generate HTML content from components
export async function buildHtmlFromComponents(
  components: ComponentInstance[],
  settings: ProjectSettings
): Promise<{ html: string; css: string }> {
  // Basic styling
  const css = `
    /* Base styles */
    body, html {
      margin: 0;
      padding: 0;
      font-family: ${settings.fontFamily};
    }
    
    /* Container */
    .container {
      width: 100%;
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 1rem;
    }
    
    /* Basic utility classes */
    .text-center { text-align: center; }
    .mb-4 { margin-bottom: 1rem; }
    .mb-8 { margin-bottom: 2rem; }
    .py-12 { padding-top: 3rem; padding-bottom: 3rem; }
    
    /* Custom styling */
    :root {
      --primary-color: ${settings.primaryColor};
      --secondary-color: ${settings.secondaryColor};
    }
    
    /* Button styling */
    .btn {
      display: inline-block;
      padding: 0.75rem 1.5rem;
      background-color: var(--primary-color);
      color: white;
      text-decoration: none;
      border-radius: 0.25rem;
      font-weight: 600;
      transition: opacity 0.2s;
    }
    
    .btn:hover {
      opacity: 0.9;
    }
    
    /* Responsive grid */
    .grid {
      display: grid;
      gap: 1.5rem;
    }
    
    @media (min-width: 768px) {
      .grid-cols-2 {
        grid-template-columns: repeat(2, 1fr);
      }
    }
    
    @media (min-width: 1024px) {
      .grid-cols-3 {
        grid-template-columns: repeat(3, 1fr);
      }
      
      .grid-cols-4 {
        grid-template-columns: repeat(4, 1fr);
      }
    }
  `;
  
  // Generate component HTML
  let componentsHtml = '';
  
  for (const component of components) {
    const ComponentModule = (ComponentModules as any)[component.type];
    if (ComponentModule) {
      const { backgroundColor, textColor, padding, ...props } = component.props;
      
      // Create a component wrapper with the styles
      let style = '';
      if (backgroundColor) style += `background-color: ${backgroundColor}; `;
      if (textColor) style += `color: ${textColor}; `;
      if (padding) style += `padding: ${padding}; `;
      
      componentsHtml += `<div style="${style}" data-component="${component.type}" data-component-id="${component.id}">\n`;
      
      // Render the component (simplified version for export)
      const renderedContent = renderComponentToHtml(component.type, props);
      componentsHtml += renderedContent;
      
      componentsHtml += `\n</div>\n`;
    }
  }
  
  // Create the full HTML document
  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${settings.title}</title>
  <meta name="description" content="${settings.description}">
  <link rel="icon" href="favicon.ico">
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  ${componentsHtml}
</body>
</html>
  `;
  
  return { html, css };
}

// Simplified HTML rendering for components
function renderComponentToHtml(type: string, props: any): string {
  switch (type) {
    case 'SimpleNavbar':
      return renderSimpleNavbar(props);
    case 'HeroNavbar':
      return renderHeroNavbar(props);
    case 'SimpleHero':
      return renderSimpleHero(props);
    case 'SplitHero':
      return renderSplitHero(props);
    case 'TextBlock':
      return renderTextBlock(props);
    case 'Features':
      return renderFeatures(props);
    case 'AboutUs':
      return renderAboutUs(props);
    case 'Team':
      return renderTeam(props);
    case 'ContactForm':
      return renderContactForm(props);
    case 'ContactInfo':
      return renderContactInfo(props);
    case 'SimpleFooter':
      return renderSimpleFooter(props);
    case 'MultiColumnFooter':
      return renderMultiColumnFooter(props);
    default:
      return `<div>Component "${type}" not supported for export</div>`;
  }
}

// Helper functions to render each component type as HTML
function renderSimpleNavbar({ logo = 'WebCraft', links = 'Home, About, Services, Contact' }) {
  const linkArray = links.split(',').map(link => link.trim());
  
  return `
<nav class="py-4">
  <div class="container">
    <div style="display: flex; justify-content: space-between; align-items: center;">
      <div style="font-size: 1.25rem; font-weight: bold;">${logo}</div>
      <div style="display: flex; gap: 1.5rem;">
        ${linkArray.map(link => `<a href="#" style="text-decoration: none;">${link}</a>`).join('')}
      </div>
    </div>
  </div>
</nav>
  `;
}

function renderHeroNavbar({ logo = 'WebCraft', links = 'Home, About, Services, Contact', ctaText = 'Get Started' }) {
  const linkArray = links.split(',').map(link => link.trim());
  
  return `
<nav class="py-4">
  <div class="container">
    <div style="display: flex; justify-content: space-between; align-items: center;">
      <div style="font-size: 1.25rem; font-weight: bold;">${logo}</div>
      <div style="display: flex; align-items: center; gap: 1.5rem;">
        ${linkArray.map(link => `<a href="#" style="text-decoration: none;">${link}</a>`).join('')}
        <a href="#" class="btn">${ctaText}</a>
      </div>
    </div>
  </div>
</nav>
  `;
}

function renderSimpleHero({ heading = 'Welcome to our website', subheading = 'A modern platform for your business needs', ctaText = 'Get Started', backgroundImage = 'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg' }) {
  return `
<div style="position: relative; height: 500px; display: flex; align-items: center; justify-content: center; text-align: center; background-image: url('${backgroundImage}'); background-size: cover; background-position: center;">
  <div style="position: absolute; inset: 0; background-color: black; opacity: 0.5;"></div>
  <div style="position: relative; z-index: 10; max-width: 1200px; margin: 0 auto; padding: 0 1rem; color: white;">
    <h1 style="font-size: 2.5rem; font-weight: bold; margin-bottom: 1rem;">${heading}</h1>
    <p style="font-size: 1.25rem; margin-bottom: 2rem; max-width: 42rem; margin-left: auto; margin-right: auto;">${subheading}</p>
    <a href="#" class="btn">${ctaText}</a>
  </div>
</div>
  `;
}

function renderSplitHero({ heading = 'Build your next project with us', content = 'We provide the tools and expertise to help your business succeed in the digital world.', ctaText = 'Learn More', image = 'https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg' }) {
  return `
<div class="container py-12">
  <div style="display: flex; flex-direction: column; gap: 2rem;">
    <div style="flex: 1;">
      <h1 style="font-size: 2.25rem; font-weight: bold; margin-bottom: 1rem;">${heading}</h1>
      <p style="font-size: 1.125rem; margin-bottom: 1.5rem;">${content}</p>
      <a href="#" class="btn">${ctaText}</a>
    </div>
    <div style="flex: 1;">
      <img src="${image}" alt="Hero" style="border-radius: 0.5rem; width: 100%; height: auto; object-fit: cover;">
    </div>
  </div>
</div>
  `;
}

function renderTextBlock({ heading = 'Our Mission', content = 'We are dedicated to providing the best service and solutions for our clients. Our team of experts works tirelessly to ensure your satisfaction and success.' }) {
  return `
<div class="container py-12">
  <div style="max-width: 48rem; margin-left: auto; margin-right: auto;">
    <h2 style="font-size: 1.875rem; font-weight: bold; margin-bottom: 1rem;">${heading}</h2>
    <div style="font-size: 1.125rem;">
      <p>${content}</p>
    </div>
  </div>
</div>
  `;
}

function renderFeatures({ heading = 'Our Features', subheading = 'Discover what makes our product special', features = '[{"title":"Fast Performance","description":"Our platform is optimized for speed and efficiency."},{"title":"Easy to Use","description":"Intuitive interface designed for users of all skill levels."},{"title":"Responsive Design","description":"Works perfectly on all devices and screen sizes."},{"title":"24/7 Support","description":"Our team is always available to help with any issues."}]' }) {
  return `
<div className="container mx-auto px-4 py-12">
  <div className="text-center mb-12">
    <h2 className="text-3xl font-bold mb-4">{heading || 'Our Features'}</h2>
    <p className="text-xl max-w-2xl mx-auto">{subheading || 'Discover what makes our product special'}</p>
  </div>
  
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
    {(() => {
      // Safely parse features with error handling
      let featuresData = [
        {title: "Fast Performance", description: "Our platform is optimized for speed and efficiency."},
        {title: "Easy to Use", description: "Intuitive interface designed for users of all skill levels."},
        {title: "Responsive Design", description: "Works perfectly on all devices and screen sizes."},
        {title: "24/7 Support", description: "Our team is always available to help with any issues."}
      ];
      
      try {
        if (typeof features === 'string' && features.startsWith('[')) {
          const parsed = JSON.parse(features);
          if (Array.isArray(parsed) && parsed.length > 0) {
            featuresData = parsed;
          }
        } else if (features && typeof features === 'object' && Array.isArray(features)) {
          featuresData = features;
        }
      } catch (e) {
        console.error('Error parsing features:', e);
      }
      
      return featuresData.map((feature, index) => (
        <div key={index} className="p-6 border border-gray-200 rounded-lg">
          <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
          <p>{feature.description}</p>
        </div>
      ));
    })()}
  </div>
</div>
  `;
}

function renderAboutUs({ heading = 'About Our Company', content = 'Founded in 2020, our company has been at the forefront of innovation in our industry. We believe in creating value for our clients through quality service and cutting-edge solutions.', image = 'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg' }) {
  return `
<div class="container py-12">
  <div style="display: flex; flex-direction: column; gap: 2rem;">
    <div style="flex: 1;">
      <img src="${image}" alt="About Us" style="border-radius: 0.5rem; width: 100%; height: auto; object-fit: cover;">
    </div>
    <div style="flex: 1;">
      <h2 style="font-size: 1.875rem; font-weight: bold; margin-bottom: 1rem;">${heading}</h2>
      <div style="font-size: 1.125rem;">
        <p>${content}</p>
      </div>
    </div>
  </div>
</div>
  `;
}

function renderTeam({ heading = 'Our Team', subheading = 'Meet the people behind our success', members = '[{"name":"John Doe","role":"CEO & Founder","bio":"John has over 15 years of experience in the industry.","image":"https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg"},{"name":"Jane Smith","role":"CTO","bio":"Jane leads our technical team with expertise in the latest technologies.","image":"https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg"},{"name":"Mike Johnson","role":"Design Lead","bio":"Mike creates beautiful and functional designs for our clients.","image":"https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg"},{"name":"Sarah Williams","role":"Marketing Director","bio":"Sarah develops strategies to grow our brand and reach new customers.","image":"https://images.pexels.com/photos/3760276/pexels-photo-3760276.jpeg"}]' }) {
  let membersArray = [];
  try {
    membersArray = JSON.parse(members);
  } catch (error) {
    console.error('Invalid members JSON');
    membersArray = [];
  }
  
  return `
<div class="container py-12">
  <div style="text-align: center; margin-bottom: 3rem;">
    <h2 style="font-size: 1.875rem; font-weight: bold; margin-bottom: 1rem;">${heading}</h2>
    <p style="font-size: 1.25rem; max-width: 42rem; margin-left: auto; margin-right: auto;">${subheading}</p>
  </div>
  
  <div class="grid grid-cols-4">
    ${membersArray.map((member: { name: string; role: string; bio: string; image: string }) => `
      <div style="text-align: center;">
        <div style="width: 8rem; height: 8rem; border-radius: 9999px; overflow: hidden; margin-left: auto; margin-right: auto; margin-bottom: 1rem;">
          <img src="${member.image}" alt="${member.name}" style="width: 100%; height: 100%; object-fit: cover;">
        </div>
        <h3 style="font-size: 1.25rem; font-weight: 600;">${member.name}</h3>
        <p style="color: #6b7280; margin-bottom: 0.5rem;">${member.role}</p>
        <p style="font-size: 0.875rem;">${member.bio}</p>
      </div>
    `).join('')}
  </div>
</div>
  `;
}

function renderContactForm({ heading = 'Contact Us', subheading = 'We\'d love to hear from you. Fill out the form below and we\'ll get back to you as soon as possible.', submitText = 'Send Message' }) {
  return `
<div class="container py-12">
  <div style="max-width: 42rem; margin-left: auto; margin-right: auto;">
    <div style="text-align: center; margin-bottom: 2rem;">
      <h2 style="font-size: 1.875rem; font-weight: bold; margin-bottom: 1rem;">${heading}</h2>
      <p style="font-size: 1.125rem;">${subheading}</p>
    </div>
    
    <form style="display: flex; flex-direction: column; gap: 1.5rem;">
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem;">
        <div>
          <label style="display: block; margin-bottom: 0.5rem;">Name</label>
          <input type="text" style="width: 100%; padding: 0.75rem; border: 1px solid #d1d5db; border-radius: 0.375rem;">
        </div>
        <div>
          <label style="display: block; margin-bottom: 0.5rem;">Email</label>
          <input type="email" style="width: 100%; padding: 0.75rem; border: 1px solid #d1d5db; border-radius: 0.375rem;">
        </div>
      </div>
      
      <div>
        <label style="display: block; margin-bottom: 0.5rem;">Subject</label>
        <input type="text" style="width: 100%; padding: 0.75rem; border: 1px solid #d1d5db; border-radius: 0.375rem;">
      </div>
      
      <div>
        <label style="display: block; margin-bottom: 0.5rem;">Message</label>
        <textarea rows="5" style="width: 100%; padding: 0.75rem; border: 1px solid #d1d5db; border-radius: 0.375rem;"></textarea>
      </div>
      
      <button type="submit" class="btn" style="align-self: flex-start;">${submitText}</button>
    </form>
  </div>
</div>
  `;
}

function renderContactInfo({ heading = 'Get in Touch', address = '123 Business Street, Suite 100, San Francisco, CA 94107', email = 'info@example.com', phone = '+1 (555) 123-4567', socialLinks = '[{"platform":"Facebook","url":"https://facebook.com"},{"platform":"Twitter","url":"https://twitter.com"},{"platform":"LinkedIn","url":"https://linkedin.com"},{"platform":"Instagram","url":"https://instagram.com"}]' }) {
  let socialLinksArray = [];
  try {
    socialLinksArray = JSON.parse(socialLinks);
  } catch (error) {
    console.error('Invalid social links JSON');
    socialLinksArray = [];
  }
  
  return `
<div class="container py-12">
  <div style="max-width: 42rem; margin-left: auto; margin-right: auto;">
    <h2 style="font-size: 1.875rem; font-weight: bold; margin-bottom: 1.5rem;">${heading}</h2>
    
    <div style="display: flex; flex-direction: column; gap: 1.5rem;">
      <div>
        <h3 style="font-size: 1.25rem; font-weight: 600; margin-bottom: 0.5rem;">Address</h3>
        <p>${address}</p>
      </div>
      
      <div>
        <h3 style="font-size: 1.25rem; font-weight: 600; margin-bottom: 0.5rem;">Contact Information</h3>
        <p>Email: ${email}</p>
        <p>Phone: ${phone}</p>
      </div>
      
      <div>
        <h3 style="font-size: 1.25rem; font-weight: 600; margin-bottom: 0.5rem;">Follow Us</h3>
        <div style="display: flex; gap: 1rem;">
          ${socialLinksArray.map((link: { platform: string; url: string }) => `
            <a href="${link.url}" target="_blank" rel="noopener noreferrer" style="text-decoration: none;">${link.platform}</a>
          `).join('')}
        </div>
      </div>
    </div>
  </div>
</div>
  `;
}

function renderSimpleFooter({ logo = 'WebCraft', links = 'Home, About, Services, Contact', copyright = '© 2025 WebCraft. All rights reserved.' }) {
  const linkArray = links.split(',').map((link: string) => link.trim());
  
  return `
<footer style="background-color: #f3f4f6; padding: 2rem 0;">
  <div class="container">
    <div style="display: flex; flex-direction: column; justify-content: space-between; align-items: center; margin-bottom: 2rem;">
      <div style="font-size: 1.25rem; font-weight: bold; margin-bottom: 1rem;">${logo}</div>
      <div style="display: flex; flex-wrap: wrap; justify-content: center; gap: 1.5rem;">
        ${linkArray.map((link: string) => `<a href="#" style="text-decoration: none; margin-bottom: 0.5rem;">${link}</a>`).join('')}
      </div>
    </div>
    <div style="text-align: center; color: #6b7280;">
      ${copyright}
    </div>
  </div>
</footer>
  `;
}

function renderMultiColumnFooter({ logo = 'WebCraft', description = 'Creating beautiful websites for businesses all around the world.', columns = '[{"title":"Products","links":[{"label":"Features","url":"#"},{"label":"Pricing","url":"#"},{"label":"Resources","url":"#"}]},{"title":"Company","links":[{"label":"About Us","url":"#"},{"label":"Careers","url":"#"},{"label":"Contact","url":"#"}]},{"title":"Support","links":[{"label":"Help Center","url":"#"},{"label":"Documentation","url":"#"},{"label":"Status","url":"#"}]}]', copyright = '© 2025 WebCraft. All rights reserved.' }) {
  let columnsArray = [];
  try {
    columnsArray = JSON.parse(columns);
  } catch (error) {
    console.error('Invalid columns JSON');
    columnsArray = [];
  }
  
  return `
<footer style="background-color: #f3f4f6; padding: 3rem 0;">
  <div class="container">
    <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 2rem; margin-bottom: 2rem;">
      <div>
        <div style="font-size: 1.25rem; font-weight: bold; margin-bottom: 1rem;">${logo}</div>
        <p style="color: #6b7280;">${description}</p>
      </div>
      
      ${columnsArray.map((column: { title: string; links: { label: string; url: string }[] }) => `
        <div>
          <h3 style="font-weight: 600; margin-bottom: 1rem;">${column.title}</h3>
          <ul style="display: flex; flex-direction: column; gap: 0.5rem;">
            ${column.links.map((link: { label: string; url: string }) => `
              <li>
                <a href="${link.url}" style="text-decoration: none; color: #6b7280;">${link.label}</a>
              </li>
            `).join('')}
          </ul>
        </div>
      `).join('')}
    </div>
    
    <div style="border-top: 1px solid #d1d5db; padding-top: 1.5rem; text-align: center; color: #6b7280;">
      ${copyright}
    </div>
  </div>
</footer>
  `;
}

// Generate code to parse JSON string props
function generateJsonParserCode(component: ComponentInstance): string {
  const jsonProps = Object.keys(component.props || {})
    .filter(key => {
      const value = component.props[key];
      return typeof value === 'string' && (value.startsWith('[') || value.startsWith('{'));
    });
  
  if (jsonProps.length === 0) return '';
  
  return jsonProps.map(prop => `
  let parsed${prop.charAt(0).toUpperCase() + prop.slice(1)} = ${component.props[prop]};
  try {
    if (typeof ${prop} === 'string' && (${prop}.startsWith('[') || ${prop}.startsWith('{'))) {
      parsed${prop.charAt(0).toUpperCase() + prop.slice(1)} = JSON.parse(${prop});
    }
  } catch (error) {
    console.error(\`Error parsing ${prop}:\`, error);
  }
  `).join('\n');
}

// Export project as HTML
async function exportHtmlProject(components: ComponentInstance[], settings: ProjectSettings): Promise<void> {
  // Generate HTML and CSS
  const { html, css } = await buildHtmlFromComponents(components, settings);
  
  // Create a zip file with HTML, CSS, and assets
  const zip = new JSZip();
  zip.file("index.html", html);
  zip.file("styles.css", css);
  zip.file("favicon.ico", "", { base64: true });
  
  // Generate and download the zip file
  const zipContent = await zip.generateAsync({ type: "blob" });
  saveAs(zipContent, `${settings.title.toLowerCase().replace(/\s+/g, '-')}-html.zip`);
}

// Export project as Astro
async function exportAstroProject(components: ComponentInstance[], settings: ProjectSettings): Promise<void> {
  const zip = new JSZip();
  
  // Create project structure
  zip.file("README.md", `# ${settings.title}

${settings.description}

## Features

- Built with Astro v3.6.5
- Responsive design using Tailwind CSS
- Fast performance
- SEO optimized
- Easy to customize

## Getting Started

\`\`\`bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
\`\`\`

Built with WebCraft Website Builder
  `);
  
  zip.file("package.json", JSON.stringify({
    name: settings.title.toLowerCase().replace(/\s+/g, '-'),
    version: "1.0.0",
    private: true,
    scripts: {
      dev: "astro dev",
      start: "astro dev",
      build: "astro build",
      preview: "astro preview"
    },
    dependencies: {
      astro: "^3.6.5",
      tailwindcss: "^3.3.5",
      "@astrojs/tailwind": "^5.0.2"
    },
    devDependencies: {
      typescript: "^5.2.2",
      "@types/node": "^20.9.0"
    }
  }, null, 2));
  
  // Create pages
  const pagesDir = zip.folder("src/pages");
  pagesDir?.file("index.astro", `---
import Layout from '../layouts/Layout.astro';
${Array.from(new Set(components.map(component => component.type)))
  .map(type => `import ${type} from '../components/${type}.astro';`)
  .join('\n')}

const title = "${settings.title}";
const description = "${settings.description}";
---

<Layout title={title} description={description}>
  ${components.map(component => {
    // Use component type for more descriptive code
    return `  <${component.type} 
    backgroundColor="${component.props.backgroundColor || ''}"
    textColor="${component.props.textColor || ''}"
    padding="${component.props.padding || ''}"
    ${Object.entries(component.props)
      .filter(([key]) => !['backgroundColor', 'textColor', 'padding'].includes(key))
      .map(([key, value]) => {
        // Handle JSON props correctly
        if (typeof value === 'string' && (value.startsWith('[') || value.startsWith('{'))) {
          return `${key}='${value.replace(/'/g, "\\'")}'`;
        }
        return `${key}="${value}"`;
      })
      .join('\n    ')}
  />`;
  }).join('\n')}
</Layout>
  `);
  
  // Create layouts
  const layoutsDir = zip.folder("src/layouts");
  layoutsDir?.file("Layout.astro", `---
interface Props {
  title: string;
  description: string;
}

const { title, description } = Astro.props;
---

<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="icon" type="image/x-icon" href="/favicon.ico" />
    <meta name="generator" content="WebCraft" />
    
    <!-- Primary Meta Tags -->
    <title>{title}</title>
    <meta name="title" content={title} />
    <meta name="description" content={description} />
    
    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="website" />
    <meta property="og:url" content="https://yourdomain.com/" />
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <meta property="og:image" content="https://yourdomain.com/og-image.jpg" />
    
    <!-- Twitter -->
    <meta property="twitter:card" content="summary_large_image" />
    <meta property="twitter:url" content="https://yourdomain.com/" />
    <meta property="twitter:title" content={title} />
    <meta property="twitter:description" content={description} />
    <meta property="twitter:image" content="https://yourdomain.com/og-image.jpg" />
    
    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
  </head>
  <body>
    <slot />
  </body>
</html>

<style is:global>
  :root {
    --primary-color: ${settings.primaryColor};
    --secondary-color: ${settings.secondaryColor};
  }
  
  body {
    font-family: ${settings.fontFamily || "'Inter', sans-serif"};
    margin: 0;
    padding: 0;
    color: #333;
    background-color: #fff;
  }
</style>
  `);
  
  // Create components
  const componentsDir = zip.folder("src/components");
  
  // Create a set to track which component types we've already created
  const createdComponents = new Set();
  
  components.forEach((component) => {
    // Only create one file per component type, with props
    if (!createdComponents.has(component.type)) {
      createdComponents.add(component.type);
      
      componentsDir?.file(`${component.type}.astro`, `---
interface Props {
  backgroundColor?: string;
  textColor?: string;
  padding?: string;
${Object.keys(component.props || {})
  .filter(key => !['backgroundColor', 'textColor', 'padding'].includes(key))
  .map(key => `  ${key}?: string;`).join('\n')}
}

const { 
  backgroundColor, 
  textColor, 
  padding,
  ${Object.keys(component.props || {})
    .filter(key => !['backgroundColor', 'textColor', 'padding'].includes(key))
    .map(key => key)
    .join(',\n  ')}
} = Astro.props;
---

<div class={backgroundColor ? '' : 'bg-white'} class={textColor ? '' : 'text-gray-900'}
     style={{
       backgroundColor: backgroundColor || '',
       color: textColor || '',
       padding: padding || ''
     }}>
  ${renderComponentAstro(component)}
</div>
    `);
    }
  });
  
  // Create tailwind config
  zip.file("tailwind.config.mjs", `
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        primary: 'var(--primary-color)',
        secondary: 'var(--secondary-color)',
      },
      fontFamily: {
        sans: ['${settings.fontFamily || "Inter"}', 'sans-serif'],
      },
      container: {
        center: true,
        padding: '1rem',
      },
    },
  },
  plugins: [],
}
  `);
  
  // Create astro config
  zip.file("astro.config.mjs", `
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind()],
  site: 'https://yourdomain.com',
  vite: {
    ssr: {
      noExternal: [],
    },
  },
});
  `);
  
  // Create public folder with favicon and placeholder images
  const publicDir = zip.folder("public");
  publicDir?.file("favicon.ico", "", { base64: true });
  publicDir?.file("og-image.jpg", "", { base64: true });
  
  // Create a sample .env file
  zip.file(".env.example", `# Environment variables
SITE_URL=https://yourdomain.com
`);
  
  // Create a .gitignore file
  zip.file(".gitignore", `# build output
dist/
.output/

# dependencies
node_modules/

# logs
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*

# environment variables
.env
.env.production

# macOS-specific files
.DS_Store
*.pem

# debug
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# env files
.env*.local

# vercel
.vercel

# typescript
*.tsbuildinfo
next-env.d.ts
`);
  
  // Generate and download the zip file
  const zipContent = await zip.generateAsync({ type: "blob" });
  saveAs(zipContent, `${settings.title.toLowerCase().replace(/\s+/g, '-')}-astro.zip`);
}

// Main export function
export async function exportProject(
  format: 'next' | 'astro' | 'html',
  components: ComponentInstance[],
  settings: ProjectSettings
): Promise<void> {
  switch (format) {
    case 'next':
      await exportNextJsProject(components, settings);
      break;
    case 'astro':
      await exportAstroProject(components, settings);
      break;
    case 'html':
      await exportHtmlProject(components, settings);
      break;
    default:
      throw new Error(`Unsupported export format: ${format}`);
  }
}

// New helper function to generate component implementations
function generateComponentImplementation(type: string): string {
  switch (type) {
    case 'SimpleNavbar':
      return `<>
        {/* Direct component implementation */}
        <nav className="py-4">
          <div className="container mx-auto px-4 flex justify-between items-center">
            <div className="text-xl font-bold">{logo || 'WebCraft'}</div>
            <div className="flex space-x-6">
              {(links || 'Home, About, Services, Contact').split(',').map((link, index) => (
                <a key={index} href="#" className="hover:opacity-70 transition-opacity">
                  {link.trim()}
                </a>
              ))}
            </div>
          </div>
        </nav>
      </>`;
    
    case 'HeroNavbar':
      return `<>
        {/* Direct component implementation */}
        <nav className="py-4">
          <div className="container mx-auto px-4 flex justify-between items-center">
            <div className="text-xl font-bold">{logo || 'WebCraft'}</div>
            <div className="flex items-center space-x-6">
              {(links || 'Home, About, Services, Contact').split(',').map((link, index) => (
                <a key={index} href="#" className="hover:opacity-70 transition-opacity">
                  {link.trim()}
                </a>
              ))}
              <button className="px-4 py-2 bg-primary text-white rounded-md hover:opacity-90 transition-opacity">
                {ctaText || 'Get Started'}
              </button>
            </div>
          </div>
        </nav>
      </>`;
    
    case 'SimpleHero':
      return `<>
        {/* Direct component implementation */}
        <div 
          className="relative h-[500px] flex items-center justify-center text-center bg-cover bg-center"
          style={{ backgroundImage: \`url(\${backgroundImage || 'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg'})\` }}
        >
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <div className="relative z-10 container mx-auto px-4 text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{heading || 'Welcome to our website'}</h1>
            <p className="text-xl mb-8 max-w-2xl mx-auto">{subheading || 'A modern platform for your business needs'}</p>
            <button className="px-6 py-3 bg-primary text-white rounded-md hover:opacity-90 transition-opacity">
              {ctaText || 'Get Started'}
            </button>
          </div>
        </div>
      </>`;
    
    case 'SplitHero':
      return `<>
        {/* Direct component implementation */}
        <div className="container mx-auto px-4 py-12">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="flex-1">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">{heading || 'Build your next project with us'}</h1>
              <p className="text-lg mb-6">{content || 'We provide the tools and expertise to help your business succeed in the digital world.'}</p>
              <button className="px-6 py-3 bg-primary text-white rounded-md hover:opacity-90 transition-opacity">
                {ctaText || 'Learn More'}
              </button>
            </div>
            <div className="flex-1">
              <img 
                src={image || 'https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg'} 
                alt="Hero" 
                className="rounded-lg w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>
      </>`;
    
    case 'TextBlock':
      return `<>
        {/* Direct component implementation */}
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-4">{heading || 'Our Mission'}</h2>
            <div className="text-lg">
              <p>{content || 'We are dedicated to providing the best service and solutions for our clients. Our team of experts works tirelessly to ensure your satisfaction and success.'}</p>
            </div>
          </div>
        </div>
      </>`;
    
    case 'Features':
      return `<>
        {/* Direct component implementation */}
        <div className="container mx-auto px-4 py-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">{heading || 'Our Features'}</h2>
            <p className="text-xl max-w-2xl mx-auto">{subheading || 'Discover what makes our product special'}</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {(() => {
              // Safely parse features with error handling
              let featuresData = [
                {title: "Fast Performance", description: "Our platform is optimized for speed and efficiency."},
                {title: "Easy to Use", description: "Intuitive interface designed for users of all skill levels."},
                {title: "Responsive Design", description: "Works perfectly on all devices and screen sizes."},
                {title: "24/7 Support", description: "Our team is always available to help with any issues."}
              ];
              
              try {
                if (typeof features === 'string' && features.startsWith('[')) {
                  const parsed = JSON.parse(features);
                  if (Array.isArray(parsed) && parsed.length > 0) {
                    featuresData = parsed;
                  }
                } else if (features && typeof features === 'object' && Array.isArray(features)) {
                  featuresData = features;
                }
              } catch (e) {
                console.error('Error parsing features:', e);
              }
              
              return featuresData.map((feature, index) => (
                <div key={index} className="p-6 border border-gray-200 rounded-lg">
                  <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                  <p>{feature.description}</p>
                </div>
              ));
            })()}
          </div>
        </div>
      </>`;
    
    // Add other components as needed
    
    default:
      return `<div>Component rendering for ${type} not implemented yet.</div>`;
  }
}