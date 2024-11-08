// Previous imports remain the same...

interface PersonaDetailedViewProps {
  persona: Persona;
  onBack: () => void;
}

export function PersonaDetailedView({ persona, onBack }: PersonaDetailedViewProps) {
  return (
    <div className="space-y-6 p-6 pb-16">
      <Button 
        variant="ghost" 
        onClick={onBack}
        className="mb-4"
      >
        ← Back to Personas
      </Button>

      {/* Rest of the existing PersonaDetailedView component code remains the same */}
      {/* ... */}
    </div>
  );
}