<template>
	<footer class="footer">
		<div class="container">
			<div class="footer__body">
				<div class="footer__left">
					<NuxtLink to="/" class="footer__logo">
						<img src="/icons/logo.svg" >
					</NuxtLink>
					<Button class="footer__btn" mode="button" name="secondary">Оставить заявку</Button>
				</div>
				<nav v-if="mainInfoStore.isReady" class="footer__nav">
					<ul class="footer__nav-list">
						<li v-for="navItem of mainInfoStore.main" :key="navItem.url.href" class="footer__nav-item">
							<NuxtLink :to="navItem.url.href" class="footer__nav-link">{{
								navItem.title
							}}</NuxtLink>
						</li>
					</ul>
				</nav>
				<div v-if="mainInfoStore.isReady" class="footer__info">
					<a :href="'tel:' + mainInfoStore.info.phone" class="footer__phone">{{
						mainInfoStore.info.phone
					}}</a>
					<a :href="'mailto:' + mainInfoStore.info.email" class="footer__email">{{
						mainInfoStore.info.email
					}}</a>
					<address class="footer__address">{{ mainInfoStore.info.address }}</address>
				</div>
				<div v-if="mainInfoStore.isReady" class="footer__social">
					<ButtonIcon sprite="telegram" mode="link" :url="mainInfoStore.info.telegram"/>
					<ButtonIcon sprite="wa" mode="link" :url="mainInfoStore.info.whatsapp"/>
				</div>
			</div>
			<div class="footer__bottom">
				<div class="footer__copyright">©2024 ТМК Феникс</div>
				<a class="footer__policy" href="">Политика конфиденциальности</a>
				<a class="footer__webshop" href="">
					Разработка сайта :
					<svg class="footer__webshop-svg">
						<use xlink:href="/icons/sprite.svg#webshop"/>
					</svg>
				</a>
			</div>
		</div>
	</footer>
</template>

<script setup>
import { useMainInfoStore } from '@/stores/mainInfo'
const mainInfoStore = useMainInfoStore()
</script>

<style lang="scss">
.footer {
	border-top: 1px solid var(--stroke-tertiary);
	background-color: var(--footer-bg);
	&__body {
		padding-top: 60px;
		padding-bottom: 60px;
		display: grid;
		grid-template-columns: repeat(12,1fr);
	}     
	&__logo {
		width: 160px;
		display: flex;
		margin-bottom: 48px;
		img {
			display: flex;
			width: 1005px;
			height: 100%;
		}
	}
	&__left{
		grid-column: 1/6;
	}
	&__nav{
		grid-column: 6/8;
	}
	&__nav-list {
		display: flex;
		flex-direction: column;
		gap: 24px;
	}
	&__nav-link {
		font-weight: 500;
		font-size: 18px;
		transition: color var(--time);
	}
	&__info {
		grid-column: 8/11;
		max-width: 350px;
		display: flex;
		flex-direction: column;
		gap: 20px;
	}
	&__phone {
		font-size: 28px;
		font-weight: 700;
		transition: color var(--time);
	}
	&__email {
		font-size: 18px;
		font-weight: 500;
		transition: color var(--time);
	}
	&__address {
		font-size: 18px;
		color: var(--text-default-additional);
	}
	&__social {
		grid-column: 11/13;
		margin-left: auto;
		display: flex;
		gap: 10px;
	}
	&__bottom {
		display: flex;
		justify-content: space-between;
		padding: 20px 0;
		gap: 15px;
	}
	&__copyright,
	&__policy,
	&__webshop {
		font-size: 16px;
		color: var(--text-footer);
	}
	&__webshop-svg {
		width: 70px;
		height: 12px;
	}
}
@include hover {
	.footer__nav-link:hover,
	.footer__phone:hover,
	.footer__email:hover {
		color: var(--text-accent);
	}
}
@include desktop{
	.footer__body{
		display: flex;
		justify-content: space-between;
		gap: 50px;
		flex-wrap: wrap;
	}
	.footer__social{
		margin-left: initial;
	}
}
@include tablet-s { 
	.footer__body{
		padding-top: 30px;
		padding-bottom: 10px;
	}
	.footer__logo {
		width: 140px;
		margin: 0 auto 40px;
	}
	.footer__body,
	.footer__bottom {
		flex-direction: column;
		justify-content: center;
		align-items: center;
		text-align: center;
	}
	.footer__nav-list {
		gap: 15px;
	}
}
@include mobile {
	.footer__nav-link {
		font-size: 14px;
	}
	.footer__phone{
		font-size: 24px;
	}
	.footer__address, .footer__email{
		font-size: 14px;
	}
	.footer__copyright,
	.footer__policy,
	.footer__webshop {
		font-size: 12px;
	}
	.footer__btn{
		width: 100%;
	}
	.footer__left{
		width: 100%;
	}
}
</style>
