<script>
  import { goto } from '$app/navigation';

  import Logo from '$lib/icons/logo.svelte';


</script>

<section>
<h1>Mon Champs Vert</h1>
<div class="logo">
  <Logo />
</div>
<div class="buttons">
  <button on:click={() => goto('geolocate')}>Commencer</button>
</div>
</section>

<style>
  section { position:absolute; top:0; left:0; bottom:0; right:0; display:flex; flex-direction:column; justify-content: space-around;}
  h1 { font-size: 40px; text-align:center; color:white;  font-family:'Courgette'; }
  .logo { text-align:center; }
  .buttons { width:100%; display:flex; justify-content:center;   }

</style>
