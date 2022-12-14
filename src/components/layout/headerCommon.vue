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
			<el-menu-item index="orders">房屋订单中心</el-menu-item>
			<el-menu-item index="records">历史足迹</el-menu-item>
			<el-sub-menu index="language">
				<template #title>国际化切换</template>
				<el-menu-item index="zh">中文</el-menu-item>
				<el-menu-item index="en">English</el-menu-item>
			</el-sub-menu>
			<el-menu-item index="avatar">
				<img class="avatar" src="../../assets/images/layout/avatar.png" alt="ming" />
			</el-menu-item>
		</el-menu>
	</div>
</template>

<script setup lang="ts">
	import zhCn from "element-plus/lib/locale/lang/zh-cn";
	import en from "element-plus/lib/locale/lang/en";
	import { ref, defineEmits } from "vue";
	import { savaLanguage, fetchLanguage } from "../../api/layout";

	const activeIndex = ref("orders");

	const handleSelect = (key: string, keyPath: string[]) => {
		if (key === "zh") {
			emit("changeLanguage", zhCn);
			handleLanguageSave(zhCn);
		} else if (key === "en") {
			emit("changeLanguage", en);
			handleLanguageSave(en);
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
			if (res.code === 200) {
				if (res.data.name.name === "zh") {
					emit("changeLanguage", zhCn);
				} else if (res.data.name.name === "en") {
					emit("changeLanguage", en);
				}
			}
		});
	};
	handleLanguageGet();
</script>

<style lang="scss" scoped>
	@import "@/assets/scss/layout/index.scss";
</style>
