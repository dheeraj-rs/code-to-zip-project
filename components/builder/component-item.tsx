"use client"

import { useBuilderStore } from '@/lib/store/builder-store';
import { ComponentDefinition } from '@/lib/types';
import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';
import { useDrag } from 'react-dnd';
import { motion } from 'framer-motion';

interface ComponentItemProps {
  component: ComponentDefinition;
}

export function ComponentItem({ component }: ComponentItemProps) {
  const { addComponent } = useBuilderStore();
  
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'component',
    item: { componentType: component.id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));
  
  const handleAddComponent = () => {
    addComponent(component.id);
  };
  
  return (
    <motion.div
      ref={drag}
      whileHover={{ y: -5 }}
      whileTap={{ scale: 0.95 }}
      style={{ opacity: isDragging ? 0.5 : 1 }}
      onClick={handleAddComponent}
    >
      <Card className="cursor-pointer hover:border-primary transition-colors">
        <CardContent className="p-0">
          <div className="aspect-video w-full relative bg-muted overflow-hidden rounded-t-lg">
            <Image
              src={component.thumbnail}
              alt={component.name}
              fill
              className="object-cover"
            />
          </div>
          <div className="p-3">
            <h3 className="font-medium text-sm">{component.name}</h3>
            <p className="text-xs text-muted-foreground line-clamp-2 mt-1">
              {component.description}
            </p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}