export interface Persona {
  id: string;
  demographics: {
    name: string;
    ageRange: string;
    income: string;
    location: string;
    occupation: string;
    gender?: string;
    bio?: string;
    image?: string;
  };
  preferences: {
    brands: string[];
    categories: string[];
    priceRange: string;
    shoppingFrequency: string;
    channels: string[];
  };
  behaviors: {
    channels: string[];
    loyaltyStatus: string;
    purchaseDrivers: string[];
    engagementLevel: number;
    avgPurchaseValue: string;
    visitFrequency: string;
    preferredChannel: string;
    engagementTriggers: string[];
  };
  journeys: {
    selectedJourneys: Array<{
      id: string;
      name: string;
      completionRate: number;
      dropOffStage: string;
      timeSpent: string;
      notes: string;
    }>;
    completedJourneys: number;
    averageCompletionRate: number;
  };
  createdAt?: Date;
  updatedAt?: Date;
}