import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { month: 'Jan', purchases: 4, visits: 12, engagement: 85 },
  { month: 'Feb', purchases: 3, visits: 10, engagement: 75 },
  { month: 'Mar', purchases: 5, visits: 15, engagement: 90 },
  { month: 'Apr', purchases: 6, visits: 18, engagement: 95 },
  { month: 'May', purchases: 4, visits: 14, engagement: 82 },
  { month: 'Jun', purchases: 5, visits: 16, engagement: 88 }
];

export function PersonaBehaviorChart() {
  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis yAxisId="left" orientation="left" stroke="#6366f1" />
          <YAxis yAxisId="right" orientation="right" stroke="#22c55e" />
          <Tooltip />
          <Bar yAxisId="left" dataKey="purchases" fill="#6366f1" name="Purchases" />
          <Bar yAxisId="left" dataKey="visits" fill="#22c55e" name="Visits" />
          <Bar yAxisId="right" dataKey="engagement" fill="#eab308" name="Engagement %" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}