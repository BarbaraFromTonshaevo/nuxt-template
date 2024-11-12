<template>
  <NuxtLayout :name="layout">
    <section v-if="error.statusCode == 404" class="not-found">
      <div class="not-found__container container">
        <div class="not-found__statusCode">404</div>
        <h1 class="not-found__title title-h2">Страница не найдена</h1>
        <p class="not-found__descr">
          Ошибка 404. Страница была удалена, либо вовсе не существовала на
          сайте.
        </p>
        <Button
          class="not-found_btn"
          name="primary"
          mode="nuxt-link"
          link="/"
        >Перейти на главную</Button>
      </div>
    </section>
    <section v-else class="not-found">
      <div class="not-found__container container">
        <h1 class="not-found__title not-found__statusCode">
          {{ error.statusCode }}
        </h1>
        <p class="not-found__descr">{{ error.message }}</p>
        <Button
          class="not-found_btn"
          name="primary"
          mode="nuxt-link"
          link="/"
        >Перейти на главную</Button>
      </div>
    </section>
  </NuxtLayout>
</template>

<script setup>
const error = useError();
const device = useDevice();
const layout = ref("");
onMounted(() => {
  layout.value = device.isDesktop === true ? "scroller" : "default";
  //   layout.value = "default";
});

//   import { useMainInfoStore } from "@/stores/mainInfo";
//   const mainInfoStore = useMainInfoStore();

//   const { data: mainInfoData } = await useFetch("/wsapi/packs/main_info", {
//     baseURL: config.drupal_url,
//   });

//   mainInfoStore.setHeaderData(mainInfoData.value);
</script>

<style lang="scss" scoped>
.not-found {
  margin-top: calc(-1*var(--header-main-gap));
  height: calc(100vh - var(--header-height));
  &__main {
    padding-top: var(--header-height);
  }
  &__container {
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    @media (max-width: 767px) {
      gap: 30px;
    }
  }
  &__statusCode {
    line-height: 1;
    font-size: 160px;
    margin-bottom: 30px;
  }
  &__title {
    margin-bottom: 20px;
  }
  &__descr {
    margin-bottom: 40px;
  }
  &__btn {
    margin-top: 20px;
  }
}
</style>
