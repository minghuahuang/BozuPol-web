<template>
	<div class="home-page">
		<div class="banner"></div>
		<div class="main-wrapper">
			<h2 class="title">主标题</h2>
			<p class="sub-title">副标题</p>
			<div class="home-list">
				<div class="item" v-for="item in store.state.roomList">
					<img :src="item.headImageUrl" alt="" />
					<p class="label">{{ item.name }}</p>
					<p class="price">￥{{ item.minPrice }}起</p>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
	import { defineComponent } from "vue";
	import { useStore } from "@/store";
	export default defineComponent({
		setup(props) {
			const store = useStore();
			return { store };
		},
		asyncData({ store, route }: any) {
			return store.dispatch("getRoomList", {
				pageNo: 1,
				pageSize: 3,
				cityCode: "hz",
			});
		},
	});
</script>

<style lang="scss" scoped>
	@import "@/assets/scss/home/index.scss";
</style>
