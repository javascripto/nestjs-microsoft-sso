import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export function useAuthGuard(isAuthenticated: boolean) {
  const navigate = useNavigate();
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login', { replace: true });
    }
  }, [isAuthenticated, navigate]);
}
