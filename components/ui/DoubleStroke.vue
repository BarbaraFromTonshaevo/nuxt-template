<template>
  <div class="double-stroke">
    <span class="double-stroke__left">{{ title }}</span>
    <span class="double-stroke__right">
      <slot></slot>
    </span>
  </div>
</template>

<script setup>
const props = defineProps({
  title: {
    type: String,
    required: true,
    default: "",
  },
});
</script>

<style lang="scss">
.double-stroke {
  display: grid;
  grid-template-columns: 4fr 5fr;
  grid-gap: 30px;
  padding: 24px;
  border-bottom: 1px solid var(--stroke-primary);
  font-size: 18px;
  font-weight: 500;
  &__left {
    color: var(--text-default);
  }
}
@include tablet-s {
  .double-stroke {
    font-size: 14px;
  }
}
@include mobile {
  .double-stroke {
    padding: 15px 0;
    &__right {
      text-align: end;
    }
  }
}
</style>
