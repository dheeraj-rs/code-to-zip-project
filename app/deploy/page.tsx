// File: pages/deploy.tsx
import { useState, useEffect } from 'react';
import Head from 'next/head';
import axios from 'axios';

// Define types for our state and props
interface DeploymentStatus {
  status: 'idle' | 'checking' | 'deploying' | 'success' | 'error';
  message?: string;
  url?: string;
}

const NetlifyDeployPage = () => {
  const [token, setToken] = useState<string>('');
  const [isTokenValid, setIsTokenValid] = useState<boolean | null>(null);
  const [deploymentStatus, setDeploymentStatus] = useState<DeploymentStatus>({ 
    status: 'idle' 
  });

  // Dummy website content to deploy
  const dummyWebsite = {
    title: "Demo Website",
    content: `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Demo Deployed Website</title>
        <style>
          body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
          }
          header {
            background-color: #4b6bfb;
            color: white;
            padding: 20px;
            text-align: center;
            border-radius: 8px;
            margin-bottom: 20px;
          }
          section {
            background-color: #f9f9f9;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
          }
          footer {
            text-align: center;
            margin-top: 20px;
            font-size: 0.9em;
            color: #666;
          }
        </style>
      </head>
      <body>
        <header>
          <h1>Successfully Deployed!</h1>
        </header>
        <section>
          <h2>Your dummy website is live</h2>
          <p>This page was deployed automatically using the Netlify API and a personal access token.</p>
          <p>This is a simple demonstration of how you can implement one-click deployments in your website builder.</p>
          <p>The current time when this site was deployed: ${new Date().toLocaleString()}</p>
        </section>
        <footer>
          <p>© ${new Date().getFullYear()} Demo Website | Deployed with Netlify</p>
        </footer>
      </body>
      </html>
    `
  };

  // Check if the Netlify token is valid
  const validateToken = async () => {
    if (!token) return;
    
    setIsTokenValid(null);
    setDeploymentStatus({ status: 'checking' });
    
    try {
      const response = await axios.get('https://api.netlify.com/api/v1/sites', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (response.status === 200) {
        setIsTokenValid(true);
        setDeploymentStatus({ 
          status: 'idle',
          message: 'Token verified! Ready to deploy.' 
        });
      }
    } catch (error) {
      console.error('Token validation error:', error);
      setIsTokenValid(false);
      setDeploymentStatus({ 
        status: 'error',
        message: 'Invalid token. Please check your Netlify personal access token.' 
      });
    }
  };

  // Deploy the dummy website to Netlify
  const deployToNetlify = async () => {
    if (!token || !isTokenValid) {
      setDeploymentStatus({ 
        status: 'error',
        message: 'Please provide a valid Netlify personal access token.' 
      });
      return;
    }
    
    setDeploymentStatus({ 
      status: 'deploying',
      message: 'Deploying your website to Netlify...' 
    });

    try {
      // Step 1: Create a new site if needed
      let siteId;
      const sitesResponse = await axios.get('https://api.netlify.com/api/v1/sites', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (sitesResponse.data.length > 0) {
        // Use the first available site
        siteId = sitesResponse.data[0].id;
      } else {
        // Create a new site
        const newSiteResponse = await axios.post('https://api.netlify.com/api/v1/sites', {
          name: 'demo-site-' + Date.now()
        }, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        siteId = newSiteResponse.data.id;
      }

      // Step 2: Deploy the content
      // In a real implementation, you would create a proper deployment bundle
      // Here we'll use a simplified approach with a direct deploy
      
      // Create a deployment
      const deploymentResponse = await axios.post(
        `https://api.netlify.com/api/v1/sites/${siteId}/deploys`, 
        {
          files: {
            '/index.html': {
              content: dummyWebsite.content
            }
          }
        },
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      if (deploymentResponse.data) {
        const deployUrl = deploymentResponse.data.deploy_url || 
                         `https://${deploymentResponse.data.name}.netlify.app`;
        
        setDeploymentStatus({
          status: 'success',
          message: 'Your website has been successfully deployed!',
          url: deployUrl
        });
      }
    } catch (error) {
      console.error('Deployment error:', error);
      setDeploymentStatus({
        status: 'error',
        message: `Deployment failed: ${error.response?.data?.message || error.message}`
      });
    }
  };

  useEffect(() => {
    // When token changes, reset validation state
    if (token) {
      setIsTokenValid(null);
    } else {
      setIsTokenValid(false);
    }
  }, [token]);

  // Status badge styles based on current state
  const getStatusBadgeStyle = () => {
    switch (deploymentStatus.status) {
      case 'checking':
      case 'deploying':
        return 'bg-yellow-100 text-yellow-800';
      case 'success':
        return 'bg-green-100 text-green-800';
      case 'error':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div>
      <Head>
        <title>Netlify One-Click Deploy</title>
        <meta name="description" content="Deploy a website to Netlify with one click" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="min-h-screen bg-gray-50">
        <div className="max-w-2xl mx-auto p-6">
          <div className="bg-white shadow-md rounded-lg p-6 mb-8">
            <h1 className="text-2xl font-bold mb-6 text-center">Netlify One-Click Deploy</h1>
            
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Netlify Personal Access Token
              </label>
              <div className="flex">
                <input
                  type="password"
                  value={token}
                  onChange={(e) => setToken(e.target.value)}
                  className="flex-grow mr-2 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                  placeholder="Enter your Netlify personal access token"
                />
                <button
                  onClick={validateToken}
                  disabled={!token || deploymentStatus.status === 'checking'}
                  className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-gray-400"
                >
                  {deploymentStatus.status === 'checking' ? 'Checking...' : 'Verify'}
                </button>
              </div>
              <p className="mt-1 text-xs text-gray-500">
                Get your token from{' '}
                <a
                  href="https://app.netlify.com/user/applications#personal-access-tokens"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-600 hover:text-indigo-800"
                >
                  Netlify Access Tokens
                </a>
              </p>
            </div>

            {deploymentStatus.message && (
              <div className={`p-3 rounded-md mb-6 ${getStatusBadgeStyle()}`}>
                <p>{deploymentStatus.message}</p>
                {deploymentStatus.url && (
                  <p className="mt-2">
                    View your site:{' '}
                    <a
                      href={deploymentStatus.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium underline"
                    >
                      {deploymentStatus.url}
                    </a>
                  </p>
                )}
              </div>
            )}
            
            <div className="mb-6">
              <h2 className="text-lg font-medium mb-2">Website Preview</h2>
              <div className="border border-gray-200 rounded-md p-4 bg-gray-50">
                <h3 className="font-medium">{dummyWebsite.title}</h3>
                <p className="text-sm text-gray-600 mt-1">This is a dummy website that will be deployed to Netlify.</p>
                <div className="mt-3 border border-gray-300 rounded-md p-3 bg-white">
                  <pre className="text-xs overflow-auto max-h-40">
                    {dummyWebsite.content.substring(0, 200)}...
                  </pre>
                </div>
              </div>
            </div>
            
            <button
              onClick={deployToNetlify}
              disabled={!isTokenValid || deploymentStatus.status === 'deploying'}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:bg-gray-400"
            >
              {deploymentStatus.status === 'deploying' ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Deploying...
                </span>
              ) : (
                'Deploy to Netlify'
              )}
            </button>
          </div>
          
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-lg font-medium mb-4">How this works</h2>
            <ol className="list-decimal pl-5 space-y-2">
              <li>Enter your Netlify personal access token and verify it</li>
              <li>Click "Deploy to Netlify" to create a new deployment</li>
              <li>The system will use the Netlify API to deploy your dummy website</li>
              <li>Once deployed, you'll see a live URL to your new website</li>
            </ol>
            <div className="mt-4 p-3 bg-blue-50 text-blue-800 rounded-md">
              <p className="text-sm">
                <strong>Note:</strong> This is a demonstration of the Netlify API for deployments.
                In a production environment, you would add more robust error handling and security measures.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default NetlifyDeployPage;