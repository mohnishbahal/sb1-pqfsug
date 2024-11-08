import React from 'react';
import { ArrowRight, Flag, Target } from 'lucide-react';
import type { CustomerJourney, JourneyStep } from '../types';

interface JourneyMapProps {
  journey: CustomerJourney;
  onStepClick: (step: JourneyStep) => void;
}

export const JourneyMap: React.FC<JourneyMapProps> = ({ journey, onStepClick }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-medium text-gray-900">{journey.name}</h3>
          <p className="text-sm text-gray-500">{journey.description}</p>
        </div>
        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800">
          {journey.brand}
        </span>
      </div>

      <div className="relative">
        <div className="absolute top-0 left-6 h-full w-px bg-gray-200" />
        
        <div className="space-y-8">
          {journey.steps.map((step, index) => (
            <div
              key={step.id}
              className="relative flex items-start cursor-pointer group"
              onClick={() => onStepClick(step)}
            >
              <div className="h-12 w-12 rounded-full bg-white border-2 border-indigo-500 flex items-center justify-center z-10">
                {index === 0 ? (
                  <Flag className="h-5 w-5 text-indigo-500" />
                ) : index === journey.steps.length - 1 ? (
                  <Target className="h-5 w-5 text-indigo-500" />
                ) : (
                  <ArrowRight className="h-5 w-5 text-indigo-500" />
                )}
              </div>

              <div className="ml-4 flex-1">
                <div className="bg-gray-50 p-4 rounded-lg group-hover:bg-gray-100 transition-colors duration-200">
                  <h4 className="text-base font-medium text-gray-900">{step.title}</h4>
                  <p className="mt-1 text-sm text-gray-500">{step.description}</p>
                  
                  <div className="mt-3 flex items-center space-x-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {step.touchpoint}
                    </span>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      {step.channel}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};