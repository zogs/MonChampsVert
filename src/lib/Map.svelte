<script>
import { onMount } from "svelte";

import { lat, lon } from '$lib/stores/AppStore';

import * as turf from '@turf/turf';
import * as geojsonBretagne from './bretagne.json';
import * as geojsonCoursDeau from './../../static/data/rivieres.json';

let _deckgl;
let _baseLayers = [];
let _mapViewState = {
  latitude: 48.111,
  longitude: -4.148,
  zoom: 7
}
let _closestRiver = null;

let Deck;
let TileLayer;
let BitmapLayer;
let GeojsonLayer;
let PolygonLayer;
let IconLayer;

onMount(async () => {

  const mDeck = await import("@deck.gl/core/dist/esm/lib/deck");
  const mTileLayer = await import("@deck.gl/geo-layers/dist/esm/tile-layer/tile-layer");
  const mIconLayer = await import("@deck.gl/layers/dist/esm/icon-layer/icon-layer");
  const mBitmapLayer = await import("@deck.gl/layers/dist/esm/bitmap-layer/bitmap-layer");
  const mGeojsonLayer = await import("@deck.gl/layers/dist/esm/geojson-layer/geojson-layer");
  const mPolygonLayer = await import("@deck.gl/layers/dist/esm/polygon-layer/polygon-layer");
  Deck = mDeck.default;
  TileLayer = mTileLayer.default;
  BitmapLayer = mBitmapLayer.default;
  GeojsonLayer = mGeojsonLayer.default;
  PolygonLayer = mPolygonLayer.default;
  IconLayer = mIconLayer.default;

  createDeckMap();
  updateLayers();

});

function createDeckMap() {

  _deckgl = new Deck({
    canvas: document.getElementById('deckgl'),
    width: "100%",
    height: "100%",
    initialViewState: {..._mapViewState},
    useDevicePixels: false,
    controller: true,
    onClick: onClick,
    onViewStateChange: ({viewState}) => {
     // console.log(viewState);
    }
  });
}

function onClick(info) {
  $lat = info.coordinate[1];
  $lon = info.coordinate[0];

  findClosestRiver();


  updateLayers();
}

function findClosestRiver() {

  var point = turf.point([$lon, $lat]);
  var rivers = [];
  var distances = [];
  for(const cours of geojsonCoursDeau.features) {
    let nearestPoint = turf.nearestPointOnLine(cours, point);
    let distance = nearestPoint.properties.dist;
    rivers.push(cours);
    distances.push(distance);
  }

  let sorted = [...distances]
  sorted.sort(((a, b) => a - b));
  let index = distances.findIndex(i => i === sorted[0]);
  let river = rivers[index];

  _closestRiver = river;

}

function updateLayers() {
  const basemap = new TileLayer({
    id: 'basemap',
    data: 'https://api.tiles.mapbox.com/v4/mapbox.satellite/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoiY29yZW50aW5yZW5hdXQiLCJhIjoiY2t2bndndG1oMTlpcTJvbzU5dXBqemljYiJ9.79K8rkvZPprfrGfE0wCzhw',
    tileSize: 256,
    renderSubLayers: props => {
      const {bbox: {west, south, east, north}} = props.tile;
      return new BitmapLayer(props, {
        data: null,
        image: props.data,
        bounds: [west, south, east, north]
      })
    }
  })

  const bretagne = new GeojsonLayer({
    id: 'bretagne',
    data: geojsonBretagne,
    pickable: false,
    stroke: true,
    filled: false,
    extruded: false,
    lineWidthUnits: 'pixels',
    getLineWidth: 2,
    getLineColor: [255, 250, 250, 100]
  })

  const coursdeau = new GeojsonLayer({
    id: 'coursdeau',
    data: geojsonCoursDeau,
    pickable: false,
    stroke: true,
    filled: false,
    extruded: false,
    lineWidthUnits: 'pixels',
    getLineWidth:2,
    getLineColor: [47, 236, 255]
  });

  const river = new GeojsonLayer({
    id: 'river',
    data: _closestRiver,
    pickable: false,
    stroke: true,
    filled: false,
    extruded: false,
    lineWidthUnits: 'pixels',
    getLineWidth:4,
    getLineColor: [250, 26, 155]
  });
console.log(_closestRiver)
  const point = new IconLayer({
    id: 'point-layer',
    data: [{lon: $lon, lat: $lat}],
    pickable: false,
    billboard: true,
    iconAtlas: '/images/icons-parcels.png',
    iconMapping: {
      default: {x: 0, y: 0, width: 64, height: 64, anchorX: 32, anchorY: 64 },
      current: {x: 64, y: 0, width: 64, height: 64, anchorX: 32, anchorY: 64 }
    },
    getIcon: d => 'current',
    getPosition: d => [d.lon, d.lat],
    sizeScale: 1,
    getSize: d => 30,
    updateTriggers: {
      getPosition: [$lat, $lon],
    },
  });

  _baseLayers = [
    basemap,
    bretagne,
    coursdeau,
    river,
    point
  ]

  _deckgl.setProps({
    layers: [
      ..._baseLayers,
    ]
  });
}

function getGPSPosition() {

  $lat = 48.390394;
  $lon = -4.486076;

  updateLayers();
}


</script>

<map>
  <canvas id="deckgl"></canvas>
  <button on:click={getGPSPosition}>Ma position GPS</button>
</map>

<style>
  map { position:relative; flex:1; }
  button { position:absolute; bottom:10px; right:10px; font-size: 60%; border-radius: 5px; }
</style>