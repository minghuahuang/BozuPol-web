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
						<el-input placeholder="请输入联系人姓名" v-model="info.userName"></el-input>
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
	import { reactive, computed, getCurrentInstance } from "vue";
	import { saveOrder } from "@/api/order";
	import { useRoute } from "vue-router";

	const store = useStore();
	const route = useRoute();

	const detailInfo = computed(() => store.state.detail);

	const { proxy } = getCurrentInstance();

	const info = reactive({
		count: 1,
		userName: "",
		phone: "",
	});

	const handleOrder = () => {
		// 数据校验

		const { code } = route.query;
		const { name, minPrice } = detailInfo.value;
		const params = {
			code,
			name,
			minPrice,
			imgUrl: "https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg",
			...info,
		};
		saveOrder(params).then((res) => {
			const { data } = res;
			if (data) {
				proxy.$notify({
					title: "预定成功",
					message: "恭喜您，预定成功，稍后在订单中心查看。",
					type: "success",
					duration: 300,
				});
			} else {
				proxy.$notify({
					title: "预定失败",
					message: "订单中心已存在。",
					type: "error",
					duration: 300,
				});
			}
			info.userName = "";
			info.phone = "";
		});
	};
</script>

<style lang="scss" scoped>
	@import "@/assets/scss/detail/index.scss";
</style>
