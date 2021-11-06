<script>
  import { dataMeteo, dataClim } from '$lib/stores/AppStore';
  import dataClim2020 from '../../static/data/data_clim_2020.json';
  import dataClim2021 from '../../static/data/data_clim_2021.json';

  $dataMeteo = dataClim2021;
  $dataClim = dataClim2020;

</script>

<main>
  <slot></slot>
</main>

<style>
  :global(body *)  { font-family: 'Comfortaa'; }
  main { position:absolute; top:0; left:0; right:0; bottom:0; display:flex; flex-direction:column; background-color:#9cd248;  }
  :global(button) { padding: 8px 25px; border-radius:15px; background-color:white; color: #000; border:0; cursor:pointer; font-size:16px }
  :global(button:hover) { background-color:rgb(226, 226, 226) }
</style>

