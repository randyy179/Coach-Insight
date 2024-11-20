import { Play, Pause, Volume2, VolumeX, AlertCircle, Maximize, Minimize, Expand, Shrink } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

interface VideoPlayerProps {
  url: string;
  title: string;
}

export function VideoPlayer({ url, title }: VideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [aspectRatio, setAspectRatio] = useState('16/9');
  const [scaleMode, setScaleMode] = useState<'contain' | 'cover'>('contain');
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleLoadedMetadata = () => {
      const video = videoRef.current;
      if (video) {
        setDuration(video.duration);
        const ratio = `${video.videoWidth}/${video.videoHeight}`;
        setAspectRatio(ratio);
      }
    };

    videoRef.current?.addEventListener('loadedmetadata', handleLoadedMetadata);
    return () => {
      videoRef.current?.removeEventListener('loadedmetadata', handleLoadedMetadata);
    };
  }, []);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play().catch((err) => {
          setError('Failed to play video');
          console.error('Error playing video:', err);
        });
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const progress = (videoRef.current.currentTime / videoRef.current.duration) * 100;
      setProgress(progress);
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (progressRef.current && videoRef.current) {
      const rect = progressRef.current.getBoundingClientRect();
      const pos = (e.clientX - rect.left) / rect.width;
      videoRef.current.currentTime = pos * videoRef.current.duration;
    }
  };

  const toggleFullscreen = async () => {
    if (!containerRef.current) return;

    try {
      if (!document.fullscreenElement) {
        await containerRef.current.requestFullscreen();
      } else {
        await document.exitFullscreen();
      }
    } catch (err) {
      console.error('Error toggling fullscreen:', err);
    }
  };

  const toggleScaleMode = () => {
    setScaleMode(prev => prev === 'contain' ? 'cover' : 'contain');
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleError = () => {
    setError('Failed to load video');
    setIsPlaying(false);
  };

  if (error) {
    return (
      <div className="relative rounded-lg overflow-hidden bg-gray-100 aspect-video flex items-center justify-center">
        <div className="text-center text-gray-500">
          <AlertCircle className="w-12 h-12 mx-auto mb-2" />
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div 
      ref={containerRef}
      className={`relative ${isFullscreen ? 'fixed inset-0 z-50' : 'rounded-lg'} overflow-hidden bg-black`}
    >
      <div 
        className={`relative w-full h-full flex items-center justify-center ${!isFullscreen ? 'aspect-video' : ''}`}
      >
        <video
          ref={videoRef}
          src={url}
          className={`${isFullscreen ? 'h-full' : 'max-h-[80vh]'} w-full object-${scaleMode}`}
          onEnded={() => setIsPlaying(false)}
          onError={handleError}
          onTimeUpdate={handleTimeUpdate}
          playsInline
        />
        {Number(aspectRatio.split('/')[0]) < Number(aspectRatio.split('/')[1]) && (
          <div className="absolute inset-0 -z-10">
            <video
              src={url}
              className="w-full h-full object-cover blur-xl opacity-30"
              playsInline
              muted
            />
          </div>
        )}
      </div>

      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
        <div 
          ref={progressRef}
          className="w-full h-1 bg-gray-600 rounded-full mb-4 cursor-pointer"
          onClick={handleProgressClick}
        >
          <div 
            className="h-full bg-blue-500 rounded-full relative"
            style={{ width: `${progress}%` }}
          >
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-md"></div>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={togglePlay}
              className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
            >
              {isPlaying ? (
                <Pause className="w-5 h-5 text-white" />
              ) : (
                <Play className="w-5 h-5 text-white" />
              )}
            </button>
            <button
              onClick={toggleMute}
              className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
            >
              {isMuted ? (
                <VolumeX className="w-5 h-5 text-white" />
              ) : (
                <Volume2 className="w-5 h-5 text-white" />
              )}
            </button>
            <span className="text-white text-sm">
              {formatTime(currentTime)} / {formatTime(duration)}
            </span>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={toggleScaleMode}
              className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
              title={scaleMode === 'contain' ? 'Switch to fill mode' : 'Switch to fit mode'}
            >
              {scaleMode === 'contain' ? (
                <Expand className="w-5 h-5 text-white" />
              ) : (
                <Shrink className="w-5 h-5 text-white" />
              )}
            </button>
            <button
              onClick={toggleFullscreen}
              className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
            >
              {isFullscreen ? (
                <Minimize className="w-5 h-5 text-white" />
              ) : (
                <Maximize className="w-5 h-5 text-white" />
              )}
            </button>
            <h3 className="text-white font-medium">{title}</h3>
          </div>
        </div>
      </div>
    </div>
  );
}