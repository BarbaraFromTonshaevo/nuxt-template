<template>
  <div class="front-projects-slider swiper" ref="slider">
    <div class="swiper-wrapper">
      <div class="front-projects-slider__slide swiper-slide" v-for="slide of slides">
        <div class="front-projects-slider__img" v-html="isMobile? slide.field_image_adaptive[0].markup : slide.field_image[0].markup"></div>
        <div class="front-projects-slider__block">
          <h4 class="front-projects-slider__title title-h4">
            {{ slide.field_name[0] }}
          </h4>
          <div class="front-projects-slider__text">
            {{ slide.field_description_short[0] }}
          </div>
          <div class="front-projects-slider__controls-place">
            <div class="front-projects-slider__controls">
              <div class="front-projects-slider__prev">
                <svg>
                  <use xlink:href="/icons/sprite.svg#arrow"></use>
                </svg>
              </div>
              <div class="front-projects-slider__next">
                <svg>
                  <use xlink:href="/icons/sprite.svg#arrow"></use>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="front-projects-slider__pagination-wrap">
      <div
        class="front-projects-slider__pagination-controls front-projects-slider__controls"
      >
        <div class="front-projects-slider__prev">
          <svg>
            <use xlink:href="/icons/sprite.svg#arrow-short"></use>
          </svg>
        </div>
        <div class="front-projects-slider__next">
          <svg>
            <use xlink:href="/icons/sprite.svg#arrow-short"></use>
          </svg>
        </div>
      </div>
      <div class="front-projects-slider__pagination"></div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  slides: {
    type: Array,
    required: true,
    default: [],
  },
});

const { isMobile } = useDevice();

import Swiper from "swiper";
import "swiper/css";
import "swiper/css/effect-fade";
import { Navigation, EffectFade, Pagination } from "swiper/modules";
import { ref, onMounted } from "vue";

const slider = ref(null);
const swiper = ref();

onMounted(() => {
  swiper.value = new Swiper(slider.value, {
    modules: [Navigation, EffectFade, Pagination],
    slidesPerView: 1,
    speed: 300,
    loop: true,
    effect: "fade",
    navigation: {
      nextEl: ".front-projects-slider__next",
      prevEl: ".front-projects-slider__prev",
    },
    pagination: {
      el: ".front-projects-slider__pagination",
      type: "fraction",
    },
  });
});
</script>

<style lang="scss">
.front-projects-slider {
  position: relative;
  &__slide {
    position: relative;
    width: 100%;
    aspect-ratio: 1760/800;
  }
  &__img {
    width: 100%;
    aspect-ratio: 1760/700;
    display: flex;
    img {
      display: flex;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  &__block {
    position: absolute;
    bottom: 0;
    right: 100px;
    width: 770px;
    background-color: var(--bg-secondary);
    padding: 50px;
  }
  &__title {
    margin-bottom: 24px;
  }
  &__text {
    --num-lines: 2;
    font-size: 18px;
    margin-bottom: 40px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -moz-box;
    -moz-box-orient: vertical;
    display: -webkit-box;
    -webkit-line-clamp: var(--num-lines);
    -webkit-box-orient: vertical;
    line-clamp: var(--num-lines);
    box-orient: vertical;
  }
  &__controls {
    display: flex;
    gap: 10px;
  }
  &__prev,
  &__next {
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 70px;
    height: 70px;
    border-radius: 50%;
    background-color: var(--btn-tertiary);
    transition: background-color var(--time);
    svg {
      width: 20px;
      height: 20px;
      fill: var(--icons-black);
      transition: fill var(--time);
    }
  }
  &__prev {
    transform: rotate(180deg);
  }
  &__pagination-wrap {
    position: absolute;
    z-index: 2;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100px;
    aspect-ratio: 1760/700;
    pointer-events: none;
  }
  &__pagination-controls {
    display: none;
  }
  &__pagination {
    position: absolute;

    bottom: 50px;
    right: 150px;
    font-size: 18px;
  }
}
@include hover {
  .front-projects-slider {
    &__prev:hover,
    &__next:hover {
      background-color: var(--btn-primary);
      svg {
        fill: var(--icons-white);
      }
    }
  }
}
@include laptop {
  .front-projects-slider {
    &__slide {
      aspect-ratio: initial;
      height: calc((100vw - 80px) * 0.39 + 250px);
    }
    &__block {
      right: 50px;
    }
    &__pagination {
      right: 100px;
    }
  }
}
@include tablet {
  .front-projects-slider {
    &__slide {
      height: calc((100vw - 80px) * 0.39 + 150px);
    }
    &__block {
      width: 600px;
      left: 50px;
      right: initial;
      padding: 30px;
    }
    &__pagination-wrap {
      left: 50px;
      width: 600px;
    }
    &__pagination {
      right: 30px;
      bottom: 30px;
    }
    &__title {
      margin-bottom: 10px;
    }
    &__text {
      font-size: 16px;
      margin-bottom: 20px;
    }
  }
}
@include tablet-s {
  .front-projects-slider {
    background-color: var(--bg-secondary);

    &__slide {
      height: 100%;
    }
    &__img{
        aspect-ratio: 1;
    }
    &__block {
      position: static;
      width: 100%;
      display: flex;
      flex-direction: column;
      height: 100%;
    }
    &__controls {
      opacity: 0;
      visibility: hidden;
    }
    &__pagination-wrap {
      z-index: 2;
      left: initial;
      width: 100%;
      pointer-events: initial;
    }
    &__pagination-controls {
      margin-left: 30px;
      opacity: 1;
      visibility: visible;
      display: flex;
    }
    &__pagination {
      right: 30px;
      bottom: 30px;
    }
    &__text {
      --num-lines: 5;
    }
  }
}
@include mobile{
    .front-projects-slider{
        &__pagination-controls{
            position: absolute;
            bottom: 20px;
            left: 20px;
            margin: 0;
        }
        &__prev,&__next{
            width: 44px;
            height: 44px;
            svg{
                width: 12px;
                height: 12px;
            }
        }
    }
}
</style>
