<template>
    <view>
        <view>index</view>
        <view @click="onGoToLogin">GoToLogin</view>

        <canvas id="myCanvas" class="canvas-case" type="2d" style="border: 1px solid; width: 300px; height: 300px;" />
        <view @click="onZip">压缩</view>

        <MTabBar :value="0" :active-color="'red'"/>
    </view>

</template>

<script>

import {contraction, notificationFun, onCreateImageCompress} from "@/utils/PrjUtils";

export default {

    data() {
        return {}
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
    watch: {},
    computed: {},
    methods: {
        onGoToLogin() {


        },
        onZip() {
            wx.chooseImage({
                count: 1, // 默认9
                sizeType: ['original', 'compressed'],
                sourceType: ['album'],
                success: (res) => {

                    wx.getImageInfo({
                        src: res.tempFilePaths[0],
                        success: (res) => {
                            console.log(res, 'res')
                            let imgInfo = {
                                type: res.type,
                                height: res.height,
                                width: res.width,
                                path: res.path
                            }
                            contraction(imgInfo, 'myCanvas', this)
                        },
                        fail(err) {

                        }
                    })
                }
            })
        }
    }
}
</script>

<style>

</style>
