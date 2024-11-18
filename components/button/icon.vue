<template>
  <NuxtLink
    v-if="mode === 'nuxt-link'"
    :to="link"
    class="btn-icon"
    v-bind="$attrs"
  >
    <svg class="btn-icon__svg">
      <use :xlink:href="'/icons/sprite.svg#' + sprite" />
    </svg>
  </NuxtLink>
  <a
    v-else-if="mode === 'link'"
    :href="link"
    class="btn-icon"
    v-bind="$attrs"
  >
    <svg class="btn-icon__svg">
      <use :xlink:href="'/icons/sprite.svg#' + sprite" />
    </svg>
  </a>
  <button
    v-else
    :type="type"
    class="btn-icon"
    :disabled="isDisabled ? true : false"
    v-bind="$attrs"
  >
    <svg class="btn-icon__svg">
      <use :xlink:href="'/icons/sprite.svg#' + sprite" />
    </svg>
  </button>
</template>

<script setup>
defineProps({
  mode: {
    type: String,
    required: true,
    default: "button",
    validator: (value) => ["button", "a", "nuxt-link"].includes(value),
  },
  link: {
    type: String,
    required: false,
    default: "",
  },
  sprite: {
    type: String,
    required: true,
    default: "",
  },
  isDark: {
    type: Boolean,
    required: false,
    defult: false,
  },
  type: {
    type: String,
    required: false,
    default: "button",
  },
  isDisabled: {
    type: Boolean,
    required: false,
    default: false,
  },
});
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
