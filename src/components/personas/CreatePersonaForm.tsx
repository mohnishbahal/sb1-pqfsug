import React, { useState, useCallback } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { 
  User, 
  ShoppingCart, 
  Zap, 
  Map, 
  ClipboardCheck,
  ChevronRight,
  AlertCircle,
  Loader2,
  Save,
  RefreshCw
} from 'lucide-react';
import { DemographicsForm } from './form-sections/DemographicsForm';
import { ShoppingBehaviorForm } from './form-sections/ShoppingBehaviorForm';
import { EngagementForm } from './form-sections/EngagementForm';
import { JourneyHistoryForm } from './form-sections/JourneyHistoryForm';
import { PersonaReview } from './form-sections/PersonaReview';
import { PersonaPreview } from './PersonaPreview';
import { useToast } from "@/components/ui/use-toast";
import { usePersonaForm } from '@/hooks/usePersonaForm';
import { cn } from "@/lib/utils";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const STEPS = ['demographics', 'shopping', 'engagement', 'journeys', 'review'] as const;
type Step = typeof STEPS[number];

const STEP_CONFIG: Record<Step, { label: string; icon: React.ComponentType<{ className?: string }>; description: string }> = {
  demographics: {
    label: 'Demographics',
    icon: User,
    description: 'Basic information'
  },
  shopping: {
    label: 'Shopping',
    icon: ShoppingCart,
    description: 'Purchase behavior'
  },
  engagement: {
    label: 'Engagement',
    icon: Zap,
    description: 'Interaction patterns'
  },
  journeys: {
    label: 'Journeys',
    icon: Map,
    description: 'Customer paths'
  },
  review: {
    label: 'Review',
    icon: ClipboardCheck,
    description: 'Final check'
  }
};

interface CreatePersonaFormProps {
  onSave?: (persona: any) => void;
}

export function CreatePersonaForm({ onSave }: CreatePersonaFormProps) {
  const [currentStep, setCurrentStep] = useState<Step>('demographics');
  const [showConfirmation, setShowConfirmation] = useState(false);
  const { toast } = useToast();
  
  const {
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
    hasErrors
  } = usePersonaForm();

  const handleNext = useCallback(() => {
    if (validateSection(currentStep, formData[currentStep])) {
      const currentIndex = STEPS.indexOf(currentStep);
      if (currentIndex < STEPS.length - 1) {
        setCurrentStep(STEPS[currentIndex + 1]);
      }
    } else {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields before proceeding.",
        variant: "destructive"
      });
    }
  }, [currentStep, formData, validateSection, toast]);

  const handleBack = useCallback(() => {
    const currentIndex = STEPS.indexOf(currentStep);
    if (currentIndex > 0) {
      setCurrentStep(STEPS[currentIndex - 1]);
    }
  }, [currentStep]);

  const handleTabChange = useCallback((step: Step) => {
    const currentIndex = STEPS.indexOf(currentStep);
    const targetIndex = STEPS.indexOf(step);
    
    if (targetIndex > currentIndex) {
      const previousSteps = STEPS.slice(0, targetIndex);
      const areAllPreviousStepsValid = previousSteps.every(s => 
        validateSection(s, formData[s])
      );
      
      if (!areAllPreviousStepsValid) {
        toast({
          title: "Please complete previous steps",
          description: "Ensure all required fields are filled before proceeding.",
          variant: "destructive"
        });
        return;
      }
    }
    
    setCurrentStep(step);
  }, [currentStep, formData, validateSection, toast]);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateAll()) {
      toast({
        title: "Validation Error",
        description: "Please complete all required fields before submitting.",
        variant: "destructive"
      });
      return;
    }

    setShowConfirmation(true);
  }, [validateAll, toast]);

  const handleConfirmSave = useCallback(async () => {
    try {
      const savedPersona = await savePersona();
      
      toast({
        title: "Success!",
        description: "Persona created successfully.",
      });
      
      onSave?.(savedPersona);
      setShowConfirmation(false);
      clearForm();
      setCurrentStep('demographics');
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create persona. Please try again.",
        variant: "destructive"
      });
    }
  }, [savePersona, onSave, clearForm, toast]);

  const currentStepIndex = STEPS.indexOf(currentStep);
  const progress = ((currentStepIndex + 1) / STEPS.length) * 100;

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold">Create New Persona</h2>
          <div className="flex items-center gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={loadDraft}
              className="gap-2"
            >
              <RefreshCw className="h-4 w-4" />
              Load Draft
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={saveDraft}
              disabled={!isDirty}
              className="gap-2"
            >
              <Save className="h-4 w-4" />
              Save Draft
            </Button>
          </div>
        </div>

        <Tabs value={currentStep} className="w-full">
          {/* Progress indicator */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">
                  Step {currentStepIndex + 1} of {STEPS.length}
                </span>
                {hasErrors && (
                  <span className="text-sm text-destructive flex items-center gap-1">
                    <AlertCircle className="h-4 w-4" />
                    Please fix validation errors
                  </span>
                )}
              </div>
              {isSaving ? (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Saving...
                </div>
              ) : lastSaved ? (
                <div className="text-sm text-muted-foreground">
                  Last saved: {lastSaved.toLocaleTimeString()}
                </div>
              ) : null}
            </div>
            <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
              <div 
                className="h-full bg-primary transition-all duration-300 ease-in-out"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          <TabsList className="grid w-full grid-cols-5">
            {STEPS.map((step) => {
              const Icon = STEP_CONFIG[step].icon;
              const isActive = currentStep === step;
              const hasError = errors[step]?.length > 0;
              const isPastStep = STEPS.indexOf(step) < currentStepIndex;

              return (
                <TabsTrigger
                  key={step}
                  value={step}
                  onClick={() => handleTabChange(step)}
                  disabled={STEPS.indexOf(step) > currentStepIndex + 1}
                  className={cn(
                    "relative flex flex-col items-center gap-1 p-4",
                    isActive && "text-primary",
                    hasError && "text-destructive"
                  )}
                >
                  <Icon className="h-5 w-5" />
                  <span className="text-xs">{STEP_CONFIG[step].label}</span>
                  {hasError && (
                    <AlertCircle className="absolute -top-1 -right-1 h-4 w-4 text-destructive" />
                  )}
                  {isPastStep && !hasError && (
                    <span className="absolute -top-1 -right-1 w-2 h-2 bg-green-500 rounded-full" />
                  )}
                </TabsTrigger>
              );
            })}
          </TabsList>

          <div className="flex flex-col lg:flex-row gap-6 mt-6">
            <Card className="flex-1 p-6">
              <TabsContent value="demographics">
                <DemographicsForm 
                  data={formData.demographics}
                  onUpdate={(data) => updateSection('demographics', data)}
                  errors={errors.demographics}
                />
              </TabsContent>

              <TabsContent value="shopping">
                <ShoppingBehaviorForm 
                  data={formData.preferences}
                  onUpdate={(data) => updateSection('preferences', data)}
                  errors={errors.preferences}
                />
              </TabsContent>

              <TabsContent value="engagement">
                <EngagementForm 
                  data={formData.behaviors}
                  onUpdate={(data) => updateSection('behaviors', data)}
                  errors={errors.behaviors}
                />
              </TabsContent>

              <TabsContent value="journeys">
                <JourneyHistoryForm 
                  data={formData.journeys}
                  onUpdate={(data) => updateSection('journeys', data)}
                />
              </TabsContent>

              <TabsContent value="review">
                <PersonaReview 
                  data={formData}
                  errors={errors}
                />
              </TabsContent>
            </Card>

            <Card className="w-full lg:w-80 p-6 lg:sticky lg:top-4 h-fit">
              <h3 className="text-lg font-semibold mb-4">Live Preview</h3>
              <PersonaPreview data={formData} isPreview />
            </Card>
          </div>
        </Tabs>

        <div className="flex items-center justify-between pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={handleBack}
            disabled={currentStep === 'demographics'}
          >
            Back
          </Button>
          
          {currentStep === 'review' ? (
            <Button 
              type="submit"
              disabled={isSaving || hasErrors}
            >
              {isSaving ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  Creating...
                </>
              ) : (
                'Create Persona'
              )}
            </Button>
          ) : (
            <Button 
              type="button"
              onClick={handleNext}
              disabled={errors[currentStep]?.length > 0}
              className="gap-2"
            >
              Next
              <ChevronRight className="h-4 w-4" />
            </Button>
          )}
        </div>
      </form>

      <AlertDialog open={showConfirmation} onOpenChange={setShowConfirmation}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Create New Persona</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to create this persona? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmSave}>
              Create Persona
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}