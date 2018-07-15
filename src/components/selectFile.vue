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
                        start="2015-07-01"
                        end=""
                        @change="bindDateChange">
                        <span class="icon iconfont icon-shijian"></span>
                    </picker>
                </div>
                <div class="tra-input">
                    <input type="text" :value="validTime1">
                    <picker
                        class="valid-picker"
                        mode="date"
                        :value="validTime1"
                        id="1"
                        start="2017-07-01"
                        end=""
                        @change="bindDateChange">
                        <span class="icon iconfont icon-shijian"></span>
                    </picker>
                </div>
            </div>
            <div class="tra-time">
                <span v-if="!currentTab">客户标签</span>
                <div class="tra-input tra-left" v-if="!currentTab">
                    <input type="text" v-model="target" />
                </div>
                <div class="tra-input">
                    <span class="tra-btn" @click="slectChange">查询</span>
                </div>
            </div>
        </div>
        <scroll-view
            style="height:450px;"
            :scroll-y="true"
            :lower-threshold="true"
            @scrolltolower="scrollChange">
            <ul class="tra-detail">
                <li v-for="(abroadItem, abroadIndex) in abroadList" :key="abroadItem.trackType">
                    <p>车皮/集装箱号：{{abroadItem.containerNo}}（{{abroadItem.trackType}}）</p>
                    <div class="tra-pls">
                        <span>{{abroadItem.trackStatus}}</span>
                        <a :href="'/pages/feedback/main?traQueryId=' + abroadItem.traQueryId + '&active=' + currentTab">查看追踪详情</a>
                    </div>
                    <div class="tra-date">{{abroadItem.regTime}}</div>
                </li>
            </ul>
        </scroll-view>
    </div>
</template>

<script>
import {historyDetail} from '../utils/config.js'; // queryTraceHistroy
export default {
    props: ['currentTab', 'active'],
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
        slectChange () {
            this.pageNo = 0;
            this.scrollChange();
        },
        scrollChange () {
            this.pageNo = this.pageNo + 1;
            this.submitAbroad(this.pageNo);
        },
        submitAbroad (pageNow) {
            const _this = this;
            let params = {
                remCus: _this.target,
                sDate: _this.validTime0,
                eDate: _this.validTime1,
                pageNow: pageNow
            };
            this.getTraceHistroy(params);
        },
        bindDateChange (options) {
            let validTime = options.mp.detail.value;
            let index = options.mp.target.id;
            if (index === '0') {
                this.validTime0 = validTime;
            } else {
                this.validTime1 = validTime;
            };
        },
        async getTraceHistroy (params) {
            try {
                let openid = await this.$UTIL.Login();
                let reslutList = await this.$ajax({
                    url: historyDetail.queryTraceHistroy,
                    method: 'POST',
                    data: Object.assign({
                        openId: openid.openid,
                        pageSize: 6
                    }, params)
                });
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
