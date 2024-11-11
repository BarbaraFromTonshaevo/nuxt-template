<template>
  <div
    class="tooltip"
    :class="[{ 'tooltip--modal': isModal }, { 'tooltip--opened': isOpened }]"
  >
    <div class="tooltip__icon" @click="openTooltip">
      <svg><use xlink:href="/icons/sprite.svg#i"></use></svg>
    </div>
    <div class="tooltip__text" v-if="!isModal"><slot></slot></div>
    <div class="tooltip__modal" v-if="isModal">
      <div class="tooltip__modal-bg" @click="isOpened = false"></div>
      <div class="tooltip__modal-body">
        <div class="tooltip__close" @click="isOpened = false">
          <svg><use xlink:href="/icons/sprite.svg#close"></use></svg>
        </div>
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
const props = defineProps({
  isModal: {
    type: Boolean,
    required: false,
    default: false,
  },
});
// onMounted(()=>{

// })
const isOpened = ref(false);
function openTooltip() {
  if (props.isModal) {
    isOpened.value = true;
    console.log("hehe");
  }
}
</script>

<style lang="scss">
.tooltip {
  & {
    position: relative;
    width: fit-content;
    &:hover {
      .tooltip__text {
        opacity: 1;
      }
    }
  }
  &__icon {
    cursor: pointer;
    width: 30px;
    height: 30px;
    svg {
      width: 100%;
      height: 100%;
      stroke: var(--icons-grey);
      fill: transparent;
    }
  }
  &__text {
    pointer-events: none;
    width: 250px;
    position: absolute;
    z-index: 1;
    top: 0;
    left: calc(100% + 13px);
    display: block;
    background-color: var(--bg-primary);
    font-size: 14px;
    color: var(--text-default);
    padding: 20px;
    box-shadow: 0px 4px 11.5px 0px #00000017;
    opacity: 0;
    transition: opacity var(--time);
  }
  &__modal {
    position: fixed;
    z-index: var(--header-index);
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    transition: opacity var(--time), visibility var(--time);
    opacity: 0;
    visibility: hidden;
  }
  &__modal-bg {
    width: 100%;
    height: 100%;
    background-color: var(--bg-modal);
  }
  &__modal-body {
    position: absolute;
    z-index: 1;
    bottom: 0;
    left: 0;
    width: 100%;
    padding: 48px 20px 30px;
    background-color: var(--bg-primary);
    color: var(--text-default);
  }
  &__close {
    position: absolute;
    right: 20px;
    top: 20px;
    width: 18px;
    height: 18px;
    svg {
      width: 100%;
      height: 100%;
      fill: var(--icons-grey);
    }
  }
  &--opened {
    .tooltip__modal {
      opacity: 1;
      visibility: visible;
    }
  }
}
</style>
