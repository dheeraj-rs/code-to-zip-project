"use client"

import { useEffect } from 'react';
import { useBuilderStore } from '@/lib/store/builder-store';

export function StoreReset() {
  const resetProject = useBuilderStore((state) => state.resetProject);

  useEffect(() => {
    // Clear the store on mount
    resetProject();
  }, [resetProject]);

  return null;
} 