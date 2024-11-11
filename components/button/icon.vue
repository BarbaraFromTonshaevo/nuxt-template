<template>
  <a
    :href="url"
    class="btn-icon"
    :class="{ 'btn-icon--dark': isDark }"
    v-if="mode === 'link'"
  >
    <svg class="btn-icon__svg">
      <use :xlink:href="'/icons/sprite.svg#' + sprite"></use>
    </svg>
  </a>
  <button class="btn-icon" :class="{ 'btn-icon--dark': isDark }" v-else>
    <svg class="btn-icon__svg">
      <use :xlink:href="'/icons/sprite.svg#' + sprite"></use>
    </svg>
  </button>
</template>

<script setup>
const props = defineProps(["url", "sprite", "isDark", "mode"]);
</script>

<style lang="scss" scoped>
.btn-icon {
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: var(--btn-secondary);
  transition: background-color var(--time);
  &__svg {
    width: 23px;
    height: 23px;
    transition: fill var(--time);
    fill: var(--icons-black);
  }
  &--dark {
    background-color: var(--btn-dark);
    filter: blur(20);
    .btn-icon__svg {
      fill: var(--icons-white);
    }
  }
}
@include hover {
  .btn-icon:hover {
    background-color: var(--btn-secondary-hover);
    .btn-icon__svg {
      fill: var(--icons-white);
    }
  }
}
// @include tablet-s {
// 	.btn-icon {
// 		width: 33px;
// 		height: 33px;
// 		&__svg {
// 			width: 13px;
// 			height: 13px;
// 		}
// 	}
// }
</style>
