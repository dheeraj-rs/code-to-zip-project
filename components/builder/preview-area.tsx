"use client"

import { useBuilderStore } from '@/lib/store/builder-store';
import { cn } from '@/lib/utils';
import { ComponentInstance, DeviceSize } from '@/lib/types';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import { useDrop } from 'react-dnd';
import { AnimatePresence, Reorder, motion } from 'framer-motion';
import { ComponentRenderer } from './component-renderer';

const deviceSizes: Record<DeviceSize, string> = {
  desktop: 'w-full',
  tablet: 'w-[768px]',
  mobile: 'w-[375px]'
};

interface PreviewAreaProps {
  onOpenLibrary: () => void;
}

export function PreviewArea({ onOpenLibrary }: PreviewAreaProps) {
  const { components, previewDevice, updateComponentOrder, setSelectedComponentId } = useBuilderStore();
  
  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'component',
    drop: (item: { componentType: string }, monitor) => {
      if (monitor.didDrop()) {
        return;
      }
      // Component drag/drop handling would go here
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));
  
  return (
    <div className="flex-1 flex flex-col h-full">
      <div className="flex-1 bg-muted p-4 flex items-center justify-center overflow-hidden">
        <div 
          className={cn(
            "bg-background rounded-lg shadow-lg transition-all duration-300 mx-auto h-full overflow-hidden",
            deviceSizes[previewDevice]
          )}
        >
          <ScrollArea className="h-full" ref={drop}>
            <div className={cn("min-h-[100vh] transition-all", isOver && "bg-muted/20")}>
              {components.length > 0 ? (
                <Reorder.Group
                  axis="y"
                  values={components}
                  onReorder={updateComponentOrder}
                >
                  <AnimatePresence mode="popLayout">
                    {components.map((component: ComponentInstance) => (
                      <Reorder.Item
                        key={component.id}
                        value={component}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        onClick={() => setSelectedComponentId(component.id)}
                        className="relative group"
                      >
                        <motion.div layout>
                          <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 border-2 border-primary transition-opacity z-10" />
                          <ComponentRenderer component={component} />
                        </motion.div>
                      </Reorder.Item>
                    ))}
                  </AnimatePresence>
                </Reorder.Group>
              ) : (
                <div className="h-full flex flex-col items-center justify-center p-8">
                  <div className="text-center space-y-4 max-w-md mx-auto">
                    <h3 className="text-2xl font-medium">Start Building Your Website</h3>
                    <p className="text-muted-foreground">
                      Add components from the library to create your custom website. Arrange them in any order you prefer.
                    </p>
                    <Button onClick={onOpenLibrary}>
                      <PlusCircle className="h-4 w-4 mr-2" />
                      Add Component
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>
        </div>
      </div>
    </div>
  );
}