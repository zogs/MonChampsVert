<script>
  import { dataMeteo, dataClim } from '$lib/stores/AppStore';
  import { page } from '$app/stores'
  import { deviceWidth } from '$lib/stores/AppStore';
  import { fly, fade} from 'svelte/transition';

  import dataClim2020 from '../../static/data/data_clim_2020.json';
  import dataClim2021 from '../../static/data/data_clim_2021.json';
  $dataMeteo = dataClim2021;
  $dataClim = dataClim2020;

</script>

{#key $page}
<main in:fade="{{ duration: 100 }}" class:desktop-mode={$deviceWidth > 800}>
  <slot></slot>
</main>
{/key}

<style>
  :global(html) { height:100%; width:100%; background: linear-gradient(#9199e4, #b8ffde); overflow:hidden; }
  :global(body) { height:100%; width:100%;display:flex; justify-content:center; align-items:flex-start; overflow-x: hidden; background-image: url('images/smartphone.png'); background-repeat: no-repeat; background-position: 50% 150px }
  :global(body *)  { font-family: 'Comfortaa'; }
  main { position:absolute; top:0; left:0; right:0; bottom:0; display:flex; flex-direction:column; background-color:#9cd248; overflow-x: hidden; z-index:2;}
  main.desktop-mode { position:relative; top: 220px; width:370px; height:620px; }
  :global(button) { padding: 8px 25px; border-radius:15px; background-color:white; color: #000; border:2px solid white; cursor:pointer; font-size:16px }
  :global(button:hover) { border: 2px solid rgb(112, 112, 112) }
</style>

