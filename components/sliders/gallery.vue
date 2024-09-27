<template>
	<div class="swiper slider" ref="slider">
		<div class="swiper-wrapper slider__wrapper">
			<div
				class="swiper-slide slider__slide"
				v-for="(slide, index) in slides"
				:key="'slide' + index"
			>
				<a
					:href="slide"
					data-fancybox="gallery"
					class="slider__fancybox style-picture-img"
				>
					<img :src="slide" />
				</a>
			</div>
		</div>
		<div class="slider__control">
			<button class="slider__btn slider__btn--prev">
				<svg>
					<use xlink:href="/icons/sprite.svg#arrow"></use>
				</svg>
			</button>
			<button class="slider__btn slider__btn--next">
				<svg>
					<<use xlink:href="/icons/sprite.svg#arrow"></use>
				</svg>
			</button>
		</div>
	</div>
</template>

<script setup>
import Swiper from 'swiper'
import 'swiper/css'
import { Navigation } from 'swiper/modules'

import { Fancybox } from '@fancyapps/ui'
import '@fancyapps/ui/dist/fancybox/fancybox.css'

import { ref, onMounted } from 'vue'

const slider = ref(null)
const swiper = ref()
defineProps({
	slides: Array,
})

onMounted(() => {
	swiper.value = new Swiper(slider.value, {
		modules: [Navigation],
		slidesPerView: 4,
		spaceBetween: 24,
		navigation: {
			nextEl: '.slider__btn--next',
			prevEl: '.slider__btn--prev',
		},
		breakpoints: {
			320: {
				slidesPerView: 1,
				spaceBetween: 15,
			},
			481: {
				slidesPerView: 2,
				spaceBetween: 15,
			},
			769: {
				slidesPerView: 3,
				spaceBetween: 20,
			},
			1366: {
				slidesPerView: 4,
				spaceBetween: 20,
			},
			1641: {
				slidesPerView: 4,
				spaceBetween: 24,
			},
		},
	})
	Fancybox.bind('[data-fancybox]', {})
})
</script>

<style lang="scss">
.slider {
	&__slide {
		display: flex;
		aspect-ratio: 1.3;
		overflow: hidden;
		border-bottom-right-radius: 80px;
		&::after {
			position: absolute;
			top: 50%;
			left: 50%;
			content: '';
			display: block;
			width: 88px;
			height: 88px;
			border-radius: 50%;
			background-color: var(--bg-accent);
			background-repeat: no-repeat;
			background-position: center;
			transform: translate(-50%, -50%);
			opacity: 0;
			pointer-events: none;
			transition: opacity var(--time);
		}
		&::before {
			content: '';
			display: block;
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			background-color: rgba(255, 255, 255, 0.4);
			opacity: 0;
			pointer-events: none;
			transition: opacity var(--time);
		}
	}
	&__fancybox {
		display: flex;
		width: 100%;
	}
	&__img {
		display: flex;
		width: 100%;
		height: 100%;
		object-fit: cover;
	}
	&__control {
		width: fit-content;
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 24px;
		margin-left: auto;
		margin-top: 40px;
	}
	&__btn {
		width: 48px;
		height: 48px;
		display: flex;
		align-items: center;
		justify-content: center;
		&--next {
			transform: rotate(180deg);
		}
		svg {
			width: 100%;
			height: 100%;
			fill: transparent;
			stroke: var(--icons-contrast);
			transition: fill var(--time);
		}
		&:hover {
			svg {
				stroke: var(--icons-accent);
			}
		}
		&.swiper-button-disabled {
			svg {
				stroke: var(--icons-disabled);
			}
		}
		&.swiper-button-lock {
			width: 0;
			height: 0;
		}
	}
}
@include hover {
	.slider__slide:hover {
		&::after,
		&::before {
			opacity: 1;
		}
	}
}
@include mobile {
	.slider__control {
		margin-right: auto;
		margin-left: auto;
		margin-top: 24px;
	}
	.slider__btn {
		width: 32px;
		height: 32px;
	}
}
</style>
