<template>
	<div class="home-list">
		<div class="item" v-for="item in store.state.roomList">
			<img :src="item.headImageUrl" alt="" />
			<p class="label">{{ item.name }}</p>
			<p class="price">￥{{ item.minPrice }}起</p>
		</div>
	</div>
	<Pagination @changePage="changePage" />
</template>

<script setup lang="ts">
	import Pagination from "@/components/common/pagination.vue";
	import { useStore } from "@/store";

	const store = useStore();
	const changePage = (pageNum: number) => {
		console.log(pageNum);
		store.dispatch("getRoomList", { pageNum });
	};
</script>

<style lang="scss"></style>
