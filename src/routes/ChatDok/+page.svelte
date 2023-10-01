<script>
    let melding = "Hei hei"
    let spm = "";

    const beOmSvar = async (spm) => {
        console.log("spm: " + spm);
        melding = await fetch("/api/chatdok")
            .then(res => res.json())
            .then(res => res.message)
        return melding;
    }
</script>

<h1>Velkommen til ChatDOK</h1>
<h2>En tjeneste for å stille spørsmål til statsbudsjettet 2022</h2>
<p>Du kan stille spørsmål til statsbudsjettet i feltet under. Prøv å stille så presise spørsmål som mulig for best mulig resultat.</p>

<div>
    <input bind:value={spm} placeholder="Spørsmål til statsbudsjette" type="text">
    <button on:click={beOmSvar}>Send</button>
    <div>
        <p>Her kommer svaret: 
            {#await melding}
                <p>venter på svar</p>
            {:then svar}
                <p>{svar}</p>
            {:catch error}
                <p>Det skjedde en feil: {error.message}</p>
            {/await}
        </p>
    </div>
</div>

