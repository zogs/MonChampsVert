<script>
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';
  import IconParametre from '$lib/icons/parametre.svelte';
  import IconLocalisation from '$lib/icons/localisation.svelte';
  import IconEtoile from '$lib/icons/etoile.svelte';

  let path;

  $: path = $page ? $page.path : '';
</script>

<section>
  <div on:click={() => goto('geolocate')} class:active={path == '/geolocate'}><IconLocalisation /></div>
  <div on:click={() => goto('parametres')} class:active={path == '/parametres'}><IconParametre /></div>
  <div on:click={() => goto('ratings')} class:active={path == '/ratings'}><IconEtoile /></div>
</section>

<style>
  section { display:flex; flex-direction:row; justify-content: space-between;}
  div { width:100%; padding:10px 0; text-align: center; cursor:pointer; }
  div:hover { background-color: rgba(0,0,0,0.5); }
  div.active { background-color: rgba(0,0,0,0.5); }
</style>