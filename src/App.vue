<script>
import {notificationFun} from "@/utils/PrjUtils";

export default {
    onLaunch: function () {
        console.log('App Launch')

        // 获取更新管理器
        const updateManager = wx.getUpdateManager()
        
        updateManager.onCheckForUpdate(function (res) {
            // 请求完新版本信息的回调
            console.log(res.hasUpdate)
        })
        
        updateManager.onUpdateReady(function () {
            wx.showModal({
                title: '更新提示',
                content: '新版本已经准备好，请重启小程序',
                confirmText: '立即重启',
                showCancel: false,
                success: function (res) {
                    if (res.confirm) {
                        // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
                        updateManager.applyUpdate()
                    }
                }
            })
        })
        
        updateManager.onUpdateFailed(function () {
            // 新版本下载失败
            notificationFun('新版本下载失败')
        })
    },
    onShow: function () {
        console.log('App Show')
    },
    onHide: function () {
        console.log('App Hide')
    }
}
</script>

<style lang="scss">
/*每个页面公共css */
@import "uview-ui/index.scss";
@import "static/css/index.css";

* {
  box-sizing: border-box;
}

page {
  background: #F5F5F5 !important;
}
</style>
