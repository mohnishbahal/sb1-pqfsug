import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, ShoppingBag, Zap, Map } from 'lucide-react';

interface PersonaReviewProps {
  data: any;
}

export function PersonaReview({ data }: PersonaReviewProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold mb-4">Review Persona Details</h2>
        <p className="text-sm text-gray-500 mb-6">
          Review all the information before creating the persona.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Demographics
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="grid grid-cols-2 gap-2 text-sm">
              <span className="text-gray-500">Name:</span>
              <span>{data.demographics?.name}</span>
              <span className="text-gray-500">Age Range:</span>
              <span>{data.demographics?.ageRange}</span>
              <span className="text-gray-500">Income:</span>
              <span>{data.demographics?.income}</span>
              <span className="text-gray-500">Location:</span>
              <span>{data.demographics?.location}</span>
              <span className="text-gray-500">Occupation:</span>
              <span>{data.demographics?.occupation}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ShoppingBag className="h-5 w-5" />
              Shopping Behavior
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="grid grid-cols-2 gap-2 text-sm">
              <span className="text-gray-500">Frequency:</span>
              <span>{data.preferences?.shoppingFrequency}</span>
              <span className="text-gray-500">Price Range:</span>
              <span>{data.preferences?.priceRange}</span>
            </div>
            <div className="mt-4">
              <span className="text-gray-500 text-sm">Categories:</span>
              <div className="flex flex-wrap gap-2 mt-2">
                {data.preferences?.categories?.map((category: string) => (
                  <span
                    key={category}
                    className="px-2 py-1 bg-primary/10 text-primary rounded-full text-xs"
                  >
                    {category}
                  </span>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5" />
              Engagement
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="grid grid-cols-2 gap-2 text-sm">
              <span className="text-gray-500">Avg Purchase:</span>
              <span>${data.behaviors?.avgPurchaseValue}</span>
              <span className="text-gray-500">Visit Frequency:</span>
              <span>{data.behaviors?.visitFrequency} times/month</span>
              <span className="text-gray-500">Loyalty Status:</span>
              <span>{data.behaviors?.loyaltyStatus}</span>
              <span className="text-gray-500">Preferred Channel:</span>
              <span>{data.behaviors?.preferredChannel}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Map className="h-5 w-5" />
              Journey History
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {data.selectedJourneys?.length ? (
              data.selectedJourneys.map((journey: any) => (
                <div key={journey.id} className="border-b pb-2 last:border-0 last:pb-0">
                  <h4 className="font-medium text-sm">{journey.name}</h4>
                  <div className="grid grid-cols-2 gap-2 text-sm mt-2">
                    <span className="text-gray-500">Completion:</span>
                    <span>{journey.completionRate}%</span>
                    <span className="text-gray-500">Drop-off:</span>
                    <span>{journey.dropOffStage}</span>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-500">No journeys selected</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}