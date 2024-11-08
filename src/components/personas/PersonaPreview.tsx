import React from 'react';
import { User, DollarSign, ShoppingBag, Target } from 'lucide-react';
import type { Persona } from '@/types';

interface PersonaPreviewProps {
  data: Partial<Persona>;
  isPreview?: boolean;
}

export function PersonaPreview({ data, isPreview = false }: PersonaPreviewProps) {
  const previewClass = isPreview ? 'text-sm' : 'text-base';

  return (
    <div className="space-y-6">
      {/* Header with Avatar */}
      <div className="flex items-center gap-4">
        {data.demographics?.image ? (
          <img
            src={data.demographics.image}
            alt={data.demographics?.name || 'Persona'}
            className="h-16 w-16 rounded-full object-cover"
          />
        ) : (
          <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
            <User className="h-8 w-8 text-primary" />
          </div>
        )}
        <div>
          <h3 className="font-semibold text-lg">
            {data.demographics?.name || 'New Persona'}
          </h3>
          <p className="text-gray-500">
            {data.demographics?.occupation || 'Occupation not set'}
          </p>
        </div>
      </div>

      {/* Bio */}
      {data.demographics?.bio && (
        <p className="text-sm text-gray-600 italic">
          "{data.demographics.bio}"
        </p>
      )}

      {/* Key Details */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <Target className="h-5 w-5 text-gray-400" />
          <span className={`${previewClass} text-gray-600`}>
            {data.demographics?.ageRange || 'Age range not set'}
          </span>
        </div>
        
        <div className="flex items-center gap-3">
          <DollarSign className="h-5 w-5 text-gray-400" />
          <span className={`${previewClass} text-gray-600`}>
            {data.demographics?.income || 'Income not set'}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <ShoppingBag className="h-5 w-5 text-gray-400" />
          <span className={`${previewClass} text-gray-600`}>
            {data.preferences?.shoppingFrequency || 'Shopping frequency not set'}
          </span>
        </div>
      </div>

      {/* Categories */}
      {data.preferences?.categories?.length > 0 && (
        <div className="space-y-2">
          <h4 className={`${previewClass} font-medium text-gray-700`}>
            Preferred Categories
          </h4>
          <div className="flex flex-wrap gap-2">
            {data.preferences.categories.map((category) => (
              <span
                key={category}
                className="px-2 py-1 bg-primary/10 text-primary rounded-full text-xs"
              >
                {category}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Engagement Level */}
      {data.behaviors?.loyaltyStatus && (
        <div className="space-y-2">
          <h4 className={`${previewClass} font-medium text-gray-700`}>
            Engagement Level
          </h4>
          <div className="flex items-center gap-2">
            <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
              {data.behaviors.loyaltyStatus}
            </span>
          </div>
        </div>
      )}

      {/* Preview Note */}
      {isPreview && (
        <div className="text-xs text-gray-500 pt-4 border-t">
          <p>This preview updates as you fill out the form.</p>
        </div>
      )}
    </div>
  );
}