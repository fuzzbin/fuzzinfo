
<script>
    let tall = 0;

    function tallInk() {
        tall = tall + 1;
    }   
</script>


Nummeret viser nå: {tall}

<button on:click={tallInk}>Trykk på meg for å øke nummeret</button>