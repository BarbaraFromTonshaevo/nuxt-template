<template>
    <div class="popup" :class="{ active: props.state }">
      <div class="popup__bg" @click="closePopup"></div>
      <div class="popup__window">
        <button class="popup__close" @click="closePopup">
          <svg>
            <use xlink:href="/icons/sprite.svg#close"></use>
          </svg>
        </button>
        <slot />
      </div>
    </div>
  </template>
  
  <script setup>
  const props = defineProps(["state"]);
  const emits = defineEmits(["closePopup"]);
  function closePopup() {
    emits("closePopup");
  }
  </script>
  
  <style lang="scss">
  .popup {
    visibility: hidden;
    opacity: 0;
    display: flex;
    justify-content: center;
    align-items: center;
  
    z-index: 11;
    position: fixed;
    top: 0;
    right: -20px;
    bottom: 0;
    left: 0;
    overflow-y: scroll;
    padding: 30px 20px 30px 0;
    transition: opacity 0.4s, visibility 0.4s;
  
    &.active {
      opacity: 1;
      visibility: visible;
    }
  
    &__bg {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(37, 55, 80, 0.3);
    }
  
    &__window {
      display: flex;
      width: fit-content;
      min-height: 280px;
      margin: auto;
      background-color: #fff;
      position: relative;
      top: -60px;
      padding: 72px 130px;
      transition: top 0.4s;
      overflow: hidden;
      box-shadow: 0px 2px 20px 0px rgba(13, 13, 13, 0.05);
      border-top-left-radius: 120px;
    //   @media (max-width: 639px) {
    //     padding: 50px 30px;
    //   }
  
    //   @media (max-width: 479px) {
    //     padding: 30px 20px;
    //   }
    }
  
    &.active &__window {
      top: 0;
    }
  
    &__close {
      position: absolute;
      top: 24px;
      right: 24px;
      width: 32px;
      height: 32px;
  
      svg {
        width: 100%;
        height: 100%;
        fill: var(--icon-grey);
        transition: fill var(--time);
      }
      &:hover {
        fill: var(--icon-black);
      }
    //   @media (max-width: 767px) {
    //     top: 15px;
    //     right: 15px;
    //   }
  
    //   @media (max-width: 411px) {
    //     top: 10px;
    //     right: 10px;
    //   }
    }
  
    &__title {
      font: 500 44px/1.25 var(--font-title);
      text-align: center;
    //   @media (max-width: 1199px) {
    //     font-size: 40px;
    //   }
  
    //   @media (max-width: 767px) {
    //     font-size: 38px;
    //   }
  
    //   @media (max-width: 411px) {
    //     font-size: 28px;
    //   }
    }
  
    &__subtitle {
      font-size: 16px;
      text-align: center;
    }
  }
  @include tablet{

  }
  </style>