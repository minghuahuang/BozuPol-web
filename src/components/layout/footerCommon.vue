<template>
	<div class="footer">
		<ul>
			<li v-for="option in menus">
				<h4>{{ option.title }}</h4>
				<a target="_blank" :href="item.link" v-for="item in option.list">{{
					item.name
				}}</a>
			</li>
		</ul>
		<div class="copy">@2022 design by Ming in beijing. All rights reserved</div>
	</div>
</template>

<script setup lang="ts">
	import { reactive } from "vue";
	const menus = reactive([
		{
			title: "包租婆",
			list: [
				{
					name: "工作机会",
					link: "www.baidu.com",
				},
				{
					name: "包租婆新闻",
					link: "www.baidu.com",
				},
				{
					name: "政策",
					link: "www.baidu.com",
				},
				{
					name: "无障碍设施",
					link: "www.baidu.com",
				},
			],
		},
		{
			title: "发现",
			list: [
				{
					name: "信任与安全",
					link: "www.baidu.com",
				},
				{
					name: "旅行基金",
					link: "www.baidu.com",
				},
				{
					name: "商务差旅",
					link: "www.baidu.com",
				},
				{
					name: "包租婆杂志",
					link: "www.baidu.com",
				},
			],
		},
		{
			title: "出租",
			list: [
				{
					name: "为什么出租",
					link: "www.baidu.com",
				},
				{
					name: "房东义务",
					link: "www.baidu.com",
				},
				{
					name: "开展体验",
					link: "www.baidu.com",
				},
				{
					name: "资源中心",
					link: "www.baidu.com",
				},
			],
		},
		{
			title: "客服支持",
			list: [
				{
					name: "帮助",
					link: "www.baidu.com",
				},
				{
					name: "邻里支持",
					link: "www.baidu.com",
				},
			],
		},
	]);
</script>

<style scoped lang="scss">
	@import "@/assets/scss/layout/footer.scss";
</style>
