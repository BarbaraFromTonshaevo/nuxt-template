<template>
    <NuxtLayout :name="layout">
      <NuxtRouteAnnouncer />
      <div class="page-content">
        <NuxtPage />
      </div>
    </NuxtLayout>
</template>


<script setup>
const device = useDevice();
const layout = ref('');

onMounted(() => {
  layout.value = device.isDesktop === true ? 'scroller' : 'default';
})

</script>

<style lang="scss">
@use "assets/style/utils/reset";

@use "assets/style/utils/fonts";
@use "assets/style/utils/variables";
@use "assets/style/utils/common";

@use "assets/style/components/container";
@use "assets/style/components/title";
@use "assets/style/components/text";
@use "assets/style/components/section";
</style>