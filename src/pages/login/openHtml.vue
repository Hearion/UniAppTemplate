<template>
    <view style="padding: 20rpx">
        <!-- 地址路径增加时间戳 防止硬缓存 -->
        <web-view :src="data + '?time=' + timeNow"></web-view>
    </view>
</template>

<script>
export default {
    data() {
        return {
            data: ''
        }
    },
    computed: {
        timeNow() {
            return Date.parse(new Date());
        }
    },
    onLoad(option) {
        this.data = option.url
    }
}
</script>

<style>

</style>
