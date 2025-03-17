// app/admin/analytics/page.tsx
import fs from 'fs/promises';
import path from 'path';

// Function to read analytics data
async function getAnalyticsData() {
  try {
    const dataFilePath = path.join(process.cwd(), 'data', 'analytics.json');
    const data = await fs.readFile(dataFilePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading analytics data:', error);
    return [];
  }
}

export default async function AnalyticsDashboard() {
  const analyticsData = await getAnalyticsData();
  
  // Count page views by URL
  const pageViews = {};
  analyticsData.forEach(visit => {
    const page = visit.page || 'unknown';
    pageViews[page] = (pageViews[page] || 0) + 1;
  });
  
  // Count visitors by IP
  const uniqueVisitors = new Set(analyticsData.map(visit => visit.ip)).size;
  
  // Get referrers
  const referrers = {};
  analyticsData.forEach(visit => {
    if (visit.referrer && visit.referrer !== 'direct') {
      const referrer = new URL(visit.referrer).hostname;
      referrers[referrer] = (referrers[referrer] || 0) + 1;
    }
  });
  
  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8">Analytics Dashboard</h1>
      
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
            <h3 className="text-lg font-medium mb-2">Total Page Views</h3>
            <p className="text-3xl font-bold">{analyticsData.length}</p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
            <h3 className="text-lg font-medium mb-2">Unique Visitors</h3>
            <p className="text-3xl font-bold">{uniqueVisitors}</p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
            <h3 className="text-lg font-medium mb-2">Pages per Visitor</h3>
            <p className="text-3xl font-bold">
              {uniqueVisitors ? (analyticsData.length / uniqueVisitors).toFixed(2) : 0}
            </p>
          </div>
        </div>
      </div>
      
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Popular Pages</h2>
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
          <table className="w-full">
            <thead>
              <tr className="border-b dark:border-gray-700">
                <th className="text-left py-2">Page</th>
                <th className="text-right py-2">Views</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(pageViews)
                .sort((a, b) => b[1] - a[1])
                .map(([page, count]) => (
                  <tr key={page} className="border-b dark:border-gray-700">
                    <td className="py-2">{page}</td>
                    <td className="text-right py-2">{count}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
      
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Referrers</h2>
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
          {Object.keys(referrers).length > 0 ? (
            <table className="w-full">
              <thead>
                <tr className="border-b dark:border-gray-700">
                  <th className="text-left py-2">Source</th>
                  <th className="text-right py-2">Visits</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(referrers)
                  .sort((a, b) => b[1] - a[1])
                  .map(([referrer, count]) => (
                    <tr key={referrer} className="border-b dark:border-gray-700">
                      <td className="py-2">{referrer}</td>
                      <td className="text-right py-2">{count}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          ) : (
            <p>No referrer data available.</p>
          )}
        </div>
      </div>
      
      <div>
        <h2 className="text-xl font-semibold mb-4">Recent Visits</h2>
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b dark:border-gray-700">
                <th className="text-left py-2">Time</th>
                <th className="text-left py-2">Page</th>
                <th className="text-left py-2">IP</th>
              </tr>
            </thead>
            <tbody>
              {analyticsData
                .slice(-10)
                .reverse()
                .map((visit, index) => (
                  <tr key={index} className="border-b dark:border-gray-700">
                    <td className="py-2">{new Date(visit.timestamp).toLocaleString()}</td>
                    <td className="py-2">{visit.page}</td>
                    <td className="py-2">{visit.ip}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}