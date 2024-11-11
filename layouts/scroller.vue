<template>
    <div>
        <HeaderBlock :class="{hide: isHeaderVisible===false}"/>
        <div ref="scroller" class="scroller" >
            <slot />
            <FooterBlock />
        </div>
    </div>
</template>

<script setup>
import { gsap } from "gsap";

import { ScrollTrigger } from "gsap/ScrollTrigger";

import Scrollbar, { ScrollbarPlugin } from "smooth-scrollbar";

const scroller = ref(null);
const isHeaderVisible = ref(true);
let bodyScrollBar;

onMounted(() => {   
    class ModalPlugin extends ScrollbarPlugin {
        static pluginName = 'modal';

        static defaultOptions = {
            open: false,
        };

        transformDelta(delta) {
            return this.options.open ? { x: 0, y: 0 } : delta;
        }
    };

    Scrollbar.use(ModalPlugin);

    bodyScrollBar = Scrollbar.init(scroller.value, {
        damping: 0.1,
        delegateTo: scroller.value,
        alwaysShowTracks: true,
        renderByPixels: true,
        continuousScrolling: true,
        thumbMinSize: 20,
        syncCallbacks: true,
    });


    gsap.registerPlugin(ScrollTrigger);
    setTimeout(() => {
        ScrollTrigger.refresh()
    }, 1000);

    ScrollTrigger.scrollerProxy(scroller.value, {
        scrollTop(value) {
            if (arguments.length>0) {
                bodyScrollBar.scrollTop = value;
            }
            return bodyScrollBar.scrollTop;
        }
    });

    bodyScrollBar.addListener(ScrollTrigger.update);
    ScrollTrigger.defaults({ scroller: scroller.value });

    function setupScroller() {

        // elements with overflow:auto
        // const el = document.querySelectorAll('.hide-scroller');
        // if (el.length > 0) {
        //     el.forEach(item => {
        //         {
        //             [
        //                 'touchmove',
        //                 'mousewheel',
        //                 'wheel',
        //             ].forEach((eventType) => {
        //                 item.addEventListener(eventType, (e) => e.stopPropagation());
        //             });
        //         }
        //     })
        // }

        let initialPosition = bodyScrollBar.offset.y;
        let currentPosition = bodyScrollBar.offset.y;

        // sticky, fixed elements
        bodyScrollBar.addListener(({ offset }) => {
            currentPosition = offset.y;

            if (initialPosition <= currentPosition) {
                isHeaderVisible.value = false;
            }
            else {
                isHeaderVisible.value = true;
            };

            initialPosition = currentPosition;
        });
    }

    setupScroller();      
});

</script>

<style lang="scss" scoped>
.scroller {
	padding-top: calc(var(--header-height) + 80px);
    height: 100vh;
    overflow: hidden;
}
</style>

<style>
.scrollbar-track-x {
    display: none !important;
}
.scrollbar-track {
    z-index: 2 !important;
}
</style>