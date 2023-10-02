<script>
    let melding = "Hei hei"
    let spm = "";

    const beOmSvar = async (spm) => {
        console.log("spm: " + spm);
        const data = { query: spm};

        melding = await fetch('/api/chatdok', {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            mode: 'no-cors', // no-cors, *cors, same-origin
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data) // body data type must match "Content-Type" header
        })
            .then(res => res.json())
            .then(res => res.message)   
        console.log("Svar:" + melding);
        return melding; // parses JSON response into native JavaScript objects
    }


    const beOmSvarChroma = async (spm) => {
        console.log("spm: " + spm);
        const data = { query: spm};

        melding = await fetch('/api/chromachat', {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            mode: 'no-cors', // no-cors, *cors, same-origin
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data) // body data type must match "Content-Type" header
        })
            .then(res => res.json())
            .then(res => res.message)   
        console.log("Svar:" + melding);
        return melding; // parses JSON response into native JavaScript objects
    }

</script>

<h1>Velkommen til ChatDOK</h1>
<h2>En tjeneste for å stille spørsmål til statsbudsjettet 2022</h2>
<p>Du kan stille spørsmål til statsbudsjettet i feltet under. Prøv å stille så presise spørsmål som mulig for best mulig resultat.</p>

<div>
    <input bind:value={spm} placeholder="Spørsmål til statsbudsjette" type="text">
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

