import React from 'react';
import { User, DollarSign, MapPin, ShoppingBag, Edit, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import type { Persona } from '../types';

interface PersonaCardProps {
  persona: Partial<Persona>;
  onEdit: (persona: Partial<Persona>) => void;
  onDelete?: (persona: Partial<Persona>) => void;
}

export const PersonaCard: React.FC<PersonaCardProps> = ({ persona, onEdit, onDelete }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 p-6 border border-gray-200">
      <div className="flex items-start justify-between">
        <div className="flex items-center">
          <div className="h-12 w-12 rounded-full bg-indigo-100 flex items-center justify-center">
            {persona.demographics?.image ? (
              <img
                src={persona.demographics.image}
                alt={persona.demographics?.name}
                className="h-12 w-12 rounded-full object-cover"
              />
            ) : (
              <User className="h-6 w-6 text-indigo-600" />
            )}
          </div>
          <div className="ml-4">
            <h3 className="text-lg font-medium text-gray-900">
              {persona.demographics?.name || 'Unnamed Persona'}
            </h3>
            <p className="text-sm text-gray-500">
              {persona.demographics?.occupation || 'No occupation set'}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            className="gap-2"
            onClick={() => onEdit(persona)}
          >
            <Edit className="h-4 w-4" />
            Edit
          </Button>
          {onDelete && (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="ghost" size="sm" className="text-red-600 gap-2">
                  <Trash2 className="h-4 w-4" />
                  Delete
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Delete Persona</AlertDialogTitle>
                  <AlertDialogDescription>
                    Are you sure you want to delete this persona? This action cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() => onDelete(persona)}
                    className="bg-red-600 hover:bg-red-700"
                  >
                    Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          )}
        </div>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-4">
        <div className="flex items-center">
          <DollarSign className="h-5 w-5 text-gray-400" />
          <span className="ml-2 text-sm text-gray-600">
            {persona.demographics?.income || 'Income not set'}
          </span>
        </div>
        <div className="flex items-center">
          <MapPin className="h-5 w-5 text-gray-400" />
          <span className="ml-2 text-sm text-gray-600">
            {persona.demographics?.location || 'Location not set'}
          </span>
        </div>
        <div className="flex items-center">
          <ShoppingBag className="h-5 w-5 text-gray-400" />
          <span className="ml-2 text-sm text-gray-600">
            {persona.preferences?.shoppingFrequency || 'Shopping frequency not set'}
          </span>
        </div>
      </div>

      {persona.preferences?.categories && persona.preferences.categories.length > 0 && (
        <div className="mt-4">
          <div className="flex flex-wrap gap-2">
            {persona.preferences.categories.map((category) => (
              <span
                key={category}
                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800"
              >
                {category}
              </span>
            ))}
          </div>
        </div>
      )}

      <div className="mt-4 pt-4 border-t">
        <div className="flex items-center justify-between text-sm text-gray-500">
          <span>Created: {new Date(persona.createdAt!).toLocaleDateString()}</span>
          <span>Last updated: {new Date(persona.updatedAt!).toLocaleDateString()}</span>
        </div>
      </div>
    </div>
  );
};