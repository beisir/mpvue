<template lang="html">
    <div class="range">
        <Balance />
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
                            />
                        </div>
                    </div>
                    <div class="valid-prompt">示例：集装箱号：TKRU4096807  车皮号：44472058</div>
                </li>
                <li v-if="rule.fazhan">
                    <div class="valid-box">
                        <div class="valid-left">发站</div>
                        <div class="valid-input">
                            <input
                                placeholder="输入国外的站点编码"
                                placeholder-class="input"
                                data-name="sendStationCode"
                                @focus="dlongContainer"
                                v-model="sendData.sendStationCode"
                            />
                        </div>
                    </div>
                </li>
                <li v-if="rule.daozhan">
                    <div class="valid-box">
                        <div class="valid-left">到站</div>
                        <div class="valid-input">
                            <input
                                placeholder="输入国内的站点编码"
                                placeholder-class="input"
                                data-name="arrStationCode"
                                @focus="dlongContainer"
                                v-model="sendData.arrStationCode"
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
                                start="2015-09-01"
                                end="2017-09-01"
                                @change="bindDateChange">
                                <span class="icon iconfont icon-rili"></span>
                            </picker>
                        </div>
                    </div>
                </li>
                <li v-if="rule.shiduan">
                    <div class="valid-box">
                        <div class="valid-left">时段追踪</div>
                        <div class="valid-input" style="font-size:12px;position:relative;">
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

        <div class="range-fexid" v-if="scrolltost">
            <div class="fexid-content">
                <span class="close-btn" @click="scrolltost=false">X</span>
                <scroll-view :scroll-y="true" class="fexid-scroll">
                    <ul class="fexid-list">
                        <li
                            v-for="(optItem, optIndex) in optionalArr"
                            :class="optItem.flag ? 'list-cur' : ''"
                            :key="optItem.text"
                            @click="optionaSelect(optIndex)"
                            >{{optItem.text}}</li>
                    </ul>
                </scroll-view>
                <div class="fexid-comfim">
                    <span @click="optionAcomfim">确定</span>
                </div>
            </div>
        </div>
        <inputDlong
            :inputTost="inputTost"
            :dlongName="dlongName"
            @closeEvent="closeEvent"
            @dlongEvent="dlongEvent"/>
    </div>
</template>

<script>
import Balance from '../../components/balance.vue';
import inputDlong from '../../components/inputDlong.vue';
export default {
    data () {
        return {
            rule: {},
            shiduanTime: '',
            inputTost: false,
            scrolltost: false,
            dlongName: '',
            endTime: '',
            startTime: '',
            initEndTime: '',
            initStartTime: '',
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
            },
            optionalArr: [
                {
                    flag: false,
                    text: '我的就是'
                },
                {
                    flag: false,
                    text: '我我的就是的就是'
                },
                {
                    flag: false,
                    text: '我的是'
                },
                {
                    flag: false,
                    text: '我的'
                }
            ],
            selectOptionl: ''
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
        },
        optionaSelect (index) {
            let optionalArr = this.optionalArr;
            optionalArr[index].flag = !optionalArr[index].flag;
            this.optionalArr = optionalArr;
            // console.log(this.optionalArr);
            // this.optionAcomfim();
        },
        optionAcomfim () {
            let optionalArr = this.optionalArr;
            let selectOptionl = [];
            optionalArr.map(item => {
                if (item.flag) {
                    selectOptionl.push(item.text);
                };
            });
            this.selectOptionl = selectOptionl.join('、');
            this.scrolltost = false;
        },
        dlongEvent (options) {
            this.sendData[options.dlongName] = options.val;
            this.inputTost = false;
        },
        dlongContainer (e) {
            let dlongName = e.mp.target.dataset.name;

            this.inputTost = true;
            this.dlongName = dlongName;
        },
        closeEvent (flag) {
            this.inputTost = false;
        },
        getEndTime (month, day) {
            let dt = new Date(month, day, 1);
            let cdt = new Date(dt.getTime() - 1000 * 60 * 60 * 24);
            return cdt;
        },
        initData () {
            let now = new Date();
            let year = now.getFullYear();
            let month = now.getMonth() + 1;
            let day = this.transTime(now.getDate());
            let initEndTime = this.getEndTime(year, month + 2);

            console.log(this.transTime(month));
            this.initStartTime = `${year}-${this.transTime(month)}-${day}`;
            this.startTime = this.initStartTime;
            this.initEndTime = `${initEndTime.getFullYear()}-${this.transTime(Number(initEndTime.getMonth()) + 1)}-${this.transTime(initEndTime.getDate())}`;

            let date = this.getEndTime(year, month);
            this.endTime = `${date.getFullYear()}-${this.transTime(Number(date.getMonth()) + 1)}-${this.transTime(date.getDate())}`;
            console.log(this.initStartTime);
            console.log(this.startTime);
            console.log(this.initEndTime);
            console.log(this.endTime);
        },
        transTime (num) {
            return num < 10 ? '0' + num : num;
        },
        SdDateChange (e) {
            let changeTime = e.mp.detail.value.split('-');
            let date = this.getEndTime(changeTime[0], changeTime[1]);
            this.startTime = e.mp.detail.value;
            this.endTime = `${date.getFullYear()}-${this.transTime(Number(date.getMonth()) + 1)}-${this.transTime(date.getDate())}`;
            // wx.showModal({
            //     title: 'time',
            //     content: `${cdt.getFullYear()},${Number(cdt.getMonth()) + 1},${cdt.getDate()}`
            // });
        }
    },
    onLoad (options) {
        this.rule = JSON.parse(options.rule);
        console.log(this.rule);
        this.initData();
        // console.log(this.rule);
        // console.log(this.$root.$mp.query.rule);
    },
    components: {
        inputDlong,
        Balance
    }
};
</script>

<style lang="css">
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
