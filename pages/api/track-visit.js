// pages/api/track-visit.js
import fs from 'fs';
import path from 'path';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }
  
  try {
    // Get visitor data from request
    const { page, referrer } = req.body;
    
    // Get IP and user agent from request headers
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    const userAgent = req.headers['user-agent'];
    
    // Create visit record
    const visitData = {
      timestamp: new Date().toISOString(),
      page,
      referrer,
      ip,
      userAgent,
    };
    
    // Path to analytics JSON file
    const dataFilePath = path.join(process.cwd(), 'data', 'analytics.json');
    
    // Read existing data or create new array
    let analyticsData = [];
    try {
      if (fs.existsSync(dataFilePath)) {
        const fileData = fs.readFileSync(dataFilePath, 'utf8');
        analyticsData = JSON.parse(fileData);
      }
    } catch (error) {
      console.error('Error reading analytics file:', error);
    }
    
    // Add new visit data
    analyticsData.push(visitData);
    
    // Make sure directory exists
    const dir = path.dirname(dataFilePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    
    // Write updated data back to file
    fs.writeFileSync(dataFilePath, JSON.stringify(analyticsData, null, 2));
    
    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Analytics error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}

// components/CustomAnalytics.js
import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function CustomAnalytics() {
  const router = useRouter();
  
  useEffect(() => {
    // Skip during development if desired
    if (process.env.NODE_ENV === 'development') return;
    
    // Skip if the page is not yet ready
    if (!router.isReady) return;
    
    // Function to track page view
    const trackPageView = async () => {
      try {
        await fetch('/api/track-visit', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            page: router.pathname,
            referrer: document.referrer,
          }),
        });
      } catch (error) {
        console.error('Failed to send analytics:', error);
      }
    };
    
    // Track when the component mounts (page loads)
    trackPageView();
    
    // Track on route changes
    const handleRouteChange = () => trackPageView();
    router.events.on('routeChangeComplete', handleRouteChange);
    
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.isReady, router.pathname, router]);
  
  return null; // This component doesn't render anything
}

// In your app/layout.js, add:
// import CustomAnalytics from '@/components/CustomAnalytics';
// 
// And inside your layout component, add:
// <CustomAnalytics />