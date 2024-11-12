<template>
  <div class="pager">
    <ul class="pager__list">
      <!-- Первый элемент -->
      <li
        class="pager__item pager__item--first"
        :class="{ disabled: +pagination.currPage == 0 }"
      >
        <!-- v-if="+pagination.currPage !== 0" -->

        <button class="pager__btn" @click="changePage(0)">
          <svg>
            <use xlink:href="/images/icons/sprite.svg#arrow-pager"/>
          </svg>
          <svg>
            <use xlink:href="/images/icons/sprite.svg#arrow-pager"/>
          </svg>
        </button>
      </li>
      <!-- Предыдущий элемент -->
      <li
        class="pager__item pager__item--previous"
        :class="{ disabled: +pagination.currPage == 0 }"
      >
        <button class="pager__btn" @click="changePage(pagination.currPage - 1)">
          <svg>
            <use xlink:href="/images/icons/sprite.svg#arrow-pager"/>
          </svg>
        </button>
      </li>
      <!-- Страницы item берет отсчет от 1 -->
      <li
        v-for="item of nav"
        :key="item"
        class="pager__item"
        :class="[
          { 'is-active': item == pagination.currPage + 1 },
          { ellipsis: item == '...' },
        ]"
      >
        <button class="pager__btn" @click="changePage(item - 1)">
          {{ item }}
        </button>
      </li>
      <!-- Следующий элемент -->
      <li
        class="pager__item pager__item--next"
        :class="{ disabled: pagination.currPage == pagination.countPages - 1 }"
      >
        <button class="pager__btn" @click="changePage(pagination.currPage + 1)">
          <svg>
            <use xlink:href="/images/icons/sprite.svg#arrow-pager"/>
          </svg>
        </button>
      </li>
      <!-- Последний элемент -->
      <li
        class="pager__item pager__item--last"
        :class="{ disabled: pagination.currPage == pagination.countPages - 1 }"
      >
        <!-- v-if="pagination.currPage !== pagination.countPages - 1" -->
        <button
          class="pager__btn"
          @click="changePage(pagination.countPages - 1)"
        >
          <svg>
            <use xlink:href="/images/icons/sprite.svg#arrow-pager"/>
          </svg>
          <svg>
            <use xlink:href="/images/icons/sprite.svg#arrow-pager"/>
          </svg>
        </button>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { computed } from "vue";
const props = defineProps({
  pagination: {
    type: Object,
    defult: () => {},
  },
});
const emits = defineEmits(["changePage"]);

function changePage(num) {
  emits("changePage", num);
}

const nav = computed(() => {
  const nav = [];
  if (props.pagination.countPages > 5) {
    let leftEllipsis = true;
    let rightEllipsis = true;
    for (let i = 0; i < props.pagination.countPages; i++) {
      if (i < 2) {
        nav.push(i + 1);
      } else if (i >= props.pagination.countPages - 2) {
        nav.push(i + 1);
      } else if (i == props.pagination.currPage) {
        nav.push(i + 1);
      } else if (leftEllipsis && i > 1 && i < props.pagination.currPage) {
        leftEllipsis = false;
        nav.push("...");
      } else if (
        rightEllipsis &&
        i < props.pagination.countPages - 2 &&
        i > props.pagination.currPage
      ) {
        rightEllipsis = false;
        nav.push("...");
      }
    }
  } else {
    for (let i = 1; i <= props.pagination.countPages; i++) {
      nav.push(i);
    }
  }
  return nav;
});
</script>

<!-- <script setup>
const pagination = defineProps({
  perPage: Number,
  count: Number,
  countPages: Number,
  currPage: Number
});
</> -->

<style lang="scss">
.pager {
  margin-top: 50px;
  &__list {
    display: flex;
    gap: 12px;
    align-items: center;
    justify-content: center;
  }
  &__btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    position: relative;
    color: var(--text-prim);
    transition: color var(--time);
    &:before {
      position: absolute;
      top: 50%;
      left: 50%;
      z-index: -1;
      content: "";
      display: block;
      width: 52px;
      height: 52px;
      background-color: var(--bg-accent);
      border-radius: 50%;
      transform: translate(-50%, -50%) scale(0.5);
      opacity: 0;
      transition: opacity var(--time), transform var(--time);
    }
    @include hover {
      &:hover {
        color: white;
        svg {
          fill: var(--icon-accent);
        }
        &:before {
          opacity: 1;
          transform: translate(-50%, -50%) scale(1);
        }
      }
    }
  }
  &__item {
    position: relative;
    width: 24px;
    height: 24px;
    transition: opacity var(--time);
    &--first,
    &--last,
    &--next,
    &--previous {
      .pager__btn {
        display: flex;
        &:before {
          display: none;
        }
      }
      svg {
        display: block;
        width: 6px;
        height: 10px;
      }
    }
    &--previous,
    &--first {
      .pager__btn {
        transform: rotate(180deg);
      }
    }
    &.fade {
      opacity: 0;
    }
    &.disabled {
      pointer-events: none;
      cursor: none;
      svg {
        fill: var(--icon-sec);
      }
    }
    &.is-active {
      .pager__btn {
        color: var(--icon-sec);
        pointer-events: none;
      }
    }
    &.ellipsis {
      pointer-events: none;
    }
  }
}
</style>
