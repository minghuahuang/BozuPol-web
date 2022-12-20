<template>
	<div class="home-page">
		<div class="banner"></div>
		<div class="main-wrapper">
			<h2 class="title">主标题</h2>
			<p class="sub-title">副标题</p>
			<div class="home-list">
				<div class="item" v-for="item in 6">
					<img src="../../assets/images/login/bg.jpg" alt="" />
					<p class="label">房屋标题</p>
					<p class="price">1314</p>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
	import { ref } from "vue";
</script>

<style lang="scss" scoped>
	@import "@/assets/scss/home/index.scss";
</style>
