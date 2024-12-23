import React from 'react';

export interface AIInputProps {
  field: string;
  onChange: (value: string) => void;
}

export const AIInputComponent: React.FC<AIInputProps> = ({ field, onChange }) => {
  return (
    <div>
      <button
        onClick={() => {
          // Add your AI input logic here
          const aiGeneratedValue = "AI Generated Content"; // Replace with actual AI logic
          onChange(aiGeneratedValue);
        }}
        className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Generate {field} with AI
      </button>
    </div>
  );
};
