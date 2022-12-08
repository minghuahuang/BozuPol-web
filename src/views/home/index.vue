<template>
	<div>首页</div>
	<button @click="() => router.push({ path: '/mine', query: { id: 1 } })">
		跳转个人中心
	</button>
</template>

<script setup lang="ts">
	import { useRouter, useRoute } from "vue-router";
	const router = useRouter();
	const routes = useRoute();
	console.log(routes.params);
</script>

<style scoped></style>
