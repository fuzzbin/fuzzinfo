const { PublicClientApplication } = require('@azure/msal-node');
const config = {
  auth: {
    clientId: 'b88bd17e-a780-4dc9-841f-2295f6abde19',
    authority: 'https://login.microsoftonline.com/organizations',
    redirectUri: 'http://localhost:5173/innlogget',
  }
}
const msalInstance = new PublicClientApplication(config);
const loginRequest = {
  scopes: [ "user.read" ]
};


let loginResponse = await msalInstance.acquireTokenByDeviceCode(loginRequest);
console.log(loginResponse);

