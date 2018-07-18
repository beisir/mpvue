<template lang="html">
    <div class="range">
        <Balance
            :yu="rule.yu"
            :ruleOptions="rule.ruleOptions"
            :transOriPrice="queryTraceData.accountBlance.transOriPrice"
            :price="price" />
        <div class="range-valid">
            <ul>
                <li v-if="rule.chepi">
                    <div class="valid-box">
                        <div class="valid-left">车皮/集装箱号</div>
                        <div class="valid-input">
                            <input
                                placeholder="TKRU4096807"
                                placeholder-class="input"
                                v-model="sendData.containerNo"
                                @blur="inputBlur"
                                @focus="validErr=false"
                            />
                        </div>
                        <span class="valid-err" v-if="validErr">格式错误</span>
                    </div>
                    <div class="valid-prompt">示例：集装箱号：TKRU4096807  车皮号：44472058</div>
                </li>
                <li v-if="rule.fazhan">
                    <div class="valid-box">
                        <div class="valid-left">发站</div>
                        <div class="valid-input">
                            <input
                                :disabled="true"
                                placeholder="输入国外的站点编码"
                                placeholder-class="input"
                                data-name="sendStationName"
                                data-codeName="sendStationCode"
                                @click="dlongContainer"
                                v-model="sendData.sendStationName"
                            />
                        </div>
                    </div>
                </li>
                <li v-if="rule.daozhan">
                    <div class="valid-box">
                        <div class="valid-left">到站</div>
                        <div class="valid-input">
                            <input
                                :disabled="true"
                                placeholder="输入国内的站点编码"
                                placeholder-class="input"
                                data-codeName="arrStationCode"
                                data-name="arrStationName"
                                @click="dlongContainer"
                                v-model="sendData.arrStationName"
                            />
                        </div>
                    </div>
                </li>
                <li v-if="rule.fayun">
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
                                @change="bindDateChange">
                                <span class="icon iconfont icon-rili"></span>
                            </picker>
                        </div>
                    </div>
                </li>
                <li v-if="rule.shiduan">
                    <div class="valid-box">
                        <div class="valid-left">时段追踪</div>
                        <div class="valid-input" style="font-size:11px;position:relative;">
                            {{startTime}} 至 {{endTime}}
                            <picker
                                class="valid-shiduan"
                                mode="date"
                                :value="startTime"
                                :start="initStartTime"
                                :end="initEndTime"
                                @change="SdDateChange">
                                <div class="shiduan-block"></div>
                            </picker>

                        </div>
                    </div>
                </li>
                <li v-if="rule.kehu">
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
                <li v-if="rule.hongbao">
                    <div class="valid-box">
                        <div class="valid-left">选择红包</div>
                        <div class="valid-input valid-triangle" @click="validSelect">{{selectArray[selectIndex]}}</div>
                    </div>
                </li>
            </ul>
            <button type="button" class="valid-confim" v-if="rule.btn" @click="submitInstant">提交查询</button>
            <button type="button" class="valid-confim" v-else @click="submitVakid">提交查询</button>
        </div>
        <Explain :explainList="rule.explain"/>
        <inputDlong
            v-if="rule.fazhan && rule.daozhan"
            :inputTost="inputTost"
            :dlongName="dlongName"
            :codeName="codeName"
            @closeEvent="closeEvent"
            @dlongEvent="dlongEvent"/>
    </div>
</template>

<script>
import Balance from '../../components/balance.vue';
import inputDlong from '../../components/inputDlong.vue';
import Explain from '../../components/explain.vue';
import rule from '../../utils/rule.js';
import {util, domestic, foreign} from '../../utils/config.js';
export default {
    data () {
        return {
            activeIndex: 0, // 国外国内之分
            validErr: false, // 站点正则

            rule: {}, // 列表显示规则
            inputTost: false, // 站点列表弹框 是否开启
            dlongName: '', // 设置站点弹框区分
            codeName: '',

            startTime: '', // 选择当前日期
            endTime: '', // 选择当前日期的 当前月最后一天
            initStartTime: '', // 规定日期组件从n-年-月-日 开始
            initEndTime: '', // 规定日期组件从n-年-月-日 结束

            selectIndex: 0, // 红包选择Index
            selectArray: ['无红包'], // 红包列表
            sendData: {}, // 表单数据绑定
            price: 0,
            queryTraceData: {
                accountBlance: {
                    transOriPrice: 0.05
                },
                hb: []
            }
        };
    },
    methods: {
        /**
         * 车皮集装箱 input 离开事件，判断当前输入是否 符合规范.
         * @param {object} e - 事件对象.
         */
        inputBlur (e) {
            let reg = this.activeIndex ? /^([A-Z]{4}\d{7}|\d{7})$/ : /^([A-Z]{4}\d{7}|\d{8})$/;
            let containerNo = this.sendData.containerNo;
            this.validErr = reg.test(containerNo) ? 0 : 1;
        },
        /**
         * 发运日期 选择日期选择对象
         * @param {object} options - 事件对象.返回当前选择日期返回值
         */
        bindDateChange (options) {
            let validTime = options.mp.detail.value;
            this.sendData.sendDates = validTime;
        },
        /**
         * 选择红包组件返回弹出模块 选择值下标
         */
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
        redList (selectArray) {
            let defaultSelect = this.selectArray;
            if (!selectArray.length) {
                selectArray = ['无红包'];
            } else {
                selectArray = selectArray.map(item => item.redAmount + '');
                selectArray = selectArray.concat(defaultSelect);
            };
            this.selectArray = selectArray;
        },
        // 单独提交 国内及时
        async submitInstant () {
            let containerNo = this.sendData.containerNo;
            let remCus = this.sendData.remCus;
            if (containerNo !== '') {
                if (this.validErr) {
                    return false;
                };
                try {
                    let result = await this.$ajax({
                        url: util.saveJsInstant,
                        method: 'POST',
                        data: {
                            containerNo: containerNo,
                            remCus: remCus
                        }
                    });
                    result && wx.navigateTo({
                        url: `/pages/trahistory/main?active=${this.activeIndex}`
                    });
                } catch (e) {
                    console.log(e);
                };
            } else {
                wx.showToast({
                    title: '请填写车皮/集装箱号',
                    icon: 'none'
                });
            }
        },
        /**
         * 提交查询 点击事件
         */
        async submitVakid () {
            const _this = this;
            let rule = this.rule;
            let containerNo = this.sendData.containerNo;
            let num = containerNo.length === 11 ? 1 : 2;
            let selectIndex = this.selectIndex;
            let hb = this.queryTraceData.hb;
            let userRedCouId;
            if (hb[selectIndex] && hb[selectIndex] !== '无红包') {
                userRedCouId = hb[selectIndex].userRedCouId;
            } else {
                userRedCouId = '';
            };
            let openid = await this.$UTIL.Login();
            let data = Object.assign(this.sendData, {
                userRedCouId: userRedCouId,
                queryType: num,
                eDate: _this.startTime,
                sDate: _this.endTime,
                openId: openid.openid,
                queryState: _this.domesticindex
            });
            let flag = false;
            let stringTxt = '';
            if (this.validErr) {
                return false;
            };
            if (rule.chepi && data.containerNo.trim() === '') {
                stringTxt = '请填写车皮/集装箱号';
            } else if (rule.fazhan && data.sendStationName.trim() === '') {
                stringTxt = '请填选择发站编码';
            } else if (rule.daozhan && data.arrStationName.trim() === '') {
                stringTxt = '请填选择到站编码';
            } else if (rule.fayun && data.sendDates.trim() === '') {
                stringTxt = '请选择发运日期';
            } else {
                flag = true;
            };
            if (!flag) {
                wx.showToast({
                    title: stringTxt,
                    icon: 'none'
                });
            } else {
                this.submitRange(data);
            };
        },
        async submitRange (data) {
            try {
                let activeIndex = this.activeIndex;
                let url = activeIndex === '1' ? domestic.balance : foreign.balance;
                let initData = await this.$ajax({
                    url: url,
                    data: data,
                    method: 'POST'
                });
                // if (!initData.data) {
                //     wx.showToast({
                //         title: '返回值为null',
                //         icon: 'none'
                //     });
                // } else {
                    if (initData.state === '600') {
                        let resultOptions = await this.$UTIL.WeChatPayment(activeIndex, initData.msg);
                        this.timerDate(resultOptions.r.traQueryId, activeIndex);
                    } else {
                        wx.navigateTo({
                            url: `/pages/trahistory/main?active=${activeIndex}`
                        });
                    };
                // };
            } catch (e) {
                console.log(e);
            };
        },
        async timerDate (traQueryId, activeIndex) {
            let url = activeIndex === '1' ? domestic.queryInstant : foreign.queryInstant;
            let params = activeIndex === '1' ? {internaId: traQueryId} : {traQueryId: traQueryId};
            let count = 0;
            wx.showLoading({
                title: '正在支付',
                mask: true
            });
            let timer = setInterval(() => {
                if (count < 20) {
                    wx.request({
                        url: url,
                        data: params,
                        success (result) {
                            let data = result.data;
                            if (data.state === '200') {
                                clearInterval(timer);
                                wx.showToast({
                                    title: data.msg,
                                    icon: 'none'
                                });
                                wx.navigateTo({
                                    url: `/pages/trahistory/main?active=${activeIndex}`
                                });
                            } else {
                                if (count >= 20) {
                                    wx.showToast({
                                        title: data.msg,
                                        icon: 'none'
                                    });
                                    clearInterval(timer);
                                };
                            }
                        }
                    });
                    count++;
                } else {
                    clearInterval(timer);
                    wx.showToast({
                        title: '充值失败',
                        icon: 'none'
                    });
                    wx.hideLoading();
                };
            }, 2000);
        },
        /**
         * inputDlong 组件 派发事件 监听返回值，
         * @param {object} options - 派发事件返回参数.获取状态：当前选择值为 发站状态 还是到站状态
         */
        dlongEvent (options) {
            this.sendData[options.dlongName] = options.val;
            this.sendData[options.codeName] = options.code;
            this.inputTost = false;
        },
        /**
         * 发站 和 到站 焦点事件，获取焦点时触发 inputDlong 组件弹框
         * @param {object} e - 事件对象 获取当前触发 弹框的是 发站  还是   到站状态
         */
        dlongContainer (e) {
            let dlongName = e.mp.target.dataset.name;
            let codename = e.mp.target.dataset.codename;
            this.inputTost = true;
            this.dlongName = dlongName;
            this.codeName = codename;
        },
        /**
         * inputDlong 派发事件，是否关闭 inputDlong 弹框
         * @param {boolean} flag - 派发事件 参数 关闭弹窗
         */
        closeEvent (flag) {
            this.inputTost = flag;
        },
        /**
         * 获取当前年，当前月 数最后一天的 日期对象
         * @param {string} year - 当前年
         * @param {string} month - 当前月
         * @return {object} cdt - 返回日期对象
         */
        getEndTime (year, month) {
            let dt = new Date(year, month, 1);
            let cdt = new Date(dt.getTime() - 1000 * 60 * 60 * 24);
            return cdt;
        },
        /**
         * 初始化所有的日期对象, 日期picker 限制从那年月 到哪年月份展示选择等。。。
         */
        initData () {
            if (!this.rule.shiduan) {
                return false;
            };
            let now = new Date();
            let year = now.getFullYear();
            let month = now.getMonth() + 1;
            let day = this.transTime(now.getDate());
            let initEndTime = this.getEndTime(year, month + 2);
            this.initStartTime = `${year}-${this.transTime(month)}-${day}`;
            this.startTime = this.initStartTime;
            this.initEndTime = `${initEndTime.getFullYear()}-${this.transTime(Number(initEndTime.getMonth()) + 1)}-${this.transTime(initEndTime.getDate())}`;
            let date = this.getEndTime(year, month);
            this.endTime = `${date.getFullYear()}-${this.transTime(Number(date.getMonth()) + 1)}-${this.transTime(date.getDate())}`;
        },
        /**
         * 因为日期 picker 不接受 2018-9-10 的规则，需要2018-09-10,将小于10的值做0 + *拼接
         * @param {string} year - 当前年
         * @param {string} month - 当前月
         * @return {object} cdt -  吧
         */
        transTime (num) {
            return num < 10 ? '0' + num : num;
        },
        SdDateChange (e) {
            let changeTime = e.mp.detail.value.split('-');
            let date = this.getEndTime(changeTime[0], changeTime[1]);
            this.startTime = e.mp.detail.value;
            this.endTime = `${date.getFullYear()}-${this.transTime(Number(date.getMonth()) + 1)}-${this.transTime(date.getDate())}`;
        },
        /**
         * 获取余额红包等数据
         */
        async queryTrace () {
            try {
                let openid = await this.$UTIL.Login();
                let result = await this.$ajax({
                    url: util.queryTraceType,
                    data: {
                        openId: openid.openid
                    }
                });
                this.queryTraceData = result.data;
                let key = this.rule.key;
                this.price = result.data.amountTimes[key];
                this.redList(result.data.hb);
                this.sendData.sendDates = result.data.date;
            } catch (e) {
                console.log(e);
            };
        }
    },
    onLoad ({activeIndex, domesticindex}) {
        const _this = this;
        this.rule = rule[activeIndex][domesticindex];
        wx.setNavigationBarTitle({
            title: _this.rule.ruleOptions.name
        });
        this.domesticindex = Number(domesticindex) + 1;
        this.activeIndex = activeIndex;
        this.sendData = { // 表单数据绑定
            userRedCouId: '', // '红包'
            trackType: Number(domesticindex) + 1, // 查询类型
            queryType: '', // 集装箱/整车
            containerNo: '', // 箱号
            sourceData: '04', // 接口类型
            remCus: '', // 客户标签
            sendDates: '', // 发站日期
            sendStationName: '', // 发站名称
            arrStationName: '', // 到站名车
            arrStationCode: '', // 到站代码
            sendStationCode: '', // 发站代码
            eDate: '',
            sDate: ''
        }; // 初始化数据
        this.endTime = '';
        this.startTime = '';
        this.selectIndex = 0;
        this.validErr = false;
        this.selectArray = ['无红包'];
        this.initData();
        this.queryTrace();
    },
    components: {
        inputDlong,
        Balance,
        Explain
    }
};
</script>

<style lang="css">
picker{
    width: 100%;
}
.valid-input .iconfont {
    display:block;
    width: 100%;
    text-align:right;
}

.range-fexid {
    position: fixed;
    width: 100%;
    height:100%;
    background:rgba(0,0,0,0.5);
    z-index:500;
    left:0;
    top:0;
    display: flex;
    justify-content: center;
}
.valid-err {
    font-size:12px;
    padding-left:5px;
    color: #ff0000;
}
.fexid-content {
    height: 350px;
    width: 80%;
    height: 350px;
    margin: 50px auto;
    background-color: #ffffff;
    border-radius: 5px;
    position: relative;

}
.fexid-scroll {
    height: 310px;
    padding: 20px;
    box-sizing: border-box;
}

.fexid-list {
}
.fexid-list li {
    padding: 0 5px;
    height: 30px;
    line-height: 30px;
    float: left;
    border:solid #888888 1px;
    text-align:center;
    margin-top: 10px;
    margin-left: 5px;
}
.fexid-list li.list-cur {
    border-color: red;
    color: red;
}
.fexid-comfim {
    display: flex;
    height: 40px;
    align-items: center;
    justify-content: center;
    border-top: solid 1px #888888;
}
.fexid-comfim span {
    padding: 5px 10px;
    background-color: #1aac19;
    color: #ffffff;
    border-radius: 3px;
}


.close-btn {
    position: absolute;
    top: -15px;
    right: -15px;
    width: 30px;
    line-height: 30px;
    background-color: #000000;
    opacity: .8;
    color: #ffffff;
    text-align: center;
    border-radius: 50%;
    z-index: 100;
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
.valid-triangle::after, .valid-triangle::before {
    content: '';
    border: 5px solid transparent;
    position: absolute;
    right: 10px;
}
.valid-triangle::after {
    top: 3%;
    border-bottom-color: #888888;
}
.valid-triangle::before {
    bottom: 3%;
    border-top-color: #888888;
}
.valid-shiduan {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: 1000;
}
.shiduan-block {
    width: 100%;
    height: 24px;
}
</style>
