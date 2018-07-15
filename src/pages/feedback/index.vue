<template lang="html">
    <div class="feedback">
        <titleBar
            :titleList="titleList"
            :currentTab="currentTab"
            @toogerTitle="toogerFn"
        />
        <div class="feed-title" v-if="!currentTab">
            <div class="feed-back">
                <p class="feed-back-title" v-if="result.TI.trackType === '1'">即时追踪</p>
                <p class="feed-back-title" v-else-if="result.TI.trackType === '2'">全程追踪</p>
                <p class="feed-back-title" v-else-if="result.TI.trackType === '3'">时段追踪</p>
                <ul>
                    <li v-if="result.TI.containerNo">{{result.TI.queryType === '1' ? '集装箱' : '车号'}}：{{result.TI.containerNo}}</li>
                    <li v-if="result.TI.sendDate">发运日期 {{result.TI.sendDate}}</li>
                    <li v-if="result.TI.sendStationName">发站：{{result.TI.sendStationName}}</li>
                    <li v-if="result.TI.arrStationName">到站：{{result.TI.arrStationName}}</li>
                </ul>
            </div>
            <div class="feed-data" v-if="result.TQ.length">
                <h3>追踪数据</h3>
                <ul>
                    <li v-for="(item, index) in result.TQ" :key="item.traOperation">
                        <h4>反馈时间：{{item.opeDatetime}}</h4>
                        <p>当前位置：{{item.opeStation}}，拼车号：{{item.platformNo || ''}}，操作：{{item.operation}}，距离目的地距离：{{item.traEndDis}}</p>
                    </li>
                </ul>
            </div>
        </div>
        <RoadMap :GPS="result.GPS" v-else />


    </div>
</template>

<script>
import titleBar from '../../components/titleBar.vue';
import RoadMap from '../../components/RoadMap.vue';
import {foreign_queryDetails, domestic_queryDetails} from '../../utils/config.js';
export default {
    data () {
        return {
            currentTab: 0,
            result: {
                TI: {},
                GPS: [],
                TQ: []
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
        toogerFn (index) {
            this.currentTab = index;
        },
        async getDataList (traQueryId, active) {
            let url = active === '1' ? domestic_queryDetails.queryDetails : foreign_queryDetails.queryDetails;
            let params = active === '1' ? {internaId: traQueryId} : {traQueryId: traQueryId};
            try {
                let openid = await this.$UTIL.Login();
                let result = await this.$ajax({
                    url: url,
                    data: Object.assign({
                        openId: openid.openid
                    }, params)
                });
                this.result = result.data;
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
        this.getDataList(options.traQueryId, options.active);
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
