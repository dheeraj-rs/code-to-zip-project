"use client"

import { useState } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Check, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ColorPickerProps {
  color: string;
  onChange: (color: string) => void;
}

const presetColors = [
  "#000000", "#ffffff", "#f8f9fa", "#e9ecef", "#dee2e6", 
  "#ced4da", "#adb5bd", "#6c757d", "#495057", "#343a40", 
  "#212529", "#f44336", "#e91e63", "#9c27b0", "#673ab7", 
  "#3f51b5", "#2196f3", "#03a9f4", "#00bcd4", "#009688", 
  "#4caf50", "#8bc34a", "#cddc39", "#ffeb3b", "#ffc107", 
  "#ff9800", "#ff5722", "#795548", "#607d8b"
];

export function ColorPicker({ color, onChange }: ColorPickerProps) {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button 
          variant="outline" 
          className="w-full justify-start"
          onClick={() => setOpen(true)}
        >
          <div className="flex items-center gap-2">
            <div
              className="h-4 w-4 rounded-full border"
              style={{ backgroundColor: color }}
            />
            <span>{color}</span>
          </div>
          <ChevronDown className="ml-auto h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-64">
        <div className="grid grid-cols-5 gap-2">
          {presetColors.map((presetColor) => (
            <div
              key={presetColor}
              className={cn(
                "h-10 w-10 cursor-pointer rounded-full border-2 flex items-center justify-center",
                color === presetColor ? "border-primary" : "border-transparent"
              )}
              style={{ backgroundColor: presetColor }}
              onClick={() => {
                onChange(presetColor);
                setOpen(false);
              }}
            >
              {color === presetColor && (
                <Check className={cn("h-4 w-4", presetColor === "#ffffff" ? "text-black" : "text-white")} />
              )}
            </div>
          ))}
        </div>
        <div className="mt-4 flex items-center gap-2">
          <input
            type="color"
            value={color}
            onChange={(e) => onChange(e.target.value)}
            className="h-10 w-10 cursor-pointer"
          />
          <input
            type="text"
            value={color}
            onChange={(e) => onChange(e.target.value)}
            className="flex-1 rounded-md border px-3 py-2 text-sm"
          />
        </div>
      </PopoverContent>
    </Popover>
  );
}