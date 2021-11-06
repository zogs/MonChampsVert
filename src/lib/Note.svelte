<script>

import { onMount } from 'svelte';
import dayjs from 'dayjs';
import { goto } from '$app/navigation';
import StarRating from 'svelte-stars-rating'
import { seed, input, dataClim, nbPrevi, dateSelected, resultBonnePratique, resultQualiteAir, resultQualiteEau, resultReglementation } from '$lib/stores/AppStore';
import isPermitted from './calculateurReglementaire.js';

export let date;


  let previDates = [];
  let previSeries = [];
  let noteWind = 0;
  let noteRain = 0;
  let noteSun = 0;
  let noteTemp = 0;
  let noteAtmos = 0;

  let moyBonnePratique = 0;
  let moyTotal = 0;
  let rating = null;

  const today = new Date();
  const knitMeterSecond = 0.5144;
  const starStyle = {
    styleStarWidth: 20,
    styleEmptyStarColor: "#737373",
    styleFullStarColor: "#ffd219"
  }

  $:console.log('bonne pratique', $resultBonnePratique)

  onMount(async () => {

      computePreviDates();
      //console.log('previDates', previDates);
      getPreviSeries();
      //console.log('previSeries', previSeries);
      addFakeRainData();
      addFakeAtmosData();
      //console.log('previSeries', previSeries);
      calculWindNote();
      calculSunNote();
      calculRainNote();
      calculTempNote();

      calculAtmosphere();
      calculReglementaire();

      moyBonnePratique = (noteWind+noteRain+noteSun+noteTemp) / 4;
      moyTotal = moyBonnePratique;

      rating = moyTotal*5;

      $resultBonnePratique = moyBonnePratique*5;
      $resultQualiteAir = 3;
      $resultQualiteEau = 2;
  });

  function computePreviDates() {
    let dates = [date];
    for (let i = 1; i <= $nbPrevi ; i++) {
      const d = new Date(today.getTime() + 86400000*i);
      dates.push(d);

    }
    previDates = dates;
  }

  function getPreviSeries() {
    let series = [];
    for (const d of previDates) {
      const YYYYMMDD = '2020'+dayjs(d).format('MMDD');
      series.push($dataClim.find(m => m.DATE == YYYYMMDD));
    }
    previSeries = series;
  }

  function addFakeRainData() {
    for(const serie of previSeries) {
      let rand = Math.random();
      let mm;
      if(rand < 0.3) {
        mm = 0;
      } else if(rand < 0.6) {
        mm = Math.ceil(Math.random()*15);
      } else {
        mm = Math.ceil(Math.random()*30)
      }
      serie.RAIN = mm;
    }
  }

  function addFakeAtmosData() {
    for(const serie of previSeries) {
      let rand = Math.random()*50;
      serie.PM10 = rand;
    }
  }

  function calculWindNote() {
    let nb = 0;
    for(const s of previSeries) {
      let value = s.FXI.replace(',','.');
      let meterPerSecond = parseFloat(value);

      let knits = meterPerSecond*knitMeterSecond;
      if(knits > 25) nb++;
    }
    noteWind = ($nbPrevi-nb)/$nbPrevi;
  }

  function calculSunNote() {
    let sum = 0;
    let seuil = 7 * 350; // 2450min
    for(const s of previSeries) {
      let value = parseInt(s.INST);
      sum += value;
    }
    noteSun = 1 - sum/seuil;
  }

  function calculRainNote() {
    let todayRain = previSeries[0].RAIN;
    let note;
    if(todayRain >= 15) {
      let cumul = 0;
      for(const s of previSeries) {
        cumul += s.RAIN;
      }
      if(cumul > 100) {
        note = 0;
      } else {
        note = 1;
      }
    } else {
      note = 0;
    }
    noteRain = note;
  }

  function calculAtmosphere() {
    let todayVal = previSeries[0].PM10;
    let seuil = 50;
    let ratio = (seuil - todayVal)/seuil;
    noteAtmos = ratio;

  }

  function calculTempNote() {
    let cumul = 0;
    let index = $dataClim.findIndex(d => d.DATE === '2020'+dayjs(today).format('MMDD'));
    let series = $dataClim.slice(0, index);
    for(const s of series) {
      let tmin = parseFloat(s.TN.replace(',','.'));
      if(tmin < 0) tmin = 0;
      let tmax = parseFloat(s.TX.replace(',','.'));
      if(tmax > 18) tmax = 18;
      cumul += (tmax+tmin)/2;
    }
    if(cumul > 200) {
      noteTemp = 1;
    } else {
      noteTemp = 0;
    }
  }

  function calculReglementaire() {
    let month = date.getMonth()+1;

    $resultReglementation = isPermitted($seed, $input, month);
  }

  function chooseDate(d) {
    $dateSelected = d;
    goto('/rating');
  }


</script>

<article on:click={() => chooseDate(date)}>
  <strong>{ date.toLocaleDateString('fr', {weekday: 'long', day: '2-digit'}) }</strong>
  {#if rating }
  <span class="rating">
    <StarRating rating={rating} isIndicatorActive={false} style={starStyle}/>
  </span>
  {/if}
</article>

<style>
  article { padding: 10px; background:#ffffff; display:flex; align-items:center; justify-content: center; }
  strong { display:block; width: 120px; text-transform: capitalize; }
</style>
