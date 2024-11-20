import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { mockVideos, mockFeedback } from '../data/mockData';
import { Layout } from '../components/common/Layout';
import { VideoPlayer } from '../components/VideoPlayer';
import { FeedbackForm } from '../components/feedback/FeedbackForm';

export function VideoFeedbackPage() {
  const navigate = useNavigate();
  const { videoId } = useParams<{ videoId: string }>();
  const video = mockVideos.find(v => v.id === videoId);
  const feedback = videoId === '1' ? mockFeedback : undefined;

  if (!video) {
    return (
      <Layout>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <p className="text-center text-gray-600">Video not found</p>
        </div>
      </Layout>
    );
  }

  const handleFeedbackSubmit = (formData: typeof mockFeedback) => {
    console.log('Feedback submitted:', formData);
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <button
          onClick={() => navigate('/')}
          className="mb-6 inline-flex items-center text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Videos
        </button>

        <div className="grid lg:grid-cols-2 gap-8">
          <div>
            <VideoPlayer url={video.url} title={video.title} />
            <div className="mt-4">
              <h2 className="text-xl font-bold text-gray-900">{video.title}</h2>
              <p className="text-sm text-gray-500">{video.category}</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-6">
              {feedback ? 'Update Feedback' : 'Provide Feedback'}
            </h2>
            <FeedbackForm
              initialData={feedback}
              onSubmit={handleFeedbackSubmit}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
}