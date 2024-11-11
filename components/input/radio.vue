<template>
  <div class="input-radio">
    <div class="input-radio__wrap" v-for="item of items">
      <input
        class="input-radio__input"
        type="radio"
        :name="name"
        :id="item.id"
        :value="item.value"
        v-model="selectedValue"
      />
      <label class="input-radio__label" :for="item.id">{{ item.label }}</label>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
// const props = defineProps(["name", "list", "initial"]);
const props = defineProps({
  items: {
    type: Array,
    required: true,
    default: () => [],
  },
  name: {
    type: String,
    required: true,
  },
  initialValue: {
    type: String,
    required: false,
    default: "",
  },
});
// Локальное состояние для выбранного значения
const selectedValue = ref(props.initialValue);
const emit = defineEmits(["update:modelValue"]);
// Наблюдатель для изменения выбранного значения
watch(
  () => props.initialValue,
  (newValue) => {
    selectedValue.value = newValue;
  }
);

// Эмитация события изменения
watch(selectedValue, (newValue) => {
  emit("update:modelValue", newValue);
});
</script>

<style lang="scss">
.input-radio {
  height: fit-content;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  &__wrap {
    position: relative;
    height: fit-content;
  }
  &__input{
    position: absolute;
  }
  &__label {
    width: fit-content;
    height: 78px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 60px;
    border-radius: 60px;
    font-weight: 600;
    font-size: 18px;
    transition: border-color var(--time), color var(--time);
    border: 2px solid var(--stroke-primary);
    color: var(--text-default-additional);
  }
  &__input:checked ~ &__label {
    border-color: var(--stroke-contrast);
    color: var(--text-primary);
  }
}
@include hover{
  .input-radio__label:hover{
    border-color: var(--stroke-secondary);
    color: var(--text-primary);
  }
}
</style>
