"use client"

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Upload, Link, Image as ImageIcon } from 'lucide-react';
import Image from 'next/image';

interface ImageSelectorProps {
  value: string;
  onChange: (url: string) => void;
}

const popularImages = [
  "https://images.pexels.com/photos/2559941/pexels-photo-2559941.jpeg",
  "https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg",
  "https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg",
  "https://images.pexels.com/photos/1181403/pexels-photo-1181403.jpeg",
  "https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg",
  "https://images.pexels.com/photos/5703523/pexels-photo-5703523.jpeg",
  "https://images.pexels.com/photos/3182811/pexels-photo-3182811.jpeg",
  "https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg"
];

export function ImageSelector({ value, onChange }: ImageSelectorProps) {
  const [urlInput, setUrlInput] = useState(value || '');
  
  const handleUrlSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onChange(urlInput);
  };
  
  const selectPresetImage = (url: string) => {
    setUrlInput(url);
    onChange(url);
  };
  
  return (
    <Tabs defaultValue="url" className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="url">URL</TabsTrigger>
        <TabsTrigger value="gallery">Gallery</TabsTrigger>
      </TabsList>
      
      <TabsContent value="url" className="space-y-4">
        <form onSubmit={handleUrlSubmit} className="flex space-x-2">
          <Input
            type="url"
            placeholder="Enter image URL..."
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
            className="flex-1"
          />
          <Button type="submit">
            <Link className="h-4 w-4 mr-2" />
            Set
          </Button>
        </form>
        
        {value && (
          <div className="relative w-full h-32 rounded-md overflow-hidden border">
            <Image
              src={value}
              alt="Selected image"
              fill
              className="object-cover"
            />
          </div>
        )}
      </TabsContent>
      
      <TabsContent value="gallery" className="space-y-4">
        <div className="grid grid-cols-2 gap-2">
          {popularImages.map((url, index) => (
            <Card 
              key={index} 
              className={`cursor-pointer hover:ring-2 hover:ring-primary transition-all ${value === url ? 'ring-2 ring-primary' : ''}`}
              onClick={() => selectPresetImage(url)}
            >
              <CardContent className="p-0">
                <div className="relative w-full h-24">
                  <Image
                    src={url}
                    alt={`Gallery image ${index + 1}`}
                    fill
                    className="object-cover rounded-md"
                  />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </TabsContent>
    </Tabs>
  );
}