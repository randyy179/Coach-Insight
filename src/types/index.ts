export interface User {
  id: string;
  email: string;
  name: string;
}

export interface Video {
  id: string;
  title: string;
  url: string;
  thumbnail: string;
}

export interface Feedback {
  id: string;
  userId: string;
  videoId: string;
  timestamp: number;
  isPerfect: boolean;
  overallRating?: number;
  categoryRatings?: {
    strength: number;
    timing: number;
    technique: number;
  };
  isLegal?: boolean;
  illegalReason?: string;
  additionalNotes?: string;
  voiceFeedback?: string;
}