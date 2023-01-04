<template>
	<HomeTabs />
	<div class="home-list" v-if="store.state.roomList.length !== 0">
		<div
			class="item"
			v-for="item in store.state.roomList"
			@click="handleClick(item.code)"
		>
			<img :src="item.headImageUrl" alt="" />
			<p class="label">{{ item.name }}</p>
			<p class="price">￥{{ item.minPrice }}起</p>
		</div>
	</div>
	<el-empty v-else description="暂无数据" :image-size="200" />
	<Pagination @changePage="changePage" />
</template>

<script setup lang="ts">
	import Pagination from "@/components/common/pagination.vue";
	import { useStore } from "@/store";
	import HomeTabs from "./homeTabs.vue";
	import type { RoomListParamsType } from "@/api/type";
	import { useRouter } from "vue-router";

	const store = useStore();
	const router = useRouter();
	const changePage = (pageNum: number) => {
		store.dispatch("getRoomList", { pageNum } as RoomListParamsType);
	};

	const handleClick = (code: string) => {
		store.commit("setCode", code);
		router.push({
			path: "/detail",
			query: { code },
		});
	};
</script>

<style lang="scss"></style>
