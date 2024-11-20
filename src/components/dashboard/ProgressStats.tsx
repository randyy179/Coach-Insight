import { Activity, CheckCircle, Video } from 'lucide-react';
import { useAssessmentStore } from '../../store/assessment';

export function ProgressStats() {
  const { assessments, completedCount } = useAssessmentStore();
  const totalVideos = 20; // This would come from your actual video count

  const perfectCount = assessments.filter((a) => a.isPerfect).length;
  const progressPercentage = (completedCount / totalVideos) * 100;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Completed Videos</p>
            <p className="text-2xl font-semibold text-gray-900">{completedCount}</p>
          </div>
          <Video className="w-8 h-8 text-blue-500" />
        </div>
        <div className="mt-4">
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
          <p className="text-sm text-gray-600 mt-1">
            {progressPercentage.toFixed(0)}% complete
          </p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Perfect Movements</p>
            <p className="text-2xl font-semibold text-gray-900">{perfectCount}</p>
          </div>
          <CheckCircle className="w-8 h-8 text-green-500" />
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Recent Activity</p>
            <p className="text-2xl font-semibold text-gray-900">
              {assessments.length}
            </p>
          </div>
          <Activity className="w-8 h-8 text-purple-500" />
        </div>
      </div>
    </div>
  );
}