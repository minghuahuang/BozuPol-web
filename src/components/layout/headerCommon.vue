<template>
	<div class="header">
		<img class="logo" src="../../assets/images/layout/logo.png" alt="bozupol" />
		<el-menu
			:default-active="activeIndex"
			class="el-menu-demo"
			mode="horizontal"
			:ellipsis="false"
			@select="handleSelect"
		>
			<el-menu-item index="orders">{{ t("header.orders") }}</el-menu-item>
			<el-menu-item index="records">{{ t("header.records") }}</el-menu-item>
			<el-sub-menu index="language">
				<template #title>{{ t("header.language") }}</template>
				<el-menu-item index="zh">简体中文</el-menu-item>
				<el-menu-item index="en">English</el-menu-item>
			</el-sub-menu>
			<el-menu-item index="avatar">
				<img class="avatar" src="../../assets/images/layout/avatar.png" alt="ming" />
			</el-menu-item>
			<el-menu-item index="login">
				{{ t("login.loginTab") }}/{{ t("login.signTab") }}
			</el-menu-item>
		</el-menu>
	</div>
</template>

<script setup lang="ts">
	import zhCn from "element-plus/lib/locale/lang/zh-cn";
	import en from "element-plus/lib/locale/lang/en";
	import { ref } from "vue";
	import { savaLanguage, fetchLanguage } from "../../api/layout";
	import { useI18n } from "vue-i18n";
	import { useRouter } from "vue-router";

	const { t } = useI18n();

	const router = useRouter();

	const activeIndex = ref("orders");

	const handleSelect = (key: string, keyPath: string[]) => {
		if (key === "zh") {
			emit("changeLanguage", zhCn);
			handleLanguageSave(zhCn);
		} else if (key === "en") {
			emit("changeLanguage", en);
			handleLanguageSave(en);
		} else if (key === "login") {
			router.push({
				path: "/login",
			});
		}
	};

	const emit = defineEmits<{ (e: "changeLanguage", language: any): void }>();

	const handleLanguageSave = (language: any) => {
		savaLanguage(language).then((res) => {
			if (res.code === 200) {
				console.log("保存语言包成功");
			}
		});
	};

	const handleLanguageGet = () => {
		fetchLanguage().then((res) => {
			console.log(res);
			if (res.code === 200) {
				if (res.data && res.data.name.name === "zh") {
					emit("changeLanguage", zhCn);
				} else if (res.data && res.data.name.name === "en") {
					emit("changeLanguage", en);
				}
			}
		});
	};
	handleLanguageGet();
</script>

<style lang="scss" scoped>
	@import "@/assets/scss/layout/header.scss";
</style>
