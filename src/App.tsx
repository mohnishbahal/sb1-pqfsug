import React, { useState } from 'react';
import { Users, ShoppingCart, LineChart, Star, Bell, FileDown, Settings, Search } from 'lucide-react';
import { StatCard } from './components/dashboard/stat-card';
import { DateRangePicker } from './components/dashboard/DateRangePicker';
import { LiveIndicator } from './components/dashboard/LiveIndicator';
import { Button } from './components/ui/button';
import { RecommendationPanel } from './components/dashboard/RecommendationPanel';
import { PersonaSegmentFilter } from './components/dashboard/PersonaSegmentFilter';
import { PersonaManagement } from './components/personas/PersonaManagement';
import { JourneyManagement } from './components/journeys/JourneyManagement';
import { Layout } from './components/Layout';
import type { Persona, CustomerJourney } from './types';

function App() {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [dateRange, setDateRange] = useState('30d');
  const [selectedSegment, setSelectedSegment] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Sample data - In a real app, this would come from an API
  const samplePersonas: Persona[] = [
    {
      id: '1',
      name: 'Urban Professional',
      demographics: {
        ageRange: '25-34',
        income: '$75,000-$100,000',
        location: 'Metropolitan',
        occupation: 'Technology'
      },
      preferences: {
        brands: ['Premium Brand A', 'Luxury Brand B'],
        categories: ['Fashion', 'Technology'],
        priceRange: 'Premium',
        shoppingFrequency: 'Weekly'
      },
      behaviors: {
        channels: ['Mobile App', 'Website'],
        loyaltyStatus: 'Gold',
        purchaseDrivers: ['Quality', 'Convenience']
      },
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ];

  const sampleJourneys: CustomerJourney[] = [
    {
      id: '1',
      name: 'Premium Shopping Experience',
      description: 'High-value customer journey for luxury products',
      persona: 'Urban Professional',
      brand: 'Premium Fashion',
      steps: [
        {
          id: '1',
          title: 'Discovery',
          description: 'Initial brand interaction via social media',
          touchpoint: 'Instagram Ad',
          channel: 'Social Media',
          metrics: {
            satisfaction: 4.5,
            engagement: 0.8
          },
          notes: ['High click-through rate', 'Strong brand recall']
        }
      ],
      createdAt: new Date(),
      updatedAt: new Date(),
      collaborators: ['John Doe', 'Jane Smith']
    }
  ];

  const metrics = [
    {
      title: "Customer Satisfaction",
      value: "4.8",
      icon: <Star className="h-4 w-4 text-primary" />,
      trend: { 
        value: 12, 
        label: 'vs last month',
        data: generateTrendData(4.8, 0.2)
      },
      description: "Out of 5.0",
      goal: { value: 5.0, progress: 96 },
      benchmark: { value: 4.6, label: "Industry Avg" },
      insight: "Positive feedback on new loyalty program features",
      recommendation: "Consider expanding the loyalty program to mid-tier customers",
      tooltip: "Average satisfaction score across all customer interactions"
    },
    {
      title: "Avg Purchase Value",
      value: "$234.50",
      icon: <ShoppingCart className="h-4 w-4 text-primary" />,
      trend: { 
        value: 8.2, 
        label: 'vs last month',
        data: generateTrendData(234.5, 20)
      },
      description: "+12.3% from last month",
      goal: { value: 250, progress: 93.8 },
      benchmark: { value: 198.75, label: "Last Quarter" },
      insight: "Cross-selling strategy showing strong results",
      recommendation: "Implement personalized product recommendations",
      tooltip: "Average transaction value per customer"
    },
    {
      title: "Active Personas",
      value: selectedSegment === 'all' ? "12" : "5",
      icon: <Users className="h-4 w-4 text-primary" />,
      trend: { 
        value: 4.1, 
        label: 'vs last month',
        data: generateTrendData(12, 1)
      },
      description: getPersonaDescription(selectedSegment),
      goal: { value: 15, progress: 80 },
      benchmark: { value: 10, label: "Last Month" },
      insight: "New urban professional segment growing fast",
      recommendation: "Focus on retention for at-risk segments",
      tooltip: "Number of active customer personas in selected segment",
      onClick: () => setActiveSection('personas')
    },
    {
      title: "Journey Completion",
      value: "86%",
      icon: <LineChart className="h-4 w-4 text-primary" />,
      trend: { 
        value: -2.3, 
        label: 'vs last month',
        data: generateTrendData(86, 5)
      },
      description: "Mobile: 82%, Desktop: 90%",
      goal: { value: 95, progress: 90.5 },
      benchmark: { value: 88, label: "Best Performance" },
      insight: "Mobile checkout friction identified",
      recommendation: "Optimize mobile checkout process",
      tooltip: "Percentage of customers completing their journey",
      onClick: () => setActiveSection('journeys')
    }
  ];

  function generateTrendData(baseline: number, volatility: number) {
    return Array.from({ length: 30 }, (_, i) => ({
      value: baseline + Math.sin(i * 0.5) * volatility + Math.random() * volatility
    }));
  }

  function getPersonaDescription(segment: string) {
    const segments = {
      all: "New: 3, Loyal: 7, At-Risk: 2",
      new: "Last 30 days: 3",
      loyal: "Retention rate: 95%",
      'at-risk': "Churn probability: High"
    };
    return segments[segment as keyof typeof segments] || segments.all;
  }

  const renderContent = () => {
    switch (activeSection) {
      case 'personas':
        return (
          <PersonaManagement
            personas={samplePersonas}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
          />
        );
      case 'journeys':
        return (
          <JourneyManagement
            journeys={sampleJourneys}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
          />
        );
      default:
        return (
          <>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
              <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
              <div className="flex items-center gap-4">
                <DateRangePicker
                  selectedRange={dateRange}
                  onRangeChange={setDateRange}
                />
                <Button variant="outline" size="sm" className="gap-2">
                  <FileDown className="h-4 w-4" />
                  Export
                </Button>
              </div>
            </div>

            <section className="space-y-6 bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-8">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <h2 className="text-xl font-semibold text-gray-800">Key Metrics Overview</h2>
                  <PersonaSegmentFilter
                    selectedSegment={selectedSegment}
                    onSegmentChange={setSelectedSegment}
                  />
                </div>
                <LiveIndicator />
              </div>

              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {metrics.map((metric) => (
                  <StatCard
                    key={metric.title}
                    {...metric}
                  />
                ))}
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                {metrics.map((metric) => (
                  <RecommendationPanel
                    key={metric.title}
                    title={metric.title}
                    recommendation={metric.recommendation}
                    insight={metric.insight}
                  />
                ))}
              </div>
            </section>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <PersonaManagement
                personas={samplePersonas}
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
              />
              <JourneyManagement
                journeys={sampleJourneys}
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
              />
            </div>
          </>
        );
    }
  };

  return (
    <Layout activeSection={activeSection} onSectionChange={setActiveSection}>
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto p-8">
          {renderContent()}
        </div>
      </div>
    </Layout>
  );
}

export default App;