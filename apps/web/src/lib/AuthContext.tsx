import { type User, getUser } from '@/lib/api';
import { createContext, useCallback, useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import { toast } from 'sonner';

interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: User | null;
  setToken: (token: string) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  isLoading: true,
  user: null,
  setToken: async () => {},
  logout: () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Function to validate token and get user data
  const validateToken = useCallback(async () => {
    const token = localStorage.getItem('access_token');
    if (!token) {
      setUser(null);
      setIsLoading(false);
      return;
    }
    try {
      setIsLoading(true);
      const user = await getUser();
      setUser(user);
    } catch (error) {
      console.error('Token validation failed:', error);
      toast.error('Token validation failed.');
      localStorage.removeItem('access_token');
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Initial validation on mount
  useEffect(() => {
    validateToken();
  }, [validateToken]);

  async function setToken(token: string) {
    localStorage.setItem('access_token', token);
    await validateToken();
  }

  function logout() {
    localStorage.removeItem('access_token');
    sessionStorage.clear(); // Clear MSAL session if needed
    setUser(null);
    window.location.href = '/login'; // Force redirect
  }

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        isLoading,
        user,
        setToken,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
