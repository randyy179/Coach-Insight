import { useState, useRef } from 'react';
import { Mic, Square, Play, Trash2 } from 'lucide-react';

interface VoiceFeedbackProps {
  onFeedbackRecorded: (feedback: string) => void;
  isListening: boolean;
  onListeningChange: (isListening: boolean) => void;
}

export function VoiceFeedback({
  onFeedbackRecorded,
  isListening,
  onListeningChange
}: VoiceFeedbackProps) {
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const mediaRecorder = useRef<MediaRecorder | null>(null);
  const audioElement = useRef<HTMLAudioElement | null>(null);
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
        const url = URL.createObjectURL(blob);
        setAudioUrl(url);
        onFeedbackRecorded("Voice feedback recorded successfully");
      };

      mediaRecorder.current.start();
      onListeningChange(true);
    } catch (error) {
      console.error('Error accessing microphone:', error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorder.current && isListening) {
      mediaRecorder.current.stop();
      mediaRecorder.current.stream.getTracks().forEach(track => track.stop());
      onListeningChange(false);
    }
  };

  const playRecording = () => {
    if (audioUrl && audioElement.current) {
      audioElement.current.play();
    }
  };

  const deleteRecording = () => {
    if (audioUrl) {
      URL.revokeObjectURL(audioUrl);
      setAudioUrl(null);
      onFeedbackRecorded("");
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={isListening ? stopRecording : startRecording}
          className={`p-3 rounded-full ${
            isListening
              ? 'bg-red-500 hover:bg-red-600'
              : 'bg-blue-500 hover:bg-blue-600'
          } text-white transition-colors`}
          disabled={!!audioUrl}
        >
          {isListening ? (
            <Square className="w-5 h-5" />
          ) : (
            <Mic className="w-5 h-5" />
          )}
        </button>
        <span className="text-sm text-gray-600">
          {isListening ? 'Recording... Click to stop' : 'Click to start recording'}
        </span>
      </div>

      {audioUrl && (
        <div className="flex items-center gap-4">
          <audio ref={audioElement} src={audioUrl} className="hidden" />
          <button
            type="button"
            onClick={playRecording}
            className="p-2 rounded-full bg-gray-100 hover:bg-gray-200"
          >
            <Play className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={deleteRecording}
            className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-red-500"
          >
            <Trash2 className="w-4 h-4" />
          </button>
          <span className="text-sm text-gray-600">
            Recording saved - Click to play or delete
          </span>
        </div>
      )}
    </div>
  );
}