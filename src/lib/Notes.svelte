<script>

import { onMount } from 'svelte';
import Note from './Note.svelte';

let date0 = new Date();
let date1 = new Date(date0.getTime() + 86400000);
let date2 = new Date(date0.getTime() + 86400000*2);
let date3 = new Date(date0.getTime() + 86400000*3);
let date4 = new Date(date0.getTime() + 86400000*4);
let date5 = new Date(date0.getTime() + 86400000*5);
let date6 = new Date(date0.getTime() + 86400000*6);

</script>

<section>
  <Note date={date0} />
  <Note date={date1} />
  <Note date={date2} />
  <Note date={date3} />
  <Note date={date4} />
  <Note date={date5} />
  <Note date={date6} />
</section>

<style>
  section { flex:1; display:flex; flex-direction:column; justify-content: space-around; background:#dae2ce; }
</style>

