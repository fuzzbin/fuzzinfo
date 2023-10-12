

<script>
    import login from '$lib/Auth/login';
    import { get } from 'svelte/store';

    let msal
    let user

    console.log('Hello???')

    const loginHandler = async () => {
        if(!get(userStore)) {
            const user = await login()
            userStore.set(user)
        } else {
            {}
        }
    }

loginHandler();

</script>



Meny++++

<slot />