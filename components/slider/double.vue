<template>
	<!-- Сделать проверку на кол-во слайдов -->
	<!-- Если слайд один, то убрать aside и сделать просто вывод картинки, на сладер навесить класс slider-double--one -->
	<!-- Если сладов больше 1 но меньше 5, то сделать в aside кол-во слайдов равного кол-во слада, навесить класс slider-double-- -->
	<!-- Добавить Fancybox -->
	<div class="slider-double">
		<div class="slider-double__aside swiper" ref="asideSlider">
			<div class="swiper-wrapper">
				<div
					class="slider-double__aside-slide swiper-slide slide-img"
					v-for="slide of slides"
					v-html="slide.markup"
				></div>
			</div>
		</div>
		<div class="slider-double__main swiper" ref="mainSlider">
			<div class="swiper-wrapper">
				<div
					class="slider-double__main-slide swiper-slide slide-img"
					v-for="slide of slides"
				>
				<a :href="slide.raw" class="slider-double__main-link" data-fancybox="main-slider" v-html="slide.markup"></a>
			</div>
			</div>
			<div class="slider-double__control">
				<button class="slider-double__btn slider-double__btn--prev">
					<svg>
						<use xlink:href="/icons/sprite.svg#arrow"></use>
					</svg>
				</button>
				<button class="slider-double__btn slider-double__btn--next">
					<svg>
						<use xlink:href="/icons/sprite.svg#arrow"></use>
					</svg>
				</button>
			</div>
		</div>
	</div>
</template>

<script setup>
// Props
const props = defineProps({
	slides: {
		type: Array,
		required: true,
		default: () => [],
	},
})
// Fancybox
import { Fancybox } from "@fancyapps/ui";
import "@fancyapps/ui/dist/fancybox/fancybox.css";
import "swiper/css";
// Swiper
import Swiper from 'swiper'
import 'swiper/css'
import 'swiper/css/thumbs'
import { Navigation, Thumbs } from 'swiper/modules'
import { ref, onMounted } from 'vue'
// Initialization
const asideSlider = ref(null),
	mainSlider = ref(null),
	asideSwiper = ref(),
	mainSwiper = ref()

onMounted(() => {
	asideSwiper.value = new Swiper(asideSlider.value, {
		direction: 'vertical',
		slidesPerView: 5,
		spaceBetween: 6,
		breakpoints: {
			320: {
				direction: 'horizontal',
				slidesPerView: 4,
				spaceBetween: 6,
			},
			481: {
				direction: 'vertical',
				slidesPerView: 4,
				spaceBetween: 6,
			},
			768: {
				direction: 'horizontal',
				slidesPerView: 5,
				spaceBetween: 6,
			},
			1366: {
				direction: 'vertical',
				slidesPerView: 5,
				spaceBetween: 6,
			},
		},
	})

	mainSwiper.value = new Swiper(mainSlider.value, {
		modules: [Navigation, Thumbs],
		slidesPerView: 1,
		spaceBetween: 6,
		navigation: {
			nextEl: '.slider-double__btn--next',
			prevEl: '.slider-double__btn--prev',
		},
		thumbs: {
			swiper: asideSwiper.value,
		},
	})
	Fancybox.bind("[data-fancybox]", {});
})
</script>

<style lang="scss">
.slide-img {
	display: flex;
	width: 100%;
	height: 100%;
  picture, img{
    width: 100%;
    height: 100%;
    display: flex;
    object-fit: cover;
  }
}
.slider-double {
	width: 100%;
	aspect-ratio: 1098/571;
	display: grid;
	grid-template-columns: 120px 1fr;
	grid-gap: 6px;
	&__aside {
		max-height: 100%;
		max-width: 100%;
	}
	&__aside-slide {
		cursor: pointer;
		position: relative;
		&::after {
			content: '';
			display: block;
			position: absolute;
			z-index: 1;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			background-color: var(--bg-primary);
			opacity: 0.6;
			transition: opacity var(--time);
		}
		&.swiper-slide-thumb-active::after {
			opacity: 0;
		}
	}
	&__main {
		position: relative;
		display: flex;
		width: 100%;
	}
	&__control {
		z-index: 1;
		position: absolute;
		top: 50%;
		left: 0;
		width: 100%;
		display: flex;
		justify-content: space-between;
		padding: 0 42px;
		transform: translateY(-50%);
		pointer-events: none;
	}
	&__btn {
		cursor: pointer;
		pointer-events: initial;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 70px;
		aspect-ratio: 1;
		border-radius: 50%;
		background-color: var(--btn-tertiary);
		transition: background-color var(--time);
		svg {
			width: 20px;
			height: 20px;
			fill: var(--icons-black);
			transition: fill var(--time);
		}
		&.swiper-button-disabled {
			pointer-events: none;
			opacity: 0.7;
		}
	}
	&__btn--prev {
		transform: rotate(180deg);
	}
}
@include hover {
	.slider-double {
		&__btn:hover {
			background-color: var(--btn-secondary-hover);
			svg {
				fill: var(--icons-white);
			}
		}
		&__aside-slide:hover::after {
			opacity: 0.3;
		}
	}
}
@include laptop {
	.slider-double {
		grid-template-columns: 1fr;
		aspect-ratio: 280/266;
		&__main {
			order: -1;
		}

		&__control {
			padding: 0 25px;
		}
		&__btn {
			width: 60px;
		}
	}
}
@include tablet-s {
	.slider-double {
		aspect-ratio: 1098/571;
		grid-template-columns: 100px 1fr;
		&__main {
			order: initial;
		}
		&__control {
			padding: 0 15px;
		}
		&__btn {
			width: 50px;
		}
	}
}
@include mobile {
	.slider-double {
		grid-template-columns: 1fr;
		aspect-ratio: 280/266;
		&__main {
			order: -1;
		}
		&__control {
			padding: 0 10px;
		}
		&__btn {
			width: 42px;
		}
	}
}
</style>
