<script>
  import Footer from '$lib/Footer.svelte';
  import Header from '$lib/Header.svelte';
  import Popup from '$lib/Popup.svelte';
  import { seed, input } from '$lib/stores/AppStore';
  import { goto } from '$app/navigation';

  let modal = null;

  function selectSeed(name) {
    $seed = name;
    modal = null;
  }

  function selectInput(name) {
    $input = name;
    modal = null;
  }
</script>

<Header>Paramétrage Agricole</Header>
<section>
  <div class="buttons">
    <button on:click={() => modal = 'input'}>Fertilisant</button>
    <div class="params">
      {$input}
    </div>
  </div>
  <div class="buttons">
    <button on:click={() => modal = 'seed'}>Semence</button>
    <div class="params">
      {$seed}
    </div>
  </div>
  <div class="buttons">
    <button on:click={() => goto('ratings')} disabled={$seed == 'Aucun' && $input == 'Aucune'}>Valider</button>
  </div>
</section>
<Footer />

{#if modal == 'seed'}
<Popup on:focusout={() => modal = null}>
  <ul>
    <li on:click={() => selectSeed('mais')}>maïs</li>
    <li on:click={() => selectSeed('colza')}>colza</li>
  </ul>
</Popup>
{/if}

{#if modal == 'input'}
<Popup on:focusout={() => modal = null}>
  <ul>
    <li on:click={() => selectInput('TYPE 1')}>TYPE 1 <br><small>Fumiers (sauf volaille), compost</small></li>
    <li on:click={() => selectInput('TYPE 2')}>TYPE 2 <br><small>Fientes de volailles, lisier, fumier volailles, digestats bruts de méthanisation, effluents peu chargés</small></li>
    <li on:click={() => selectInput('TYPE 3')}>TYPE 3 <br><small>Fertilisants azotés minéraux et urétiques de synthèse</li>
  </ul>
</Popup>
{/if}

<style>
  section { flex:1; display:flex; flex-direction:column; justify-content: space-around; align-items:center; background:#dae2ce;}
  .buttons { width:100%; display: flex; flex-direction: column; justify-content: center; align-items:center;}
  button { width: auto;}
  button[disabled] { opacity:0.5; pointer-events: none;;}
  .params { margin-top:30px; color:white; font-style:italic; font-weight: bold; font-size: 18px; text-transform: capitalize; }
  ul { list-style: none; padding:0; margin:0; }
  ul li { position:relative; padding:20px 0 20px 60px; cursor:pointer; text-transform: capitalize; }
  ul li:hover { background:#f0f0f0;}
  ul li:before{ content:''; position:absolute; left:10px; top:50%; transform:translate(0%, -50%); width:30px; height:30px; border:2px solid black; border-radius: 100%; }
  ul li:after{ content:''; position:absolute; left:10px; top:50%; transform:translate(11px,-50%); width:8px; height:8px; border:2px solid black; border-radius:100%; }
</style>

