import { MicrosoftLogo } from '@/components/MicrosoftLogo';
import { Button } from '@/components/ui/button';
import {
  exchangeGoogleToken,
  exchangeMicrosoftToken,
  loginWithEmail,
} from '@/lib/api';
import { popupRequestConfig } from '@/lib/authConfig';
import { useAuth } from '@/lib/useAuth';
import { cn, wait } from '@/lib/utils';
import { InteractionStatus } from '@azure/msal-browser';
import { useMsal } from '@azure/msal-react';
import { useGoogleLogin } from '@react-oauth/google';
import { Loader2 } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { GoogleLogo } from './GoogleLogo';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setToken } = useAuth();
  const { instance, inProgress } = useMsal();
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleMicrosoftLogin = async () => {
    if (inProgress !== InteractionStatus.None) return;
    try {
      const { accessToken } = await instance.loginPopup(popupRequestConfig);
      const { access_token } = await exchangeMicrosoftToken(accessToken);
      await setToken(access_token);
      navigate('/dashboard');
    } catch (e) {
      console.error(e);
    }
  };

  const handleGoogleLogin = useGoogleLogin({
    onSuccess: async tokenResponse => {
      try {
        setIsLoading(true);
        const { access_token } = await exchangeGoogleToken(
          tokenResponse.access_token,
        );
        await setToken(access_token);
        navigate('/dashboard');
      } catch (error) {
        console.error('Google login failed', error);
        toast.error('Google login failed');
      } finally {
        setIsLoading(false);
      }
    },
    onError: error => {
      console.error('Google login error', error);
      toast.error('Google login failed');
    },
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      setIsLoading(true);
      await wait(500);
      const { access_token } = await loginWithEmail({ email, password });
      await setToken(access_token);
      navigate('/dashboard');
    } catch (error) {
      console.error('Login failed', error);
      toast.error('Login failed');
    } finally {
      setIsLoading(false);
    }
  }

  function clearSiteData() {
    sessionStorage.clear();
    localStorage.clear();
    window.location.reload();
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 via-white to-blue-200">
      <div className="bg-white p-10 rounded-2xl shadow-xl w-full max-w-md flex flex-col items-center">
        <div className="mb-6 flex flex-col items-center">
          <h1 className="text-3xl font-extrabold text-gray-800 mb-1">
            Bem-vindo!
          </h1>
          <p className="text-gray-500 text-sm">Acesse sua conta</p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="w-full flex flex-col gap-4 mb-6"
        >
          <input
            type="email"
            placeholder="Email"
            className="w-full p-2 border rounded"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Senha"
            className="w-full p-2 border rounded"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <button
            type="submit"
            disabled={isLoading}
            className={cn(
              'w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700',
              'disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center',
            )}
          >
            {isLoading && (
              <Loader2 className="inline mr-2 h-4 w-4 animate-spin" />
            )}
            {isLoading ? 'Entrando...' : 'Entrar'}
          </button>
        </form>

        <div className="w-full flex items-center gap-2 mb-6">
          <div className="h-px bg-gray-300 flex-1" />
          <span className="text-gray-400 text-sm">ou</span>
          <div className="h-px bg-gray-300 flex-1" />
        </div>

        <button
          type="button"
          disabled={isLoading}
          onClick={handleMicrosoftLogin}
          className={cn(
            'w-full flex items-center justify-center gap-2',
            'bg-white border border-gray-300 hover:bg-blue-50 text-gray-800',
            'font-semibold py-3 px-4 rounded-lg shadow transition-colors duration-150 mb-2',
            'disabled:opacity-50 disabled:cursor-not-allowed',
          )}
        >
          <MicrosoftLogo className="w-6 h-6 mr-2" />
          <span className="text-base font-medium">Entrar com Microsoft</span>
        </button>

        <button
          type="button"
          disabled={isLoading}
          onClick={() => handleGoogleLogin()}
          className={cn(
            'w-full flex items-center justify-center gap-2',
            'bg-white border border-gray-300 hover:bg-blue-50 text-gray-800',
            'font-semibold py-3 px-4 rounded-lg shadow transition-colors duration-150 mb-2',
            'disabled:opacity-50 disabled:cursor-not-allowed',
          )}
        >
          <GoogleLogo className="w-6 h-6 mr-2" />
          <span className="text-base font-medium">Entrar com Google</span>
        </button>

        <Button
          variant="link"
          onClick={clearSiteData}
        >
          Limpar dados da aplicação
        </Button>
      </div>
    </div>
  );
}
