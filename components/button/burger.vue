<template>
	<button
		class="burger"
		:class="[{ 'burger--closed': isClosed }, {'burger--light': isLight}]"
		aria-label="Открыть меню"
	>
		<span class="burger__line"/>
	</button>
</template>

<script setup>
defineProps({
	isClosed: {
		type: Boolean,
		default: false
	},
	isLight: {
		type: Boolean,
		default: false,
	}
})
</script>

<style lang="scss" scoped>
.burger {
	position: relative;
	width: 33px;
	height: 20px;
	&__line,
	&::before,
	&::after {
		content: '';
		display: block;
		position: absolute;
		left: 0;
		width: 100%;
		height: 2px;
		background-color: var(--icons-black);
		transition: background-color var(--time), transform var(--time),
			opacity var(--time), top var(--time);
		transform-origin: left center;
	}
	&::before {
		top: 0;
	}
	&::after {
		top: 100%;
	}
	&__line {
		top: 50%;
	}
	&--light{
		.burger__line,
		&::after,
		&::before {
			background-color: var(--icons-white);
		}
	}
	&--closed {
		.burger__line {
			opacity: 0;
		}
		&::after {
			top: calc(100% - 2px);
			transform: rotate(-29deg);
		}
		&::before {
			top: 2px;
			transform: rotate(29deg);
		}
		.burger__line,
		&::after,
		&::before {
			background-color: var(--stroke-secondary);
		}
	}
}
@include hover {
	.burger:hover {
		.burger__line,
		&::after,
		&::before {
			background-color: var(--icons-red);
		}
	}
}
</style>
