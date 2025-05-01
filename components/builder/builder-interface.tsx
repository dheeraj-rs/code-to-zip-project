"use client"

import { useState } from 'react';
import { ComponentLibrary } from './component-library';
import { PreviewArea } from './preview-area';
import { ComponentEditor } from './component-editor';
import { useBuilderStore } from '@/lib/store/builder-store';
import { AnimatePresence, motion } from 'framer-motion';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '@/components/ui/resizable';

export function BuilderInterface() {
  const { selectedComponentId } = useBuilderStore();
  const [showComponentLibrary, setShowComponentLibrary] = useState(true);
  
  return (
    <ResizablePanelGroup direction="horizontal">
      <AnimatePresence mode="wait">
        {showComponentLibrary && (
          <ResizablePanel defaultSize={20} minSize={15} maxSize={30}>
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 320, opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="border-r border-border h-full"
              style={{ minWidth: 320, maxWidth: 320 }}
            >
              <ComponentLibrary 
                onClose={() => setShowComponentLibrary(false)} 
              />
            </motion.div>
          </ResizablePanel>
        )}
      </AnimatePresence>
      
      <ResizablePanel defaultSize={60}>
        <div className="flex-1 h-full overflow-hidden flex">
          <PreviewArea onOpenLibrary={() => setShowComponentLibrary(true)} />
        </div>
      </ResizablePanel>
      
      <AnimatePresence>
        {selectedComponentId && (
          <ResizablePanel defaultSize={20}>
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 350, opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="border-l border-border h-full"
              style={{ minWidth: 350, maxWidth: 350 }}
            >
              <ComponentEditor />
            </motion.div>
          </ResizablePanel>
        )}
      </AnimatePresence>
    </ResizablePanelGroup>
  );
}