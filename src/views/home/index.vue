<template>
	<div class="home-page">
		<div class="banner"></div>
		<div class="main-container">
			<h2 class="title">主标题</h2>
			<p class="sub-title">副标题</p>
			<HomeList />
		</div>
	</div>
</template>

<script lang="ts">
	import { defineComponent } from "vue";
	import { useStore } from "@/store";

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
			return store.dispatch("getRoomList", { pageNum });
		},
	});
</script>

<style lang="scss">
	// 不能添加scoped，会导致homeList组件样式不生效
	@import "@/assets/scss/home/index.scss";
</style>
