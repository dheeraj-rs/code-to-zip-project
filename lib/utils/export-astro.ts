import { ComponentInstance } from '@/lib/types';

// Helper function to render component as Astro template
export function renderComponentAstro(component: ComponentInstance): string {
  const { type, props } = component;
  
  switch (type) {
    case 'SimpleNavbar':
      return `<nav class="py-4">
  <div class="container mx-auto px-4 flex justify-between items-center">
    <div class="text-xl font-bold">${props.logo || 'WebCraft'}</div>
    <div class="flex space-x-6">
      ${(props.links || 'Home, About, Services, Contact').split(',').map((link: string) => 
        `<a href="#" class="hover:opacity-70 transition-opacity">${link.trim()}</a>`
      ).join('\n      ')}
    </div>
  </div>
</nav>`;
    
    case 'HeroNavbar':
      return `<nav class="py-4">
  <div class="container mx-auto px-4 flex justify-between items-center">
    <div class="text-xl font-bold">${props.logo || 'WebCraft'}</div>
    <div class="flex items-center space-x-6">
      ${(props.links || 'Home, About, Services, Contact').split(',').map((link: string) => 
        `<a href="#" class="hover:opacity-70 transition-opacity">${link.trim()}</a>`
      ).join('\n      ')}
      <button class="px-4 py-2 bg-primary text-white rounded-md hover:opacity-90 transition-opacity">
        ${props.ctaText || 'Get Started'}
      </button>
    </div>
  </div>
</nav>`;
    
    case 'SimpleHero': 
      return `<div 
  class="relative h-[500px] flex items-center justify-center text-center bg-cover bg-center"
  style="background-image: url('${props.backgroundImage || 'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg'}');"
>
  <div class="absolute inset-0 bg-black opacity-50"></div>
  <div class="relative z-10 container mx-auto px-4 text-white">
    <h1 class="text-4xl md:text-5xl font-bold mb-4">${props.heading || 'Welcome to our website'}</h1>
    <p class="text-xl mb-8 max-w-2xl mx-auto">${props.subheading || 'A modern platform for your business needs'}</p>
    <button class="px-6 py-3 bg-primary text-white rounded-md hover:opacity-90 transition-opacity">
      ${props.ctaText || 'Get Started'}
    </button>
  </div>
</div>`;

    case 'SplitHero':
      return `<div class="container mx-auto px-4 py-12">
  <div class="flex flex-col md:flex-row items-center gap-8">
    <div class="flex-1">
      <h1 class="text-3xl md:text-4xl font-bold mb-4">${props.heading || 'Build your next project with us'}</h1>
      <p class="text-lg mb-6">${props.content || 'We provide the tools and expertise to help your business succeed in the digital world.'}</p>
      <button class="px-6 py-3 bg-primary text-white rounded-md hover:opacity-90 transition-opacity">
        ${props.ctaText || 'Learn More'}
      </button>
    </div>
    <div class="flex-1">
      <img 
        src="${props.image || 'https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg'}" 
        alt="Hero" 
        class="rounded-lg w-full h-auto object-cover"
      />
    </div>
  </div>
</div>`;

    case 'TextBlock':
      return `<div class="container mx-auto px-4 py-12">
  <div class="max-w-3xl mx-auto">
    <h2 class="text-3xl font-bold mb-4">${props.heading || 'Our Mission'}</h2>
    <div class="text-lg">
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
      
      return `<div class="container mx-auto px-4 py-12">
  <div class="text-center mb-12">
    <h2 class="text-3xl font-bold mb-4">${props.heading || 'Our Features'}</h2>
    <p class="text-xl max-w-2xl mx-auto">${props.subheading || 'Discover what makes our product special'}</p>
  </div>
  
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
    ${featuresArray.map((feature: {title: string, description: string}) => `
      <div class="p-6 border border-gray-200 rounded-lg">
        <h3 class="text-xl font-semibold mb-3">${feature.title}</h3>
        <p>${feature.description}</p>
      </div>
    `).join('\n    ')}
  </div>
</div>`;

    case 'AboutUs':
      return `<div class="container mx-auto px-4 py-12">
  <div class="flex flex-col md:flex-row gap-8">
    <div class="flex-1">
      <img 
        src="${props.image || 'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg'}" 
        alt="About Us" 
        class="rounded-lg w-full h-auto object-cover"
      />
    </div>
    <div class="flex-1">
      <h2 class="text-3xl font-bold mb-4">${props.heading || 'About Our Company'}</h2>
      <div class="text-lg">
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
      
      return `<div class="container mx-auto px-4 py-12">
  <div class="text-center mb-12">
    <h2 class="text-3xl font-bold mb-4">${props.heading || 'Our Team'}</h2>
    <p class="text-xl max-w-2xl mx-auto">${props.subheading || 'Meet the people behind our success'}</p>
  </div>
  
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
    ${membersArray.map((member: {name: string, role: string, bio: string, image: string}) => `
      <div class="text-center">
        <div class="w-32 h-32 rounded-full overflow-hidden mx-auto mb-4">
          <img 
            src="${member.image}" 
            alt="${member.name}" 
            class="w-full h-full object-cover"
          />
        </div>
        <h3 class="text-xl font-semibold">${member.name}</h3>
        <p class="text-gray-500 mb-2">${member.role}</p>
        <p class="text-sm">${member.bio}</p>
      </div>
    `).join('\n    ')}
  </div>
</div>`;

    case 'ContactForm':
      return `<div class="container mx-auto px-4 py-12">
  <div class="max-w-2xl mx-auto">
    <div class="text-center mb-8">
      <h2 class="text-3xl font-bold mb-4">${props.heading || 'Contact Us'}</h2>
      <p class="text-lg">${props.subheading || 'We\'d love to hear from you. Fill out the form below and we\'ll get back to you as soon as possible.'}</p>
    </div>
    
    <form class="flex flex-col gap-6">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label class="block mb-2">Name</label>
          <input type="text" class="w-full p-3 border border-gray-300 rounded-md" />
        </div>
        <div>
          <label class="block mb-2">Email</label>
          <input type="email" class="w-full p-3 border border-gray-300 rounded-md" />
        </div>
      </div>
      
      <div>
        <label class="block mb-2">Subject</label>
        <input type="text" class="w-full p-3 border border-gray-300 rounded-md" />
      </div>
      
      <div>
        <label class="block mb-2">Message</label>
        <textarea rows="5" class="w-full p-3 border border-gray-300 rounded-md"></textarea>
      </div>
      
      <button type="submit" class="self-start px-6 py-3 bg-primary text-white rounded-md hover:opacity-90 transition-opacity">
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
      
      return `<div class="container mx-auto px-4 py-12">
  <div class="max-w-2xl mx-auto">
    <h2 class="text-3xl font-bold mb-6">${props.heading || 'Get in Touch'}</h2>
    
    <div class="flex flex-col gap-6">
      <div>
        <h3 class="text-xl font-semibold mb-2">Address</h3>
        <p>${props.address || '123 Business Street, Suite 100, San Francisco, CA 94107'}</p>
      </div>
      
      <div>
        <h3 class="text-xl font-semibold mb-2">Contact Information</h3>
        <p>Email: ${props.email || 'info@example.com'}</p>
        <p>Phone: ${props.phone || '+1 (555) 123-4567'}</p>
      </div>
      
      <div>
        <h3 class="text-xl font-semibold mb-2">Follow Us</h3>
        <div class="flex gap-4">
          ${socialLinksArray.map((link: {platform: string, url: string}) => `
            <a href="${link.url}" target="_blank" rel="noopener noreferrer" class="text-gray-600 hover:text-primary">
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
      
      return `<footer class="bg-gray-100 py-8">
  <div class="container mx-auto px-4">
    <div class="flex flex-col items-center justify-between mb-8">
      <div class="text-xl font-bold mb-4">${props.logo || 'WebCraft'}</div>
      <div class="flex flex-wrap justify-center gap-6">
        ${linkArray.map((link: string) => `
          <a href="#" class="text-gray-600 hover:text-primary">${link}</a>
        `).join('\n        ')}
      </div>
    </div>
    <div class="text-center text-gray-500">
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
      
      return `<footer class="bg-gray-100 py-12">
  <div class="container mx-auto px-4">
    <div class="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
      <div>
        <div class="text-xl font-bold mb-4">${props.logo || 'WebCraft'}</div>
        <p class="text-gray-500">${props.description || 'Creating beautiful websites for businesses all around the world.'}</p>
      </div>
      
      ${columnsArray.map((column: {title: string, links: {label: string, url: string}[]}) => `
        <div>
          <h3 class="font-semibold mb-4">${column.title}</h3>
          <ul class="flex flex-col gap-2">
            ${column.links.map((link: {label: string, url: string}) => `
              <li>
                <a href="${link.url}" class="text-gray-500 hover:text-primary">${link.label}</a>
              </li>
            `).join('\n            ')}
          </ul>
        </div>
      `).join('\n      ')}
    </div>
    
    <div class="border-t border-gray-200 pt-6 text-center text-gray-500">
      ${props.copyright || '© 2025 WebCraft. All rights reserved.'}
    </div>
  </div>
</footer>`;
    
    default:
      return `<div>Component "${type}" could not be rendered</div>`;
  }
}
