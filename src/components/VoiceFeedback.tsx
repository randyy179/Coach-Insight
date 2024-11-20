import { useState, useRef } from 'react';
import { Mic, Square } from 'lucide-react';

interface VoiceFeedbackProps {
  onFeedbackRecorded: (feedback: string) => void;
}

export function VoiceFeedback({ onFeedbackRecorded }: VoiceFeedbackProps) {
  const [isRecording, setIsRecording] = useState(false);
  const mediaRecorder = useRef<MediaRecorder | null>(null);
  const chunks = useRef<Blob[]>([]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorder.current = new MediaRecorder(stream);
      
      mediaRecorder.current.ondataavailable = (e) => {
        chunks.current.push(e.data);
      };

      mediaRecorder.current.onstop = async () => {
        const blob = new Blob(chunks.current, { type: 'audio/webm' });
        chunks.current = [];
        
        try {
          // In a real app, you would send this to a speech-to-text service
          // For now, we'll just simulate the conversion
          onFeedbackRecorded("Voice feedback recorded successfully");
        } catch (error) {
          console.error('Error converting speech to text:', error);
        }
      };

      mediaRecorder.current.start();
      setIsRecording(true);
    } catch (error) {
      console.error('Error accessing microphone:', error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorder.current && isRecording) {
      mediaRecorder.current.stop();
      mediaRecorder.current.stream.getTracks().forEach(track => track.stop());
      setIsRecording(false);
    }
  };

  return (
    <div className="flex items-center gap-4">
      <button
        onClick={isRecording ? stopRecording : startRecording}
        className={`p-3 rounded-full ${
          isRecording
            ? 'bg-red-500 hover:bg-red-600'
            : 'bg-blue-500 hover:bg-blue-600'
        } text-white transition-colors`}
      >
        {isRecording ? (
          <Square className="w-5 h-5" />
        ) : (
          <Mic className="w-5 h-5" />
        )}
      </button>
      <span className="text-sm text-gray-600">
        {isRecording ? 'Recording... Click to stop' : 'Click to start recording'}
      </span>
    </div>
  );
}