import React from 'react';
import { ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CreatePersonaForm } from './CreatePersonaForm';
import { useToast } from '@/components/ui/use-toast';
import type { Persona } from '@/types';

interface CreatePersonaPageProps {
  onBack: () => void;
  onSave: (persona: Partial<Persona>) => void;
}

export function CreatePersonaPage({ onBack, onSave }: CreatePersonaPageProps) {
  const { toast } = useToast();

  const handleSave = async (persona: Partial<Persona>) => {
    try {
      onSave(persona);
      toast({
        title: "Success",
        description: "Persona created successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to create persona",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <Button
            variant="ghost"
            onClick={onBack}
            className="text-gray-600 hover:text-gray-900"
          >
            <ChevronLeft className="h-4 w-4 mr-2" />
            Back to Personas
          </Button>
        </div>

        <CreatePersonaForm onSave={handleSave} />
      </div>
    </div>
  );
}