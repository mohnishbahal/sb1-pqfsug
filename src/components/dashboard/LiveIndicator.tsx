import React from 'react';
import { Activity } from 'lucide-react';

export function LiveIndicator() {
  return (
    <div className="flex items-center text-sm text-muted-foreground">
      <Activity className="h-3 w-3 mr-2 animate-pulse text-green-500" />
      <span>Updated just now</span>
    </div>
  );
}