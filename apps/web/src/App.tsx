import { AppRoutes } from '@/AppRoutes';
import { AuthProvider } from '@/lib/AuthContext';
import { MsalInitializer, msalInstance } from '@/lib/msalClient';
import { MsalProvider } from '@azure/msal-react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'sonner';

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster
        richColors
        position="top-right"
      />
      <BrowserRouter>
        <MsalInitializer>
          <MsalProvider instance={msalInstance}>
            <AuthProvider>
              <div className="min-h-screen bg-background text-foreground">
                <AppRoutes />
              </div>
            </AuthProvider>
          </MsalProvider>
        </MsalInitializer>
      </BrowserRouter>
    </QueryClientProvider>
  );
}
