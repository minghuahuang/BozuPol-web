<template>
	<div class="login-page">
		<div class="left-part"></div>
		<div class="right-part">
			<div class="login-panel">
				<el-tabs v-model="activeName" @tab-click="handleTabClick">
					<el-tab-pane :label="t('login.loginTab')" name="login"></el-tab-pane>
					<el-tab-pane :label="t('login.signTab')" name="sign"></el-tab-pane>
				</el-tabs>
				<el-form :model="info" ref="login" :rules="rules">
					<el-form-item prop="phone">
						<el-input
							v-model="info.phone"
							:placeholder="t('login.placeMobile')"
						></el-input>
					</el-form-item>
					<el-form-item prop="password">
						<el-input
							v-model="info.password"
							:placeholder="t('login.placePass')"
							type="password"
							show-password
						></el-input>
					</el-form-item>
					<el-form-item class="login-btn">
						<el-button @click="handleLogin">{{ loginText }}</el-button>
					</el-form-item>
				</el-form>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
	import { ref, reactive } from "vue";
	import { useI18n } from "vue-i18n";

	type InfoType = {
		phone: string;
		password: string;
	};

	const { t } = useI18n();

	const activeName = ref("login");

	const loginText = ref(t("login.loginBtn"));
	const handleTabClick = (val: any) => {
		const { name } = val.props;
		if (name === "login") {
			loginText.value = t("login.loginBtn");
		} else if (name === "sign") {
			loginText.value = t("login.signBtn");
		}
	};

	const login = ref();
	const info: InfoType = reactive({
		phone: "",
		password: "",
	});
	const rules = reactive({
		phone: [
			{
				required: true,
				min: 11,
				max: 11,
				message: t("login.placeMobile"),
				trigger: "blur",
			},
		],
		password: [
			{
				required: true,
				message: t("login.placePass"),
				trigger: "blur",
			},
		],
	});
	const handleLogin = () => {
		login.value.validate((valid: boolean) => {
			if (valid) {
				console.log(info);
			}
		});
	};
</script>

<style lang="scss" scoped>
	@import "@/assets/scss/login/index.scss";
</style>
