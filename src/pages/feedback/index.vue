<template lang="html">
    <div class="feedback">
        <titleBar
            :titleList="titleList"
            :currentTab="currentTab"
            @toogerTitle="toogerFn"
        />
        <div class="feed-title" v-if="!currentTab">
            <div class="feed-back" v-if="active === 0">
                <div v-if="result.TI">
                    <p class="feed-back-title" v-if="result.TI.trackType == '1'">即时追踪</p>
                    <p class="feed-back-title" v-else-if="result.TI.trackType == '2'">全程追踪</p>
                    <p class="feed-back-title" v-else-if="result.TI.trackType == '3'">时段追踪</p>
                    <ul>
                        <li v-if="result.TI.containerNo">{{result.TI.queryType === '1' ? '集装箱' : '车号'}}：{{result.TI.containerNo}}</li>
                        <li v-if="result.TI.sendDate">发运日期 {{result.TI.sendDate}}</li>
                        <li v-if="result.TI.sendStationName">发站：{{result.TI.sendStationName}}</li>
                        <li v-if="result.TI.arrStationName">到站：{{result.TI.arrStationName}}</li>
                        <li v-if="result.TI.trackStartDate">起始日期：{{result.TI.trackStartDate}}</li>
                        <li v-if="result.TI.trackEndDate">截止日期：{{result.TI.trackEndDate}}</li>
                    </ul>
                </div>
            </div>
            <div class="feed-back" v-else>
                <div v-if="result.TI">
                    <p class="feed-back-title" v-if="result.TI.queryState === '1'">即时追踪</p>
                    <p class="feed-back-title" v-else-if="result.TI.queryState === '2'">全程追踪</p>
                    <p class="feed-back-title" v-else-if="result.TI.queryState === '3'">时段追踪</p>
                    <ul>
                        <li v-if="result.TI.containerNo">{{result.TI.queryType === '1' ? '集装箱' : '车号'}}：{{result.TI.containerNo}}</li>
                        <li v-if="result.TI.sendDate">发运日期 {{result.TI.sendDate}}</li>
                        <li v-if="result.TI.sendStationName">发站：{{result.TI.sendStationName}}</li>
                        <li v-if="result.TI.arrStationName">到站：{{result.TI.arrStationName}}</li>
                        <li v-if="result.TI.payState === 0">支付状态：未支付</li>
                        <li v-else-if="result.TI.payState === 1">支付状态：已支付</li>
                        <li v-if="result.TI.payState === 2">支付状态：支付失败</li>
                        <li v-if="result.TI.regTime">查询日期：{{result.TI.regTime}}</li>
                    </ul>
                </div>
            </div>
            <div class="feed-data" v-if="result.TQ.length">
                <h3>追踪数据</h3>
                <ul v-if="active === 0">
                    <li v-for="(item, index) in result.TQ" :key="item.traOperation">
                        <h4>反馈时间：{{item.date}}</h4>
                        <p>当前位置：{{item.opeStation}}，拼车号：{{item.platformNo || ''}}，操作：{{item.operation}}，距离目的地距离：{{item.traEndDis}}</p>
                    </li>
                </ul>
                <ul v-else>
                    <li v-for="(item, index) in result.TQ" :key="item.traOperation">
                        <h4>反馈时间：{{item.date}}</h4>
                        <!-- <p>当前位置：{{item.opeStation}}，拼车号：{{item.platformNo || ''}}，操作：{{item.operation}}，距离目的地距离：{{item.traEndDis}}</p> -->
                        <p>站点状态：{{item.stationState}}，最新位置：{{item.currentEntire}}，操作：{{item.operation}}，距目的站距离：{{item.endDistance}}，</p>
                    </li>
                </ul>
            </div>
        </div>
        <RoadMap :urlParams="urlParams" :active="active" v-else />
    </div>
</template>

<script>
import titleBar from '../../components/titleBar.vue';
import RoadMap from '../../components/RoadMap.vue';
import {foreign, domestic} from '../../utils/config.js';
export default {
    data () {
        return {
            active: 0,
            currentTab: 0,
            urlParams: '',
            result: {
                TI: {},
                GPS: [],
                TQ: [],
                end: '',
                start: ''
            },
            titleList: [
                {
                    key: 'detail',
                    text: '反馈结果'
                },
                {
                    key: 'news',
                    text: '地图轨迹'
                }
            ]
        };
    },
    methods: {
        data () {
            return {
                active: 0
            };
        },
        toogerFn (index) {
            this.currentTab = index;
        },
        async getDataList (traQueryId, active) {
            let url = active === 1 ? domestic.queryDetails : foreign.queryDetails;
            let params = active === 1 ? {internaId: traQueryId} : {traQueryId: traQueryId};
            this.urlParams = active === 1 ? 'internaId=' + traQueryId : 'traQueryId=' + traQueryId;
            try {
                let openid = await this.$UTIL.Login();
                let result = await this.$ajax({
                    url: url,
                    data: Object.assign({
                        openId: openid.openid
                    }, params)
                });
                if (!result) {
                    wx.showToast({
                        title: '暂无数据',
                        icon: 'none'
                    });
                } else {
                    if (result.state === '20') {
                        this.result = result.data;
                    } else {
                        wx.showToast({
                            title: result.msg,
                            icon: 'none'
                        });
                    };
                };
            } catch (e) {
                console.log(e);
            };
        }
    },
    components: {
        titleBar,
        RoadMap
    },
    onLoad (options) {
        this.active = Number(options.active);
        this.currentTab = 0;
        this.result = {
            TI: {},
            GPS: [],
            TQ: [],
            end: '',
            start: ''
        };
        this.getDataList(options.traQueryId, this.active);
    }
};
</script>

<style lang="css">
.feed-back {
    color: #ffffff;
    padding: 10px;
    background-color: #fe6403;
    margin-top: 3px;
}
.feed-back ul {
    padding-left: 10px;
}
.feed-back ul li {
    font-size: 12px;
    line-height: 25px;
}

.feed-data {
    padding: 0 10px;
}
.feed-data h3 {
    font-size: 12px;
    color: #b2b2b2;
    line-height: 40px;
}

.feed-data  ul li {
    border-top: 1px #b2b2b2 solid;
    padding: 10px 0;
}
.feed-data h4 {
    color: #000000;
    padding-bottom: 10px;
}
.feed-data p {
    font-size: 12px;
    color: #b2b2b2;
}
</style>
