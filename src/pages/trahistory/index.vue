<template lang="html">
    <div class="trahistory">
        <titleBar
            :titleList="titleList"
            :currentTab="currentTab"
            @toogerTitle="toogerFn" />
            <swiper :style="{'height': scrollH + 'px'}"
                :current="currentTab"
                @change="changeEvent">
                <swiper-item>
                    <selectFile :scrollH="scrollH" :currentTab="0" />
                </swiper-item>
                <swiper-item>
                    <selectFile :scrollH="scrollH" :currentTab="1" />
                </swiper-item>
            </swiper>

    </div>
</template>

<script>

import titleBar from '../../components/titleBar.vue';
import selectFile from '../../components/selectFile.vue';
import selectFile2 from '../../components/selectFile2.vue';
export default {
    props: ['active'],
    data () {
        return {
            currentTab: 0,
            scrollH: 0,
            titleList: [
                {
                    key: 'detail',
                    text: '国外运踪历史记录'
                },
                {
                    key: 'news',
                    text: '国内运踪历史记录'
                }
            ]
        };
    },
    methods: {
        toogerFn (index) {
            this.currentTab = index;
        },
        changeEvent (e) {
            this.currentTab = e.mp.detail.current;
        },
        getScrollHeiht () {
            const _this = this;
            wx.getSystemInfo({
                success: function (res) {
                    _this.scrollH = res.windowHeight - 45;
                }
            });
        }
    },
    onLoad (options) {
        this.currentTab = Number(options.active);
        this.getScrollHeiht();
    },
    components: {
        titleBar,
        selectFile,
        selectFile2
    }
};
</script>

<style lang="css">
.tra-container {
    padding: 5px 15px;
    border-bottom: solid 1px #e8e8e8;
}
.tra-time {
    display: flex;
    align-items: center;
    height: 55px;
    justify-content:center;

}
.tra-time .tra-left {
    margin-left: 15px;
    margin-right: 40px;
    position: relative;
}
.tra-line::after {
    content: '';
    width: 20px;
    height: 2px;
    right: -30px;
    top: 50%;
    position: absolute;
    background-color: #000000;
}

.tra-input {
    width: 115px;
    height: 30px;
    position: relative;
}
picker{
    width: 100%;
}
.tra-input .iconfont {
    display:block;
    width: 100%;
    text-align:right;
    padding-right: 5px;
    box-sizing:border-box;

}
.tra-input .valid-picker {
    position: absolute;
    top: 0;
    right: 0;
    z-index: 200;
}
.tra-input input {
    font-size: 12px;
    border: #e8e8e8 1px solid;
    padding-left: 10px;
    height: 30px;
}
.tra-input .tra-btn {
    display: block;
    padding: 6px 15px;
    background: #4aa0e6;
    color: #ffffff;
    border-radius: 3px;
    text-align: center;
    /* margin-left: 20px; */

}
.tra-input .tra-btnw {
    display:block;
    padding: 6px 15px;
    background:#4aa0e6;
    color:#ffffff;
    border-radius:6rpx;
    margin-left:-84rpx;
    width:241px;
    text-align:center;
}

.tra-detail {
}
.tra-detail li {
    padding: 5px 10px;
    border-bottom: 1px solid rgb(242, 240, 242);
}
.tra-detail li p, .tra-date {
    font-size: 12px;
    color: #4c4c4d;
}
.tra-pls a {
    font-size: 14px;
    color: #0076ff;
}
.tra-pls {
    height: 40px;
    line-height: 40px;
}
.tra-pls span {
    float: left;
    color: #fea202;
}
.tra-pls a {
    float: right;
}
</style>
