<template lang="html">
    <div class="railt-index">
    <div :class="['track-box', activeIndex === 0 ? 'track-abroad': 'track-domestic']">
        <scroll-view scroll-y="true" class="scoll-h" >
            <div class="track-range"
                v-for="(domesticItem, domesticIndex) in indexList[activeIndex]"
                :key="domesticItem.title">
                <div class="range-title">
                    <span :class="['icon', 'iconfont', domesticItem.icon]"></span>
                    <p class="range-head">{{domesticItem.title}}</p>
                    <span class="icon iconfont icon-huo3"></span>
                    <button
                        v-if="domesticItem.rangeBtn"
                        class="range-btn"
                        type="button"
                        @click="trackingRangeFn"
                    >追踪范围</button>
                </div>
                <div class="range-text">
                    <ul>
                        <li
                            v-for="(resultItem, resultIndex) in domesticItem.resultList"
                            :key="resultItem"
                        >{{resultItem}}</li>
                    </ul>
                    <button v-if="!phoneNumber"
                        class='range-go'
                        open-type="getPhoneNumber"
                        :data-domesticIndex="domesticIndex"
                        @getphonenumber="application"
                    >去追踪</button>
                    <button v-else
                        class='range-go'
                        @click="goRange(phoneNumber, domesticIndex)"
                    >追踪</button>
                </div>
            </div>
        </scroll-view>
    </div>
    </div>
</template>

<script>
import {indexData} from '../utils/data.js';
export default {
    props: {
        activeIndex: {
            type: Number
        },
        clickIndex: {
            type: Number
        }
    },
    data () {
        return {
            indexList: indexData.indexContent
        };
    },
    methods: {
        // 追踪范围点击事件
        trackingRangeFn () {
            wx.showModal({
                title: '追踪范围',
                content: indexData.indexDialong.join('、'),
                showCancel: false
            });
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
            let domesticindex = e.mp.currentTarget.dataset.domesticindex;
            // try {
            //     let result = await this.$UTIL.getMobilePhone(e);
            //     result && this.goRange(result);
            //     this.phoneNumber = result;
            // } catch (err) {
            //     console.log(err);
            // };
            this.goRange('13031115726', domesticindex);
        },
        goRange (phone, domesticindex) {
            let activeIndex = this.activeIndex;
            // let ruleData = rule[activeIndex][domesticindex];
            let dataString = `phone=${phone}&activeIndex=${activeIndex}&domesticindex=${domesticindex}`;

            // let url = activeIndex ? `/pages/lmmediate/main?${dataString}` : `/pages/range/main?${dataString}`;
            let url = `/pages/range/main?${dataString}`;
            wx.navigateTo({url});
        }
    },
    created () {
        // console.log(this.indexList);
        // console.log(this.activeIndex);
        // let phoneNumber = wx.getStorageSync('mobile');
        // this.phoneNumber = phoneNumber;
        // this.heightWin();
    }
};
</script>

<style lang="css">

.railt-title {
    line-height: 40px;
    padding-left: 20px;
    box-shadow: 0rpx 0rpx 10px #ddd;

}

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
    /* border-bottom: 1px solid rgb(242, 240, 242); */
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
