import React from 'react';
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface JourneyHistoryFormProps {
  data: any;
  onUpdate: (data: any) => void;
}

const SAMPLE_JOURNEYS = [
  { id: 'onboarding', name: 'Customer Onboarding' },
  { id: 'seasonal-campaign', name: 'Summer Collection Launch' },
  { id: 'loyalty-program', name: 'Loyalty Program Enrollment' },
  { id: 'premium-upgrade', name: 'Premium Membership Upgrade' }
];

export function JourneyHistoryForm({ data, onUpdate }: JourneyHistoryFormProps) {
  const handleJourneyChange = (journeyId: string) => {
    const selectedJourney = SAMPLE_JOURNEYS.find(j => j.id === journeyId);
    if (selectedJourney) {
      onUpdate({
        selectedJourneys: [...(data?.selectedJourneys || []), {
          id: selectedJourney.id,
          name: selectedJourney.name,
          completionRate: 0,
          dropOffStage: '',
          timeSpent: '',
          notes: ''
        }]
      });
    }
  };

  const updateJourneyDetail = (journeyId: string, field: string, value: string | number) => {
    const updatedJourneys = (data?.selectedJourneys || []).map((journey: any) => {
      if (journey.id === journeyId) {
        return { ...journey, [field]: value };
      }
      return journey;
    });
    onUpdate({ selectedJourneys: updatedJourneys });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold mb-4">Journey History</h2>
        <p className="text-sm text-gray-500 mb-6">
          Select the customer journeys this persona has participated in and add relevant details.
        </p>
      </div>

      <div className="space-y-2">
        <Label>Add Journey</Label>
        <Select onValueChange={handleJourneyChange}>
          <SelectTrigger>
            <SelectValue placeholder="Select a journey to add" />
          </SelectTrigger>
          <SelectContent>
            {SAMPLE_JOURNEYS.map((journey) => (
              <SelectItem key={journey.id} value={journey.id}>
                {journey.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-6">
        {(data?.selectedJourneys || []).map((journey: any) => (
          <div key={journey.id} className="border rounded-lg p-4 space-y-4">
            <h3 className="font-medium">{journey.name}</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Completion Rate (%)</Label>
                <Input
                  type="number"
                  min="0"
                  max="100"
                  value={journey.completionRate}
                  onChange={(e) => 
                    updateJourneyDetail(journey.id, 'completionRate', e.target.value)
                  }
                />
              </div>

              <div className="space-y-2">
                <Label>Drop-off Stage</Label>
                <Select
                  value={journey.dropOffStage}
                  onValueChange={(value) => 
                    updateJourneyDetail(journey.id, 'dropOffStage', value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select drop-off stage" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="awareness">Awareness</SelectItem>
                    <SelectItem value="consideration">Consideration</SelectItem>
                    <SelectItem value="decision">Decision</SelectItem>
                    <SelectItem value="purchase">Purchase</SelectItem>
                    <SelectItem value="post-purchase">Post-Purchase</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Average Time Spent</Label>
                <Input
                  placeholder="e.g., 2 weeks"
                  value={journey.timeSpent}
                  onChange={(e) => 
                    updateJourneyDetail(journey.id, 'timeSpent', e.target.value)
                  }
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label>Notes</Label>
                <Textarea
                  placeholder="Add any observations or notes about this journey"
                  value={journey.notes}
                  onChange={(e) => 
                    updateJourneyDetail(journey.id, 'notes', e.target.value)
                  }
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}