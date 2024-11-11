<template>
  <main class="main" :class="{ front: isFront }">
    <div v-if="status === 'pending' || status === 'fetching'">
      <div class="loader"></div>
    </div>
    <div v-else-if="status === 'success'">
      <slot></slot>
    </div>
    <div v-else>
      <div class="container">
        <h1 class="title-h1">Ошибка</h1>
        <p>{{ error.statusCode }}</p>
        <p>{{ error.cause.message }}</p>
      </div>
    </div>
  </main>
</template>

<script setup>
const props = defineProps(["status", "error", "isFront"]);
if (props.error) {
  console.error("Error fetching services:", props.error);
}
</script>

<style>
.front {
  padding-top: 0;
}
</style>
