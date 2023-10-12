import { msal } from '@azure/msal-browser'
import { env } from '$env/dynamic/public';

const config = {
      auth: {
        clientId: '$env.CLIENT_ID',
        authority: 'https://login.microsoftonline.com/organizations',
        redirectUri: 'http://localhost:5173/innlogget',
      }
}

const msalInstance = new msal.PublicClientApplication(config);

const loginRequest = {
    scopes: [ "user.read" ]
};

let loginResponse = await msalInstance.loginPopup(loginRequest);
console.log(loginResponse)

