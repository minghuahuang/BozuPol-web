<template>
	<div class="footer">
		<div class="footer-wrapper">
			<ul>
				<li v-for="option in menus">
					<h3>{{ t(`footer['${option.title}']`) }}</h3>
					<a target="_blank" :href="item.link" v-for="item in option.list">{{
						t(`footer['${item.name}']`)
					}}</a>
				</li>
			</ul>
			<div class="copy">@2022 design by Ming in beijing. All rights reserved</div>
		</div>
	</div>
</template>

<script setup lang="ts">
	import { reactive } from "vue";
	import { useI18n } from "vue-i18n";

	const { t } = useI18n();

	const menus = reactive([
		{
			title: "bozupol",
			list: [
				{
					name: "careers",
					link: "www.baidu.com",
				},
				{
					name: "news",
					link: "www.baidu.com",
				},
				{
					name: "topic",
					link: "www.baidu.com",
				},
				{
					name: "accessibility",
					link: "www.baidu.com",
				},
			],
		},
		{
			title: "discovery",
			list: [
				{
					name: "trustAndSafe",
					link: "www.baidu.com",
				},
				{
					name: "funds",
					link: "www.baidu.com",
				},
				{
					name: "evection",
					link: "www.baidu.com",
				},
				{
					name: "magzine",
					link: "www.baidu.com",
				},
			],
		},
		{
			title: "rent",
			list: [
				{
					name: "whyRent",
					link: "www.baidu.com",
				},
				{
					name: "responsibleHosting",
					link: "www.baidu.com",
				},
				{
					name: "experiences",
					link: "www.baidu.com",
				},
				{
					name: "resources",
					link: "www.baidu.com",
				},
			],
		},
		{
			title: "service",
			list: [
				{
					name: "help",
					link: "www.baidu.com",
				},
				{
					name: "neighbors",
					link: "www.baidu.com",
				},
			],
		},
	]);
</script>

<style scoped lang="scss">
	@import "@/assets/scss/layout/footer.scss";
</style>
