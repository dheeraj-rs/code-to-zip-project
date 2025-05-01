"use client"

import React from 'react';
import { cn } from '@/lib/utils';

// Simple Navbar Component
export function SimpleNavbar({ logo = 'WebCraft', links = 'Home, About, Services, Contact' }) {
  const linkArray = links.split(',').map(link => link.trim());
  
  return (
    <nav className="py-4">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="text-xl font-bold">{logo}</div>
        <div className="flex space-x-6">
          {linkArray.map((link, index) => (
            <a 
              key={index} 
              href="#" 
              className="hover:opacity-70 transition-opacity"
            >
              {link}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}

// Hero Navbar Component
export function HeroNavbar({ logo = 'WebCraft', links = 'Home, About, Services, Contact', ctaText = 'Get Started' }) {
  const linkArray = links.split(',').map(link => link.trim());
  
  return (
    <nav className="py-4">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="text-xl font-bold">{logo}</div>
        <div className="flex items-center space-x-6">
          {linkArray.map((link, index) => (
            <a 
              key={index} 
              href="#" 
              className="hover:opacity-70 transition-opacity"
            >
              {link}
            </a>
          ))}
          <button className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:opacity-90 transition-opacity">
            {ctaText}
          </button>
        </div>
      </div>
    </nav>
  );
}

// Simple Hero Component
export function SimpleHero({ 
  heading = 'Welcome to our website', 
  subheading = 'A modern platform for your business needs', 
  ctaText = 'Get Started',
  backgroundImage = 'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg'
}) {
  return (
    <div 
      className="relative h-[500px] flex items-center justify-center text-center bg-cover bg-center"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="relative z-10 container mx-auto px-4 text-white">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">{heading}</h1>
        <p className="text-xl mb-8 max-w-2xl mx-auto">{subheading}</p>
        <button className="px-6 py-3 bg-primary text-primary-foreground rounded-md hover:opacity-90 transition-opacity">
          {ctaText}
        </button>
      </div>
    </div>
  );
}

// Split Hero Component
export function SplitHero({ 
  heading = 'Build your next project with us', 
  content = 'We provide the tools and expertise to help your business succeed in the digital world.',
  ctaText = 'Learn More',
  image = 'https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg'
}) {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row items-center gap-8">
        <div className="flex-1">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">{heading}</h1>
          <p className="text-lg mb-6">{content}</p>
          <button className="px-6 py-3 bg-primary text-primary-foreground rounded-md hover:opacity-90 transition-opacity">
            {ctaText}
          </button>
        </div>
        <div className="flex-1">
          <img 
            src={image} 
            alt="Hero" 
            className="rounded-lg w-full h-auto object-cover"
          />
        </div>
      </div>
    </div>
  );
}

// Text Block Component
export function TextBlock({ 
  heading = 'Our Mission', 
  content = 'We are dedicated to providing the best service and solutions for our clients. Our team of experts works tirelessly to ensure your satisfaction and success.'
}) {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">{heading}</h2>
        <div className="prose prose-lg">
          <p>{content}</p>
        </div>
      </div>
    </div>
  );
}

// Features Grid Component
export function Features({ 
  heading = 'Our Features', 
  subheading = 'Discover what makes our product special',
  features = '[{"title":"Fast Performance","description":"Our platform is optimized for speed and efficiency."},{"title":"Easy to Use","description":"Intuitive interface designed for users of all skill levels."},{"title":"Responsive Design","description":"Works perfectly on all devices and screen sizes."},{"title":"24/7 Support","description":"Our team is always available to help with any issues."}]'
}) {
  let featuresArray = [];
  try {
    featuresArray = JSON.parse(features);
  } catch (error) {
    console.error('Invalid features JSON');
  }
  
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4">{heading}</h2>
        <p className="text-xl max-w-2xl mx-auto">{subheading}</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {featuresArray.map((feature, index) => (
          <div key={index} className="p-6 border rounded-lg">
            <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
            <p>{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// About Us Component
export function AboutUs({ 
  heading = 'About Our Company', 
  content = 'Founded in 2020, our company has been at the forefront of innovation in our industry. We believe in creating value for our clients through quality service and cutting-edge solutions.',
  image = 'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg'
}) {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row items-center gap-8">
        <div className="flex-1">
          <img 
            src={image} 
            alt="About Us" 
            className="rounded-lg w-full h-auto object-cover"
          />
        </div>
        <div className="flex-1">
          <h2 className="text-3xl font-bold mb-4">{heading}</h2>
          <div className="prose prose-lg">
            <p>{content}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// Team Members Component
export function Team({ 
  heading = 'Our Team', 
  subheading = 'Meet the people behind our success',
  members = '[{"name":"John Doe","role":"CEO & Founder","bio":"John has over 15 years of experience in the industry.","image":"https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg"},{"name":"Jane Smith","role":"CTO","bio":"Jane leads our technical team with expertise in the latest technologies.","image":"https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg"},{"name":"Mike Johnson","role":"Design Lead","bio":"Mike creates beautiful and functional designs for our clients.","image":"https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg"},{"name":"Sarah Williams","role":"Marketing Director","bio":"Sarah develops strategies to grow our brand and reach new customers.","image":"https://images.pexels.com/photos/3760276/pexels-photo-3760276.jpeg"}]'
}) {
  let membersArray = [];
  try {
    membersArray = JSON.parse(members);
  } catch (error) {
    console.error('Invalid members JSON');
  }
  
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4">{heading}</h2>
        <p className="text-xl max-w-2xl mx-auto">{subheading}</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {membersArray.map((member, index) => (
          <div key={index} className="text-center">
            <div className="w-32 h-32 rounded-full overflow-hidden mx-auto mb-4">
              <img 
                src={member.image} 
                alt={member.name} 
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="text-xl font-semibold">{member.name}</h3>
            <p className="text-muted-foreground mb-2">{member.role}</p>
            <p className="text-sm">{member.bio}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// Contact Form Component
export function ContactForm({ 
  heading = 'Contact Us', 
  subheading = 'We\'d love to hear from you. Fill out the form below and we\'ll get back to you as soon as possible.',
  submitText = 'Send Message'
}) {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-4">{heading}</h2>
          <p className="text-lg">{subheading}</p>
        </div>
        
        <form className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block mb-2">Name</label>
              <input type="text" className="w-full p-3 border rounded-md" />
            </div>
            <div>
              <label className="block mb-2">Email</label>
              <input type="email" className="w-full p-3 border rounded-md" />
            </div>
          </div>
          
          <div>
            <label className="block mb-2">Subject</label>
            <input type="text" className="w-full p-3 border rounded-md" />
          </div>
          
          <div>
            <label className="block mb-2">Message</label>
            <textarea rows={5} className="w-full p-3 border rounded-md"></textarea>
          </div>
          
          <button 
            type="submit" 
            className="px-6 py-3 bg-primary text-primary-foreground rounded-md hover:opacity-90 transition-opacity"
          >
            {submitText}
          </button>
        </form>
      </div>
    </div>
  );
}

// Contact Info Component
export function ContactInfo({ 
  heading = 'Get in Touch', 
  address = '123 Business Street, Suite 100, San Francisco, CA 94107',
  email = 'info@example.com',
  phone = '+1 (555) 123-4567',
  socialLinks = '[{"platform":"Facebook","url":"https://facebook.com"},{"platform":"Twitter","url":"https://twitter.com"},{"platform":"LinkedIn","url":"https://linkedin.com"},{"platform":"Instagram","url":"https://instagram.com"}]'
}) {
  let socialLinksArray = [];
  try {
    socialLinksArray = JSON.parse(socialLinks);
  } catch (error) {
    console.error('Invalid social links JSON');
  }
  
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-3xl font-bold mb-6">{heading}</h2>
        
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold mb-2">Address</h3>
            <p>{address}</p>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold mb-2">Contact Information</h3>
            <p>Email: {email}</p>
            <p>Phone: {phone}</p>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold mb-2">Follow Us</h3>
            <div className="flex space-x-4">
              {socialLinksArray.map((link, index) => (
                <a 
                  key={index} 
                  href={link.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:opacity-70 transition-opacity"
                >
                  {link.platform}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Simple Footer Component
export function SimpleFooter({ 
  logo = 'WebCraft', 
  links = 'Home, About, Services, Contact',
  copyright = '© 2025 WebCraft. All rights reserved.'
}) {
  const linkArray = links.split(',').map(link => link.trim());
  
  return (
    <footer className="bg-muted py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div className="text-xl font-bold mb-4 md:mb-0">{logo}</div>
          <div className="flex flex-wrap justify-center space-x-6">
            {linkArray.map((link, index) => (
              <a 
                key={index} 
                href="#" 
                className="hover:opacity-70 transition-opacity mb-2"
              >
                {link}
              </a>
            ))}
          </div>
        </div>
        <div className="text-center text-muted-foreground">
          {copyright}
        </div>
      </div>
    </footer>
  );
}

// Multi-Column Footer Component
export function MultiColumnFooter({ 
  logo = 'WebCraft', 
  description = 'Creating beautiful websites for businesses all around the world.',
  columns = '[{"title":"Products","links":[{"label":"Features","url":"#"},{"label":"Pricing","url":"#"},{"label":"Resources","url":"#"}]},{"title":"Company","links":[{"label":"About Us","url":"#"},{"label":"Careers","url":"#"},{"label":"Contact","url":"#"}]},{"title":"Support","links":[{"label":"Help Center","url":"#"},{"label":"Documentation","url":"#"},{"label":"Status","url":"#"}]}]',
  copyright = '© 2025 WebCraft. All rights reserved.'
}) {
  let columnsArray = [];
  try {
    columnsArray = JSON.parse(columns);
  } catch (error) {
    console.error('Invalid columns JSON');
  }
  
  return (
    <footer className="bg-muted py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="text-xl font-bold mb-4">{logo}</div>
            <p className="text-muted-foreground">{description}</p>
          </div>
          
          {columnsArray.map((column, index) => (
            <div key={index}>
              <h3 className="font-semibold mb-4">{column.title}</h3>
              <ul className="space-y-2">
                {column.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a 
                      href={link.url} 
                      className="text-muted-foreground hover:opacity-70 transition-opacity"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        <div className="border-t border-border pt-6 text-center text-muted-foreground">
          {copyright}
        </div>
      </div>
    </footer>
  );
}