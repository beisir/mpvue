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
                    <span v-if ="domesticItem.iconrest" class="icon iconfont icon-huo"></span>
                    <button
                        v-if="!phone_num && domesticItem.rangeBtn"
                        open-type="getPhoneNumber"
                        class="range-btn select-history"
                        :data-history="true"
                        @getphonenumber="application"
                    >查询历史</button>
                    <button
                        v-else-if="domesticItem.rangeBtn"
                        class="range-btn select-history"
                        @click="goTrahistory"    
                    >查询历史</button>
                    <!-- <a href="" v-else class='range-go select-history'>去追踪</a> -->
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
                    <button v-if="!phone_num"
                        class='range-go'
                        open-type="getPhoneNumber"
                        :data-domesticIndex="domesticIndex"
                        @getphonenumber="application"
                    >去追踪</button>
                    <button v-else
                        class='range-go'
                        @click="goRange(phone_num, domesticIndex)"
                    >去追踪</button>
                </div>
            </div>
        </scroll-view>
    </div>
    </div>
</template>


<script>
// 注册国内国外全局数据
import {indexData} from '../utils/data.js';
import {util} from '../utils/config.js';
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
    computed: {
        phone_num () {
            return this.$store.state.phone_num;
        }
    },
    methods: {
        /**
         * 点击追踪范围事件 弹框提示
         * @param {} null
         */
        trackingRangeFn () {
            wx.showModal({
                title: '追踪范围',
                content: indexData.indexDialong.join('、'),
                showCancel: false
            });
        },
        /**
         * 获取手机号码事件 弹框授权事件
         * @param {object} e 事件对象
         */
        async application (e) {
            // 获取当前按钮下标 匹配range组件
            let domesticindex = e.mp.currentTarget.dataset.domesticindex,
                history = e.mp.currentTarget.dataset.history;
            try {
                let result = await this.$UTIL.getMobilePhone(e);
                console.log(result);
                let openid = await this.$UTIL.Login();
                let registerInfo = await this.$ajax({
                    url: util.register,
                    data: {
                        openId: openid.openid,
                        userName: result
                    }
                });
                if(registerInfo['data']==null){
            	        wx.showToast({
                            title: '数据异常，请联系客服',
                            icon: 'none'
                        });
                        return ;
                }
                await this.$store.commit('phone_num', result);
                this.phone_num = result;
                if (history) {
                   this.goTrahistory();
                } else {
                   this.goRange(result, domesticindex);
                };
            } catch (err) {
                console.log(err);
            };
        },
        /**
         * 跳转页面路由goRange
         * @param {object} phone: 获取授权手机号码。 domesticindex：按钮下标
         */
        goRange (phone, domesticindex) {
            let activeIndex = this.activeIndex;
            let dataString = `phone=${phone}&activeIndex=${activeIndex}&domesticindex=${domesticindex}`;
            let url = `/pages/range/main?${dataString}`;
            wx.navigateTo({url});
        },
        goTrahistory () {
            let url = '/pages/trahistory/main?active=0';
            wx.navigateTo({url});
        }
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

.range-title .icon-huo{
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
.select-history {
    background-color: #4ba0e5;
    color: #ffffff;
    outline: none;
    border-width: 0;
    border-color: #ffffff;
}
</style>
