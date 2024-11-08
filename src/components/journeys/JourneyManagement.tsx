import React from 'react';
import { Search, Plus, BarChart2, Edit, Filter, Users, Clock, Target, Copy, Archive, Bell, Zap, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import type { CustomerJourney } from '@/types';

interface JourneyManagementProps {
  journeys: CustomerJourney[];
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export function JourneyManagement({ journeys, searchQuery, onSearchChange }: JourneyManagementProps) {
  // Analytics summary calculations
  const totalJourneys = journeys.length;
  const avgCompletionRate = 78; // This would come from actual data
  const activeJourneys = journeys.length;

  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-gray-800">Journey Management</h2>
          <p className="text-sm text-gray-500 mt-1">Design and optimize customer journeys</p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Create Journey
        </Button>
      </div>

      {/* Analytics Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-primary">{totalJourneys}</p>
              <p className="text-sm text-gray-500">Total Journeys</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-primary">{activeJourneys}</p>
              <p className="text-sm text-gray-500">Active Journeys</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-primary">{avgCompletionRate}%</p>
              <p className="text-sm text-gray-500">Avg. Completion Rate</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search journeys..."
            className="w-full pl-10 pr-4 py-2 border rounded-lg"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>
        <Select defaultValue="all">
          <SelectTrigger className="w-[180px]">
            <Filter className="h-4 w-4 mr-2" />
            <SelectValue placeholder="Filter by type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Journeys</SelectItem>
            <SelectItem value="onboarding">Onboarding</SelectItem>
            <SelectItem value="purchase">Purchase</SelectItem>
            <SelectItem value="retention">Retention</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-6">
        {journeys.map((journey) => (
          <Card key={journey.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
              <div>
                <h3 className="font-semibold text-lg flex items-center gap-2">
                  {journey.name}
                  <span className="px-2 py-0.5 bg-primary/10 text-primary rounded-full text-xs font-medium">
                    {journey.brand}
                  </span>
                </h3>
                <p className="text-sm text-gray-500">{journey.description}</p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="gap-2">
                  <Edit className="h-4 w-4" />
                  Edit
                </Button>
                <Button variant="outline" size="sm" className="gap-2">
                  <Copy className="h-4 w-4" />
                  Duplicate
                </Button>
                <Button variant="outline" size="sm" className="gap-2">
                  <Archive className="h-4 w-4" />
                  Archive
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Target Persona</p>
                    <p className="text-sm font-medium">{journey.persona}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Completion Rate</p>
                    <p className="text-sm font-medium">78%</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Avg Duration</p>
                    <p className="text-sm font-medium">2.5 days</p>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-2">Journey Progress</p>
                  <div className="w-full h-2 bg-gray-100 rounded-full">
                    <div className="h-full bg-primary rounded-full" style={{ width: '78%' }} />
                  </div>
                </div>
              </div>
              
              {/* Stage Breakdown */}
              <div className="mt-6">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-sm font-medium text-gray-700">Stage Breakdown</h4>
                  <Button variant="ghost" size="sm" className="gap-2">
                    <ChevronDown className="h-4 w-4" />
                    View Details
                  </Button>
                </div>
                <div className="space-y-3">
                  {journey.steps.map((step, index) => (
                    <div key={step.id} className="flex items-center gap-4">
                      <div className="w-24 text-sm text-gray-600">{step.title}</div>
                      <div className="flex-1">
                        <div className="w-full h-2 bg-gray-100 rounded-full">
                          <div
                            className="h-full bg-primary rounded-full"
                            style={{ width: `${90 - index * 10}%` }}
                          />
                        </div>
                      </div>
                      <div className="w-16 text-sm text-gray-600 text-right">
                        {90 - index * 10}%
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between">
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm" className="gap-2">
                    <Bell className="h-4 w-4" />
                    Set Alert
                  </Button>
                  <Button variant="ghost" size="sm" className="gap-2 text-primary">
                    <Zap className="h-4 w-4" />
                    Optimize Journey
                  </Button>
                </div>
                <Button variant="ghost" size="sm" className="gap-2">
                  <BarChart2 className="h-4 w-4" />
                  View Analytics
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}