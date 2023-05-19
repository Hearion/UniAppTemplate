<template>
    <view>
        <view :style="{paddingBottom: windowWidth * 0.314 - 15 + 'px'}"/>

        <image mode="widthFix" :style="{position: 'fixed', zIndex: 10, bottom: 0}" style="width: 100%" src="/static/image/background/Tabbar.png"/>
        <view class="flexRowAroundCenter tabBar" :style="{background: '#FFF', position: 'fixed',  zIndex: 11, bottom: 0, paddingBottom: 36 + 'rpx'}">
            <view  v-for="(item, index) in tabBarList" :key="item.icon">
                <view @click="onTabBarChange(index)" class="flexColumnCenter" style="padding: 0 60rpx" v-if="item.icon !== 'accessCode'">
                    <u-icon :name="item.icon" size="50rpx" :color="value === index ? '#3c9cff' : '#9E9F9F'"/>
                    <view :class="value === index ? 'activeText' : 'tabText'">{{item.text}}</view>
                </view>
                <view @click="onTabBarChange(index)" class="flexColumnCenter" v-else style="height: 80rpx; padding: 0 60rpx">
                    <view class="flexColumnCenter" style="position: relative; top: -30rpx; ">
                        <image v-if="isAdmin" class="activeImage" :src="value === index ? '/static/image/icon/scanCodeActive.png' : '/static/image/icon/scanCode.png'"/>
                        <image v-else class="activeImage" :src="value === index ? '/static/image/icon/accessCodeActive.png' : '/static/image/icon/accessCode.png'"/>
                        <view style="position: relative" :class="value === index ? 'activeText' : 'tabText'">{{item.text}}</view>
                    </view>
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
						text: '通行码',
						route: '/pages/accessCode/accessCode',
						icon: 'accessCode'
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
            let loginData = uni.getStorageSync('loginData')
            if (loginData.userType === 'admin') {
                this.tabBarList[1] = {
                    text: '扫码',
                    route: '/pages/accessCode/scanCode',
                    icon: 'accessCode'
                }
                this.isAdmin = true
            }
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