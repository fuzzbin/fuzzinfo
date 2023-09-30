<script>

import { chatResponse } from '$lib/hentInfo'

    let melding = "tom akkurat nå"
    let bspm = ""

    function beOmSvar(spm) {
        console.log("Kjører");
        melding = chatResponse(spm);
    }
</script>

<h1>Velkommen til ChatDOK</h1>
<h2>En tjeneste for å stille spørsmål til statsbudsjettet 2022</h2>
<p>Du kan stille spørsmål til statsbudsjettet i feltet under. Prøv å stille så presise spørsmål som mulig for best mulig resultat.</p>

<div>
    <input bind:value={bspm} placeholder="Spørsmål til statsbudsjette" type="text">
    <button on:click={beOmSvar(bspm)}>Send</button>
    <div>
        <p>Her kommer svaret: 
            {#await melding}
                <p>venter på svar</p>
            {:then m}
                <p>{m}</p>
            {:catch error}
                <p>Det skjedde en feil: {error.message}</p>
            {/await}
        </p>
    </div>
</div>

