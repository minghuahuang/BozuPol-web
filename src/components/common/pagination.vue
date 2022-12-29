<template>
	<el-pagination
		:current-page="pageNum"
		:page-size="pageSize"
		:total="total"
		@current-change="handleCurrentChange"
		background
		layout="prev,pager,next"
	></el-pagination>
</template>

<script setup lang="ts">
	import { computed } from "vue";
	import { useStore } from "@/store";

	const store = useStore();
	const pageNum = computed(() => store.state.pageNum);
	const pageSize = computed(() => store.state.pageSize);
	const total = computed(() => store.state.total);

	const emit = defineEmits<{
		(e: "changePage", pageNum: number): void;
	}>();

	const handleCurrentChange = (pageNum: number) => {
		emit("changePage", pageNum);
	};
</script>

<style lang="scss" scoped></style>
