<template>
	<header class="header" :class="{'header--transparent': props.isTransparent}">
		<div class="header__body">
			<div class="header__container container">
				<NuxtLink to="/" class="header__logo">
					<img src="/icons/logo.svg" class="header__logo-dark"/>
				</NuxtLink>
				<nav class="header__nav" v-if="!isMobileOrTablet && mainInfoStore.isReady">
					<ul class="header__nav-list">
						<li class="header__nav-item" v-for="navItem of mainInfoStore.main">
							<NuxtLink :to="navItem.url.href" class="header__nav-link">{{
								navItem.title
							}}</NuxtLink>
						</li>
					</ul>
				</nav>
				<div class="header__info" v-if="mainInfoStore.isReady">
					<a :href="'tel:' + mainInfoStore.info.phone" class="header__phone"
						>{{ mainInfoStore.info.phone }}
						<svg class="header__phone-svg">
							<use xlink:href="/icons/sprite.svg#phone"></use>
						</svg>
					</a>
					<div class="header__social">
						<ButtonIcon sprite="telegram" :isDark="isTransparent? true: false" mode="link" :url="mainInfoStore.info.telegram"/>
						<ButtonIcon sprite="wa" :isDark="isTransparent? true: false" mode="link" :url="mainInfoStore.info.whatsapp"/>
					</div>
					<Button mode="button" name="primary">Оставить заявку</Button>
					<!-- <Button v-if="!isMobileOrTablet" class="footer__btn" mode="button" name="primary">Оставить заявку</Button> -->

					<ButtonBurger
						v-if="isMobileOrTablet"
						:isClosed="isMenuActive"
						:isLight="isTransparent? true: false"
						@click="isMenuActive = !isMenuActive"
					/>
				</div>
			</div>
		</div>
		<div
			class="header__menu"
			v-if="isMobileOrTablet && mainInfoStore.isReady"
			:class="{ 'header__menu--opened': isMenuActive }"
		>
			<div class="header__menu-container container">
				<nav class="header__menu-nav">
					<ul class="header__menu-nav-list">
						<li
							class="header__menu-nav-item"
							v-for="navItem of mainInfoStore.main"
						>
							<NuxtLink :to="navItem.url.href" class="header__nav-link">{{
								navItem.title
							}}</NuxtLink>
						</li>
					</ul>
				</nav>
				<div class="header__menu-info">
					<a :href="'tel:' + mainInfoStore.info.phone" class="header__menu-phone">{{
						mainInfoStore.info.phone
					}}</a>
					<a
						:href="'mailto:' + mainInfoStore.info.email"
						class="header__menu-email"
						>{{ mainInfoStore.info.email }}</a
					>
					<address class="header__menu-address">
						{{ mainInfoStore.info.address }}
					</address>
				</div>
				<ButtonPrimary
					:mode="'btn'"
					:text="'Оставить заявку'"
					:isLarge="true"
					class="header__menu-btn"
				/>
			</div>
		</div>
	</header>
</template>

<script setup>
import { ref } from 'vue';
import { useMainInfoStore } from '@/stores/mainInfo';

const mainInfoStore = useMainInfoStore();
const { isMobileOrTablet } = useDevice();
const isMenuActive = ref(false);
const props = defineProps(['isTransparent']);
</script>

<style lang="scss">
.header {
    height: var(--header-height);
	position: fixed;
	z-index: var(--header-index);
	width: 100%;
	&--transparent{
		.header__body{
			background-color: transparent;
			color: white;
		}
		.header__logo-dark{
			opacity: 0;
		}
		.header__logo-light{
			opacity: 1;
		}
		
	}
	&__body {
		height: var(--header-height);
		background-color: var(--bg-primary);
		border-bottom: 1px solid var(--stroke-primary);
	}
	&__container {
		height: 100%;
		display: flex;
		align-items: center;
		gap: 20px;
		margin-top: auto;
		margin-bottom: auto;
	}
	&__logo {
		position: relative;
		width: 122px;
		aspect-ratio: 122/78;
	}
	&__logo-light,
	&__logo-dark{
		position: absolute;
		display: flex;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		opacity: 0;
		transition: opacity var(--time);
	}
	&__logo-dark{
		opacity: 1;
	}
	&__nav {
		margin-left: 100px;
		margin-right: auto;
	}
	&__nav-list {
		display: flex;
		align-items: center;
		gap: 40px;
	}
	&__nav-link {
		font-size: 18px;
		font-weight: 500;
		transition: color var(--time);
	}
	&__info {
		display: flex;
		align-items: center;
		margin-left: auto;
	}
	&__phone {
		font-weight: 500;
		font-size: 18px;
		transition: color var(--time);
		margin-right: 30px;
	}
	&__phone-svg {
		display: none;
	}
	&__social {
		display: flex;
		align-items: center;
		gap: 10px;
		margin-right: 30px;
	}
	&__menu {
        position: absolute;
        top: 100%;
        left: 0;
        width: 100%;
		height: calc(100vh - var(--header-height));
		background-color: var(--bg-primary);
		padding: 60px 0;
		opacity: 0;
        visibility: hidden;
        pointer-events: none;
		transition: opacity var(--time), visibility var(--time);
		&--opened {
			opacity: 1;
            visibility: visible;
            pointer-events: initial;
		}
	}
	&__menu-container {
		height: 100%;
		display: flex;
		flex-direction: column;
		gap: 50px;
		justify-content: space-between;
	}
	&__menu-nav-list {
		display: flex;
		flex-direction: column;
		gap: 20px;
	}
	&__menu-info {
		display: flex;
		flex-direction: column;
		gap: 20px;
	}
	&__menu-btn {
		width: fit-content;
		padding: 0 80px;
	}
	&__menu-phone {
		font-weight: 700;
		font-size: 24px;
		transition: color var(--time);
	}
	&__menu-email {
		font-size: 18px;
		font-weight: 500;
	}
	&__menu-address {
		font-size: 18px;
		color: var(--text-default-additional);
	}
}
@include hover {
	.header__nav-link:hover {
		color: var(--text-accent);
	}
	.header__phone:hover {
		color: var(--text-accent);
	}
}
@include desktop {
	.header__nav {
		margin-left: 60px;
	}
	.header__phone {
		font-size: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 60px;
		height: 60px;
		border-radius: 50%;
		background-color: var(--btn-secondary);
		transition: background-color var(--time);
		margin-right: 10px;
	}
	.header__phone-svg {
		display: block;
		width: 23px;
		height: 23px;
		fill: var(--icons-black);
		transition: fill var(--time);
	}
}
@include laptop {
	.header__nav {
		display: none;
	}
}
@include tablet-s {
	.header__logo {
		width: 64px;
	}
	.header__phone {
		width: 33px;
		height: 33px;
		&-svg {
			width: 13px;
			height: 13px;
		}
	}
    .header__social .btn-icon{
        width: 33px;
        height: 33px;
    }
    .header__social .btn-icon__svg{
        width: 13px;
        height: 13px;
    }
}
@include mobile {
	.header__social {
		gap: 4px;
		margin-right: 20px;
	}
	.header__phone {
		margin-right: 4px;
	}
	.header__menu {
		padding: 30px 0;
	}
	.header__menu-nav-list {
		gap: 14px;
	}
	.header__menu-container {
		gap: 20px;
		justify-content: start;
	}
	.header__menu-nav {
		margin-bottom: auto;
	}
	.header__menu-info {
		gap: 14px;
	}
	.header__menu-email {
		font-size: 14px;
	}
	.header__menu-address {
		font-size: 14px;
	}
}
</style>
