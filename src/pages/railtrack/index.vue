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
                <swiper-item>
                    <scroll-view scroll-y="true" class="scoll-h" >
                        <div class="track-range">
                            <div class="range-title">
                                <span class="icon iconfont icon-27"></span>
                                <p class="range-head">国外全程追踪</p>
                                <span class="icon iconfont icon-huo3"></span>
                                <button class="range-btn" type="button" name="button" @click="trackingRangeFn">追踪范围</button>
                            </div>
                            <div class="range-text">
                                <ul>
                                    <li>输入：车皮/集装箱号；境外发到站；发运日期</li>
                                    <li>跟踪周期：全程（持续跟踪至终点）</li>
                                    <li>反馈时间：8分钟（在运踪查询历史中查看）</li>
                                    <li>运踪结果：一般每天持续反馈2条-30条信息</li>
                                    <li>适用情形：经常查某个车皮/集装箱运踪，最划算</li>
                                </ul>
                                <a class="range-go" href="/pages/range/main">去追踪</a>
                            </div>
                        </div>
                        <div class="track-range">
                            <div class="range-title">
                                <span class="icon iconfont icon-yuandian"></span>
                                <p class="range-head">国外即时运踪</p>
                            </div>
                            <div class="range-text">
                                <ul>
                                    <li>输入：车皮/集装箱号；境外发到站；发运日期</li>
                                    <li>跟踪周期：全程（持续跟踪至终点）</li>
                                    <li>反馈时间：8分钟（在运踪查询历史中查看）</li>
                                    <li>运踪结果：一般每天持续反馈2条-30条信息</li>
                                    <li>适用情形：经常查某个车皮/集装箱运踪，最划算</li>
                                </ul>
                                <a class="range-go" href="/pages/range/main">去追踪</a>
                            </div>
                        </div>
                        <div class="track-range">
                            <div class="range-title">
                                <span class="icon iconfont icon-7"></span>
                                <p class="range-head">国外时段追踪</p>
                            </div>
                            <div class="range-text">
                                <ul>
                                    <li>输入：车皮/集装箱号；境外发到站；发运日期</li>
                                    <li>跟踪周期：全程（持续跟踪至终点）</li>
                                    <li>反馈时间：8分钟（在运踪查询历史中查看）</li>
                                    <li>运踪结果：一般每天持续反馈2条-30条信息</li>
                                    <li>适用情形：经常查某个车皮/集装箱运踪，最划算</li>
                                </ul>
                                <a class="range-go" href="/pages/range/main">去追踪</a>
                            </div>
                        </div>
                    </scroll-view>
                </swiper-item>
                <swiper-item>
                    <scroll-view scroll-y="true" class="scoll-h" >
                        <div class="track-range">
                            <div class="range-title">
                                <span class="icon iconfont icon-27"></span>
                                <p class="range-head">国外全程追踪</p>
                                <span class="icon iconfont icon-huo3"></span>
                                <button class="range-btn" type="button" name="button">追踪范围</button>
                            </div>
                            <div class="range-text">
                                <ul>
                                    <li>输入：车皮/集装箱号；境外发到站；发运日期</li>
                                    <li>跟踪周期：全程（持续跟踪至终点）</li>
                                    <li>反馈时间：8分钟（在运踪查询历史中查看）</li>
                                    <li>运踪结果：一般每天持续反馈2条-30条信息</li>
                                    <li>适用情形：经常查某个车皮/集装箱运踪，最划算</li>
                                </ul>
                                <a class="range-go" href="/pages/range/main">去追踪</a>
                            </div>
                        </div>
                        <div class="track-range">
                            <div class="range-title">
                                <span class="icon iconfont icon-yuandian"></span>
                                <p class="range-head">国外即时运踪</p>
                            </div>
                            <div class="range-text">
                                <ul>
                                    <li>输入：车皮/集装箱号；境外发到站；发运日期</li>
                                    <li>跟踪周期：全程（持续跟踪至终点）</li>
                                    <li>反馈时间：8分钟（在运踪查询历史中查看）</li>
                                    <li>运踪结果：一般每天持续反馈2条-30条信息</li>
                                    <li>适用情形：经常查某个车皮/集装箱运踪，最划算</li>
                                </ul>
                                <a class="range-go" href="/pages/range/main">去追踪</a>
                            </div>
                        </div>
                        <div class="track-range">
                            <div class="range-title">
                                <span class="icon iconfont icon-7"></span>
                                <p class="range-head">国外时段追踪</p>
                            </div>
                            <div class="range-text">
                                <ul>
                                    <li>输入：车皮/集装箱号；境外发到站；发运日期</li>
                                    <li>跟踪周期：全程（持续跟踪至终点）</li>
                                    <li>反馈时间：8分钟（在运踪查询历史中查看）</li>
                                    <li>运踪结果：一般每天持续反馈2条-30条信息</li>
                                    <li>适用情形：经常查某个车皮/集装箱运踪，最划算</li>
                                </ul>
                                <a class="range-go" href="/pages/range/main">去追踪</a>
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
            ]
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
                content: '俄罗斯、白俄罗斯、蒙古、哈萨克斯坦、乌兹别克斯坦、吉尔吉斯斯坦、塔吉克斯坦、土库曼斯坦、乌克兰、摩尔多瓦、阿塞拜疆、格鲁吉亚、拉脱维亚、立陶宛、爱沙尼亚、芬兰',
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
        }
    },
    created () {
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
    text-align: center;
    border-radius: 5px;
    /* background-color: #1aac19; */
    padding: 6px 10px;
    position: absolute;
    bottom: 60px;
    right: 24px;
}


</style>
