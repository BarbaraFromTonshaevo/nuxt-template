<template>
  <ul ref="accordion" class="accordion">
    <li v-for="item of data" :key="item.title" class="accordion__item">
      <button class="accordion__head" @click="toggleHead($event)">
        <div class="accordion__title">{{ item.title }}</div>
        <svg class="accordion__icon">
          <use xlink:href="/icons/sprite.svg#plus" />
        </svg>
      </button>
      <div class="accordion__body">
        <div class="accordion__inner" v-html="item.body" />
      </div>
    </li>
  </ul>
</template>

<script setup>
import { ref, onMounted } from "vue";
const props = defineProps({
  data: {
    type: Array, // указываем, что это массив
    required: true,
    validator: function (value) {
      return value.every((item) => {
        return typeof item.title === "string" && typeof item.body === "string";
      });
    },
  },
  initial: {
    type: Number,
    required: false,
    default: undefined,
  },
});
const accordion = ref(null);

onMounted(() => {
  if (props.initial !== undefined) {
    const elements = accordion.value.querySelectorAll(".accordion__item");
    const activeElem = elements[props.initial];
    const activeBody = activeElem.querySelector(".accordion__body");
    activeElem.classList.add("accordion__item--active");
    activeBody.style.height = "auto";
    const height = activeBody.clientHeight;
    activeBody.style.height = height + "px";
  }
});

function toggleHead($event) {
  const parent = $event.currentTarget.parentNode;
  const body = parent.querySelector(".accordion__body");

  accordion.value.querySelectorAll(".accordion__item--active").forEach((el) => {
    if (parent !== el) {
      el.classList.remove("accordion__item--active");
      el.querySelector(".accordion__body").style.height = "0px";
    }
  });

  if (parent.classList.contains("accordion__item--active")) {
    //если активная и нужно закрыть
    parent.classList.remove("accordion__item--active");
    setTimeout(() => {
      body.style.height = "0px";
    }, 0);
  } else {
    //если неактиная и нужно открыть
    parent.classList.add("accordion__item--active");
    body.style.height = "auto";
    const height = body.clientHeight;
    body.style.height = "0px";
    setTimeout(() => {
      body.style.height = height + "px";
    }, 0);
  }
}
</script>

<style lang="scss">
.accordion {
  border-top: 1px solid var(--stroke-primary);
  &__item {
    border-bottom: 1px solid var(--stroke-primary);
    &--active {
      .accordion__body {
        visibility: visible;
      }
      .accordion__title {
        color: var(--text-accent);
      }
      .accordion__icon {
        transform: rotate(45deg);
        fill: var(--icons-grey);
      }
    }
  }
  &__head {
    width: 100%;
    cursor: pointer;
    padding: 30px;
    display: grid;
    grid-template-columns: 1fr 40px;
    align-items: center;
    text-align: start;
    grid-gap: 20px;
    transition: background-color var(--time);
  }
  &__title {
    font-weight: 500;
    font-size: 20px;
    line-height: 1.1;
  }
  &__icon {
    width: 40px;
    height: 40px;
    fill: var(--icons-red);
    transition: fill var(--time), transform var(--time);
  }
  &__body {
    height: 0;
    overflow: hidden;
    visibility: hidden;
    transition: height var(--time), visibility var(--time);
  }
  &__inner {
    padding: 20px 30px 30px;
    color: var(--text-default);
    max-width: 700px;
  }
}
@include hover {
  .accordion {
    &__head:hover {
      background-color: var(--bg-secondary);
    }
  }
}
@include laptop {
  .accordion {
    &__title {
      font-size: 18px;
    }
  }
}
@include tablet-s {
  .accordion {
    &__head {
      padding: 20px 0;
      grid-template-columns: 1fr 30px;
    }
    &__title {
      font-size: 16px;
    }
    &__icon {
      width: 30px;
      height: 30px;
    }
    &__inner {
      padding-top: 0;
      padding-left: 0;
      padding-right: 0;
    }
  }
}
</style>
