<template>
	<div class="header">
		<img
			@click="router.push({ name: 'Home' })"
			class="logo"
			src="../../assets/images/layout/logo.png"
			alt="bozupol"
		/>
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
			<el-sub-menu index="avatar" v-if="state.userStatus === 1">
				<template #title>
					<img class="avatar" src="../../assets/images/layout/avatar.png" alt="ming" />
				</template>
				<el-menu-item index="logout">{{ t("login.logout") }}</el-menu-item>
			</el-sub-menu>
			<el-menu-item index="login">
				{{ t("login.loginTab") }}/{{ t("login.signTab") }}
			</el-menu-item>
		</el-menu>
	</div>
</template>

<script setup lang="ts">
	import zhCn from "element-plus/lib/locale/lang/zh-cn";
	import en from "element-plus/lib/locale/lang/en";
	import { ref, getCurrentInstance } from "vue";
	import { savaLanguage, fetchLanguage } from "../../api/layout";
	import { useI18n } from "vue-i18n";
	import { useRouter } from "vue-router";
	import { userLogout } from "@/api/login";
	import type { ResponseType } from "@/api/type";
	import { useStore } from "@/store";

	const { state, dispatch } = useStore();

	const { proxy } = getCurrentInstance();

	const { t, locale } = useI18n();

	const router = useRouter();

	const activeIndex = ref("orders");

	const handleSelect = (key: string, keyPath: string[]) => {
		if (key === "zh") {
			dispatch("fetchLanguageSave", zhCn);
			locale.value = key;
		} else if (key === "en") {
			dispatch("fetchLanguageSave", en);
			locale.value = key;
		} else if (key === "login") {
			router.push({
				path: "/login",
			});
		} else if (key === "logout") {
			fetchLogout();
		}
	};

	const emit = defineEmits<{ (e: "changeLanguage", language: any): void }>();

	const handleLanguageGet = () => {
		fetchLanguage().then((res) => {
			if (res.code === 200) {
				if (res.data && res.data.name.name === "zh") {
					emit("changeLanguage", zhCn);
				} else if (res.data && res.data.name.name === "en") {
					emit("changeLanguage", en);
				}
			}
		});
	};
	// handleLanguageGet();

	// 登出接口
	const fetchLogout = () => {
		userLogout().then((res: ResponseType) => {
			if (res.code === 200) {
				router.push({
					path: "/login",
				});
				localStorage.setItem("userStatus", "0");
			} else {
				proxy.$message.error(res.message);
			}
		});
	};
</script>

<style lang="scss" scoped>
	@import "@/assets/scss/layout/header.scss";
</style>
