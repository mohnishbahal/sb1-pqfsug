import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface InsightCardProps {
  title: string;
  value: string;
  change: number;
  period: string;
  trend: 'up' | 'down';
}

export const InsightCard: React.FC<InsightCardProps> = ({ title, value, change, period, trend }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h3 className="text-sm font-medium text-gray-500">{title}</h3>
      <div className="mt-2 flex items-baseline">
        <p className="text-2xl font-semibold text-gray-900">{value}</p>
        <div className="ml-2 flex items-baseline text-sm">
          <span className={`${trend === 'up' ? 'text-green-600' : 'text-red-600'} font-semibold`}>
            {trend === 'up' ? '+' : '-'}{Math.abs(change)}%
          </span>
          <span className="ml-1 text-gray-500">vs {period}</span>
        </div>
      </div>
      <div className="mt-4">
        {trend === 'up' ? (
          <TrendingUp className="h-5 w-5 text-green-500" />
        ) : (
          <TrendingDown className="h-5 w-5 text-red-500" />
        )}
      </div>
    </div>
  );
};