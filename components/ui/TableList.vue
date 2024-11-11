<template>
    <div class="table-list">
        <ul class="table-list__list">
            <div class="table-list__item" v-for="item of data">
                <span class="table-list__left">{{ item.title }}</span>
                <span class="table-list__right" v-html="item.body"></span>
            </div>
        </ul>
    </div>
</template>

<script setup>
const props = defineProps(['data']);
</script>