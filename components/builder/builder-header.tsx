"use client"

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { 
  Download, 
  Globe, 
  Moon, 
  Settings, 
  Sun, 
  Laptop, 
  Smartphone, 
  Tablet, 
  Upload
} from 'lucide-react';
import { useTheme } from 'next-themes';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useBuilderStore } from '@/lib/store/builder-store';
import { deployToNetlify } from '@/lib/utils/deploy';
import { exportProject } from '@/lib/utils/export';
import { toast } from '@/hooks/use-toast';

export function BuilderHeader() {
  const { setTheme } = useTheme();
  const [isDeploying, setIsDeploying] = useState(false);
  const { setPreviewDevice, previewDevice, components, projectSettings } = useBuilderStore();
  
  const handleDeploy = async () => {
    if (components.length === 0) {
      toast({
        title: "Nothing to publish",
        description: "Add some components to your website first",
        variant: "destructive"
      });
      return;
    }
    
    setIsDeploying(true);
    try {
      const result = await deployToNetlify(components, projectSettings);
      toast({
        title: "Successfully deployed!",
        description: (
          <div className="mt-2">
            <p>Your website is live at:</p>
            <a 
              href={result.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-500 underline mt-1 block"
            >
              {result.url}
            </a>
          </div>
        ),
      });
    } catch (error) {
      toast({
        title: "Deployment failed",
        description: error instanceof Error ? error.message : "An unknown error occurred",
        variant: "destructive"
      });
    } finally {
      setIsDeploying(false);
    }
  };

  const handleExport = async (format: 'next' | 'astro' | 'html') => {
    if (components.length === 0) {
      toast({
        title: "Nothing to export",
        description: "Add some components to your website first",
        variant: "destructive"
      });
      return;
    }
    
    try {
      await exportProject(format, components, projectSettings);
      toast({
        title: "Export successful",
        description: `Your ${format.toUpperCase()} project has been downloaded.`
      });
    } catch (error) {
      toast({
        title: "Export failed",
        description: error instanceof Error ? error.message : "An unknown error occurred",
        variant: "destructive"
      });
    }
  };

  return (
    <header className="border-b border-border">
      <div className="container mx-auto px-4 flex items-center justify-between h-16">
        <div className="flex items-center space-x-2">
          <Globe className="h-6 w-6 text-primary" />
          <h1 className="text-xl font-bold text-primary">WebCraft</h1>
        </div>
        
        <div className="flex items-center space-x-4">
          <TooltipProvider>
            <div className="flex items-center border border-border rounded-md p-1">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    variant={previewDevice === 'desktop' ? "secondary" : "ghost"} 
                    size="icon" 
                    onClick={() => setPreviewDevice('desktop')}
                  >
                    <Laptop className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Desktop view</TooltipContent>
              </Tooltip>
              
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    variant={previewDevice === 'tablet' ? "secondary" : "ghost"} 
                    size="icon" 
                    onClick={() => setPreviewDevice('tablet')}
                  >
                    <Tablet className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Tablet view</TooltipContent>
              </Tooltip>
              
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    variant={previewDevice === 'mobile' ? "secondary" : "ghost"} 
                    size="icon" 
                    onClick={() => setPreviewDevice('mobile')}
                  >
                    <Smartphone className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Mobile view</TooltipContent>
              </Tooltip>
            </div>
          
            <DropdownMenu>
              <Tooltip>
                <TooltipTrigger asChild>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="icon">
                      <Download className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                </TooltipTrigger>
                <TooltipContent>Export project</TooltipContent>
              </Tooltip>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => handleExport('next')}>
                  Export as Next.js
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleExport('astro')}>
                  Export as Astro
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleExport('html')}>
                  Export as HTML
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant="outline" 
                  size="icon"
                  onClick={() => handleDeploy()}
                  disabled={isDeploying}
                >
                  <Upload className={`h-4 w-4 ${isDeploying ? 'animate-pulse' : ''}`} />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Publish to Netlify</TooltipContent>
            </Tooltip>
            
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="icon">
                  <Settings className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Project settings</TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <span className="sr-only">Toggle theme</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setTheme("light")}>
                Light
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("dark")}>
                Dark
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("system")}>
                System
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}