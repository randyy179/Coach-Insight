import { useState } from 'react';
import { RatingInput } from './RatingInput';
import { TagInput } from './TagInput';
import { VoiceFeedback } from './VoiceFeedback';
import type { VideoFeedback } from '../types';

interface VideoFeedbackFormProps {
  onSubmit: (feedback: VideoFeedback) => void;
}

export function VideoFeedbackForm({ onSubmit }: VideoFeedbackFormProps) {
  const [rating, setRating] = useState(0);
  const [tags, setTags] = useState<string[]>([]);
  const [textFeedback, setTextFeedback] = useState('');
  const [voiceFeedback, setVoiceFeedback] = useState<string>();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      rating,
      tags,
      textFeedback,
      audioFeedback: voiceFeedback,
    });
  };

  const suggestedTags = [
    'Form',
    'Technique',
    'Intensity',
    'Safety',
    'Beginner',
    'Intermediate',
    'Advanced',
    'Upper Body',
    'Lower Body',
    'Core',
    'Cardio',
    'Strength',
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Rating
        </label>
        <RatingInput value={rating} onChange={setRating} />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Tags
        </label>
        <TagInput
          tags={tags}
          onChange={setTags}
          suggestions={suggestedTags}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Written Feedback
        </label>
        <textarea
          value={textFeedback}
          onChange={(e) => setTextFeedback(e.target.value)}
          rows={4}
          className="w-full px-3 py-2 border rounded-md"
          placeholder="Enter your feedback..."
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Voice Feedback
        </label>
        <VoiceFeedback onFeedbackRecorded={setVoiceFeedback} />
      </div>

      <button
        type="submit"
        className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
      >
        Submit Feedback
      </button>
    </form>
  );
}