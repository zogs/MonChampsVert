<script>
  import Logo from '$lib/icons/logo.svelte';
  import { goto } from '$app/navigation';
</script>
<header>
  <span on:click={() => goto('/')}><Logo size=30/></span>
  <slot></slot>
</header>

<style>
  header { position:relative; padding: 12px 0; background-color: #9cd248; color:white; display:flex; justify-content: center; align-items:center; box-shadow:0 3px 5px rgba(0,0,0,0.5); text-transform: uppercase; z-index:10 }
  span { position:absolute; left:10px; top:0; bottom:0; display: flex; align-items: center; cursor:pointer; }
</style>