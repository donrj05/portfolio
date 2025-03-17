// components/CustomAnalytics.jsx
'use client';

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

export default function CustomAnalytics() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  
  useEffect(() => {
    // Skip during development if needed
    // if (process.env.NODE_ENV === 'development') return;
    
    const handleAnalytics = async () => {
      try {
        // Get full URL including search params
        const url = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : '');
        
        await fetch('/api/analytics', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            page: url,
            referrer: document.referrer || 'direct',
            userAgent: navigator.userAgent,
            language: navigator.language,
            screenWidth: window.screen.width,
            screenHeight: window.screen.height,
            timestamp: new Date().toISOString(),
          }),
        });
      } catch (error) {
        console.error('Analytics error:', error);
      }
    };
    
    // Track on page load and when pathname or search params change
    handleAnalytics();
    
  }, [pathname, searchParams]);
  
  return null; // This component doesn't render anything
}