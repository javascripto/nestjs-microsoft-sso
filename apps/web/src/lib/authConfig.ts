import type { Configuration, PopupRequest } from '@azure/msal-browser';

const azureClientId = import.meta.env.VITE_AZURE_CLIENT_ID;

export const msalConfig: Configuration = {
  auth: {
    clientId: azureClientId,
    authority: 'https://login.microsoftonline.com/common',
    redirectUri: '/',
  },
  cache: {
    cacheLocation: 'sessionStorage',
    storeAuthStateInCookie: false,
  },
};

export const popupRequestConfig: PopupRequest = {
  scopes: [`api://${azureClientId}/access_as_user`],
};
