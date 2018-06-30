<template lang="html">
    <div class="">

    </div>
</template>

<script>
export default {
    created () {
    // 调用API从本地缓存中获取数据
        const logs = wx.getStorageSync('logs') || [];
        logs.unshift(Date.now());
        wx.setStorageSync('logs', logs);
    }
};
</script>
<style media="screen">
    @import url('../static/css/font/iconfont.css');

    page{
        font-size: 14px;
    }

    /* railtrack 页面公共模块样式 */

    .range-title {
        font-size: 14px;
        height: 36px;
        line-height: 36px;
        padding: 0 20px;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        border-bottom: 1px solid rgb(242, 240, 242);
    }

    .range-title p{
        padding: 0 10px;
        font-weight: bold;
    }

    .iconfont {
        font-size: 24px;
    }

    .range-text{
        padding: 10px 22px 20px 22px;
        position: relative;
        border-bottom: 1px solid rgb(242, 240, 242);
    }
    .range-text ul li{
        font-size: 14px;
        height: 22px;
        line-height: 22px;
    }

</style>
