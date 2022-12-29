<template>
	<el-tabs v-model="cityCode" @tab-click="handleTabChange" type="card">
		<el-tab-pane
			v-for="item in citys"
			:label="item.city"
			:name="item.cityCode"
		></el-tab-pane>
	</el-tabs>
</template>

<script setup lang="ts">
	import { useStore } from "@/store";
	import { ref, reactive } from "vue";
	import type { RoomListParamsType } from "@/api/type";

	const store = useStore();

	const cityCode = ref(store.state.cityCode);
	const citys = reactive([
		{
			city: "北京",
			cityCode: "110100",
		},
		{
			city: "上海",
			cityCode: "310100",
		},
		{
			city: "广州",
			cityCode: "440100",
		},
		{
			city: "深圳",
			cityCode: "440300",
		},
		{
			city: "天津",
			cityCode: "120100",
		},
		{
			city: "苏州",
			cityCode: "320500",
		},
		{
			city: "杭州",
			cityCode: "330100",
		},
		{
			city: "重庆",
			cityCode: "500100",
		},
		{
			city: "成都",
			cityCode: "510100",
		},
	]);
	const handleTabChange = (tab: any) => {
		const { name, label } = tab.props;
		cityCode.value = name;
		store.dispatch("getRoomList", {
			pageNum: 1,
			city: label,
			cityCode: name,
		} as RoomListParamsType);
	};
</script>

<style lang="scss" scoped></style>
