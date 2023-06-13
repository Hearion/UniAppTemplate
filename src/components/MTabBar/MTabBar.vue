<template>
    <view>
        <!-- 生成等高元素防止塌陷 -->
        <view :style="{paddingBottom: 66 + safeAreaInsets.bottom + 'px'}"/>

        <view class="flexRowAroundCenter tabBar" :style="{background: '#FFF', position: 'fixed',  zIndex: 500, bottom: 0, paddingBottom: safeAreaInsets.bottom + 'px'}">
            <view  v-for="(item, index) in tabBarList" :key="item.icon">
                <view @click="onTabBarChange(index)" class="flexColumnCenter" style="padding: 0 60rpx" >
                    <u-icon :name="item.icon" size="50rpx" :color="value === index ? '#3c9cff' : '#9E9F9F'"/>
                    <view :class="value === index ? 'activeText' : 'tabText'">{{item.text}}</view>
                </view>
            </view>
        </view>
    </view>
</template>

<script>
	export default {
		name: "MyTabBar",
		props: ['value'],
		data() {
			return {
				tabBarList: [
					{
						text: '首页',
						route: '/pages/index/index',
						icon: 'home-fill'
					},
					{
						text: '我的',
						route: '/pages/user/user',
						icon: 'account-fill'
					},
				],
                windowWidth: 0,
                windowHeight: 0,
                safeAreaInsets: {},
                isAdmin: false
			}
		},
        beforeMount() {
            uni.getSystemInfo({
                success: (res) => {
                    this.windowWidth = res.windowWidth
                    this.windowHeight = res.windowHeight
                    this.safeAreaInsets = res.safeAreaInsets
                }
            })
        },
        created() {

        },
		methods: {
			onTabBarChange(index) {
				uni.switchTab({
					url: this.tabBarList[index].route
				})
			}
		}
	}
</script>

<style lang="scss">

* {
    transition: all .5s;
}

.tabBar {
    width: 100%;
    height: 120rpx;
}

.activeText {
    font-size: 24rpx;
    color: #3c9cff;
}
.tabText {
    font-size: 24rpx;
    color: #9E9F9F;
}

.activeImage {
    width: 70rpx;
    height: 70rpx;
    padding-bottom: 30rpx;
}

.tabBar, .activeImage {
    border-collapse: collapse;
}
</style>