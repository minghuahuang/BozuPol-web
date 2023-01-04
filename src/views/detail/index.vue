<template>
	<Detail />
</template>

<script lang="ts">
	import { defineComponent } from "vue";
	import Detail from "./components/detaii.vue";

	export default defineComponent({
		components: { Detail },
		setup() {},
		asyncData({ route, store }: any) {
			const { code: storeCode } = store.state;
			const { code: routeCode } = route.value.query;
			return store.dispatch("getRoomDetail", {
				code: storeCode || routeCode,
			});
		},
	});
</script>

<style lang="scss" scoped></style>
