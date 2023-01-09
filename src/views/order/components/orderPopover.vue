<template>
	<ul>
		<li v-for="item in count">
			<img
				src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
			/>
			<div class="content">
				<p class="title">北京适合元</p>
				<p class="price">价格</p>
			</div>
		</li>
	</ul>
</template>

<script setup lang="ts">
	import { ref } from "vue";

	const count = ref(2);
	function fetchApi() {
		return new Promise((resolve) => {
			setTimeout(() => {
				count.value = 6;
				resolve(true);
			}, 3000);
		});
	}
	await fetchApi();
</script>

<style lang="scss" scoped>
	ul {
		@include placeholder-order;
		li {
			@include flex-layout(row, space-between, center);
			border-bottom: 1px solid #eee;
			padding: 10px 0;
			&:last-child {
				border-bottom: none;
			}
			img {
				width: 65px;
				height: 45px;
				border-radius: 4px;
				margin-right: 5px;
				object-fit: cover;
			}
			.content {
				display: flex;
				flex-direction: column;
				flex: 1;
				margin-left: 5px;
				width: 100px;
				overflow: hidden;
				p {
					line-height: 16px;
					font-weight: normal;
					margin: 5px 0;
					max-width: 100px;
				}
				.title {
					font-weight: bold;
					color: #333;
					font-size: 14px;
					display: inline-block;
					@include line-text-overflow;
				}
				.price {
					color: #666;
					font-size: 12px;
				}
			}
		}
	}
</style>
