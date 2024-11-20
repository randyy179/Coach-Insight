import { create } from 'zustand';
import type { Assessment, Video } from '../types';

interface AssessmentState {
  currentVideo: Video | null;
  assessments: Assessment[];
  completedCount: number;
  addAssessment: (assessment: Assessment) => void;
  setCurrentVideo: (video: Video) => void;
}

export const useAssessmentStore = create<AssessmentState>((set) => ({
  currentVideo: null,
  assessments: [],
  completedCount: 0,
  addAssessment: (assessment) =>
    set((state) => ({
      assessments: [...state.assessments, assessment],
      completedCount: state.completedCount + 1,
    })),
  setCurrentVideo: (video) => set({ currentVideo: video }),
}));