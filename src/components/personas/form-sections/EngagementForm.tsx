import React from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";

interface EngagementFormProps {
  data: any;
  onUpdate: (data: any) => void;
}

const ENGAGEMENT_TRIGGERS = [
  { id: 'loyalty-program', label: 'Loyalty Program' },
  { id: 'seasonal-sales', label: 'Seasonal Sales' },
  { id: 'new-arrivals', label: 'New Arrivals' },
  { id: 'personalized-recommendations', label: 'Personalized Recommendations' },
  { id: 'exclusive-offers', label: 'Exclusive Offers' },
  { id: 'flash-sales', label: 'Flash Sales' }
];

export function EngagementForm({ data, onUpdate }: EngagementFormProps) {
  const handleTriggerChange = (triggerId: string, checked: boolean) => {
    const currentTriggers = data?.engagementTriggers || [];
    const updatedTriggers = checked
      ? [...currentTriggers, triggerId]
      : currentTriggers.filter((id: string) => id !== triggerId);
    onUpdate({ engagementTriggers: updatedTriggers });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold mb-4">Engagement Profile</h2>
        <p className="text-sm text-gray-500 mb-6">
          Define how this persona typically engages with your brand.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="avgPurchaseValue">Average Purchase Value</Label>
          <Input
            id="avgPurchaseValue"
            type="number"
            placeholder="e.g., 250"
            value={data?.avgPurchaseValue || ''}
            onChange={(e) => onUpdate({ avgPurchaseValue: e.target.value })}
            prefix="$"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="visitFrequency">Visit Frequency (per month)</Label>
          <Input
            id="visitFrequency"
            type="number"
            placeholder="e.g., 4"
            value={data?.visitFrequency || ''}
            onChange={(e) => onUpdate({ visitFrequency: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="loyaltyStatus">Loyalty Status</Label>
          <Select
            value={data?.loyaltyStatus || ''}
            onValueChange={(value) => onUpdate({ loyaltyStatus: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select loyalty status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="bronze">Bronze</SelectItem>
              <SelectItem value="silver">Silver</SelectItem>
              <SelectItem value="gold">Gold</SelectItem>
              <SelectItem value="platinum">Platinum</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="preferredChannel">Preferred Communication Channel</Label>
          <Select
            value={data?.preferredChannel || ''}
            onValueChange={(value) => onUpdate({ preferredChannel: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select preferred channel" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="email">Email</SelectItem>
              <SelectItem value="sms">SMS</SelectItem>
              <SelectItem value="push">Push Notifications</SelectItem>
              <SelectItem value="social">Social Media</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-4">
        <Label>Brand Engagement Level</Label>
        <Slider
          defaultValue={[data?.engagementLevel || 50]}
          max={100}
          step={1}
          onValueChange={(value) => onUpdate({ engagementLevel: value[0] })}
        />
        <div className="flex justify-between text-sm text-gray-500">
          <span>Low</span>
          <span>Medium</span>
          <span>High</span>
        </div>
      </div>

      <div className="space-y-4">
        <Label>Engagement Triggers</Label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {ENGAGEMENT_TRIGGERS.map((trigger) => (
            <div key={trigger.id} className="flex items-center space-x-2">
              <Checkbox
                id={trigger.id}
                checked={data?.engagementTriggers?.includes(trigger.id)}
                onCheckedChange={(checked) => 
                  handleTriggerChange(trigger.id, checked as boolean)
                }
              />
              <Label htmlFor={trigger.id}>{trigger.label}</Label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}