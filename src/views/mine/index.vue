<template>
	<div>个人中心</div>
	<button @click="() => router.push({ name: 'Home', params: { id: 2 } })">
		跳转首页
	</button>
</template>

<script setup lang="ts">
	import { useRouter, useRoute } from "vue-router";

	const router = useRouter();
	const routes = useRoute();
</script>

<style lang="scss" scoped></style>
