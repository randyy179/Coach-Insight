export const mockVideos = [
  {
    id: '1',
    title: 'Bar Muscle Up Video #1',
    url: 'https://storage.googleapis.com/webfundamentals-assets/videos/chrome.mp4',
    thumbnail: 'https://images.unsplash.com/photo-1599058917765-a780eda07a3e?w=800&q=80'
  },
  {
    id: '2',
    title: 'Bar Muscle Up Video #2',
    url: 'https://storage.googleapis.com/webfundamentals-assets/videos/chrome.mp4',
    thumbnail: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80'
  },
  {
    id: '3',
    title: 'Bar Muscle Up Video #3',
    url: 'https://storage.googleapis.com/webfundamentals-assets/videos/chrome.mp4',
    thumbnail: 'https://images.unsplash.com/photo-1517963879433-6ad2b056d712?w=800&q=80'
  },
  {
    id: '4',
    title: 'Bar Muscle Up Video #4',
    url: 'https://storage.googleapis.com/webfundamentals-assets/videos/chrome.mp4',
    thumbnail: 'https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?w=800&q=80'
  }
];

export const mockFeedback = {
  id: '1',
  userId: '1',
  videoId: '1',
  timestamp: Date.now(),
  isPerfect: false,
  overallRating: 8,
  categoryRatings: {
    strength: 8,
    timing: 7,
    technique: 7
  },
  isLegal: true,
  additionalNotes: 'Good pull strength, but timing of the transition needs work.',
  voiceFeedback: 'Voice feedback recorded successfully'
};