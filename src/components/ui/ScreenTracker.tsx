'use client';

import { useAppStore } from '@/context/AppStore';
import { useEffect } from 'react';

export default function ScreenTracker() {
  const setScreenWidth = useAppStore((state) => state.setScreenWidth);

  useEffect(() => {
    function handleResize() {
      setScreenWidth(window.innerWidth);
    }

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [setScreenWidth]);

  return null;
}
