<template>
	<el-carousel
		type="card"
		height="380px"
		:interval="3000"
		trigger="click"
		indicator-position="none"
		class="swiper-wrapper"
	>
		<el-carousel-item v-for="item in detailInfo.headImgUrlList">
			<img :src="item.imgUrl" :alt="item.name" />
		</el-carousel-item>
	</el-carousel>
	<div class="room-wrapper">
		<div class="room-detail">
			<div class="detail-part">
				<h2>{{ detailInfo.name }}</h2>
				<div class="tag-wrapper">
					<el-tag
						class="tag-item"
						type="danger"
						v-for="item in detailInfo.detailLabelArray"
						>{{ item }}</el-tag
					>
				</div>
				<div class="info-wrapper">
					<p class="address">
						地址：{{ detailInfo.city }}-{{ detailInfo.area }}-{{ detailInfo.address }}
					</p>
					<p class="bed">床位：{{ detailInfo.bedNum }}</p>
					<p class="brand">品牌：{{ detailInfo.importantShareholders }}</p>
					<p class="statement">说明：{{ detailInfo.detailLabel }}</p>
				</div>
				<div class="owner-wrapper">
					<p>企业信息：{{ detailInfo.shortName }}</p>
					<p>机构性质：{{ detailInfo.mechanismNatureDesc }}</p>
					<p>机构类型：{{ detailInfo.mechanismTypeDesc }}</p>
					<p>机构特点：{{ detailInfo.homeLabel }}</p>
				</div>
			</div>
			<div class="invite-part">
				<h2>预约参观</h2>
				<el-form ref="invite" :model="info" label-width="82px">
					<el-form-item label="参观人数：">
						<el-input placeholder="请输入参观人数" v-model="info.count"></el-input>
					</el-form-item>
					<el-form-item label="联 系 人：">
						<el-input placeholder="请输入联系人姓名" v-model="info.name"></el-input>
					</el-form-item>
					<el-form-item label="联系电话：">
						<el-input placeholder="请输入联系电话" v-model="info.phone"></el-input>
					</el-form-item>
					<div class="order-button">
						<el-button type="primary" @click="handleOrder">预 定</el-button>
					</div>
				</el-form>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
	import { useStore } from "@/store";
	import { reactive, computed } from "vue";

	const store = useStore();

	const detailInfo = computed(() => store.state.detail);

	const info = reactive({
		count: 0,
		name: "",
		phone: "",
	});

	const handleOrder = () => {
		console.log("提交", info);
	};
</script>

<style lang="scss" scoped>
	@import "@/assets/scss/detail/index.scss";
</style>
