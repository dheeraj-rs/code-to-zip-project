import { ComponentDefinition } from '@/lib/types';

// Navigation components
const navigationComponents: ComponentDefinition[] = [
  {
    id: 'SimpleNavbar',
    name: 'Simple Navbar',
    description: 'A clean and minimal navigation bar with logo and links',
    thumbnail: 'https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg',
    editorFields: [
      { name: 'logo', label: 'Logo Text', type: 'text' },
      { name: 'links', label: 'Navigation Links (comma separated)', type: 'text' }
    ]
  },
  {
    id: 'HeroNavbar',
    name: 'Hero Navbar',
    description: 'A prominent navbar with CTA button and dropdown menus',
    thumbnail: 'https://images.pexels.com/photos/1181403/pexels-photo-1181403.jpeg',
    editorFields: [
      { name: 'logo', label: 'Logo Text', type: 'text' },
      { name: 'links', label: 'Navigation Links (comma separated)', type: 'text' },
      { name: 'ctaText', label: 'CTA Button Text', type: 'text' }
    ]
  }
];

// Hero components
const heroComponents: ComponentDefinition[] = [
  {
    id: 'SimpleHero',
    name: 'Simple Hero',
    description: 'A basic hero section with heading, subheading and CTA button',
    thumbnail: 'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg',
    editorFields: [
      { name: 'heading', label: 'Heading', type: 'text' },
      { name: 'subheading', label: 'Subheading', type: 'textarea' },
      { name: 'ctaText', label: 'CTA Button Text', type: 'text' },
      { name: 'backgroundImage', label: 'Background Image', type: 'image' }
    ]
  },
  {
    id: 'SplitHero',
    name: 'Split Hero',
    description: 'A hero section with content on one side and image on the other',
    thumbnail: 'https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg',
    editorFields: [
      { name: 'heading', label: 'Heading', type: 'text' },
      { name: 'content', label: 'Content', type: 'textarea' },
      { name: 'ctaText', label: 'CTA Button Text', type: 'text' },
      { name: 'image', label: 'Hero Image', type: 'image' }
    ]
  }
];

// Content components
const contentComponents: ComponentDefinition[] = [
  {
    id: 'TextBlock',
    name: 'Text Block',
    description: 'A simple text content block with heading and paragraph',
    thumbnail: 'https://images.pexels.com/photos/3182811/pexels-photo-3182811.jpeg',
    editorFields: [
      { name: 'heading', label: 'Heading', type: 'text' },
      { name: 'content', label: 'Content', type: 'textarea' }
    ]
  },
  {
    id: 'Features',
    name: 'Features Grid',
    description: 'A grid of feature cards with icons, titles and descriptions',
    thumbnail: 'https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg',
    editorFields: [
      { name: 'heading', label: 'Section Heading', type: 'text' },
      { name: 'subheading', label: 'Section Subheading', type: 'textarea' },
      { name: 'features', label: 'Features (JSON)', type: 'textarea' }
    ]
  }
];

// About components
const aboutComponents: ComponentDefinition[] = [
  {
    id: 'AboutUs',
    name: 'About Us',
    description: 'A section to introduce your company or team',
    thumbnail: 'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg',
    editorFields: [
      { name: 'heading', label: 'Heading', type: 'text' },
      { name: 'content', label: 'Content', type: 'textarea' },
      { name: 'image', label: 'About Image', type: 'image' }
    ]
  },
  {
    id: 'Team',
    name: 'Team Members',
    description: 'A grid of team member profiles with photos and bios',
    thumbnail: 'https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg',
    editorFields: [
      { name: 'heading', label: 'Section Heading', type: 'text' },
      { name: 'subheading', label: 'Section Subheading', type: 'textarea' },
      { name: 'members', label: 'Team Members (JSON)', type: 'textarea' }
    ]
  }
];

// Contact components
const contactComponents: ComponentDefinition[] = [
  {
    id: 'ContactForm',
    name: 'Contact Form',
    description: 'A simple contact form with email and message fields',
    thumbnail: 'https://images.pexels.com/photos/5703523/pexels-photo-5703523.jpeg',
    editorFields: [
      { name: 'heading', label: 'Heading', type: 'text' },
      { name: 'subheading', label: 'Subheading', type: 'textarea' },
      { name: 'submitText', label: 'Submit Button Text', type: 'text' }
    ]
  },
  {
    id: 'ContactInfo',
    name: 'Contact Info',
    description: 'Display contact information and social media links',
    thumbnail: 'https://images.pexels.com/photos/2559941/pexels-photo-2559941.jpeg',
    editorFields: [
      { name: 'heading', label: 'Heading', type: 'text' },
      { name: 'address', label: 'Address', type: 'textarea' },
      { name: 'email', label: 'Email', type: 'text' },
      { name: 'phone', label: 'Phone', type: 'text' },
      { name: 'socialLinks', label: 'Social Links (JSON)', type: 'textarea' }
    ]
  }
];

// Footer components
const footerComponents: ComponentDefinition[] = [
  {
    id: 'SimpleFooter',
    name: 'Simple Footer',
    description: 'A clean footer with logo, links and copyright',
    thumbnail: 'https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg',
    editorFields: [
      { name: 'logo', label: 'Logo Text', type: 'text' },
      { name: 'links', label: 'Footer Links (comma separated)', type: 'text' },
      { name: 'copyright', label: 'Copyright Text', type: 'text' }
    ]
  },
  {
    id: 'MultiColumnFooter',
    name: 'Multi-Column Footer',
    description: 'A comprehensive footer with multiple columns of links and info',
    thumbnail: 'https://images.pexels.com/photos/1181403/pexels-photo-1181403.jpeg',
    editorFields: [
      { name: 'logo', label: 'Logo Text', type: 'text' },
      { name: 'description', label: 'Company Description', type: 'textarea' },
      { name: 'columns', label: 'Footer Columns (JSON)', type: 'textarea' },
      { name: 'copyright', label: 'Copyright Text', type: 'text' }
    ]
  }
];

export const componentCategories = {
  navigation: navigationComponents,
  hero: heroComponents,
  content: contentComponents,
  about: aboutComponents,
  contact: contactComponents,
  footer: footerComponents
};

export function getComponentDefinition(id: string): ComponentDefinition | undefined {
  return Object.values(componentCategories)
    .flat()
    .find(component => component.id === id);
}