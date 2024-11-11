<template>
  <div class="map-container">
    <div :id="mapID" class="map-container__body"></div>
  </div>
</template>

<script setup>
console.log("map heh");

import config from "@/config.js";
import { ref, onMounted } from "vue";

const props = defineProps({
  mapID: {
    type: String,
    required: true,
    default: "map",
  },
  center: {
    type: Array,
    required: true,
    default: [43.894568499999956, 56.27075056847694],
  },
  zoom: {
    type: Number,
    required: false,
    default: 7,
  },
  points: {
    type: Array,
    // coordinates
    // content - innerHTML
    required: true,
    default: [],
  },
  // попробовать передавать список Controls
  behavios: {
    typr: Array,
    required: false,
    default: [],
  },
});

let mapInitialized = false;

onMounted(() => {
  let script = document.createElement("script");
  script.src = config.yandex_api3;
  document.head.appendChild(script);
  script.onload = function () {};
  setTimeout(() => {
    initMap();
  }, 1000);
});

async function initMap() {
  await ymaps3.ready;
  const { YMap, YMapDefaultSchemeLayer, YMapDefaultFeaturesLayer, YMapMarker } =
    ymaps3;
  //нужно чтобы избежать повторной инициализации карты
  if (document.getElementById(props.mapID).innerHTML !== "") {
    return;
  }
  const map = new YMap(document.getElementById(props.mapID), {
    location: {
      center: props.center,
      zoom: props.zoom,
    },
  });

  // Добавьте слой с дорогами и зданиями
  map.addChild(new YMapDefaultSchemeLayer());
  // Добавьте слой для маркеров
  map.addChild(new YMapDefaultFeaturesLayer());



  props.points.forEach((point) => {
    const content = document.createElement("div");
    content.innerHTML = point.content;
    const marker = new YMapMarker(
      {
        coordinates: point.coordinates,
        draggable: true,
      },
      content
    );
    map.addChild(marker);
  });
}
</script>

<style lang="scss">
.map-container {
  /*   overflow: hidden;*/
  &__body {
    width: 100%;
    height: 100%;
    background-color: var(--bg-secondary);
  }
}
[class*="--main-engine-container"] {
  filter: grayscale(1);
}
</style>
