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
import { ImageUpload } from '../ImageUpload';
import { Card } from '@/components/ui/card';

interface DemographicsFormProps {
  data: any;
  onUpdate: (data: any) => void;
}

export function DemographicsForm({ data, onUpdate }: DemographicsFormProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold mb-4">Demographics Information</h2>
        <p className="text-sm text-gray-500 mb-6">
          Enter the basic demographic information for this persona.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[2fr,1fr] gap-6">
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="name">Persona Name</Label>
              <Input
                id="name"
                placeholder="e.g., Urban Professional"
                value={data?.name || ''}
                onChange={(e) => onUpdate({ name: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="ageRange">Age Range</Label>
              <Select
                value={data?.ageRange || ''}
                onValueChange={(value) => onUpdate({ ageRange: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select age range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="18-24">18-24</SelectItem>
                  <SelectItem value="25-34">25-34</SelectItem>
                  <SelectItem value="35-44">35-44</SelectItem>
                  <SelectItem value="45-54">45-54</SelectItem>
                  <SelectItem value="55+">55+</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="income">Income Level</Label>
              <Select
                value={data?.income || ''}
                onValueChange={(value) => onUpdate({ income: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select income level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0-25k">$0 - $25,000</SelectItem>
                  <SelectItem value="25k-50k">$25,000 - $50,000</SelectItem>
                  <SelectItem value="50k-75k">$50,000 - $75,000</SelectItem>
                  <SelectItem value="75k-100k">$75,000 - $100,000</SelectItem>
                  <SelectItem value="100k+">$100,000+</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Select
                value={data?.location || ''}
                onValueChange={(value) => onUpdate({ location: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select location type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="urban">Urban</SelectItem>
                  <SelectItem value="suburban">Suburban</SelectItem>
                  <SelectItem value="rural">Rural</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="occupation">Occupation</Label>
              <Input
                id="occupation"
                placeholder="e.g., Technology Professional"
                value={data?.occupation || ''}
                onChange={(e) => onUpdate({ occupation: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="gender">Gender</Label>
              <Select
                value={data?.gender || ''}
                onValueChange={(value) => onUpdate({ gender: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                  <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="bio">Bio</Label>
            <textarea
              id="bio"
              className="w-full min-h-[100px] p-3 rounded-md border border-input bg-background text-sm"
              placeholder="Brief description of this persona..."
              value={data?.bio || ''}
              onChange={(e) => onUpdate({ bio: e.target.value })}
            />
          </div>
        </div>

        <Card className="p-4">
          <Label className="mb-2 block">Profile Image</Label>
          <ImageUpload
            value={data?.image}
            onChange={(image) => onUpdate({ image })}
          />
          <p className="text-xs text-gray-500 mt-2">
            Add a representative image for this persona. This helps team members visualize and relate to the persona better.
          </p>
        </Card>
      </div>
    </div>
  );
}