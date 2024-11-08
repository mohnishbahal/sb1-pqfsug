import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

const data = [
  { name: 'Premium', value: 35, color: '#6366f1' },
  { name: 'Mid-tier', value: 45, color: '#22c55e' },
  { name: 'Budget', value: 20, color: '#eab308' }
];

export const CustomerSegmentation = () => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Customer Segmentation</h3>
      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={5}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={entry.color}
                  strokeWidth={1}
                />
              ))}
            </Pie>
            <Tooltip 
              contentStyle={{ 
                fontSize: '12px',
                padding: '8px',
                borderRadius: '4px',
                border: '1px solid #e2e8f0'
              }}
            />
            <Legend 
              verticalAlign="bottom" 
              height={36}
              iconSize={8}
              iconType="circle"
              formatter={(value) => (
                <span style={{ fontSize: '12px', color: '#64748b' }}>{value}</span>
              )}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};