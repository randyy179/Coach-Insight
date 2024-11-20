import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useAuthStore } from './store/auth';
import { PrivateRoute } from './components/auth/PrivateRoute';
import { LoginPage } from './pages/LoginPage';
import { SignupPage } from './pages/SignupPage';
import { VideoListPage } from './pages/VideoListPage';
import { VideoFeedbackPage } from './pages/VideoFeedbackPage';
import { LoadingSpinner } from './components/common/LoadingSpinner';

function App() {
  const { isLoading } = useAuthStore();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route
          path="/"
          element={
            <PrivateRoute>
              <VideoListPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/video/:videoId"
          element={
            <PrivateRoute>
              <VideoFeedbackPage />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;