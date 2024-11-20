import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { RatingInput } from '../RatingInput';
import { TagInput } from '../TagInput';
import { VoiceFeedback } from '../VoiceFeedback';
import type { VideoFeedback } from '../../types';

const assessmentSchema = z.object({
  rating: z.number().min(1).max(10),
  categories: z.object({
    overallMovement: z.number().min(1).max(10),
    strength: z.number().min(1).max(10),
    technique: z.number().min(1).max(10),
    balance: z.number().min(1).max(10),
    coordination: z.number().min(1).max(10),
  }),
  textFeedback: z.string().min(10),
});

type AssessmentFormData = z.infer<typeof assessmentSchema>;

interface AssessmentFormProps {
  onSubmit: (feedback: VideoFeedback) => void;
  onPerfect: () => void;
}

export function AssessmentForm({ onSubmit, onPerfect }: AssessmentFormProps) {
  const [isPerfect, setIsPerfect] = useState(false);
  const [tags, setTags] = useState<string[]>([]);
  const [voiceFeedback, setVoiceFeedback] = useState<string>();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AssessmentFormData>({
    resolver: zodResolver(assessmentSchema),
  });

  const handlePerfect = () => {
    setIsPerfect(true);
    onPerfect();
  };

  const onFormSubmit = (data: AssessmentFormData) => {
    onSubmit({
      ...data,
      tags,
      voiceFeedback,
    });
  };

  if (isPerfect) {
    return null;
  }

  const suggestedTags = [
    'Form',
    'Technique',
    'Strength',
    'Balance',
    'Coordination',
    'Speed',
    'Power',
    'Flexibility',
    'Core Stability',
    'Movement Pattern',
  ];

  return (
    <div className="space-y-6">
      <div className="flex gap-4">
        <button
          type="button"
          onClick={handlePerfect}
          className="flex-1 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
        >
          Perfect Movement
        </button>
        <button
          type="button"
          className="flex-1 px-4 py-2 bg-yellow-600 text-white rounded-md hover:bg-yellow-700"
        >
          Needs Improvement
        </button>
      </div>

      <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Overall Rating
          </label>
          <RatingInput
            value={0}
            onChange={(value) => register('rating').onChange({ target: { value } })}
          />
          {errors.rating && (
            <p className="mt-1 text-sm text-red-600">{errors.rating.message}</p>
          )}
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-900">Category Ratings</h3>
          {Object.keys(assessmentSchema.shape.categories.shape).map((category) => (
            <div key={category}>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </label>
              <input
                type="range"
                min="1"
                max="10"
                {...register(`categories.${category as keyof typeof assessmentSchema.shape.categories.shape}`)}
                className="w-full"
              />
            </div>
          ))}
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
            Detailed Feedback
          </label>
          <textarea
            {...register('textFeedback')}
            rows={4}
            className="w-full px-3 py-2 border rounded-md"
            placeholder="Provide detailed feedback about the movement..."
          />
          {errors.textFeedback && (
            <p className="mt-1 text-sm text-red-600">{errors.textFeedback.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Voice Feedback
          </label>
          <VoiceFeedback onFeedbackRecorded={setVoiceFeedback} />
        </div>

        <button
          type="submit"
          className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Submit Assessment
        </button>
      </form>
    </div>
  );
}