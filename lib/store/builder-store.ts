"use client"

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { v4 as uuidv4 } from 'uuid';
import { ComponentInstance, DeviceSize, ProjectSettings } from '@/lib/types';
import { getComponentDefinition } from '@/lib/components/component-data';
import * as ComponentModules from '@/lib/components/component-modules';

interface BuilderState {
  components: ComponentInstance[];
  selectedComponentId: string | null;
  previewDevice: DeviceSize;
  projectSettings: ProjectSettings;
  
  // Actions
  addComponent: (type: string) => void;
  removeComponent: (id: string) => void;
  duplicateComponent: (id: string) => void;
  updateComponentProps: (id: string, props: Record<string, any>) => void;
  updateComponentOrder: (components: ComponentInstance[]) => void;
  getComponentById: (id: string) => ComponentInstance | undefined;
  setSelectedComponentId: (id: string | null) => void;
  setPreviewDevice: (device: DeviceSize) => void;
  updateProjectSettings: (settings: Partial<ProjectSettings>) => void;
  resetProject: () => void;
}

const defaultProjectSettings: ProjectSettings = {
  title: 'My Website',
  description: 'A website created with WebCraft',
  favicon: '/favicon.ico',
  siteUrl: '',
  author: '',
  primaryColor: '#000000',
  secondaryColor: '#ffffff',
  fontFamily: 'Inter, sans-serif',
};

// Validate if a component type exists in the modules
const isValidComponentType = (type: string): boolean => {
  return type in ComponentModules && typeof (ComponentModules as any)[type] === 'function';
};

// Filter out invalid components from the stored state
const filterInvalidComponents = (components: ComponentInstance[]): ComponentInstance[] => {
  return components.filter(component => isValidComponentType(component.type));
};

export const useBuilderStore = create<BuilderState>()(
  persist(
    (set, get) => ({
      components: [],
      selectedComponentId: null,
      previewDevice: 'desktop',
      projectSettings: defaultProjectSettings,
      
      addComponent: (type) => {
        // Validate component type before adding
        if (!isValidComponentType(type)) {
          console.error(`Invalid component type: ${type}`);
          return;
        }

        const newComponent: ComponentInstance = {
          id: uuidv4(),
          type,
          props: {}
        };
        
        set((state) => ({
          components: [...state.components, newComponent],
          selectedComponentId: newComponent.id
        }));
      },
      
      removeComponent: (id) => {
        set((state) => ({
          components: state.components.filter((component) => component.id !== id),
          selectedComponentId: state.selectedComponentId === id ? null : state.selectedComponentId
        }));
      },
      
      duplicateComponent: (id) => {
        const componentToDuplicate = get().getComponentById(id);
        
        if (componentToDuplicate && isValidComponentType(componentToDuplicate.type)) {
          const newComponent: ComponentInstance = {
            id: uuidv4(),
            type: componentToDuplicate.type,
            props: { ...componentToDuplicate.props }
          };
          
          set((state) => ({
            components: [...state.components, newComponent],
            selectedComponentId: newComponent.id
          }));
        }
      },
      
      updateComponentProps: (id, props) => {
        set((state) => ({
          components: state.components.map((component) => 
            component.id === id
              ? { ...component, props: { ...component.props, ...props } }
              : component
          )
        }));
      },
      
      updateComponentOrder: (components) => {
        // Filter out any invalid components before updating order
        const validComponents = filterInvalidComponents(components);
        set({ components: validComponents });
      },
      
      getComponentById: (id) => {
        return get().components.find((component) => component.id === id);
      },
      
      setSelectedComponentId: (id) => {
        set({ selectedComponentId: id });
      },
      
      setPreviewDevice: (device) => {
        set({ previewDevice: device });
      },
      
      updateProjectSettings: (settings) => {
        set((state) => ({
          projectSettings: { ...state.projectSettings, ...settings }
        }));
      },
      
      resetProject: () => {
        set({
          components: [],
          selectedComponentId: null,
          projectSettings: defaultProjectSettings
        });
      }
    }),
    {
      name: 'webcraft-builder',
      partialize: (state) => ({
        components: filterInvalidComponents(state.components),
        projectSettings: state.projectSettings
      }),
      onRehydrateStorage: () => {
        // When rehydrating, filter out any invalid components
        return (state) => {
          if (state) {
            state.components = filterInvalidComponents(state.components);
          }
        };
      }
    }
  )
);