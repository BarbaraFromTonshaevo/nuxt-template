<template>
    <div class="default-layout">
        <HeaderBlock :class="{hide: isHeaderVisible===false}"/>
        <slot />
        <FooterBlock />
    </div>
</template>

<script setup>
let scrollPosition = window.scrollY;
const isHeaderVisible = ref(true);

onMounted(() => {
    document.addEventListener('scroll', () => {
        let currentScrollPosition = window.scrollY;

        if (scrollPosition <= currentScrollPosition) {
            isHeaderVisible.value = false;
        }
        else {
            isHeaderVisible.value = true;
        };

        scrollPosition = currentScrollPosition;
    })
})
</script>

<style lang="scss">
@use "./assets/style/utils/mixin" as m;

body {	
	padding-top: calc(var(--header-height) + 80px);
}

@include m.tablet-s {
    body {	
	    padding-top: calc(var(--header-height) + 40px);
    }
}
</style>