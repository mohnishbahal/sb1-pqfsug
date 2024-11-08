import React, { useCallback } from 'react';
import { Upload, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface ImageUploadProps {
  value?: string;
  onChange: (value: string) => void;
  className?: string;
}

export function ImageUpload({ value, onChange, className }: ImageUploadProps) {
  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = () => {
        onChange(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  }, [onChange]);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        onChange(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  }, [onChange]);

  return (
    <div className={cn("space-y-4", className)}>
      <div
        className={cn(
          "border-2 border-dashed rounded-lg p-4 hover:bg-gray-50 transition-colors",
          "flex flex-col items-center justify-center gap-2",
          "cursor-pointer min-h-[200px]"
        )}
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
      >
        {value ? (
          <div className="relative w-full h-full">
            <img
              src={value}
              alt="Uploaded"
              className="w-full h-full object-cover rounded-lg"
            />
            <Button
              variant="destructive"
              size="icon"
              className="absolute top-2 right-2"
              onClick={(e) => {
                e.stopPropagation();
                onChange('');
              }}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        ) : (
          <>
            <Upload className="h-8 w-8 text-gray-400" />
            <div className="text-center">
              <p className="text-sm font-medium">Drop image here or click to upload</p>
              <p className="text-xs text-gray-500 mt-1">PNG, JPG up to 5MB</p>
            </div>
          </>
        )}
      </div>
      <input
        type="file"
        accept="image/*"
        className="hidden"
        id="image-upload"
        onChange={handleChange}
      />
      {!value && (
        <Button
          variant="outline"
          className="w-full"
          onClick={() => document.getElementById('image-upload')?.click()}
        >
          <Upload className="h-4 w-4 mr-2" />
          Select Image
        </Button>
      )}
    </div>
  );
}