import React from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface PersonaSegmentFilterProps {
  selectedSegment: string;
  onSegmentChange: (segment: string) => void;
}

export function PersonaSegmentFilter({ selectedSegment, onSegmentChange }: PersonaSegmentFilterProps) {
  return (
    <Select value={selectedSegment} onValueChange={onSegmentChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Filter by segment" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">All Segments</SelectItem>
        <SelectItem value="new">New Customers</SelectItem>
        <SelectItem value="loyal">Loyal Customers</SelectItem>
        <SelectItem value="at-risk">At-Risk Customers</SelectItem>
      </SelectContent>
    </Select>
  );
}