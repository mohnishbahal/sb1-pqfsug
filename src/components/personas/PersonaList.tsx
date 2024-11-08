import React from 'react';
import { PersonaCard } from '../PersonaCard';
import { Plus } from 'lucide-react';
import type { Persona } from '../../types';

interface PersonaListProps {
  personas: Partial<Persona>[];
  onEdit: (persona: Partial<Persona>) => void;
  onCreateNew: () => void;
}

export const PersonaList: React.FC<PersonaListProps> = ({
  personas,
  onEdit,
  onCreateNew,
}) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {personas.map((persona) => (
          <PersonaCard
            key={persona.id}
            persona={persona}
            onEdit={onEdit}
          />
        ))}
        <button
          onClick={onCreateNew}
          className="h-full min-h-[200px] rounded-lg border-2 border-dashed border-gray-300 bg-white p-6 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          <div className="flex flex-col items-center justify-center">
            <Plus className="h-8 w-8 text-gray-400" />
            <span className="mt-2 block text-sm font-medium text-gray-900">
              Create new persona
            </span>
          </div>
        </button>
      </div>

      {personas.length === 0 && (
        <div className="text-center py-12">
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No personas created yet
          </h3>
          <p className="text-sm text-gray-500 mb-4">
            Get started by creating your first customer persona
          </p>
        </div>
      )}
    </div>
  );
};