<template>
	<view>
		<view>index</view>
		<view @click="onGoToLogin">GoToLogin</view>

		<MTabBar :value="0" :active-color="'red'"/>
	</view>

</template>

<script>

	export default {

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
