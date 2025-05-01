"use client"

import { ComponentInstance } from '@/lib/types';
import { cn } from '@/lib/utils';
import * as ComponentModules from '@/lib/components/component-modules';

interface ComponentRendererProps {
  component: ComponentInstance;
}

export function ComponentRenderer({ component }: ComponentRendererProps) {
  // Ensure component type is a string
  if (typeof component.type !== 'string') {
    return (
      <div className="p-4 bg-destructive/10 text-destructive border border-destructive rounded-md">
        Invalid component type: expected string but got {typeof component.type}
      </div>
    );
  }

  const ComponentToRender = (ComponentModules as any)[component.type];
  
  // Add type checking to ensure ComponentToRender is a valid React component
  if (!ComponentToRender || typeof ComponentToRender !== 'function') {
    return (
      <div className="p-4 bg-destructive/10 text-destructive border border-destructive rounded-md">
        Component type &quot;{component.type}&quot; not found or invalid.
      </div>
    );
  }
  
  try {
    const { backgroundColor, textColor, padding, ...otherProps } = component.props;
    
    return (
      <div 
        style={{ 
          backgroundColor, 
          color: textColor,
          padding
        }}
        className={cn("relative")}
      >
        <ComponentToRender {...otherProps} />
      </div>
    );
  } catch (error) {
    console.error('Error rendering component:', error);
    return (
      <div className="p-4 bg-destructive/10 text-destructive border border-destructive rounded-md">
        Error rendering component: {error instanceof Error ? error.message : 'Unknown error'}
      </div>
    );
  }
}