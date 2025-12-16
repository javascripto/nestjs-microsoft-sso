import axios from 'axios';

export const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api`,
});

api.interceptors.request.use(async config => {
  const token = localStorage.getItem('access_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export function loginWithEmail({
  email,
  password,
}: { email: string; password: string }): Promise<{ access_token: string }> {
  return api
    .post<{ access_token: string }>('/auth/login', { email, password })
    .then(({ data }) => data);
}

export function getUser(): Promise<User> {
  return api.get('/auth/me').then(({ data }) => data);
}

export function exchangeMicrosoftToken(microsoftToken: string) {
  return api
    .post<{ access_token: string }>('/auth/login/microsoft', null, {
      headers: { Authorization: `Bearer ${microsoftToken}` },
    })
    .then(({ data }) => data);
}

export interface User {
  email: string;
  userId?: string;
  name?: string;
  [key: string]: unknown;
}
