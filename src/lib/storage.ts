import type { Persona } from '@/types';

const STORAGE_KEYS = {
  PERSONAS: 'cx_personas',
  DRAFT: 'cx_persona_draft',
  LAST_SAVED: 'cx_persona_last_saved'
} as const;

export const storage = {
  savePersona: (persona: Partial<Persona>) => {
    const personas = storage.getPersonas();
    const newPersona = {
      ...persona,
      id: crypto.randomUUID(),
      createdAt: new Date(),
      updatedAt: new Date()
    };
    personas.push(newPersona);
    localStorage.setItem(STORAGE_KEYS.PERSONAS, JSON.stringify(personas));
    // Clear draft after successful save
    storage.clearDraft();
    return newPersona;
  },

  getPersonas: (): Partial<Persona>[] => {
    const data = localStorage.getItem(STORAGE_KEYS.PERSONAS);
    return data ? JSON.parse(data) : [];
  },

  saveDraft: (draft: Partial<Persona>) => {
    localStorage.setItem(STORAGE_KEYS.DRAFT, JSON.stringify({
      ...draft,
      updatedAt: new Date()
    }));
    localStorage.setItem(STORAGE_KEYS.LAST_SAVED, new Date().toISOString());
  },

  getDraft: (): Partial<Persona> | null => {
    const data = localStorage.getItem(STORAGE_KEYS.DRAFT);
    return data ? JSON.parse(data) : null;
  },

  getLastSaved: (): Date | null => {
    const timestamp = localStorage.getItem(STORAGE_KEYS.LAST_SAVED);
    return timestamp ? new Date(timestamp) : null;
  },

  clearDraft: () => {
    localStorage.removeItem(STORAGE_KEYS.DRAFT);
    localStorage.removeItem(STORAGE_KEYS.LAST_SAVED);
  },

  hasDraft: (): boolean => {
    return !!localStorage.getItem(STORAGE_KEYS.DRAFT);
  }
};