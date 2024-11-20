import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../../store/auth';

interface PrivateRouteProps {
  children: React.ReactNode;
}

export function PrivateRoute({ children }: PrivateRouteProps) {
  const { isAuthenticated, isLoading } = useAuthStore();

  if (isLoading) {
    return null;
  }

  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
}