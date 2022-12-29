<template>
	<div class="home-page">
		<div class="banner"></div>
		<div class="main-container">
			<h2 class="title">跨年特惠房源</h2>
			<p class="sub-title">品质房源，低至5折</p>
			<HomeList />
		</div>
	</div>
</template>

<script lang="ts">
	import { defineComponent } from "vue";
	import { useStore } from "@/store";
	import type { RoomListParamsType } from "@/api/type";

	import HomeList from "./components/homeList.vue";
	export default defineComponent({
		components: { HomeList },
		setup() {
			const store = useStore();
			return {
				store,
			};
		},
		asyncData({ store, route }: any) {
			const { pageNum } = store.state;
			return store.dispatch("getRoomList", {
				pageNum,
				city: "北京",
				cityCode: "110100",
			} as RoomListParamsType);
		},
	});
</script>

<style lang="scss">
	// 不能添加scoped，会导致homeList组件样式不生效
	@import "@/assets/scss/home/index.scss";
</style>
