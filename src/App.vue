<template>
	<el-config-provider :locale="locale">
		<HeaderCommon
			v-show="!/login/.test(route.fullPath)"
			@changeLanguage="handleLanguageChage"
		/>
		<div class="container">
			<router-view></router-view>
		</div>
		<FooterCommon v-show="!/login/.test(route.fullPath)" />
	</el-config-provider>
</template>

<script setup lang="ts">
	import FooterCommon from "./components/layout/footerCommon.vue";
	import HeaderCommon from "./components/layout/headerCommon.vue";
	import zhCn from "element-plus/lib/locale/lang/zh-cn";
	import en from "element-plus/lib/locale/lang/en";
	import { ref } from "vue";
	import { useI18n } from "vue-i18n";
	import { useRoute } from "vue-router";

	const locale = ref(zhCn);
	const { locale: localeLanguage } = useI18n();
	const handleLanguageChage = (lanuage: any) => {
		locale.value = lanuage;
		localeLanguage.value = lanuage.name;
	};

	const route = useRoute();
</script>

<style lang="scss" scoped>
	#app {
		font-family: Avenir, Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
	}
</style>
