<template>
  <div class="slider__top">
    <h3 v-if="title" class="slider__title" :class="`title-${titleSize}`">{{ title }}</h3>
    <div class="slider__control">
      <ButtonIcon class="slider__btn slider__btn--prev" sprite="arrow" />
      <ButtonIcon class="slider__btn slider__btn--next" sprite="arrow" />
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    required: false,
    default: "",
  },
  titleSize: {
    type: String,
    required: false,
    default: "h3",
  },
});
</script>

<style lang="scss">
.slider {
  &__top {
    display: grid;
    grid-template-columns: 8fr 4fr;
    grid-gap: 6px;
    margin-bottom: 60px;
  }
  &__control {
    width: fit-content;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    margin-left: auto;
  }
  &__btn {
    width: 70px;
    height: 70px;
    transition: background-color var(--time), opacity var(--time);
    opacity: 1;
    // border-radius: 50%;
    &--prev {
      transform: rotate(180deg);
    }
    svg {
      width: 20px;
      height: 20px;
      fill: var(--icon-black);
      transition: fill var(--time);
    }
    &.swiper-button-disabled {
      pointer-events: none;
      opacity: 0.5;
    }
    &.swiper-button-lock {
      width: 0;
      height: 0;
    }
  }
}
@include hover {
  .slider {
    &__btn:hover {
      background-color: var(--btn-primary);
      svg {
        fill: var(--icons-white);
      }
    }
  }
}
@include tablet {
  .slider {
    &__top {
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-wrap: wrap;
      gap: 10px 40px;
      margin-bottom: 40px;
    }
    &__control{
      margin-left: initial;
    }
  }
}
@include mobile {
  .slider__top {
    margin-bottom: 32px;
  }
  .slider__btn {
    width: 32px;
    height: 32px;
  }
}
</style>
