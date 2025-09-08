// src/components/ProtectedRoute/ProtectedRoute.jsx
import { useAuth } from '../../contexts/AuthContext';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import { LockKeyhole , SaveAll  , History, ShieldCheck } from 'lucide-react';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <LoadingSpinner size="lg" text="Checking authentication..." />
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="flex items-center justify-center text-8xl mb-6"><LockKeyhole className='w-15 h-15 '/></div>
          <h2 className="text-3xl font-bold mb-4">Authentication Required</h2>
          <p className="text-gray-300 mb-8">
            Please sign in to access your transcription dashboard and save your audio files.
          </p>
          <div className="text-sm text-gray-400 space-y-2">
            <p className='flex items-center justify-center gap-2'><SaveAll/> Save and manage your transcriptions</p>
            <p className='flex items-center justify-center gap-2'><History/> Access your history anywhere</p>
            <p className='flex items-center justify-center gap-2'><ShieldCheck/> Your data is secure and private</p>
          </div>
        </div>
      </div>
    );
  }

  return children;
};

export default ProtectedRoute;