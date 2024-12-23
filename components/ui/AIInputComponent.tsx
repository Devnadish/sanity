import React, { useState } from 'react';
import { Stack, Button, Card, Text, TextInput, Spinner } from '@sanity/ui';
import { SparklesIcon } from '@sanity/icons';
import OpenAI from 'openai';

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
});

export interface AIInputProps {
  type: 'title' | 'description' | 'content';
  onChange: (value: string) => void;
}

export function AIInputComponent({ type, onChange }: AIInputProps) {
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);

  const generateContent = async () => {
    if (!prompt) return;

    setLoading(true);
    try {
      let systemPrompt = '';
      switch (type) {
        case 'title':
          systemPrompt = 'Generate a catchy title based on the following description:';
          break;
        case 'description':
          systemPrompt = 'Generate a compelling meta description based on the following content:';
          break;
        case 'content':
          systemPrompt = 'Generate detailed blog content based on the following topic:';
          break;
        default:
          throw new Error('Invalid type provided');
      }

      const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: prompt }
        ],
        temperature: 0.7,
      });

      const generatedContent = completion.choices[0]?.message?.content;
      if (generatedContent) {
        onChange(generatedContent);
      }
    } catch (error) {
      console.error('Error generating content:', error);
      // Optionally, you can set an error state here to inform the user
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card padding={3} border radius={2}>
      <Stack space={3}>
        <Text size={1}>AI Assistant</Text>
        <TextInput
          value={prompt}
          onChange={event => setPrompt(event.currentTarget.value)}
          placeholder="Describe what you want to generate..."
        />
        <Button
          icon={loading ? <Spinner /> : <SparklesIcon />}
          text="Generate with AI"
          tone="primary"
          onClick={generateContent}
          disabled={loading || !prompt}
        />
      </Stack>
    </Card>
  );
}