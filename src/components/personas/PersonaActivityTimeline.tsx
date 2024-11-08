import React from 'react';
import { ShoppingCart, Star, MessageSquare, Clock } from 'lucide-react';

interface PersonaActivityTimelineProps {
  personaId: string;
}

export function PersonaActivityTimeline({ personaId }: PersonaActivityTimelineProps) {
  // Sample activity data - In a real app, this would be fetched based on personaId
  const activities = [
    {
      id: '1',
      type: 'purchase',
      icon: ShoppingCart,
      content: 'Purchased Premium Collection Items',
      details: 'Order #12345 - $234.50',
      timestamp: '2 hours ago',
      color: 'text-green-500'
    },
    {
      id: '2',
      type: 'review',
      icon: Star,
      content: 'Left a Product Review',
      details: '5 stars for Luxury Handbag',
      timestamp: '1 day ago',
      color: 'text-yellow-500'
    },
    {
      id: '3',
      type: 'feedback',
      icon: MessageSquare,
      content: 'Provided Feedback',
      details: 'On Summer Collection Launch campaign',
      timestamp: '3 days ago',
      color: 'text-blue-500'
    }
  ];

  return (
    <div className="relative space-y-6">
      {activities.map((activity, index) => (
        <div key={activity.id} className="flex gap-4">
          {/* Timeline line */}
          {index !== activities.length - 1 && (
            <div className="absolute left-6 top-10 bottom-0 w-px bg-gray-200" />
          )}
          
          {/* Activity icon */}
          <div className={`relative z-10 flex-shrink-0 w-12 h-12 rounded-full bg-white border-2 border-${activity.color} flex items-center justify-center`}>
            <activity.icon className={`w-5 h-5 ${activity.color}`} />
          </div>

          {/* Activity content */}
          <div className="flex-1 pt-1.5">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium text-gray-900">{activity.content}</h3>
              <div className="flex items-center text-sm text-gray-500">
                <Clock className="w-4 h-4 mr-1" />
                {activity.timestamp}
              </div>
            </div>
            <p className="mt-1 text-sm text-gray-500">{activity.details}</p>
          </div>
        </div>
      ))}
    </div>
  );
}