import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { RatingInput } from './RatingInput';
import { VoiceFeedback } from './VoiceFeedback';
import type { Feedback } from '../../types';

interface FeedbackFormProps {
  initialData?: Feedback;
  onSubmit: (feedback: any) => void;
  onNext?: () => void;
}

export function FeedbackForm({ initialData, onSubmit, onNext }: FeedbackFormProps) {
  const [isPerfect, setIsPerfect] = useState(initialData?.isPerfect ?? false);
  const [voiceFeedback, setVoiceFeedback] = useState<string>();
  const [isListening, setIsListening] = useState(false);
  const [ratings, setRatings] = useState({
    overall: initialData?.overallRating ?? 0,
    strength: initialData?.categoryRatings?.strength ?? 0,
    timing: initialData?.categoryRatings?.timing ?? 0,
    technique: initialData?.categoryRatings?.technique ?? 0
  });
  const [priorities, setPriorities] = useState({
    strength: 0,
    timing: 0,
    technique: 0
  });

  const { register, handleSubmit, watch } = useForm({
    defaultValues: {
      ...initialData,
      isLegal: initialData?.isLegal ?? true,
      illegalReason: initialData?.illegalReason ?? ''
    }
  });

  const isLegal = watch('isLegal') === 'true';

  const handlePerfectToggle = (perfect: boolean) => {
    setIsPerfect(perfect);
  };

  const handleRatingChange = (type: string, value: number) => {
    setRatings(prev => ({ ...prev, [type]: value }));
  };

  const handlePriorityChange = (aspect: string, value: string) => {
    setPriorities(prev => ({ ...prev, [aspect]: parseInt(value) }));
  };

  const onFormSubmit = (data: any) => {
    onSubmit({
      ...data,
      isPerfect,
      overallRating: ratings.overall,
      categoryRatings: {
        strength: ratings.strength,
        timing: ratings.timing,
        technique: ratings.technique
      },
      priorities,
      voiceFeedback,
      isLegal: data.isLegal === 'true'
    });
    onNext?.();
  };

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6">
      <div className="flex gap-4">
        <button
          type="button"
          onClick={() => handlePerfectToggle(true)}
          className={`flex-1 px-4 py-2 rounded-md ${
            isPerfect
              ? 'bg-green-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Perfect Movement
        </button>
        <button
          type="button"
          onClick={() => handlePerfectToggle(false)}
          className={`flex-1 px-4 py-2 rounded-md ${
            !isPerfect
              ? 'bg-yellow-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Needs Improvement
        </button>
      </div>

      {!isPerfect && (
        <>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Voice Feedback
            </label>
            <VoiceFeedback
              onFeedbackRecorded={setVoiceFeedback}
              isListening={isListening}
              onListeningChange={setIsListening}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Overall Performance
            </label>
            <RatingInput
              value={ratings.overall}
              onChange={(value) => handleRatingChange('overall', value)}
            />
          </div>

          <div className="space-y-6">
            <h3 className="text-lg font-medium text-gray-900">Movement Assessment</h3>
            
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Timing of Pull
              </label>
              <RatingInput
                value={ratings.timing}
                onChange={(value) => handleRatingChange('timing', value)}
              />
              <div className="mt-2 flex items-center gap-2">
                <span className="text-sm text-gray-600">Priority:</span>
                <select 
                  value={priorities.timing}
                  onChange={(e) => handlePriorityChange('timing', e.target.value)}
                  className="border border-gray-300 rounded px-2 py-1 text-sm"
                >
                  <option value="0">Select priority</option>
                  <option value="1">1 (Most important)</option>
                  <option value="2">2</option>
                  <option value="3">3 (Least important)</option>
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Strength Assessment
              </label>
              <RatingInput
                value={ratings.strength}
                onChange={(value) => handleRatingChange('strength', value)}
              />
              <div className="mt-2 flex items-center gap-2">
                <span className="text-sm text-gray-600">Priority:</span>
                <select 
                  value={priorities.strength}
                  onChange={(e) => handlePriorityChange('strength', e.target.value)}
                  className="border border-gray-300 rounded px-2 py-1 text-sm"
                >
                  <option value="0">Select priority</option>
                  <option value="1">1 (Most important)</option>
                  <option value="2">2</option>
                  <option value="3">3 (Least important)</option>
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Technique
              </label>
              <RatingInput
                value={ratings.technique}
                onChange={(value) => handleRatingChange('technique', value)}
              />
              <div className="mt-2 flex items-center gap-2">
                <span className="text-sm text-gray-600">Priority:</span>
                <select 
                  value={priorities.technique}
                  onChange={(e) => handlePriorityChange('technique', e.target.value)}
                  className="border border-gray-300 rounded px-2 py-1 text-sm"
                >
                  <option value="0">Select priority</option>
                  <option value="1">1 (Most important)</option>
                  <option value="2">2</option>
                  <option value="3">3 (Least important)</option>
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Is this a legal muscle up?
              </label>
              <div className="flex gap-4">
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    {...register('isLegal')}
                    value="true"
                    className="h-4 w-4 text-blue-600"
                  />
                  <span className="ml-2">Yes</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    {...register('isLegal')}
                    value="false"
                    className="h-4 w-4 text-blue-600"
                  />
                  <span className="ml-2">No</span>
                </label>
              </div>

              {!isLegal && (
                <div className="mt-3">
                  <label className="block text-sm font-medium text-gray-700">
                    Why is it not legal?
                  </label>
                  <textarea
                    {...register('illegalReason')}
                    rows={2}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 focus:ring-opacity-50"
                    placeholder="e.g., Not finished, legs over bar during pull..."
                  />
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Anything else worth mentioning?
              </label>
              <textarea
                {...register('additionalNotes')}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 focus:ring-opacity-50"
                placeholder="Add any additional observations..."
              />
            </div>
          </div>
        </>
      )}

      <button
        type="submit"
        className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
      >
        Submit & Continue
      </button>
    </form>
  );
}