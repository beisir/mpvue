<template lang="html">
    <div class="trahistory">
        <titleBar
            :titleList="titleList"
            :currentTab="currentTab"
            @toogerTitle="toogerFn" />
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
                        start="2015-09-01"
                        end="2017-09-01"
                        @change="bindDateChange">
                        <span class="icon iconfont icon-27"></span>
                    </picker>
                </div>
                <div class="tra-input">
                    <input type="text" :value="validTime1">
                    <picker
                        class="valid-picker"
                        mode="date"
                        :value="validTime1"
                        id="1"
                        start="2015-09-01"
                        end="2017-09-01"
                        @change="bindDateChange">
                        <span class="icon iconfont icon-27"></span>
                    </picker>
                </div>
            </div>
            <div class="tra-time">
                <span>客户标签</span>
                <div class="tra-input tra-left">
                    <input type="text" value=" ">
                </div>
                <div class="tra-input">
                    <span class="tra-btn">查询</span>
                </div>
            </div>
        </div>
        <ul class="tra-detail">
            <li>
                <p>车皮/集装箱号：44472058（国外全程运踪）</p>
                <div class="tra-pls">
                    <span>追踪完成</span>
                    <a href="/pages/feedback/main">查看追踪详情</a>
                </div>
                <div class="tra-date">2018-03-04 18:13:47</div>
            </li>
            <li>
                <p>车皮/集装箱号：44472058（国外全程运踪）</p>
                <div class="tra-pls">
                    <span>追踪完成</span>
                    <a href="/pages/feedback/main">查看追踪详情</a>
                </div>
                <div class="tra-date">2018-03-04 18:13:47</div>
            </li>
        </ul>
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
                    text: '国外运踪历史记录'
                },
                {
                    key: 'news',
                    text: '国内运踪历史记录'
                }
            ],
            validTime0: '',
            validTime1: ''
        };
    },
    methods: {
        toogerFn (index) {
            this.currentTab = index;
        },
        bindDateChange (options) {
            let validTime = options.mp.detail.value;
            let index = options.mp.target.id;
            if (index === '0') {
                this.validTime0 = validTime;
            } else {
                this.validTime1 = validTime;
            };
        }
    },
    components: {
        titleBar
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
    height: 45px;
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
    position: relative;
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
}
.tra-input .tra-btn {
    padding: 3px 15px;
    background: #4aa0e6;
    color: #ffffff;
    border-radius: 3px;
    margin-left: 20px;

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
    font-size: 12px;
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
