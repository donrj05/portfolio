// app/api/analytics/route.js
import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

export async function POST(request) {
  try {
    // Get visitor data from request
    const data = await request.json();
    
    // Get IP address from headers
    const forwardedFor = request.headers.get('x-forwarded-for');
    const ip = forwardedFor ? forwardedFor.split(',')[0].trim() : 'unknown';
    
    // Add IP to data
    const visitData = {
      ...data,
      ip,
    };
    
    // Path to analytics JSON file
    const dataDir = path.join(process.cwd(), 'data');
    const dataFilePath = path.join(dataDir, 'analytics.json');
    
    // Make sure directory exists
    try {
      await fs.access(dataDir);
    } catch (error) {
      await fs.mkdir(dataDir, { recursive: true });
    }
    
    // Read existing data or create new array
    let analyticsData = [];
    try {
      const fileData = await fs.readFile(dataFilePath, 'utf8');
      analyticsData = JSON.parse(fileData);
    } catch (error) {
      // File doesn't exist or is invalid, start with empty array
    }
    
    // Add new visit data
    analyticsData.push(visitData);
    
    // Write updated data back to file
    await fs.writeFile(dataFilePath, JSON.stringify(analyticsData, null, 2));
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Analytics error:', error);
    return NextResponse.json(
      { message: 'Internal server error', error: error.message },
      { status: 500 }
    );
  }
}