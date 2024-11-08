import React from 'react';
import { ArrowRight, Target } from 'lucide-react';

interface PersonaJourneyListProps {
  personaId: string;
}

export function PersonaJourneyList({ personaId }: PersonaJourneyListProps) {
  // Sample journey data - In a real app, this would be fetched based on personaId
  const journeys = [
    {
      id: '1',
      name: 'Premium Shopping Experience',
      status: 'Completed',
      completionRate: 100,
      lastActive: '2 days ago',
      stages: ['Discovery', 'Consideration', 'Purchase', 'Post-Purchase']
    },
    {
      id: '2',
      name: 'Summer Collection Launch',
      status: 'In Progress',
      completionRate: 65,
      lastActive: '5 hours ago',
      stages: ['Awareness', 'Interest', 'Evaluation', 'Purchase']
    }
  ];

  return (
    <div className="space-y-6">
      {journeys.map((journey) => (
        <div key={journey.id} className="border rounded-lg p-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-medium text-gray-900">{journey.name}</h3>
              <p className="text-sm text-gray-500">Last active {journey.lastActive}</p>
            </div>
            <span 
              className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
                journey.status === 'Completed' 
                  ? 'bg-green-100 text-green-800'
                  : 'bg-blue-100 text-blue-800'
              }`}
            >
              {journey.status}
            </span>
          </div>

          <div className="relative">
            <div className="overflow-hidden">
              <div className="relative">
                {/* Progress bar */}
                <div className="h-2 bg-gray-200 rounded-full">
                  <div 
                    className="h-full bg-primary rounded-full transition-all duration-500"
                    style={{ width: `${journey.completionRate}%` }}
                  />
                </div>

                {/* Journey stages */}
                <div className="mt-4 flex justify-between">
                  {journey.stages.map((stage, index) => (
                    <div 
                      key={stage}
                      className={`flex flex-col items-center ${
                        index === journey.stages.length - 1 ? '' : 'flex-1'
                      }`}
                    >
                      <div className={`
                        w-4 h-4 rounded-full border-2 
                        ${index <= (journey.completionRate / 100) * (journey.stages.length - 1)
                          ? 'border-primary bg-primary'
                          : 'border-gray-300 bg-white'
                        }
                      `} />
                      <span className="text-xs text-gray-600 mt-1">{stage}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}