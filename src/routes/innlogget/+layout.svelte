

<script>
import { PublicClientApplication } from "@azure/msal-browser";


const msalConfig = {
    auth: {
        clientId: 'xxxx',
        authority: 'https://login.microsoftonline.com/{xxx}'
    }
};

async function login() {
  const msalInstance = new PublicClientApplication(msalConfig);
  await msalInstance.initialize();    
  msalInstance.loginPopup({
      redirectUri: "http://localhost:3000/blank.html"
  });
}

login()
</script>

<slot />

