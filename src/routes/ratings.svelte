<script>
  import { goto } from '$app/navigation';
  import Notes from '$lib/Notes.svelte';
  import Footer from '$lib/Footer.svelte';
  import Header from '$lib/Header.svelte';
  import IconInfo from '$lib/icons/info.svelte';

</script>

<Header>Résultat <span on:click={() => goto('/info')}><IconInfo /></span></Header>
<Notes data/>
<Footer />

<style>
  span { position:absolute; right:10px; cursor:pointer; }
</style>