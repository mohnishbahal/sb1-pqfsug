import React from 'react';
import { InsightCard } from './InsightCard';
import { RecentActivity } from './RecentActivity';
import { CategoryPerformance } from './CategoryPerformance';
import { CustomerSegmentation } from './CustomerSegmentation';

export const AnalyticsDashboard = () => {
  const insights = [
    {
      title: 'Customer Satisfaction',
      value: '4.8',
      change: 12,
      period: 'last month',
      trend: 'up' as const
    },
    {
      title: 'Avg. Purchase Value',
      value: '$258',
      change: 8.2,
      period: 'last month',
      trend: 'up' as const
    },
    {
      title: 'Active Personas',
      value: '24',
      change: 4.1,
      period: 'last month',
      trend: 'up' as const
    },
    {
      title: 'Journey Completion Rate',
      value: '76%',
      change: 2.3,
      period: 'last month',
      trend: 'down' as const
    }
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {insights.map((insight) => (
          <InsightCard key={insight.title} {...insight} />
        ))}
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <CategoryPerformance />
        <CustomerSegmentation />
      </div>

      <RecentActivity />
    </div>
  );
};