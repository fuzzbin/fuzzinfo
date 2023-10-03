<script>
    let melding = "Her kommer svaret etterhvert....."
    let spm = "";

    const beOmSvar = async (spm) => {
        console.log("spm: " + spm);
        const data = { query: spm};

        melding = await fetch('/api/chatdok', {
            method: 'POST',
            mode: 'no-cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(res => res.message)   
        console.log("Svar:" + melding);
        return melding;
    }


    const beOmSvarChroma = async (spm) => {
        console.log("spm: " + spm);
        const data = { query: spm};

        melding = await fetch('/api/chromachat', {
            method: 'POST',
            mode: 'no-cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data) 
        })
            .then(res => res.json())
            .then(res => res.message)   
        console.log("Svar:" + melding);
        return melding;
    }

</script>

<h1>Velkommen til ChatDOK</h1>
<h2>En tjeneste for å stille spørsmål til statsbudsjettet 2022</h2>
<p>Du kan stille spørsmål til statsbudsjettet i feltet under. Prøv å stille så presise spørsmål som mulig for best mulig resultat.</p>

<div>
    <input bind:value={spm} placeholder="Spørsmål til statsbudsjettet" type="text" style="width: 20rem; margin-bottom: 20px;">
    <br>
    <button on:click={beOmSvar(spm)}>Spør dokumentet</button>
    <button on:click={beOmSvarChroma(spm)}>Spør Chroma</button>
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

