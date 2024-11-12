<template>
    <Teleport to="body">
      <Popup :state="state" @close-popup="closePopup">
        <div class="popup__content">
          <h3 class="popup__title thtile-h3"/>

        </div>
      </Popup>
    </Teleport>
  </template>

<script setup>
defineProps(["state"]);
const emits = defineEmits(["closePopup"]);

function closePopup() {
  emits("closePopup");
}
</script>

<style lang="scss">
.popup__content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  width: 564px;
}
.popup__form {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;

  .form-submit {
    position: relative;
    background-color: var(--btn-prim);
    border-color: var(--btn-prim);
    color: var(--text-cntrst-prim);
    gap: 8px;
    margin-bottom: 20px;
    &-btn {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }

    input {
      cursor: pointer;
      font-weight: 600;
      text-transform: uppercase;
      border: none;
      outline: none;
    }

    svg {
      width: 32px;
      height: 32px;
      fill: transparent;
      stroke: var(--icon-cntrst);
      transform: rotate(180deg);
    }
  }
}
</style>