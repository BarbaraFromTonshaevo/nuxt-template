<template>
  <div class="slider-documents__wrap" ref="wrap">
    <SliderTop title="Сертификация компании" titleSize="h2"></SliderTop>
    <div class="slider-documents swiper" ref="slider">
      <div class="swiper-wrapper">
        <div class="swiper-slide" v-for="slide of slides">
          <CardDocument :title="item.field_name[0]" :url="item.field_file[0].url"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  slides: {
    type: Array,
    required: true,
    default: () => [],
  },
});

import Swiper from "swiper";
import "swiper/css";
import "swiper/css/effect-fade";
import { Navigation } from "swiper/modules";
import { ref, onMounted } from "vue";

const slider = ref(null),
  wrap = ref(null),
  swiper = ref(),
  prevBtn = ref(),
  nextBtn = ref();

onMounted(() => {
  // на тот случай, если слайдер находится внутри flex и grid
  prevBtn.value = wrap.value.querySelector(".slider__btn--prev");
  nextBtn.value = wrap.value.querySelector(".slider__btn--next");
  swiper.value = new Swiper(slider.value, {
    modules: [Navigation],
    slidesPerView: 1,
    speed: 300,
    navigation: {
      nextEl: nextBtn.value,
      prevEl: prevBtn.value,
    },
  });
});
</script>
