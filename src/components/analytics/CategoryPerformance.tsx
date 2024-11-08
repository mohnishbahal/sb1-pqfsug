import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { category: 'Fashion', revenue: 4800, engagement: 85 },
  { category: 'Home', revenue: 3200, engagement: 72 },
  { category: 'Lifestyle', revenue: 2900, engagement: 68 },
  { category: 'Beauty', revenue: 2100, engagement: 90 },
  { category: 'Electronics', revenue: 1800, engagement: 65 }
];

export const CategoryPerformance = () => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Category Performance</h3>
      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart 
            data={data} 
            margin={{ top: 10, right: 30, left: 0, bottom: 5 }}
            maxBarSize={50}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="category" 
              tick={{ fontSize: 12 }}
              interval={0}
              height={50}
            />
            <YAxis 
              yAxisId="left" 
              orientation="left" 
              stroke="#6366f1"
              tick={{ fontSize: 12 }}
              width={50}
            />
            <YAxis 
              yAxisId="right" 
              orientation="right" 
              stroke="#22c55e"
              tick={{ fontSize: 12 }}
              width={50}
            />
            <Tooltip 
              contentStyle={{ fontSize: '12px' }}
              itemStyle={{ padding: '2px 0' }}
            />
            <Bar yAxisId="left" dataKey="revenue" fill="#6366f1" name="Revenue ($)" />
            <Bar yAxisId="right" dataKey="engagement" fill="#22c55e" name="Engagement (%)" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};