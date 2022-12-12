<template>
	<div class="home">
		<div>首页</div>
		<div class="blue">蓝色</div>
	</div>
	<button @click="() => router.push({ path: '/mine', query: { id: 1 } })">
		跳转个人中心
	</button>
	<el-button type="default" @click="add({ length: 10, width: 20 })">增1</el-button>
	<el-button type="default" @click="add({ length: 30, width: 40 })">增2</el-button>
	<el-button type="default" @click="add({ length: 50, width: 60 })">增3</el-button>
	<el-button type="default" @click="update">改</el-button>
	<el-button type="default" @click="deleteSource">删</el-button>
	<el-button type="default" @click="getAll">查全部</el-button>
	<el-button type="default" @click="getOne(2)">查一条</el-button>
</template>

<script setup lang="ts">
	import { useRouter, useRoute } from "vue-router";
	import { getCurrentInstance } from "vue";
	import { fetchSessionId, fetchRoomList } from "../../api/index";
	import DB from "../../utils/indexedDB";

	const router = useRouter();
	const routes = useRoute();
	console.log(routes.params);

	const { proxy }: any = getCurrentInstance();
	proxy.$message({
		message: "this is a message",
	});

	const db = new DB("bozupol");
	db.openStore("room", "id", ["floor", "ceil"]);
	// 增
	function add(data: object) {
		db.updateItem("room", data);
	}
	// 改
	function update() {
		db.updateItem("room", {
			id: 1, // 传入id改
			length: "20",
			width: "40",
		});
	}
	// 删
	function deleteSource() {
		db.deleteItem("room", 1);
	}
	// 查-所有数据
	function getAll() {
		db.getItems("room");
	}
	// 查-某一条数据
	function getOne(key: number | string) {
		db.getItem("room", key);
	}

	const getSessionId = () => {
		fetchSessionId({ id: 412005352 })
			.then((res) => {
				console.log(res);
			})
			.catch((err) => {
				console.log(err);
			});
	};
	getSessionId();

	const getRooms = () => {
		fetchRoomList()
			.then((res) => {
				console.log(res);
			})
			.catch((err) => {
				console.log(err);
			});
	};
	getRooms();
</script>

<style lang="scss" scoped>
	.home {
		color: red;
		.blue {
			color: blue;
		}
	}
</style>
