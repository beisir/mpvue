<template lang="html">
    <div class="railt-index">
        <titleBar
            :titleList="titleList"
            :currentTab="currentTab"
            @toogerTitle="toogerFn"
            />
        <div :class="['track-box', currentTab === 0 ? 'track-abroad': 'track-domestic']">
            <swiper
                :current="currentTab"
                duration="300"
                @change="switchTab"
                :style="{'height':winHeight + 'px'}">
                <swiper-item
                    v-for="(swipeItem, swipeIndex) in domesticArr"
                    :key="swipeIndex">
                    <scroll-view scroll-y="true" class="scoll-h" >
                        <div class="track-range"
                            v-for="(domesticItem, domesticIndex) in swipeItem"
                            :key="domesticItem.title">
                            <div class="range-title">
                                <span class="icon iconfont icon-27"></span>
                                <p class="range-head">{{domesticItem.title}}</p>
                                <span class="icon iconfont icon-huo3"></span>
                                <button
                                    v-if="domesticItem.rangeBtn"
                                    class="range-btn"
                                    type="button"
                                    @click="trackingRangeFn">追踪范围</button>
                            </div>
                            <div class="range-text">
                                <ul>
                                    <li v-for="(resultItem, resultIndex) in domesticItem.resultList" :key="resultItem">{{resultItem}}</li>
                                </ul>
                                <button v-if="!phoneNumber"
                                    class='range-go'
                                    open-type="getPhoneNumber"
                                    @getphonenumber="application">去追踪</button>
                                <button v-else
                                    class='range-go'
                                    @click="getlication"
                                    >追踪</button>
                            </div>
                        </div>
                    </scroll-view>
                </swiper-item>
            </swiper>
        </div>
    </div>
</template>

<script>
import titleBar from '../../components/titleBar.vue';
import {indexData} from '../../utils/data.js';
import UTIL from '../../util.js';
export default {
    /**
     * 组件的初始数据
     */
    data () {
        return {
            currentTab: 0,
            winHeight: '',
            titleList: [
                {
                    key: 'detail',
                    text: '国外运踪'
                },
                {
                    key: 'news',
                    text: '国内运踪'
                }
            ],
            phoneNumber: '',
            domesticArr: indexData.indexContent // 国内运踪数据
        };
    },

    /**
     * 组件的方法列表
     */
    methods: {
        // 追踪范围点击事件
        trackingRangeFn () {
            wx.showModal({
                title: '追踪范围',
                content: indexData.indexDialong.join('、'),
                showCancel: false
            });
        },
        switchTab (e) {
            let current = e.mp.detail.current;
            this.currentTab = current;
        },
        toogerFn (index) {
            this.currentTab = index;
        },

        heightWin () {
            const _this = this;
            wx.getSystemInfo({
                success: (res) => {
                    let clientHeight = res.windowHeight;
                    _this.winHeight = clientHeight;
                }
            });
        },
        async application (e) {
            try {
                let result = await UTIL.getMobilePhone(e);
                result && this.goRange();
            } catch (err) {
                console.log(err);
            };
        },
        goRange () {
            let url = '/pages/range/main';
            wx.navigateTo({url});
        },
        // 获取电话
        getlication () {
            this.goRange();
        }
    },
    created () {
        let phoneNumber = wx.getStorageSync('mobile');
        this.phoneNumber = phoneNumber;
        this.heightWin();
    },
    components: {
        titleBar
    }
};
</script>

<style lang="css">

/* 国外样式 */
.track-abroad .iconfont,.track-abroad .range-head {
    color: #1aac19;
}
.track-abroad .range-go{
    background-color: #1aac19;
}

/* 国内样式 */
.track-domestic .iconfont,.track-domestic .range-head {
    color: #44a0bd;
}
.track-domestic .range-go{
    background-color: #44a0bd;
}

.range-title .icon-huo3{
    color: #ff0000;
}

.range-btn {
    float: right;
    font-size: 10px;
    margin-right: 0;
    height: 20px;
    line-height: 20px;
    /* padding-left: */
    background-color: #4ba0e5;
    color: #ffffff;
}
.range-text{
    padding: 10px 22px 20px 22px;
    position: relative;
    border-bottom: 1px solid rgb(242, 240, 242);
}
.range-text ul li{
    font-size: 12px;
    height: 22px;
    line-height: 22px;
}
.range-text .range-go{
    font-size: 12px;
    color: #ffffff;
    height: 30px;
    line-height: 30px;
    text-align: center;
    border-radius: 5px;
    position: absolute;
    bottom: 60px;
    right: 24px;
}


</style>
