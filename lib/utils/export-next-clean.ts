import { ComponentInstance, ProjectSettings } from '@/lib/types';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';

// Clean Next.js export implementation
export async function exportNextJsProject(components: ComponentInstance[], settings: ProjectSettings): Promise<void> {
  const zip = new JSZip();
  
  // Create project structure
  addProjectFiles(zip, settings);
  
  // Create components
  addComponentFiles(zip, components);
  
  // Create app directory and pages
  addAppPages(zip, components, settings);
  
  // Generate and download the zip file
  const zipContent = await zip.generateAsync({ type: "blob" });
  saveAs(zipContent, `${settings.title.toLowerCase().replace(/\s+/g, '-')}-nextjs.zip`);
}

function addProjectFiles(zip: JSZip, settings: ProjectSettings) {
  // Add README
  zip.file("README.md", `# ${settings.title}

${settings.description}

## Getting Started

\`\`\`bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm run start
\`\`\`

This project was built with Next.js.
  `);

  // Add package.json
  zip.file("package.json", JSON.stringify({
    name: settings.title.toLowerCase().replace(/\s+/g, '-'),
    version: "0.1.0",
    private: true,
    scripts: {
      dev: "next dev",
      build: "next build",
      start: "next start",
      lint: "next lint"
    },
    dependencies: {
      next: "13.5.6",
      react: "^18.2.0",
      "react-dom": "^18.2.0"
    },
    devDependencies: {
      "@types/node": "^20.9.0",
      "@types/react": "^18.2.37",
      "@types/react-dom": "^18.2.15",
      autoprefixer: "^10.4.16",
      postcss: "^8.4.31",
      tailwindcss: "^3.3.5",
      typescript: "^5.2.2"
    }
  }, null, 2));

  // Add Next.js config
  zip.file("next.config.js", `/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}

module.exports = nextConfig
`);

  // Add TypeScript config
  zip.file("tsconfig.json", JSON.stringify({
    compilerOptions: {
      target: "es5",
      lib: ["dom", "dom.iterable", "esnext"],
      allowJs: true,
      skipLibCheck: true,
      strict: true,
      noEmit: true,
      esModuleInterop: true,
      module: "esnext",
      moduleResolution: "bundler",
      resolveJsonModule: true,
      isolatedModules: true,
      jsx: "preserve",
      incremental: true,
      plugins: [{ name: "next" }],
      paths: { "@/*": ["./*"] }
    },
    include: ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
    exclude: ["node_modules"]
  }, null, 2));

  // Add PostCSS config
  zip.file("postcss.config.js", `module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
`);

  // Add Tailwind config
  zip.file("tailwind.config.js", `/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: 'var(--primary-color)',
        secondary: 'var(--secondary-color)',
      },
    },
  },
  plugins: [],
}
`);

  // Add gitignore
  zip.file(".gitignore", `# dependencies
/node_modules
/.pnp
.pnp.js

# testing
/coverage

# next.js
/.next/
/out/

# production
/build

# misc
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

  // Add setup scripts
  zip.file("setup.sh", `#!/bin/bash
echo "Setting up the Next.js project..."
npm install
echo "Dependencies installed successfully!"
echo "You can now run 'npm run dev' to start the development server."
`);

  zip.file("setup.bat", `@echo off
echo Setting up the Next.js project...
call npm install
echo Dependencies installed successfully!
echo You can now run 'npm run dev' to start the development server.
pause
`);
}

function addComponentFiles(zip: JSZip, components: ComponentInstance[]) {
  const componentsDir = zip.folder("components");
  const uniqueComponentTypes = new Set(components.map(c => c.type));
  
  // Generate each unique component type
  uniqueComponentTypes.forEach(type => {
    const componentCode = generateComponentCode(type, components.find(c => c.type === type)?.props || {});
    if (componentsDir) {
      componentsDir.file(`${type}.tsx`, componentCode);
    }
  });
}

function generateComponentCode(type: string, sampleProps: any): string {
  // Create component props interface
  const propsCode = generatePropsInterface(type, sampleProps);
  
  // Create component body based on type
  const componentBody = generateComponentBody(type, sampleProps);
  
  return `import React from 'react';

${propsCode}

export default function ${type}(props: ${type}Props) {
  // Destructure props with defaults
  const {
    backgroundColor,
    textColor,
    padding,
    ${Object.keys(sampleProps)
      .filter(key => !['backgroundColor', 'textColor', 'padding'].includes(key))
      .join(',\n    ')}
  } = props;

  // Prepare any complex data that might be passed as JSON strings
  ${generateDataPreparationCode(type, sampleProps)}

  // Component styles
  const containerStyle = {
    backgroundColor: backgroundColor || undefined,
    color: textColor || undefined,
    padding: padding || undefined,
  };

  return (
    <div style={containerStyle}>
      ${componentBody}
    </div>
  );
}
`;
}

function generatePropsInterface(type: string, props: any): string {
  return `interface ${type}Props {
  backgroundColor?: string;
  textColor?: string;
  padding?: string;
  ${Object.keys(props)
    .filter(key => !['backgroundColor', 'textColor', 'padding'].includes(key))
    .map(key => `${key}?: ${getTypeForProp(props[key])};`)
    .join('\n  ')}
}`;
}

function getTypeForProp(value: any): string {
  if (typeof value === 'string') {
    if (value.startsWith('[') || value.startsWith('{')) {
      return 'string | any'; // Allow either JSON string or parsed object
    }
    return 'string';
  }
  if (typeof value === 'number') return 'number';
  if (typeof value === 'boolean') return 'boolean';
  return 'any';
}

function generateDataPreparationCode(type: string, props: any): string {
  const jsonProps = Object.entries(props)
    .filter(([key, value]) => typeof value === 'string' && (value.startsWith('[') || value.startsWith('{')))
    .map(([key, value]) => {
      return `// Handle ${key} which might be a JSON string or object
const ${key}Data = (() => {
  try {
    if (typeof ${key} === 'string') {
      return JSON.parse(${key});
    }
    return ${key} || ${value}; // Use provided value or default
  } catch (error) {
    console.error(\`Error parsing ${key}\`, error);
    return ${value}; // Fallback to default JSON value
  }
})();`;
    });

  if (jsonProps.length === 0) {
    return '// No JSON data to prepare';
  }
  
  return jsonProps.join('\n\n  ');
}

function generateComponentBody(type: string, props: any): string {
  switch (type) {
    case 'SimpleNavbar':
      return `<nav className="py-4">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="text-xl font-bold">{props.logo || 'WebCraft'}</div>
          <div className="flex space-x-6">
            {(props.links || 'Home, About, Services, Contact').split(',').map((link, index) => (
              <a key={index} href="#" className="hover:opacity-70 transition-opacity">
                {link.trim()}
              </a>
            ))}
          </div>
        </div>
      </nav>`;

    case 'HeroNavbar':
      return `<nav className="py-4">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="text-xl font-bold">{props.logo || 'WebCraft'}</div>
          <div className="flex items-center space-x-6">
            {(props.links || 'Home, About, Services, Contact').split(',').map((link, index) => (
              <a key={index} href="#" className="hover:opacity-70 transition-opacity">
                {link.trim()}
              </a>
            ))}
            <button className="px-4 py-2 bg-primary text-white rounded-md hover:opacity-90 transition-opacity">
              {props.ctaText || 'Get Started'}
            </button>
          </div>
        </div>
      </nav>`;

    case 'SimpleHero':
      return `<div 
        className="relative h-[500px] flex items-center justify-center text-center bg-cover bg-center"
        style={{ backgroundImage: \`url(\${props.backgroundImage || 'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg'})\` }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative z-10 container mx-auto px-4 text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{props.heading || 'Welcome to our website'}</h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto">{props.subheading || 'A modern platform for your business needs'}</p>
          <button className="px-6 py-3 bg-primary text-white rounded-md hover:opacity-90 transition-opacity">
            {props.ctaText || 'Get Started'}
          </button>
        </div>
      </div>`;

    case 'SplitHero':
      return `<div className="container mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="flex-1">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">{props.heading || 'Build your next project with us'}</h1>
            <p className="text-lg mb-6">{props.content || 'We provide the tools and expertise to help your business succeed in the digital world.'}</p>
            <button className="px-6 py-3 bg-primary text-white rounded-md hover:opacity-90 transition-opacity">
              {props.ctaText || 'Learn More'}
            </button>
          </div>
          <div className="flex-1">
            <img 
              src={props.image || 'https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg'} 
              alt="Hero" 
              className="rounded-lg w-full h-auto object-cover"
            />
          </div>
        </div>
      </div>`;
      
    case 'Features':
      return `<div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">{props.heading || 'Our Features'}</h2>
          <p className="text-xl max-w-2xl mx-auto">{props.subheading || 'Discover what makes our product special'}</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuresData.map((feature, index) => (
            <div key={index} className="p-6 border border-gray-200 rounded-lg">
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>`;
      
    // Add other component types as needed
    
    default:
      return `<div>
        <p>Component type "${type}" implementation</p>
      </div>`;
  }
}

function addAppPages(zip: JSZip, components: ComponentInstance[], settings: ProjectSettings) {
  const appDir = zip.folder("app");
  
  // Create global.css
  if (appDir) {
    appDir.file("globals.css", `@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --primary-color: ${settings.primaryColor || '#3b82f6'};
  --secondary-color: ${settings.secondaryColor || '#10b981'};
}

body {
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}

.container {
  @apply max-w-7xl mx-auto px-4 sm:px-6 lg:px-8;
}
`);

    // Create layout.tsx
    appDir.file("layout.tsx", `import './globals.css';
import { Inter } from 'next/font/google';
import type { Metadata } from 'next';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: '${settings.title}',
  description: '${settings.description}',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
`);

    // Create page.tsx
    appDir.file("page.tsx", generatePageContent(components, settings));
  }
}

function generatePageContent(components: ComponentInstance[], settings: ProjectSettings): string {
  const uniqueComponentTypes = Array.from(new Set(components.map(c => c.type)));
  
  return `import React from 'react';
${uniqueComponentTypes.map(type => `import ${type} from '@/components/${type}';`).join('\n')}

export default function Home() {
  return (
    <main>
      ${components.map((component, idx) => {
        // Generate props
        const propsString = Object.entries(component.props || {})
          .map(([key, value]) => {
            if (typeof value === 'string') {
              if (value.startsWith('[') || value.startsWith('{')) {
                // JSON data - we'll pass it as a string and parse it in the component
                return `${key}={\`${value.replace(/`/g, '\\`')}\`}`;
              }
              return `${key}="${value}"`;
            }
            return `${key}={${JSON.stringify(value)}}`;
          })
          .join('\n        ');
        
        return `<${component.type}
        key="${idx}"
        ${propsString}
      />`;
      }).join('\n      ')}
    </main>
  );
}
`;
} 