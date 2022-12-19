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
	import { ref } from "vue";
	import { useI18n } from "vue-i18n";
	import { useRouter } from "vue-router";
	import useFormProperties from "@/composables/login/useFormProperties";
	import userFormOperates from "@/composables/login/userFormOperates";

	const router = useRouter();

	const { t } = useI18n();

	const { activeName, loginText, info, rules } = useFormProperties(t);

	const { fetchSign, fetchLogin } = userFormOperates(router, info);

	const handleTabClick = (val: any) => {
		const { name } = val.props;
		loginText.value = t(`login['${name}Btn']`);
	};

	const login = ref();
	const handleLogin = () => {
		login.value.validate((valid: boolean) => {
			if (valid) {
				if (activeName.value === "sign") {
					fetchSign(info);
				} else if (activeName.value === "login") {
					fetchLogin(info);
				}
			}
		});
	};
</script>

<style lang="scss" scoped>
	@import "@/assets/scss/login/index.scss";
</style>
