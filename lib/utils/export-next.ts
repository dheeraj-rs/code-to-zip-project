import { ComponentInstance } from '@/lib/types';

// Helper function to render component as Next.js JSX
export function renderComponentNextJs(component: ComponentInstance): string {
  const { type, props } = component;
  
  switch (type) {
    case 'SimpleNavbar':
      return `<nav className="py-4">
  <div className="container mx-auto px-4 flex justify-between items-center">
    <div className="text-xl font-bold">${props.logo || 'WebCraft'}</div>
    <div className="flex space-x-6">
      ${(props.links || 'Home, About, Services, Contact').split(',').map((link: string) => 
        `<a key="${link.trim()}" href="#" className="hover:opacity-70 transition-opacity">${link.trim()}</a>`
      ).join('\n      ')}
    </div>
  </div>
</nav>`;
    
    case 'HeroNavbar':
      return `<nav className="py-4">
  <div className="container mx-auto px-4 flex justify-between items-center">
    <div className="text-xl font-bold">${props.logo || 'WebCraft'}</div>
    <div className="flex items-center space-x-6">
      ${(props.links || 'Home, About, Services, Contact').split(',').map((link: string) => 
        `<a key="${link.trim()}" href="#" className="hover:opacity-70 transition-opacity">${link.trim()}</a>`
      ).join('\n      ')}
      <button className="px-4 py-2 bg-primary text-white rounded-md hover:opacity-90 transition-opacity">
        ${props.ctaText || 'Get Started'}
      </button>
    </div>
  </div>
</nav>`;
    
    case 'SimpleHero':
      return `<div 
  className="relative h-[500px] flex items-center justify-center text-center bg-cover bg-center"
  style={{ backgroundImage: \`url(${props.backgroundImage || 'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg'})\` }}
>
  <div className="absolute inset-0 bg-black opacity-50"></div>
  <div className="relative z-10 container mx-auto px-4 text-white">
    <h1 className="text-4xl md:text-5xl font-bold mb-4">${props.heading || 'Welcome to our website'}</h1>
    <p className="text-xl mb-8 max-w-2xl mx-auto">${props.subheading || 'A modern platform for your business needs'}</p>
    <button className="px-6 py-3 bg-primary text-white rounded-md hover:opacity-90 transition-opacity">
      ${props.ctaText || 'Get Started'}
    </button>
  </div>
</div>`;

    case 'SplitHero':
      return `<div className="container mx-auto px-4 py-12">
  <div className="flex flex-col md:flex-row items-center gap-8">
    <div className="flex-1">
      <h1 className="text-3xl md:text-4xl font-bold mb-4">${props.heading || 'Build your next project with us'}</h1>
      <p className="text-lg mb-6">${props.content || 'We provide the tools and expertise to help your business succeed in the digital world.'}</p>
      <button className="px-6 py-3 bg-primary text-white rounded-md hover:opacity-90 transition-opacity">
        ${props.ctaText || 'Learn More'}
      </button>
    </div>
    <div className="flex-1">
      <img 
        src="${props.image || 'https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg'}" 
        alt="Hero" 
        className="rounded-lg w-full h-auto object-cover"
      />
    </div>
  </div>
</div>`;

    case 'TextBlock':
      return `<div className="container mx-auto px-4 py-12">
  <div className="max-w-3xl mx-auto">
    <h2 className="text-3xl font-bold mb-4">${props.heading || 'Our Mission'}</h2>
    <div className="text-lg">
      <p>${props.content || 'We are dedicated to providing the best service and solutions for our clients. Our team of experts works tirelessly to ensure your satisfaction and success.'}</p>
    </div>
  </div>
</div>`;

    case 'Features':
      let featuresArray = [];
      try {
        featuresArray = JSON.parse(props.features || '[{"title":"Fast Performance","description":"Our platform is optimized for speed and efficiency."},{"title":"Easy to Use","description":"Intuitive interface designed for users of all skill levels."},{"title":"Responsive Design","description":"Works perfectly on all devices and screen sizes."},{"title":"24/7 Support","description":"Our team is always available to help with any issues."}]');
      } catch (error) {
        console.error('Invalid features JSON');
        featuresArray = [];
      }
      
      return `<div className="container mx-auto px-4 py-12">
  <div className="text-center mb-12">
    <h2 className="text-3xl font-bold mb-4">${props.heading || 'Our Features'}</h2>
    <p className="text-xl max-w-2xl mx-auto">${props.subheading || 'Discover what makes our product special'}</p>
  </div>
  
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
    ${featuresArray.map((feature: {title: string, description: string}) => `
      <div className="p-6 border border-gray-200 rounded-lg">
        <h3 className="text-xl font-semibold mb-3">${feature.title}</h3>
        <p>${feature.description}</p>
      </div>
    `).join('\n    ')}
  </div>
</div>`;

    case 'AboutUs':
      return `<div className="container mx-auto px-4 py-12">
  <div className="flex flex-col md:flex-row gap-8">
    <div className="flex-1">
      <img 
        src="${props.image || 'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg'}" 
        alt="About Us" 
        className="rounded-lg w-full h-auto object-cover"
      />
    </div>
    <div className="flex-1">
      <h2 className="text-3xl font-bold mb-4">${props.heading || 'About Our Company'}</h2>
      <div className="text-lg">
        <p>${props.content || 'Founded in 2020, our company has been at the forefront of innovation in our industry. We believe in creating value for our clients through quality service and cutting-edge solutions.'}</p>
      </div>
    </div>
  </div>
</div>`;

    case 'Team':
      let membersArray = [];
      try {
        membersArray = JSON.parse(props.members || '[{"name":"John Doe","role":"CEO & Founder","bio":"John has over 15 years of experience in the industry.","image":"https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg"},{"name":"Jane Smith","role":"CTO","bio":"Jane leads our technical team with expertise in the latest technologies.","image":"https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg"},{"name":"Mike Johnson","role":"Design Lead","bio":"Mike creates beautiful and functional designs for our clients.","image":"https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg"},{"name":"Sarah Williams","role":"Marketing Director","bio":"Sarah develops strategies to grow our brand and reach new customers.","image":"https://images.pexels.com/photos/3760276/pexels-photo-3760276.jpeg"}]');
      } catch (error) {
        console.error('Invalid members JSON');
        membersArray = [];
      }
      
      return `<div className="container mx-auto px-4 py-12">
  <div className="text-center mb-12">
    <h2 className="text-3xl font-bold mb-4">${props.heading || 'Our Team'}</h2>
    <p className="text-xl max-w-2xl mx-auto">${props.subheading || 'Meet the people behind our success'}</p>
  </div>
  
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
    ${membersArray.map((member: {name: string, role: string, bio: string, image: string}) => `
      <div className="text-center">
        <div className="w-32 h-32 rounded-full overflow-hidden mx-auto mb-4">
          <img 
            src="${member.image}" 
            alt="${member.name}" 
            className="w-full h-full object-cover"
          />
        </div>
        <h3 className="text-xl font-semibold">${member.name}</h3>
        <p className="text-gray-500 mb-2">${member.role}</p>
        <p className="text-sm">${member.bio}</p>
      </div>
    `).join('\n    ')}
  </div>
</div>`;

    case 'ContactForm':
      return `<div className="container mx-auto px-4 py-12">
  <div className="max-w-2xl mx-auto">
    <div className="text-center mb-8">
      <h2 className="text-3xl font-bold mb-4">${props.heading || 'Contact Us'}</h2>
      <p className="text-lg">${props.subheading || 'We\'d love to hear from you. Fill out the form below and we\'ll get back to you as soon as possible.'}</p>
    </div>
    
    <form className="flex flex-col gap-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block mb-2">Name</label>
          <input type="text" className="w-full p-3 border border-gray-300 rounded-md" />
        </div>
        <div>
          <label className="block mb-2">Email</label>
          <input type="email" className="w-full p-3 border border-gray-300 rounded-md" />
        </div>
      </div>
      
      <div>
        <label className="block mb-2">Subject</label>
        <input type="text" className="w-full p-3 border border-gray-300 rounded-md" />
      </div>
      
      <div>
        <label className="block mb-2">Message</label>
        <textarea rows="5" className="w-full p-3 border border-gray-300 rounded-md"></textarea>
      </div>
      
      <button type="submit" className="self-start px-6 py-3 bg-primary text-white rounded-md hover:opacity-90 transition-opacity">
        ${props.submitText || 'Send Message'}
      </button>
    </form>
  </div>
</div>`;

    case 'ContactInfo':
      let socialLinksArray = [];
      try {
        socialLinksArray = JSON.parse(props.socialLinks || '[{"platform":"Facebook","url":"https://facebook.com"},{"platform":"Twitter","url":"https://twitter.com"},{"platform":"LinkedIn","url":"https://linkedin.com"},{"platform":"Instagram","url":"https://instagram.com"}]');
      } catch (error) {
        console.error('Invalid social links JSON');
        socialLinksArray = [];
      }
      
      return `<div className="container mx-auto px-4 py-12">
  <div className="max-w-2xl mx-auto">
    <h2 className="text-3xl font-bold mb-6">${props.heading || 'Get in Touch'}</h2>
    
    <div className="flex flex-col gap-6">
      <div>
        <h3 className="text-xl font-semibold mb-2">Address</h3>
        <p>${props.address || '123 Business Street, Suite 100, San Francisco, CA 94107'}</p>
      </div>
      
      <div>
        <h3 className="text-xl font-semibold mb-2">Contact Information</h3>
        <p>Email: ${props.email || 'info@example.com'}</p>
        <p>Phone: ${props.phone || '+1 (555) 123-4567'}</p>
      </div>
      
      <div>
        <h3 className="text-xl font-semibold mb-2">Follow Us</h3>
        <div className="flex gap-4">
          ${socialLinksArray.map((link: {platform: string, url: string}) => `
            <a href="${link.url}" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-primary">
              ${link.platform}
            </a>
          `).join('\n          ')}
        </div>
      </div>
    </div>
  </div>
</div>`;

    case 'SimpleFooter':
      const linkArray = (props.links || 'Home, About, Services, Contact').split(',').map((link: string) => link.trim());
      
      return `<footer className="bg-gray-100 py-8">
  <div className="container mx-auto px-4">
    <div className="flex flex-col items-center justify-between mb-8">
      <div className="text-xl font-bold mb-4">${props.logo || 'WebCraft'}</div>
      <div className="flex flex-wrap justify-center gap-6">
        ${linkArray.map((link: string) => `
          <a href="#" className="text-gray-600 hover:text-primary">${link}</a>
        `).join('\n        ')}
      </div>
    </div>
    <div className="text-center text-gray-500">
      ${props.copyright || '© 2025 WebCraft. All rights reserved.'}
    </div>
  </div>
</footer>`;

    case 'MultiColumnFooter':
      let columnsArray = [];
      try {
        columnsArray = JSON.parse(props.columns || '[{"title":"Products","links":[{"label":"Features","url":"#"},{"label":"Pricing","url":"#"},{"label":"Resources","url":"#"}]},{"title":"Company","links":[{"label":"About Us","url":"#"},{"label":"Careers","url":"#"},{"label":"Contact","url":"#"}]},{"title":"Support","links":[{"label":"Help Center","url":"#"},{"label":"Documentation","url":"#"},{"label":"Status","url":"#"}]}]');
      } catch (error) {
        console.error('Invalid columns JSON');
        columnsArray = [];
      }
      
      return `<footer className="bg-gray-100 py-12">
  <div className="container mx-auto px-4">
    <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
      <div>
        <div className="text-xl font-bold mb-4">${props.logo || 'WebCraft'}</div>
        <p className="text-gray-500">${props.description || 'Creating beautiful websites for businesses all around the world.'}</p>
      </div>
      
      ${columnsArray.map((column: {title: string, links: {label: string, url: string}[]}) => `
        <div>
          <h3 className="font-semibold mb-4">${column.title}</h3>
          <ul className="flex flex-col gap-2">
            ${column.links.map((link: {label: string, url: string}) => `
              <li>
                <a href="${link.url}" className="text-gray-500 hover:text-primary">${link.label}</a>
              </li>
            `).join('\n            ')}
          </ul>
        </div>
      `).join('\n      ')}
    </div>
    
    <div className="border-t border-gray-200 pt-6 text-center text-gray-500">
      ${props.copyright || '© 2025 WebCraft. All rights reserved.'}
    </div>
  </div>
</footer>`;
    
    // Add cases for other component types
    default:
      return `<div>Component "${type}" could not be rendered</div>`;
  }
} 