<script>

import { siNoe } from '$lib/hentInfo'

    let melding = "tom akkurat nå"
    let bspm = ""

    function beOmSvar(spm) {
        console.log("Kjører");
        melding = siNoe();
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
            {melding}
    </div>
</div>

