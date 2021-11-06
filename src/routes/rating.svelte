<script>
  import Note from '$lib/Note.svelte';
  import Footer from '$lib/Footer.svelte';
  import Header from '$lib/Header.svelte';
  import IconInfo from '$lib/icons/info.svelte';
  import { dateSelected, resultBonnePratique, resultQualiteAir, resultQualiteEau, resultReglementation } from '$lib/stores/AppStore';
  import StarRating from 'svelte-stars-rating'

  const starStyle = {
    styleStarWidth: 20,
    styleEmptyStarColor: "#737373",
    styleFullStarColor: "#ffd219"
  }
</script>

<Header>Résultat <span on:click={() => goto('/info')}><IconInfo /></span></Header>
<section>
  <Note date={$dateSelected}/>

  <article class="content">
    <div>
      Réglementation
      <strong>{#if $resultReglementation == 1}Autorisé{:else}Déconseillé{/if}</strong>
    </div>
    <div>
      Bonne pratique
      <strong><StarRating rating={$resultBonnePratique} isIndicatorActive={false} style={starStyle}/></strong>
    </div>
    <div>
      Qualité de l'air
      <strong><StarRating rating={$resultQualiteAir} isIndicatorActive={false} style={starStyle}/></strong>
    </div>
    <div>
      Qualité de l'eau
      <strong><StarRating rating={$resultQualiteEau} isIndicatorActive={false} style={starStyle}/></strong>
    </div>
  </article>
</section>
<Footer />

<style>
  span { position:absolute; right:10px; cursor:pointer; }
  section { flex:1; display:flex; flex-direction:column; justify-content: space-around; align-items:center; background:#dae2ce; padding-top:20px; }
  .content { background-color: white; margin-top:30px; padding-bottom:30px; flex:1; height:80%; width:80%; display:flex; flex-direction:column; justify-content: space-between;}
  div { padding:30px 0;  display:flex; flex-direction:row; justify-content:space-between; padding-left:20px; padding-right:20px; }
</style>