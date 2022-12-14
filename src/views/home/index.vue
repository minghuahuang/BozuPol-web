<template>
	<button>
		{{ t("message.home") }}
	</button>
	<el-table mb-1 :data="[]" />
</template>

<script setup lang="ts">
	import { ref } from "vue";
	import { useI18n } from "vue-i18n";

	const { t } = useI18n();
</script>

<style lang="scss" scoped></style>
