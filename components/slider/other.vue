<template>
  <div class="other-slider__wrap" ref="wrap">
    <SliderTop :title="title" />
    <div class="other-slider swiper" ref="slider">
      <div class="other-slider__wrapper swiper-wrapper">
        <div
          class="other-slider__slide swiper-slide"
          v-for="slide of slides"
          :key="slide.title"
        >
          <div class="other-slider__img" v-html="slide.field_image[0].markup"></div>
          <div class="other-slider__title title-h5">{{ slide.title }}</div>
          <div class="other-slider__wraps">
            <div class="other-slider__wrap">
              <div class="other-slider__wrap-subtitle">Регион</div>
              <div class="other-slider__wrap-text">{{ slide.field_region[0].markup }}</div>
            </div>
            <div class="other-slider__wrap">
              <div class="other-slider__wrap-subtitle">Сегмент</div>
              <div class="other-slider__wrap-text">{{ slide.field_segment[0].markup }}</div>
            </div>
          </div>
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
  title: {
    type: String,
    required: false,
    default: "Другие проекты",
  },
});

import Swiper from "swiper";
import "swiper/css";
import "swiper/css/effect-fade";
import { Navigation } from "swiper/modules";
import { ref, onMounted, onBeforeUnmount } from "vue";

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
    slidesPerView: 1,
    spaceBetween: 10,
    speed: 300,
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
        slidesPerView: 2,
        spaceBetween: 20,
      },
      1366: {
        slidesPerView: 2,
        spaceBetween: 30,
      },
      1641: {
        slidesPerView: 2,
        spaceBetween: 40,
      },
    },
  });
});
</script>

<style lang="scss">
.other-slider {
  & {
    width: 0;
  }
  &__slide {
    position: relative;
    width: 100%;
    padding-bottom: 50px;
  }
  &__img {
    width: 100%;
    aspect-ratio: 639/330;
    display: flex;
    margin-bottom: 30px;
    picture,
    img {
      display: flex;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  &__title {
    margin-bottom: 20px;
  }
  &__wraps {
    display: flex;
    gap: 15px 40px;
    flex-wrap: wrap;
  }
  &__wrap-subtitle {
    font-weight: 500;
    color: var(--text-default-additional);
    margin-bottom: 10px;
  }
  &__wrap-text {
    font-weight: 500;
  }
}
@include tablet {
  .other-slider {
    &__wrap-subtitle {
      font-size: 14px;
      margin-bottom: 8px;
    }
    &__wrap-text {
      font-size: 14px;
    }
  }
}
@include mobile {
  .other-slider {
    &__slide {
      display: flex;
      flex-direction: column;
      padding-bottom: 0;
    }
    &__img {
      aspect-ratio: 280/200;
      margin-bottom: 20px;
    }
    &__title {
      order: 3;
      margin-top: 18px;
      margin-bottom: 0;
    }
    &__wrap-subtitle {
      font-size: 12px;
      margin-bottom: 6px;
    }
    &__wrap-text {
      font-size: 12px;
    }
  }
}
</style>
