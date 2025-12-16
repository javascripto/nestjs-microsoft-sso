import { msalConfig } from '@/lib/authConfig';
import { PublicClientApplication } from '@azure/msal-browser';
import { useEffect, useState } from 'react';

export const msalInstance = new PublicClientApplication(msalConfig);

export async function initializeMsal() {
  await msalInstance.initialize();
  await msalInstance.handleRedirectPromise();
}

export function MsalInitializer({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    initializeMsal().then(() => setIsLoading(false));
  }, []);
  return isLoading ? null : children;
}
