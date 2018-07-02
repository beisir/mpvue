<template lang="html">
    <div class="feedback">
        <titleBar
            :titleList="titleList"
            :currentTab="currentTab"
            @toogerTitle="toogerFn" />

        <div class="feed-back">
            <p class="feed-back-title">全程跟踪</p>
            <ul>
                <li>集装箱号码/车号：44472058</li>
                <li>发运日期 2017-12-25</li>
                <li>发站：后贝加尔斯克-出口</li>
                <li>到站：Vorsino,MOS</li>
            </ul>
        </div>
        <div class="feed-data">
            <h3>追踪数据</h3>
            <ul>
                <li>
                    <h4>反馈时间：2018-01-19 14:54:00</h4>
                    <p>当前位置：Vorsino，MOS，拼车号：无，操作：到达，距离目的地距离：0</p>
                </li>
                <li>
                    <h4>反馈时间：2018-01-19 14:54:00</h4>
                    <p>当前位置：Vorsino，MOS，拼车号：无，操作：到达，距离目的地距离：0</p>
                </li>
                <li>
                    <h4>反馈时间：2018-01-19 14:54:00</h4>
                    <p>当前位置：Vorsino，MOS，拼车号：无，操作：到达，距离目的地距离：0</p>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import titleBar from '../../components/titleBar.vue';
export default {
    data () {
        return {
            currentTab: 0,
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
        }

    },
    components: {
        titleBar
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
