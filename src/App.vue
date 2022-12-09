<script setup lang="ts">
	import HelloWorld from "./components/HelloWorld.vue";
	import { ref } from "vue";
	import { useRouter } from "vue-router";
	import zhCn from "element-plus/lib/locale/lang/zh-cn";
	import en from "element-plus/lib/locale/lang/en";
	import { useI18n } from "vue-i18n";
	const router = useRouter();

	const locale = ref(zhCn);
	const { t, locale: localeLanguage } = useI18n();
	const changeLang = (language: any) => {
		locale.value = language;
		localeLanguage.value = language.name;
		console.log(language.name);
	};
</script>

<template>
	<el-config-provider :locale="locale">
		<el-button @click="changeLang(en)">切换英文</el-button>
		<el-button @click="changeLang(zhCn)">切换中文</el-button>
		<el-table mb-1 :data="[]" />

		<div>
			<a href="https://vitejs.dev" target="_blank">
				<img src="/vite.svg" class="logo" alt="Vite logo" />
			</a>
			<a href="https://vuejs.org/" target="_blank">
				<img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
			</a>
		</div>
		<HelloWorld msg="Vite + Vue" />

		<button @click="() => router.push({ path: '/home' })">
			{{ t("message.home") }}
		</button>
		<button @click="() => router.push({ path: '/mine' })">
			{{ t("message.mine") }}
		</button>
		<router-link to="/home">{{ t("message.home") }}</router-link>
		<router-link to="/mine">{{ t("message.mine") }}</router-link>
		<router-view />
	</el-config-provider>
</template>

<style lang="scss" scoped>
	.logo {
		height: 6em;
		padding: 1.5em;
		will-change: filter;
		&:hover {
			filter: drop-shadow(0 0 2em #646cffaa);
		}
		&.vue:hover {
			filter: drop-shadow(0 0 2em #42b883aa);
		}
	}
</style>
