<template>
  <div
    ref="select"
    class="input-select"
    :class="[
      { 'input-select--opened': isOpened },
      { 'input-select--accordion': isAccordion },
    ]"
  >
    <div ref="head" class="input-select__head">
      <div class="input-select__title">
        {{ selectedItem.label }}
      </div>
      <svg class="input-select__icon">
        <use xlink:href="/icons/sprite.svg#arrow-pager"/>
      </svg>
    </div>
    <div ref="body" class="input-select__body">
      <div class="input-select__inner">
        <ul class="input-select__list">
          <li
            v-for="item of items"
            :key="item.label"
            class="input-select__item"
            @click="changeSelect(item)"
          >
            {{ item.label }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
const isOpened = ref(false);
const props = defineProps({
  items: {
    type: Array,
    required: true,
    default: () => [],
  },
  initialItem: {
    type: Object,
    required: false,
    default: ()=>{},
  },
  // логика выхода нижнего окна как у аккореона
  isAccordion: {
    type: Boolean,
    required: false,
    default: false,
  },
});
const emit = defineEmits(["update:selectedItem"]);

// Локальное состояние для выбранного значения
const selectedItem = ref(props.initialItem);

function changeSelect(value) {
  selectedItem.value = value;
  emit("update:selectedItem", selectedItem.value);
}

const select = ref(null),
  head = ref(null),
  body = ref(null);
const { isMobileOrTablet } = useDevice();

onMounted(() => {
  if (props.isAccordion) {
    // если логика открытия как у аккордеона
    head.value.addEventListener("click", () => {
      if (isOpened.value) {
        //если открыто
        body.value.style.height = "0px";
        isOpened.value = false;
      } else {
        //если закрыто
        body.value.style.height = "auto";
        const newHeight = body.value.clientHeight;
        body.value.style.height = "0px";
        setTimeout(() => {
          body.value.style.height = newHeight + "px";
        });
        isOpened.value = true;
      }
    });
  } else {
    // открытие по умолчанию
    if (isMobileOrTablet) {
      // открытие при клике (на планшетах и мобильных)
      head.value.addEventListener("click", () => {
        console.log("hehe" + isOpened.value);
        isOpened.value = !isOpened.value;
        console.log(isOpened.value);
      });
    } else {
      // открытие при наведении мыши
      select.value.addEventListener("mouseenter", () => {
        isOpened.value = true;
      });
      select.value.addEventListener("mouseleave", () => {
        isOpened.value = false;
      });
    }
  }
});
</script>

<style lang="scss">
.input-select {
  --gap: 10px;
  position: relative;
  z-index: 0;
  width: 350px;
  transition: z-index var(--time) var(--time);
  &__head {
    cursor: pointer;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 25px;
    height: 78px;
    width: 100%;
    padding: 0 60px;
    border-radius: 60px;
    border: 2px solid var(--stroke-primary);
    transition: border-color var(--time);
  }
  &__title {
    font-size: 18px;
    font-weight: 600;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -moz-box;
    -moz-box-orient: vertical;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    line-clamp: 1;
    box-orient: vertical;
  }
  &__icon {
    right: 35px;
    display: flex;
    width: 14px;
    height: 14px;
    transform: rotate(90deg);
    transition: transform var(--time);
  }
  &__body {
    position: absolute;
    z-index: 1;
    max-width: 100%;
    width: 100%;
    top: calc(100% + var(--gap));
    opacity: 0;
    visibility: hidden;
    transition: opacity var(--time), visibility var(--time);
  }
  &__inner {
    display: flex;
    max-height: 220px;
    width: 100%;
    border-radius: 30px;
    background-color: var(--bg-primary);
    border: 2px solid var(--stroke-primary);
    padding: 24px 10px 24px 24px;
  }
  &__list {
    width: 100%;
    overflow: auto;
    display: flex;
    flex-direction: column;
    gap: 16px;
    padding-right: 20px;
  }
  &__item {
    cursor: pointer;
    transition: color var(--time);
  }
  &--opened {
    z-index: 1;
    transition: z-index var(--time);
    .input-select__body {
      visibility: visible;
      opacity: 1;
    }
    .input-select__icon {
      transform: rotate(-90deg);
    }
    .input-select__head {
      border-color: var(--stroke-contrast);
    }
  }
  &--accordion {
    .input-select__body {
      position: static;
      height: 0;
      opacity: 1;
      overflow: hidden;
      transition: height var(--time), visibility var(--time);
    }
    .input-select__inner{
      margin-top: var(--gap);
    }
    &.input-select--opened {
      .input-select__body {
        // height: auto;
        visibility: visible;
      }
    }
  }
}
@include hover {
  .input-select {
    &__item:hover {
      color: var(--text-accent);
    }
    &__head:hover {
      border-color: var(--stroke-secondary);
    }
  }
}
@include tablet {
  .input-select {
    &__title {
      font-size: 16px;
    }
  }
}
@include mobile {
  .input-select {
    &__head {
      height: 48px;
      padding: 0 24px;
      border-width: 1px;
    }
    &__title {
      font-size: 14px;
    }
    &__inner{
      max-height: 180px;
    }
    &__inner {
      border-width: 1px;
    }
  }
}
</style>
