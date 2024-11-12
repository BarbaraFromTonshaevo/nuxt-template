<template>
  <div ref="wrap" class="slider__wrap">
    <SliderTop :title="title" />
    <div ref="slider" class="swiper slider">
      <div class="swiper-wrapper slider__wrapper">
        <div
          v-for="(slide, index) in slides"
          :key="'slide' + index"
          class="swiper-slide slider__slide"
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
            class="slider__fancybox style-picture-img"
            v-html="slide.markup"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Swiper from "swiper";
import { Navigation } from "swiper/modules";
import { Fancybox } from "@fancyapps/ui";
import "@fancyapps/ui/dist/fancybox/fancybox.css";
import "swiper/css";
import { ref, onMounted, onBeforeUnmount } from "vue";

defineProps({
  slides: {
    type: Array,
    required: true,
    default: () => [],
  },
  title: {
    type: String,
    required: false,
    default: "Фотогалерея",
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
    setTimeout(()=>{
      slider.value.style.width = wrap.value.clientWidth + "px";
    }, 0)
    // здесь можно добавить любой дополнительный код для пересчета ширины слайдера
  }
}

onBeforeUnmount(() => {
  window.removeEventListener('resize', updateSliderWidth);
});

onMounted(() => {
  // на тот случай, если слайдер находится внутри flex и grid
  window.addEventListener('resize', updateSliderWidth);
  slider.value.style.width = wrap.value.clientWidth + "px";
  prevBtn.value = wrap.value.querySelector(".slider__btn--prev");
  nextBtn.value = wrap.value.querySelector(".slider__btn--next");
  swiper.value = new Swiper(slider.value, {
    modules: [Navigation],
    slidesPerView: 4,
    spaceBetween: 40,
    navigation: {
      nextEl: nextBtn.value,
      prevEl: prevBtn.value,
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 15,
      },
      481: {
        slidesPerView: 2,
        spaceBetween: 15,
      },
      768: {
        slidesPerView: 3,
        spaceBetween: 20,
      },
      1366: {
        slidesPerView: 4,
        spaceBetween: 20,
      },
      1641: {
        slidesPerView: 4,
        spaceBetween: 40,
      },
    },
  });
  Fancybox.bind("[data-fancybox]", {});
});
</script>

<style lang="scss">
.slider {
  & {
    width: 0;
  }
  &__wrap {
    width: 100%;
  }
  &__slide {
    display: flex;
    aspect-ratio: 410/367;
    &::after {
      position: absolute;
      top: 50%;
      left: 50%;
      content: "";
      display: block;
      width: 88px;
      height: 88px;
      border-radius: 50%;
      background-color: var(--bg-accent);
      background-repeat: no-repeat;
      background-position: center;
      transform: translate(-50%, -50%);
      opacity: 0;
      pointer-events: none;
      transition: opacity var(--time);
    }
    &::before {
      content: "";
      display: block;
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(255, 255, 255, 0.4);
      opacity: 0;
      pointer-events: none;
      transition: opacity var(--time);
    }
  }
  &__fancybox {
    display: flex;
    width: 100%;
    height: 100%;
    img {
      display: flex;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
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
</style>
