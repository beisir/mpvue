<template lang="html">
    <div class="range">
        <div class="range-balance">
            <div class="range-title">
                <span class="icon iconfont icon-27"></span>
                <p class="range-head">国外全程追踪</p>
                <span class="range-ace">账户余额: 0.00 元</span>
            </div>
        </div>
        <div class="range-whole">
            <p>￥52元/次·全程</p>
            <p>物畅网会员尊享7折—9折优惠，低至21元</p>
        </div>
        <div class="range-valid">
            <ul>
                <li>
                    <div class="valid-box">
                        <div class="valid-left">车皮/集装箱号</div>
                        <div class="valid-input"><input placeholder="TKRU4096807" placeholder-class="input" /></div>
                        <div class="valid-btn">效验</div>
                    </div>
                    <div class="valid-prompt">示例：集装箱号：TKRU4096807  车皮号：44472058</div>
                </li>
                <li>
                    <div class="valid-box">
                        <div class="valid-left">发站</div>
                        <div class="valid-input"><input placeholder="输入国外的站点编码" placeholder-class="input" /></div>
                    </div>
                </li>
                <li>
                    <div class="valid-box">
                        <div class="valid-left">到站</div>
                        <div class="valid-input"><input placeholder="输入国内的站点编码" placeholder-class="input" /></div>
                    </div>
                </li>
                <li>
                    <div class="valid-box">
                        <div class="valid-left">发运日期</div>
                        <div class="valid-input">
                            <input class="valid-time" placeholder-class="input" :value="validTime" />
                            <picker
                                class="valid-picker"
                                mode="date"
                                :value="validTime"
                                start="2015-09-01"
                                end="2017-09-01"
                                @change="bindDateChange">
                                <span class="icon iconfont icon-27"></span>
                            </picker>
                        </div>
                    </div>
                </li>
                <li>
                    <div class="valid-box">
                        <div class="valid-left">客户标签</div>
                        <div class="valid-input"><input placeholder="选填" placeholder-class="input" /></div>
                    </div>
                </li>
                <li>
                    <div class="valid-box">
                        <div class="valid-left">选择红包</div>
                        <div class="valid-input" @click="validSelect">{{selectArray[selectIndex]}}</div>
                    </div>
                </li>
            </ul>
            <button type="button" class="valid-confim">提交查询</button>
        </div>
        <div class="range-text">
            <ul>
                <li>服务说明：</li>
                <li>输&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;入：车皮/集装箱号；境外发到站；发运日期</li>
                <li>跟踪周期：全程（持续跟踪至终点）</li>
                <li>反馈时间：8分钟（在查询记录中查看）</li>
                <li>运踪结果：一般每天持续反馈2条-30条信息</li>
                <li>适用情形：经常查某个车皮/集装箱运踪，最划算</li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {
            selectIndex: 0,
            selectArray: ['30元红包', '50元红包', '不用红包'],
            validTime: '2016-09-01'
        };
    },
    methods: {
        // 日期选择框
        bindDateChange (options) {
            let validTime = options.mp.detail.value;
            this.validTime = validTime;
            console.log(options);
        },
        // 红包选择时间
        validSelect () {
            const _this = this;
            let selectArray = this.selectArray;
            wx.showActionSheet({
                itemList: selectArray,
                success (result) {
                    _this.selectIndex = result.tapIndex;
                }
            });
        }
    }
};
</script>

<style lang="css">
.range-balance .range-title {
    color: #1aac19;
}
.range-balance .range-ace {
    margin-left: 100px;
}

.range-whole {
    text-align: center;
    color: #fea200;
}
.range-whole p {
    line-height: 30px;
}
.range-whole p:first-child {
    font-weight: bold;
}

.range-valid li {
    padding-left: 10px;
    border-bottom: 1px solid #cccccc;
}
.range-valid .valid-box {
    display: flex;
    align-items: center;
    padding: 8px  10px;

}

.valid-left{
    /* flex: 3; */
    width: 110px;
    font-weight: bold;
}

.valid-input {
    width: 160px;
    padding: 0 10px;
    height: 24px;
    line-height: 24px;
    border: 1px solid #bfbfbf;
    border-radius: 3px;
    position: relative;
}
.valid-time {
    text-align: center;
}

.valid-input .valid-picker{
    position: absolute;
    right: 0;
    top: 0;
    z-index: 100;
}

.valid-input .input {
    text-align:center;
}
.valid-btn{
    color: #ffffff;
    height: 24px;
    line-height: 24px;
    padding: 0 10px;
    background-color: #fea200;
    border-radius: 3px;
    margin-left: 10px;
}
.valid-prompt{
    font-size: 12px;
    margin-left: 10px;
    padding-bottom: 8px;
    color: #bfbfbf;
}

.valid-confim {
    color: #ffffff;
    background-color: #fea200;
    margin-top: 10px;
}

</style>
