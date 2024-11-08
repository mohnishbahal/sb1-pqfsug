import { useState, useCallback, useEffect } from 'react';
import { storage } from '@/lib/storage';
import type { Persona } from '@/types';

type ValidationErrors = Record<string, string[]>;

const REQUIRED_FIELDS = {
  demographics: ['name', 'ageRange', 'location'],
  preferences: ['categories', 'shoppingFrequency'],
  behaviors: ['channels', 'loyaltyStatus']
} as const;

const INITIAL_STATE = {
  demographics: {},
  preferences: {
    brands: [],
    categories: [],
    channels: []
  },
  behaviors: {
    channels: [],
    purchaseDrivers: [],
    engagementTriggers: []
  },
  journeys: {
    selectedJourneys: []
  }
};

export function usePersonaForm(initialData?: Partial<Persona>) {
  const [formData, setFormData] = useState<Partial<Persona>>(() => {
    if (initialData) return initialData;
    const draft = storage.getDraft();
    return draft || INITIAL_STATE;
  });

  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isDirty, setIsDirty] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(storage.getLastSaved());

  // Auto-save draft when form data changes
  useEffect(() => {
    if (isDirty) {
      const timeoutId = setTimeout(() => {
        storage.saveDraft(formData);
        setLastSaved(new Date());
        setIsDirty(false);
      }, 1000);

      return () => clearTimeout(timeoutId);
    }
  }, [formData, isDirty]);

  const updateSection = useCallback((section: keyof Persona, data: any) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        ...data
      }
    }));
    setIsDirty(true);
    validateSection(section, data);
  }, []);

  const validateSection = useCallback((section: keyof typeof REQUIRED_FIELDS, data: any) => {
    const sectionErrors: string[] = [];
    
    REQUIRED_FIELDS[section]?.forEach(field => {
      const value = data[field];
      if (!value || (Array.isArray(value) && value.length === 0)) {
        sectionErrors.push(`${field} is required`);
      }
    });

    setErrors(prev => ({
      ...prev,
      [section]: sectionErrors
    }));

    return sectionErrors.length === 0;
  }, []);

  const validateAll = useCallback(() => {
    const allErrors: ValidationErrors = {};
    let isValid = true;

    Object.entries(REQUIRED_FIELDS).forEach(([section, fields]) => {
      const sectionData = formData[section as keyof typeof REQUIRED_FIELDS];
      const sectionErrors: string[] = [];

      fields.forEach(field => {
        const value = sectionData?.[field];
        if (!value || (Array.isArray(value) && value.length === 0)) {
          sectionErrors.push(`${field} is required`);
        }
      });

      if (sectionErrors.length > 0) {
        isValid = false;
        allErrors[section] = sectionErrors;
      }
    });

    setErrors(allErrors);
    return isValid;
  }, [formData]);

  const savePersona = useCallback(async () => {
    if (!validateAll()) {
      throw new Error('Please fill in all required fields');
    }

    setIsSaving(true);
    try {
      const savedPersona = storage.savePersona(formData);
      clearForm();
      return savedPersona;
    } finally {
      setIsSaving(false);
    }
  }, [formData, validateAll]);

  const saveDraft = useCallback(async () => {
    setIsSaving(true);
    try {
      storage.saveDraft(formData);
      setLastSaved(new Date());
      setIsDirty(false);
    } finally {
      setIsSaving(false);
    }
  }, [formData]);

  const loadDraft = useCallback(() => {
    const draft = storage.getDraft();
    if (draft) {
      setFormData(draft);
      setLastSaved(storage.getLastSaved());
      setIsDirty(false);
    }
  }, []);

  const clearForm = useCallback(() => {
    storage.clearDraft();
    setFormData(INITIAL_STATE);
    setErrors({});
    setIsDirty(false);
    setLastSaved(null);
  }, []);

  return {
    formData,
    updateSection,
    validateSection,
    validateAll,
    savePersona,
    saveDraft,
    loadDraft,
    clearForm,
    errors,
    isDirty,
    isSaving,
    lastSaved,
    hasErrors: Object.keys(errors).length > 0
  };
}