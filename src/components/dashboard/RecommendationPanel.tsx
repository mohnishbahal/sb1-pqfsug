import React from 'react';
import { Share2, ExternalLink, Lightbulb } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';

interface RecommendationPanelProps {
  title: string;
  recommendation: string;
  insight: string;
}

export function RecommendationPanel({ title, recommendation, insight }: RecommendationPanelProps) {
  return (
    <Card>
      <CardHeader>
        <h3 className="text-sm font-medium text-gray-500 flex items-center gap-2">
          <Lightbulb className="h-4 w-4 text-primary" />
          {title} Insights
        </h3>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-700">{recommendation}</p>
        <p className="text-xs text-gray-500 mt-2">{insight}</p>
      </CardContent>
      <CardFooter className="justify-end gap-2">
        <Button variant="ghost" size="sm" className="gap-2">
          <Share2 className="h-4 w-4" />
          Share
        </Button>
        <Button variant="ghost" size="sm" className="gap-2">
          <ExternalLink className="h-4 w-4" />
          Details
        </Button>
      </CardFooter>
    </Card>
  );
}