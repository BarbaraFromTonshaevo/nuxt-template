<template>
  <div class="default-layout">
    <HeaderBlock :class="{ hide: isHeaderVisible === false }" />
    <main class="main">
      <slot />
    </main>
    <FooterBlock />
  </div>
</template>

<script setup>
let scrollPosition = window.scrollY;
const isHeaderVisible = ref(true);

onMounted(() => {
  document.addEventListener("scroll", () => {
    const currentScrollPosition = window.scrollY;

    if (scrollPosition <= currentScrollPosition) {
      isHeaderVisible.value = false;
    } else {
      isHeaderVisible.value = true;
    }

    scrollPosition = currentScrollPosition;
  });
});
</script>

<style lang="scss">
body {
  padding-top: calc(var(--header-height) + var(--header-main-gap));
}
.main {
  min-height: calc(100vh - var(--header-height) - var(--header-main-gap));
}
@include tablet-s {
  body {
    padding-top: calc(var(--header-height) + 40px);
  }
}
</style>
