

<script>
   import { msal } from '$lib/msal.js'

   msal.loginPopup()
   .then(response => {
      console.log('Login success:', response);
   navigate('/dashboard'); // replace with your app's dashboard URL
  })
  .catch(error => {
    console.error('Login error:', error);
  });


</script>

Meny++++

<slot />