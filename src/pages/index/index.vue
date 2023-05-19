<template>
	<view>
		<view>index</view>
		<view @click="onGoToLogin">GoToLogin</view>

<!--		<MyTabBar :value="0"/>-->
	</view>

</template>

<script>
	import MyTabBar from "@/components/MyTabBar/MyTabBar.vue";

	export default {
		components: {
			MyTabBar
		},
		data() {
			return {

			}
		},
		onLoad() {

		},
		onShow() {

		},
		onPullDownRefresh() {

		},
		onReachBottom() {
			console.log('触底');
		},
		watch: {

		},
		computed: {

		},
		methods: {
			onGoToLogin() {
				uni.navigateTo({
					url: '/pages/login/login'
				})
			}
		}
	}
</script>

<style>

</style>
