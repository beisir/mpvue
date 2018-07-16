<template lang="html">
    <div class=""></div>
</template>
<script>
export default {
};
</script>
<style media="screen">
    @import url('../static/css/font/iconfont.wcss');
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
        /* border-bottom: 1px solid rgb(242, 240, 242); */
    }
    .range-text ul li{
        font-size: 14px;
        height: 22px;
        line-height: 22px;
    }
    .input {
        text-align:center;
    }

    /* range */
    .range-valid li {
        padding-left: 10px;
        border-bottom: 1px solid #cccccc;
    }
    .range-valid .valid-box {
        display: flex;
        align-items: center;
        padding: 8px  10px;

    }
    .valid-left{
        /* flex: 3; */
        width: 110px;
        font-weight: bold;
    }
    .valid-input {
        width: 160px;
        padding: 0 10px;
        height: 24px;
        line-height: 24px;
        border: 1px solid #bfbfbf;
        border-radius: 3px;
        position: relative;
    }
    .valid-btn{
        color: #ffffff;
        height: 24px;
        line-height: 24px;
        padding: 0 5px;
        background-color: #fea200;
        border-radius: 3px;
        margin-left: 10px;
    }

    .valid-prompt{
        font-size: 12px;
        margin-left: 10px;
        padding-bottom: 8px;
        color: #bfbfbf;
    }

    .valid-confim {
        color: #ffffff;
        background-color: #fea200;
        margin-top: 10px;
    }

</style>
