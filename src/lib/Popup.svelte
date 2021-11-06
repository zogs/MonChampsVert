<script>
  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();
</script>

<div class="container" on:click|self={() => dispatch('focusout')}>
  <div class="content">
    <slot></slot>
  </div>
</div>

<style>
  .container { position:absolute; top:0; left:0; right:0; bottom:0; background:rgba(0,0,0,0.4); display:flex; justify-content: center; align-items: center; }
  .content { background:white; min-width: 300px; max-width:400px; border-radius:5px; }
</style>