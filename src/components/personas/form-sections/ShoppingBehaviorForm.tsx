import React from 'react';
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

interface ShoppingBehaviorFormProps {
  data: any;
  onUpdate: (data: any) => void;
}

const CATEGORIES = [
  { id: 'fashion', label: 'Fashion' },
  { id: 'electronics', label: 'Electronics' },
  { id: 'home', label: 'Home' },
  { id: 'beauty', label: 'Beauty' },
  { id: 'sports', label: 'Sports' },
  { id: 'books', label: 'Books' }
];

const CHANNELS = [
  { id: 'mobile-app', label: 'Mobile App' },
  { id: 'website', label: 'Website' },
  { id: 'in-store', label: 'In-Store' },
  { id: 'social-media', label: 'Social Media' },
  { id: 'marketplace', label: 'Marketplace' }
];

export function ShoppingBehaviorForm({ data, onUpdate }: ShoppingBehaviorFormProps) {
  const handleCategoryChange = (categoryId: string, checked: boolean) => {
    const currentCategories = data?.categories || [];
    const updatedCategories = checked
      ? [...currentCategories, categoryId]
      : currentCategories.filter((id: string) => id !== categoryId);
    onUpdate({ categories: updatedCategories });
  };

  const handleChannelChange = (channelId: string, checked: boolean) => {
    const currentChannels = data?.channels || [];
    const updatedChannels = checked
      ? [...currentChannels, channelId]
      : currentChannels.filter((id: string) => id !== channelId);
    onUpdate({ channels: updatedChannels });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold mb-4">Shopping Behavior</h2>
        <p className="text-sm text-gray-500 mb-6">
          Define the shopping preferences and behavior patterns for this persona.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="frequency">Shopping Frequency</Label>
          <Select
            value={data?.shoppingFrequency || ''}
            onValueChange={(value) => onUpdate({ shoppingFrequency: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select shopping frequency" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="daily">Daily</SelectItem>
              <SelectItem value="weekly">Weekly</SelectItem>
              <SelectItem value="monthly">Monthly</SelectItem>
              <SelectItem value="quarterly">Quarterly</SelectItem>
              <SelectItem value="yearly">Yearly</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="priceRange">Price Sensitivity</Label>
          <Select
            value={data?.priceRange || ''}
            onValueChange={(value) => onUpdate({ priceRange: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select price sensitivity" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="budget">Budget-conscious</SelectItem>
              <SelectItem value="value">Value-oriented</SelectItem>
              <SelectItem value="premium">Premium</SelectItem>
              <SelectItem value="luxury">Luxury</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-4">
        <Label>Preferred Categories</Label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {CATEGORIES.map((category) => (
            <div key={category.id} className="flex items-center space-x-2">
              <Checkbox
                id={category.id}
                checked={data?.categories?.includes(category.id)}
                onCheckedChange={(checked) => 
                  handleCategoryChange(category.id, checked as boolean)
                }
              />
              <Label htmlFor={category.id}>{category.label}</Label>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <Label>Shopping Channels</Label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {CHANNELS.map((channel) => (
            <div key={channel.id} className="flex items-center space-x-2">
              <Checkbox
                id={channel.id}
                checked={data?.channels?.includes(channel.id)}
                onCheckedChange={(checked) => 
                  handleChannelChange(channel.id, checked as boolean)
                }
              />
              <Label htmlFor={channel.id}>{channel.label}</Label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}