import { PublicClientApplication } from '@azure/msal-browser';

const msalConfig = {
  auth: {
    clientId: 'your_client_id',
    authority: 'https://login.microsoftonline.com/your_tenant_id',
    redirectUri: 'http://localhost:3000' // replace with your app's redirect URI
  },
  cache: {
    cacheLocation: 'localStorage',
    storeAuthStateInCookie: true
  }
};

export const msal = new PublicClientApplication(msalConfig);