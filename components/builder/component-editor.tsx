"use client"

import { useBuilderStore } from '@/lib/store/builder-store';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { X, Copy, Trash2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { ColorPicker } from './editor/color-picker';
import { ImageSelector } from './editor/image-selector';
import { getComponentDefinition } from '@/lib/components/component-data';

export function ComponentEditor() {
  const { 
    selectedComponentId, 
    getComponentById, 
    updateComponentProps, 
    setSelectedComponentId,
    duplicateComponent,
    removeComponent
  } = useBuilderStore();
  
  if (!selectedComponentId) return null;
  
  const component = getComponentById(selectedComponentId);
  if (!component) return null;
  
  const componentDef = getComponentDefinition(component.type);
  if (!componentDef) return null;
  
  const handleClose = () => {
    setSelectedComponentId(null);
  };
  
  const handleDuplicate = () => {
    duplicateComponent(selectedComponentId);
  };
  
  const handleRemove = () => {
    removeComponent(selectedComponentId);
  };
  
  const updateProp = (key: string, value: any) => {
    updateComponentProps(selectedComponentId, { [key]: value });
  };
  
  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b border-border flex items-center justify-between">
        <h2 className="text-lg font-medium">Edit {componentDef.name}</h2>
        <Button variant="ghost" size="icon" onClick={handleClose}>
          <X className="h-4 w-4" />
        </Button>
      </div>
      
      <Tabs defaultValue="content">
        <div className="px-4 pt-4 border-b border-border">
          <TabsList className="w-full">
            <TabsTrigger value="content">Content</TabsTrigger>
            <TabsTrigger value="style">Style</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>
        </div>
        
        <ScrollArea className="flex-1 p-4">
          <TabsContent value="content" className="space-y-4 mt-0">
            {componentDef.editorFields?.map((field) => {
              if (field.type === 'text') {
                return (
                  <div key={field.name} className="space-y-2">
                    <Label htmlFor={field.name}>{field.label}</Label>
                    <Input
                      id={field.name}
                      value={component.props[field.name] || ''}
                      onChange={(e) => updateProp(field.name, e.target.value)}
                    />
                  </div>
                );
              }
              
              if (field.type === 'textarea') {
                return (
                  <div key={field.name} className="space-y-2">
                    <Label htmlFor={field.name}>{field.label}</Label>
                    <Textarea
                      id={field.name}
                      value={component.props[field.name] || ''}
                      onChange={(e) => updateProp(field.name, e.target.value)}
                      rows={4}
                    />
                  </div>
                );
              }
              
              if (field.type === 'color') {
                return (
                  <div key={field.name} className="space-y-2">
                    <Label>{field.label}</Label>
                    <ColorPicker
                      color={component.props[field.name] || '#000000'}
                      onChange={(color) => updateProp(field.name, color)}
                    />
                  </div>
                );
              }
              
              if (field.type === 'image') {
                return (
                  <div key={field.name} className="space-y-2">
                    <Label>{field.label}</Label>
                    <ImageSelector
                      value={component.props[field.name] || ''}
                      onChange={(url) => updateProp(field.name, url)}
                    />
                  </div>
                );
              }
              
              return null;
            })}
          </TabsContent>
          
          <TabsContent value="style" className="space-y-4 mt-0">
            <div className="space-y-2">
              <Label>Background Color</Label>
              <ColorPicker
                color={component.props.backgroundColor || '#ffffff'}
                onChange={(color) => updateProp('backgroundColor', color)}
              />
            </div>
            
            <div className="space-y-2">
              <Label>Text Color</Label>
              <ColorPicker
                color={component.props.textColor || '#000000'}
                onChange={(color) => updateProp('textColor', color)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="padding">Padding</Label>
              <Input
                id="padding"
                type="text"
                value={component.props.padding || '0px'}
                onChange={(e) => updateProp('padding', e.target.value)}
              />
            </div>
          </TabsContent>
          
          <TabsContent value="settings" className="space-y-4 mt-0">
            <div className="space-y-2">
              <Label htmlFor="id">Component ID</Label>
              <Input
                id="id"
                value={component.id}
                readOnly
                disabled
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="componentType">Component Type</Label>
              <Input
                id="componentType"
                value={componentDef.name}
                readOnly
                disabled
              />
            </div>
            
            <div className="flex space-x-2 pt-4">
              <Button 
                variant="outline" 
                className="flex-1"
                onClick={handleDuplicate}
              >
                <Copy className="h-4 w-4 mr-2" />
                Duplicate
              </Button>
              <Button 
                variant="destructive" 
                className="flex-1"
                onClick={handleRemove}
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Remove
              </Button>
            </div>
          </TabsContent>
        </ScrollArea>
      </Tabs>
    </div>
  );
}