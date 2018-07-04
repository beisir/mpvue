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
                        <div class="valid-input">
                            <input
                                placeholder="TKRU4096807"
                                placeholder-class="input"
                                v-model="sendData.containerNo"
                            />
                        </div>
                        <div class="valid-btn">效验</div>
                    </div>
                    <div class="valid-prompt">示例：集装箱号：TKRU4096807  车皮号：44472058</div>
                </li>
                <li>
                    <div class="valid-box">
                        <div class="valid-left">发站</div>
                        <div class="valid-input">
                            <input
                                placeholder="输入国外的站点编码"
                                placeholder-class="input"
                                v-model="sendData.sendStationCode"
                            />
                        </div>
                    </div>
                </li>
                <li>
                    <div class="valid-box">
                        <div class="valid-left">到站</div>
                        <div class="valid-input">
                            <input
                                placeholder="输入国内的站点编码"
                                placeholder-class="input"
                                v-model="sendData.arrStationCode"
                            />
                        </div>
                    </div>
                </li>
                <li>
                    <div class="valid-box">
                        <div class="valid-left">发运日期</div>
                        <div class="valid-input">
                            <input
                                class="valid-time"
                                placeholder-class="input"
                                v-model="sendData.sendDates"
                            />
                            <picker
                                class="valid-picker"
                                mode="date"
                                :value="sendData.sendDates"
                                start="2015-09-01"
                                end="2017-09-01"
                                @change="bindDateChange">
                                <span class="icon iconfont icon-rili"></span>
                            </picker>
                        </div>
                    </div>
                </li>
                <li>
                    <div class="valid-box">
                        <div class="valid-left">客户标签</div>
                        <div class="valid-input">
                            <input
                                placeholder="选填"
                                placeholder-class="input"
                                v-model="sendData.remCus"
                            />
                        </div>
                    </div>
                </li>
                <li>
                    <div class="valid-box">
                        <div class="valid-left">选择红包</div>
                        <div class="valid-input" @click="validSelect">{{selectArray[selectIndex]}}</div>
                    </div>
                </li>
            </ul>
            <button type="button" class="valid-confim" @click="submitVakid">提交查询</button>
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
            validTime: '2016-09-01',
            sendData: {
                userRedCouId: '', // '红包'
                trackType: '', // 查询类型
                queryType: '', // 集装箱/整车
                containerNo: '', // 箱号
                sourceData: '', // 接口类型
                remCus: '', // 客户标签
                sendDates: '', // 发站日期
                sendStationName: '', // 发站名称
                arrStationName: '', // 到站名车
                arrStationCode: '', // 到站代码
                sendStationCode: '' // 发站代码
            }
        };
    },
    methods: {
        // 日期选择框
        bindDateChange (options) {
            let validTime = options.mp.detail.value;
            this.sendData.sendDates = validTime;
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
        },
        async submitVakid () {
            const _this = this;
            let {containerNo} = this.sendData;
            if (containerNo !== '') {
                let result = await this.$ajax({
                    url: 'https://www.easy-mock.com/mock/5b39baec73a49f4fe3433dd9/xcx/form',
                    data: _this.sendData
                });
                console.log(result);
            };
        }
    }
};
</script>

<style lang="css">
.range-balance .range-title {
    color: #1aac19;
}
.range-balance .range-ace {
    margin-left: 90px;
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

.valid-time {
    text-align: center;
}

.valid-input .valid-picker{
    position: absolute;
    right: 0;
    top: 0;
    z-index: 100;
}

</style>
