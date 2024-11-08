import React, { useState, useEffect } from 'react';
import { Search, Plus, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PersonaList } from './PersonaList';
import { CreatePersonaForm } from './CreatePersonaForm';
import { storage } from '@/lib/storage';
import { useToast } from '@/components/ui/use-toast';
import type { Persona } from '@/types';

interface PersonaManagementProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export function PersonaManagement({ searchQuery, onSearchChange }: PersonaManagementProps) {
  const [isCreating, setIsCreating] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [personas, setPersonas] = useState<Partial<Persona>[]>([]);
  const [selectedPersona, setSelectedPersona] = useState<Partial<Persona> | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    loadPersonas();
  }, []);

  const loadPersonas = () => {
    const savedPersonas = storage.getPersonas();
    setPersonas(savedPersonas);
  };

  const handleCreateNew = () => {
    setSelectedPersona(null);
    setIsCreating(true);
    setIsEditing(false);
  };

  const handleEdit = (persona: Partial<Persona>) => {
    setSelectedPersona(persona);
    setIsCreating(true);
    setIsEditing(true);
  };

  const handleSave = async (persona: Partial<Persona>) => {
    try {
      if (isEditing && selectedPersona?.id) {
        // Update existing persona
        const updatedPersonas = personas.map(p => 
          p.id === selectedPersona.id ? { ...persona, id: selectedPersona.id } : p
        );
        localStorage.setItem('cx_personas', JSON.stringify(updatedPersonas));
        setPersonas(updatedPersonas);
        toast({
          title: "Success",
          description: "Persona updated successfully",
        });
      } else {
        // Save new persona
        const newPersona = storage.savePersona(persona);
        setPersonas(prev => [...prev, newPersona]);
        toast({
          title: "Success",
          description: "New persona created successfully",
        });
      }
      
      setIsCreating(false);
      setIsEditing(false);
      setSelectedPersona(null);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save persona",
        variant: "destructive",
      });
    }
  };

  const handleCancel = () => {
    setIsCreating(false);
    setIsEditing(false);
    setSelectedPersona(null);
  };

  const filteredPersonas = personas.filter(persona => 
    persona.demographics?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    persona.demographics?.occupation?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (isCreating) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <Button variant="ghost" onClick={handleCancel} className="gap-2">
            ← Back to Personas
          </Button>
          <h2 className="text-xl font-semibold">
            {isEditing ? 'Edit Persona' : 'Create New Persona'}
          </h2>
        </div>
        <CreatePersonaForm 
          initialData={selectedPersona}
          onSave={handleSave}
          onCancel={handleCancel}
        />
      </div>
    );
  }

  return (
    <section className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold text-gray-800">Persona Management</h2>
          <p className="text-sm text-gray-500 mt-1">Manage and analyze customer personas</p>
        </div>
        <div className="flex items-center gap-4">
          {storage.hasDraft() && (
            <Button 
              variant="outline" 
              onClick={() => {
                setSelectedPersona(storage.getDraft());
                setIsCreating(true);
              }}
            >
              Continue Draft
            </Button>
          )}
          <Button onClick={handleCreateNew} className="gap-2">
            <Plus className="h-4 w-4" />
            Create Persona
          </Button>
        </div>
      </div>

      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search personas..."
            className="w-full pl-10 pr-4 py-2 border rounded-lg"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>
        <Button variant="outline" size="icon">
          <Filter className="h-4 w-4" />
        </Button>
      </div>

      <PersonaList 
        personas={filteredPersonas}
        onEdit={handleEdit}
        onCreateNew={handleCreateNew}
      />
    </section>
  );
}