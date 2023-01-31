<template>
	<Teleport to="#app">
		<div class="mask" @click="handleClosePopover"></div>
	</Teleport>
	<ul>
		<li v-for="item in orders" @click="handleLink(item.code)">
			<img :src="item.imgUrl" />
			<div class="content">
				<p class="title">{{ item.name }}</p>
				<p class="price">{{ item.minPrice }}元起</p>
			</div>
		</li>
	</ul>
</template>

<script setup lang="ts">
	import { ref, getCurrentInstance } from "vue";
	import { orderList } from "@/api/order";
	import { useRouter } from "vue-router";
	import { useStore } from "@/store";

	const orders = ref([]);
	const router = useRouter();
	const store = useStore();
	const { proxy } = getCurrentInstance();

	const getOrderList = () => {
		return orderList().then((res) => {
			const { code, data, message } = res;
			if (code === 200) {
				orders.value = data;
			} else {
				proxy.$message.error(message);
			}
		});
	};

	// 验证登录态
	if (store.state.userStatus) {
		await getOrderList();
	} else {
		const { pathname, search } = window.location;
		router.replace({
			path: "/login",
			query: {
				redirect: pathname + search,
			},
		});
	}

	// 订单中心跳转
	const handleLink = (code: string) => {
		router.push({
			path: "/detail",
			query: { code },
		});
	};

	const handleClosePopover = () => {
		store.commit("setShowOrder", false);
	};
</script>

<style lang="scss" scoped>
	ul {
		@include placeholder-order;
		li {
			@include flex-layout(row, space-between, center);
			border-bottom: 1px solid #eee;
			padding: 10px 0;
			&:last-child {
				border-bottom: none;
			}
			img {
				width: 65px;
				height: 45px;
				border-radius: 4px;
				margin-right: 5px;
				object-fit: cover;
			}
			.content {
				display: flex;
				flex-direction: column;
				flex: 1;
				margin-left: 5px;
				width: 100px;
				overflow: hidden;
				p {
					line-height: 16px;
					font-weight: normal;
					margin: 5px 0;
					max-width: 100px;
				}
				.title {
					font-weight: bold;
					color: #333;
					font-size: 14px;
					display: inline-block;
					@include line-text-overflow;
				}
				.price {
					color: #666;
					font-size: 12px;
				}
			}
		}
	}
</style>
