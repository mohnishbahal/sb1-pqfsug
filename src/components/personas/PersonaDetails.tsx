import React from 'react';
import { User, DollarSign, MapPin, ShoppingBag, Target, Zap, Heart } from 'lucide-react';
import type { Persona } from '../../types';

interface PersonaDetailsProps {
  persona: Persona;
}

export const PersonaDetails: React.FC<PersonaDetailsProps> = ({ persona }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-start justify-between border-b pb-6">
        <div className="flex items-center">
          <div className="h-16 w-16 rounded-full bg-indigo-100 flex items-center justify-center">
            <User className="h-8 w-8 text-indigo-600" />
          </div>
          <div className="ml-4">
            <h2 className="text-2xl font-bold text-gray-900">{persona.name}</h2>
            <p className="text-sm text-gray-500">{persona.demographics.occupation}</p>
          </div>
        </div>
        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800">
          {persona.behaviors.loyaltyStatus}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-3">Demographics</h3>
            <div className="space-y-3">
              <div className="flex items-center">
                <Target className="h-5 w-5 text-gray-400" />
                <span className="ml-2 text-sm text-gray-600">Age: {persona.demographics.ageRange}</span>
              </div>
              <div className="flex items-center">
                <DollarSign className="h-5 w-5 text-gray-400" />
                <span className="ml-2 text-sm text-gray-600">{persona.demographics.income}</span>
              </div>
              <div className="flex items-center">
                <MapPin className="h-5 w-5 text-gray-400" />
                <span className="ml-2 text-sm text-gray-600">{persona.demographics.location}</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-3">Shopping Behavior</h3>
            <div className="space-y-3">
              <div className="flex items-center">
                <ShoppingBag className="h-5 w-5 text-gray-400" />
                <span className="ml-2 text-sm text-gray-600">{persona.preferences.shoppingFrequency}</span>
              </div>
              <div className="flex items-center">
                <Zap className="h-5 w-5 text-gray-400" />
                <span className="ml-2 text-sm text-gray-600">Price Range: {persona.preferences.priceRange}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-3">Preferred Brands</h3>
            <div className="flex flex-wrap gap-2">
              {persona.preferences.brands.map((brand) => (
                <span
                  key={brand}
                  className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800"
                >
                  {brand}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-3">Purchase Drivers</h3>
            <div className="flex flex-wrap gap-2">
              {persona.behaviors.purchaseDrivers.map((driver) => (
                <span
                  key={driver}
                  className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800"
                >
                  <Heart className="h-4 w-4 mr-1" />
                  {driver}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-3">Preferred Channels</h3>
            <div className="flex flex-wrap gap-2">
              {persona.behaviors.channels.map((channel) => (
                <span
                  key={channel}
                  className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800"
                >
                  {channel}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};