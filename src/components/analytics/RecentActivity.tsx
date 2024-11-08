import React from 'react';
import { Clock, ShoppingCart, User, Star } from 'lucide-react';

const activities = [
  {
    id: 1,
    type: 'purchase',
    icon: ShoppingCart,
    content: 'New purchase from Premium Fashion persona',
    timestamp: '5 minutes ago',
    value: '$245.00',
    category: 'Fashion'
  },
  {
    id: 2,
    type: 'engagement',
    icon: Star,
    content: 'High engagement rate in mobile app',
    timestamp: '15 minutes ago',
    value: '4.8/5',
    category: 'Digital'
  },
  {
    id: 3,
    type: 'persona',
    icon: User,
    content: 'New Urban Professional persona created',
    timestamp: '1 hour ago',
    category: 'Lifestyle'
  }
];

export const RecentActivity = () => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Activity</h3>
      <div className="space-y-4">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-start space-x-3">
            <div className="flex-shrink-0">
              <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center">
                <activity.icon className="h-5 w-5 text-indigo-600" />
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900">{activity.content}</p>
              <div className="mt-1 flex items-center space-x-2">
                <Clock className="h-4 w-4 text-gray-400" />
                <span className="text-xs text-gray-500">{activity.timestamp}</span>
                {activity.value && (
                  <span className="text-xs font-medium text-indigo-600">{activity.value}</span>
                )}
              </div>
            </div>
            <div className="flex-shrink-0">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                {activity.category}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};