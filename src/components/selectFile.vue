<template lang="html">
    <div>
        <div class="tra-container">
            <div class="tra-time">
                <span>查询时间</span>
                <div class="tra-input tra-left tra-line">
                    <input type="text" :value="validTime0">
                    <picker
                        class="valid-picker"
                        mode="date"
                        :value="validTime0"
                        id="0"
                        @change="bindDateChange">
                        <span class="icon iconfont icon-rili"></span>
                    </picker>
                </div>
                <div class="tra-input">
                    <input type="text" :value="validTime1">
                    <picker
                        class="valid-picker"
                        mode="date"
                        :value="validTime1"
                        id="1"
                        @change="bindDateChange">
                        <span class="icon iconfont icon-rili"></span>
                    </picker>
                </div>
            </div>
            <div class="tra-time">
                <span v-if="!currentTab">客户标签</span>
                <div class="tra-input tra-left" v-if="!currentTab">
                    <input type="text" v-model="target" />
                </div>
                <div class="tra-input">
                    <span :class=" currentTab === 1 ? 'tra-btnw' : 'tra-btn'" @click="slectChange">查询</span>
                </div>
            </div>
        </div>
        <scroll-view
            :style="{'height': (scrollH - 110) + 'px'}"
            :scroll-y="true"
            :lower-threshold="true"
            @scrolltolower="scrollChange">
            <ul class="tra-detail">
                <li v-for="(abroadItem, abroadIndex) in abroadList" :key="abroadItem.trackType">
                    <p>车皮/集装箱号：{{abroadItem.containerNo}}（{{currentTab === 0 ? abroadItem.trackType : abroadItem.queryState}}）</p>
                    <div class="tra-pls">
                        <span>{{abroadItem.trackStatus}}</span>
                        {{JSON.stringify(abroadItem)}}
                        <a v-if="currentTab === 0" :href="'/pages/feedback/main?traQueryId=' + abroadItem.traQueryId + '&active=' + currentTab">查看追踪详情</a>
                        <a v-else :href="'/pages/feedback/main?traQueryId=' + abroadItem.internaId + '&active=' + currentTab">查看追踪详情</a>
                    </div>
                    <div class="tra-date">{{abroadItem.regTime}}</div>
                </li>
            </ul>
        </scroll-view>
    </div>
</template>

<script>
import {foreign, domestic} from '../utils/config.js'; // queryTraceHistroy
export default {
    props: ['currentTab', 'scrollH'],
    data () {
        return {
            pageNo: 0,
            target: '',
            validTime0: '',
            validTime1: '',
            abroadList: []
        };
    },
    methods: {
        /**
         * 选择当前时间
         * @param {object} e - 事件选择picker事件对象
         */
        bindDateChange (options) {
            let validTime = options.mp.detail.value;
            let index = options.mp.target.id;
            if (index === '0') {
                this.validTime0 = validTime;
            } else {
                this.validTime1 = validTime;
            };
        },
        /**
         * 点击查询事件 将当前分页清0
         * @param {} null
         */
        slectChange () {
            this.pageNo = 0;
            this.abroadList = [];
            this.scrollChange();
        },
        /**
         * iscroll-view 滑动事件 触底事触发上拉加载
         * @param {} null
         */
        scrollChange () {
            this.pageNo = this.pageNo + 1;
            this.submitAbroad(this.pageNo);
        },
        /**
         * 组装数据进行渲染
         * @param {number} pageNow - 当前分页
         */
        submitAbroad (pageNow) {
            const _this = this;
            let params = {
                remCus: _this.currentTab === 0 ? _this.target : '',
                sDate: _this.validTime0,
                eDate: _this.validTime1,
                pageNow: pageNow
            };
            this.getTraceHistroy(params);
        },
        /**
         * 组装数据进行渲染
         * @param {object} params - 请求数据参数
         */
        async getTraceHistroy (params) {
            try {
                let openid = await this.$UTIL.Login();
                let url = this.currentTab === 0 ? foreign.queryTraceHistroy : domestic.queryDomesticList;
                let reslutList = await this.$ajax({
                    url: url,
                    method: 'POST',
                    data: Object.assign({
                        openId: openid.openid,
                        pageSize: 6
                    }, params)
                });
                // console.log(reslutList);
                if (reslutList && reslutList.data.length !== 0) {
                    this.abroadList = this.abroadList.concat(reslutList.data);
                } else {
                    wx.showToast({
                        title: '暂无数据',
                        icon: 'none'
                    });
                }
            } catch (e) {
                console.log(e);
            };
        }
    },
    onLoad () {
        this.slectChange();
    }

};
</script>

<style lang="css">
</style>
