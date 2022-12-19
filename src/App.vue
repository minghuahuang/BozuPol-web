<template>
	<el-config-provider :locale="state.locale">
		<HeaderCommon v-show="!/login/.test(route.fullPath)" />
		<div class="container">
			<router-view></router-view>
		</div>
		<FooterCommon v-show="!/login/.test(route.fullPath)" />
	</el-config-provider>
</template>

<script setup lang="ts">
	import FooterCommon from "./components/layout/footerCommon.vue";
	import HeaderCommon from "./components/layout/headerCommon.vue";
	import { useRoute } from "vue-router";
	import { useStore } from "@/store";

	const { state } = useStore();

	const route = useRoute();
</script>

<style lang="scss" scoped>
	#app {
		font-family: Avenir, Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
	}
</style>
