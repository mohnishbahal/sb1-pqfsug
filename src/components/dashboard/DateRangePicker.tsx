import React from 'react';
import { Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

const ranges = [
  { label: 'Last 7 days', value: '7d' },
  { label: 'Last 30 days', value: '30d' },
  { label: 'Last 90 days', value: '90d' },
];

interface DateRangePickerProps {
  selectedRange: string;
  onRangeChange: (range: string) => void;
}

export function DateRangePicker({ selectedRange, onRangeChange }: DateRangePickerProps) {
  return (
    <Card className="inline-flex items-center space-x-2 p-1 shadow-sm">
      <Calendar className="h-4 w-4 ml-2 text-muted-foreground" />
      <div className="flex bg-secondary rounded-lg p-1">
        {ranges.map((range) => (
          <Button
            key={range.value}
            variant={selectedRange === range.value ? "default" : "ghost"}
            size="sm"
            className="text-xs"
            onClick={() => onRangeChange(range.value)}
          >
            {range.label}
          </Button>
        ))}
      </div>
    </Card>
  );
}