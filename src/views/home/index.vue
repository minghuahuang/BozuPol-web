<template>
	<div class="home">
		<div>首页</div>
		<div class="blue">蓝色</div>
	</div>
	<button @click="() => router.push({ path: '/mine', query: { id: 1 } })">
		跳转个人中心
	</button>
	<el-button type="primary">默认</el-button>
</template>

<script setup lang="ts">
	import { useRouter, useRoute } from "vue-router";
	import { getCurrentInstance } from "vue";
	const router = useRouter();
	const routes = useRoute();
	console.log(routes.params);
	const { proxy }: any = getCurrentInstance();
	proxy.$message({
		message: "this is a message",
	});
</script>

<style lang="scss" scoped>
	.home {
		color: red;
		.blue {
			color: blue;
		}
	}
</style>
