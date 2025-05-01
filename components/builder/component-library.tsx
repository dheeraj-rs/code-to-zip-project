"use client"

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { X, Search } from 'lucide-react';
import { componentCategories } from '@/lib/components/component-data';
import { ComponentItem } from './component-item';

interface ComponentLibraryProps {
  onClose: () => void;
}

export function ComponentLibrary({ onClose }: ComponentLibraryProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  
  const filteredComponents = Object.entries(componentCategories).flatMap(
    ([category, components]) => {
      if (activeTab !== 'all' && activeTab !== category) return [];
      
      return components.filter(component => 
        component.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        component.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
  );
  
  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b border-border flex items-center justify-between">
        <h2 className="text-lg font-medium">Component Library</h2>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </div>
      
      <div className="p-4 border-b border-border">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search components..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      
      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
        <div className="border-b border-border px-4">
          <TabsList className="w-full justify-start rounded-none h-10 bg-transparent mb-0 pb-0 pt-0">
            <TabsTrigger 
              value="all" 
              className="rounded-t-lg rounded-b-none data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:bg-transparent"
            >
              All
            </TabsTrigger>
            {Object.keys(componentCategories).map((category) => (
              <TabsTrigger
                key={category}
                value={category}
                className="rounded-t-lg rounded-b-none data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:bg-transparent capitalize"
              >
                {category}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>
        
        <ScrollArea className="flex-1">
          <div className="p-4 grid grid-cols-2 gap-4">
            {filteredComponents.length > 0 ? (
              filteredComponents.map((component) => (
                <ComponentItem
                  key={component.id}
                  component={component}
                />
              ))
            ) : (
              <div className="col-span-2 flex items-center justify-center h-32 text-muted-foreground">
                No components found.
              </div>
            )}
          </div>
        </ScrollArea>
      </Tabs>
    </div>
  );
}