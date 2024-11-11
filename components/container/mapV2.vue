<!-- !!! Будьте аккуратно с координатами, они отличаются с версией v3 -->
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
    // id
    // coordinates
    // content - innerHTML
    // radius
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

onMounted(() => {
  // console.log(!document.querySelector(`script[src="${config.yandex_api}"]`));
  if (!document.querySelector(`script[src="${config.yandex_api}"]`)) {
    let script = document.createElement("script");
    script.src = config.yandex_api;
    document.head.appendChild(script);
    script.onload = function () {};
    setTimeout(() => {
      initMap();
    }, 1000);
  } 
  // else {
  //   // Если скрипт уже загружен, просто инициализируем карту
  //   console.log("else");
  //   initMap();
  // }
});

async function initMap() {
  const mapDOM = document.getElementById(props.mapID);
  if (mapDOM && mapDOM.innerHTML == "") {
    var map = new ymaps.Map(
      mapDOM,
      {
        center: props.center.reverse(),
        zoom: props.zoom,
        controls: [],
      },
      { suppressMapOpenBlock: true }
    );
    props.points.forEach((point) => {
      var pointLayout = ymaps.templateLayoutFactory.createClass(point.content);
      var stock = new ymaps.Placemark(
        point.coordinates.reverse(),
        {},
        {
          iconLayout: pointLayout,
          // Описываем фигуру активной области "Круг".
          iconShape: {
            type: "Circle",
            // Круг описывается в виде центра и радиуса
            coordinates: [0, 0],
            radius: point.radius ? point.radius : 32,
          },
        }
      );
      map.geoObjects.add(stock);
    });
    map.behaviors.disable('scrollZoom');
  }
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
[class*="-ground-pane"] {
  filter: grayscale(1);
}
</style>
