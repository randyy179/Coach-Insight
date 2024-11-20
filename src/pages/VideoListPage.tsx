import { useState } from 'react';
import { Link } from 'react-router-dom';
import { mockVideos } from '../data/mockData';
import { Layout } from '../components/common/Layout';

export function VideoListPage() {
  const [videosWithFeedback] = useState(['1']); // Video ID 1 has feedback

  const withFeedback = mockVideos.filter(video => videosWithFeedback.includes(video.id));
  const withoutFeedback = mockVideos.filter(video => !videosWithFeedback.includes(video.id));

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Bar Muscle Up Videos</h1>
          <p className="mt-2 text-gray-600">Review and provide feedback on athlete performances</p>
        </div>

        <div className="space-y-12">
          {withoutFeedback.length > 0 && (
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Videos Awaiting Feedback ({withoutFeedback.length})
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {withoutFeedback.map(video => (
                  <Link
                    key={video.id}
                    to={`/video/${video.id}`}
                    className="block group"
                  >
                    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                      <div className="aspect-video relative">
                        <img
                          src={video.thumbnail}
                          alt={video.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                          <span className="text-white font-medium">Provide Feedback</span>
                        </div>
                      </div>
                      <div className="p-4">
                        <h3 className="text-lg font-medium text-gray-900">
                          {video.title}
                        </h3>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {withFeedback.length > 0 && (
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Videos with Feedback ({withFeedback.length})
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {withFeedback.map(video => (
                  <Link
                    key={video.id}
                    to={`/video/${video.id}`}
                    className="block group"
                  >
                    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                      <div className="aspect-video relative">
                        <img
                          src={video.thumbnail}
                          alt={video.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                          <span className="text-white font-medium">View Feedback</span>
                        </div>
                      </div>
                      <div className="p-4">
                        <h3 className="text-lg font-medium text-gray-900">
                          {video.title}
                        </h3>
                        <div className="mt-2">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            Feedback provided
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </Layout>
  );
}