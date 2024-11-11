<template>
  <div class="container">
    <div class="uikit-wrap">
      <Button mode="link" :isDisabled="false">hehe</Button>
      <Button mode="page-link" :isDisabled="false">hehe</Button>
      <Button mode="button" :isDisabled="true">hehe</Button>
    </div>
    <div class="uikit-wrap">
      <Button mode="link" :isDisabled="false">
        <!-- <svg>
          <use xlink:href="/icons/sprite.svg#arrow"></use>
        </svg> -->
        hehe
      </Button>
      <Button mode="page-link" :isDisabled="false">hehe</Button>
      <Button mode="button" :isDisabled="true">hehe</Button>
    </div>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
.uikit-wrap {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 30px;
}
</style>
