<template>
	<el-config-provider :locale="locale">
		<headerCommonVue @changeLanguage="handleLanguageChage" />
		<router-view></router-view>
	</el-config-provider>
</template>

<script setup lang="ts">
	import headerCommonVue from "./components/layout/headerCommon.vue";
	import zhCn from "element-plus/lib/locale/lang/zh-cn";
	import en from "element-plus/lib/locale/lang/en";
	import { ref } from "vue";
	import { useI18n } from "vue-i18n";

	const locale = ref(zhCn);
	const { locale: localeLanguage } = useI18n();
	const handleLanguageChage = (lanuage: any) => {
		locale.value = lanuage;
		localeLanguage.value = lanuage.name;
	};
</script>

<style lang="scss" scoped></style>
