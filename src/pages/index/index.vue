<template lang="html">
    <div class="">
    	<Advertising />
        <TrackingList :activeIndex="0" />
        <!-- <SementAlert :isShow="isShow" @closeAlert="closeAlert" /> -->

        <!-- <view style="width:100%;position:relative;background:gray;"> -->
           <official-account style="position:absolute;bottom:0;width:100%;height:200rpx;"></official-account>
        <!-- </view> -->
    </div>
</template>

<script>
// 引入国内国外组件
import TrackingList from '../../components/TrackingList.vue';
import SementAlert from '../../components/sementAlert.vue';
//引入轮播图组件
import Advertising from '../../components/swiper/advertising.vue';

export default {
    data () {
        return {
            isShow: true
        };
    },
    onShow () {
        this.isShow = true;
    },
    components: {
        TrackingList,
        //SementAlert,
        Advertising
    },
    methods: {
        closeAlert () {
            this.isShow = false;
        }
    },
    onShareAppMessage: function (options) {
        const _this = this;
        let shareImg = 'https://wuchangwang.cn/vendorDoc/whd/0/share.jpg';
            // shareImg = 'https://style.org.hc360.com/images/microMall/program/dImg1.png',
        let title = '铁路运踪';
        // 设置菜单中的转发按钮触发转发事件时的转发内容
        let shareObj = {
            // 默认是小程序的名称(可以写slogan等)
            title: title,
            // 默认是当前页面，必须是以‘/’开头的完整路径
            // path: 'pages/index/index',
            /*自定义图片路径，可以是本地文件路径、代码包文件路径或者网络图片路径，支持PNG及JPG，不传入
            imageUrl 则使用默认截图。显示图片长宽比是 5:4*/
            imageUrl: shareImg,
            success: function (res) {
                // 转发成功之后的回调
                // console.log(res);
                if (res.errMsg == 'shareAppMessage:ok') { };
            },
            // 转发失败之后的回调
            fail: function (res) {
                // 用户取消转发
                if (res.errMsg == 'shareAppMessage:fail cancel') { }
                // 转发失败，其中 detail message 为详细失败信息
                else if (res.errMsg == 'shareAppMessage:fail') { }
            }
        };
        // 来自页面内的按钮的转发
        if (options.from == 'button') {
            // console.log(options);
            // var eData = options.target.dataset;
        };
        // console.log(shareObj);
        return shareObj;
    }
};
</script>
