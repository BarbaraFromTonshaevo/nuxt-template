<template>
  <div ref="wrap" class="slider-gallery__wrap">
    <SliderTop :title="title" />
    <div ref="slider" class="slider-gallery swiper">
      <div class="swiper-wrapper">
        <div
          v-for="(slide, index) in slides"
          :key="'slide' + index"
          class="slider-gallery__slide swiper-slide"
        >
          <a
            v-if="isLocalImages"
            :href="slide.raw"
            data-fancybox="gallery"
            class="slider-gallery__fancybox style-picture-img"
          >
            <NuxtPicture format="jpg,webpjpeg,png" :src="slide"/>
          </a>
          <a
            v-else
            :href="slide.raw"
            data-fancybox="gallery"
            class="slider-gallery__fancybox style-picture-img"
            v-html="slide.markup"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Swiper from "swiper";
import { Navigation, EffectFade } from "swiper/modules";
import { Fancybox } from "@fancyapps/ui";
import "@fancyapps/ui/dist/fancybox/fancybox.css";
import "swiper/css";

import { ref, onMounted } from "vue";

defineProps({
  slides: {
    type: Array,
    required: true,
    default: () => [],
  },
  title: {
    type: String,
    required: false,
    default: "Галерея",
  },
  isLocalImages: {
    type: Boolean,
    required: false,
    default: false,
  },
});

const slider = ref(null),
  wrap = ref(null),
  swiper = ref(),
  prevBtn = ref(),
  nextBtn = ref();

function updateSliderWidth() {
  if (slider.value) {
    slider.value.style.width = "0px";
    setTimeout(() => {
      slider.value.style.width = wrap.value.clientWidth + "px";
    }, 0);
    // здесь можно добавить любой дополнительный код для пересчета ширины слайдера
  }
}

onBeforeUnmount(() => {
  window.removeEventListener("resize", updateSliderWidth);
});

onMounted(() => {
  // на тот случай, если слайдер находится внутри flex и grid
  window.addEventListener("resize", updateSliderWidth);
  slider.value.style.width = wrap.value.clientWidth + "px";
  prevBtn.value = wrap.value.querySelector(".slider__btn--prev");
  nextBtn.value = wrap.value.querySelector(".slider__btn--next");
  swiper.value = new Swiper(slider.value, {
    modules: [Navigation, EffectFade],
    slidesPerView: 1,
    speed: 300,
    effect: "fade",
    navigation: {
      nextEl: nextBtn.value,
      prevEl: prevBtn.value,
    },
  });
  Fancybox.bind("[data-fancybox]", {});
});
</script>

<style lang="scss">
.slider-gallery {
  & {
    width: 0;
  }
  &__wrap {
    width: 100%;
  }
  &__slide {
    display: flex;
    width: 100%;
    aspect-ratio: 1318/660;
  }
  &__fancybox {
    display: flex;
    width: 100%;
    height: 100%;
    picture,
    img {
      display: flex;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  &__img {
    display: flex;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}
@include hover {
  .slider__slide:hover {
    &::after,
    &::before {
      opacity: 1;
    }
  }
}
@include mobile {
}
</style>
