<template lang="html">
    <div class="recharge">
        <h3 class="re-title">充值明细</h3>
        <ul class="re-list">
            <li v-for="(listItem, listIndex) in dataList"
                :key="listItem.regTime">
                <div class="re-price">
                    <div class="re-y">{{listItem.recAmount}}<span>元</span></div>
                    <div class="re-r">{{listItem.recPreAmount}}<span>元</span></div>
                </div>
                <div class="re-amount">
                    <span>充值金额</span>
                    <span>赠送金额</span>
                </div>
                <div class="re-range">
                    <span v-if="listItem.rechargeFlag === '1'">充值内容：国外充值</span>
                    <span v-else-if="listItem.rechargeFlag === '2'">充值内容：国内充值</span>
                    <span v-else="listItem.rechargeFlag === '3'">充值内容：充值</span>
                    <span>充值号：{{listItem.recOrderNo}}</span>
                    <span style="width:100%;">充值日期：{{listItem.date}}</span>
                </div>
                <div class="re-pricenum">{{listItem.rechargeState === '0' ? '未付款' : '已付款'}}</div>
            </li>
        </ul>
    </div>
</template>

<script>
import {queryCZRecord} from '../../utils/config.js';
export default {
    data () {
        return {
            pageNo: 1,
            dataList: []
        };
    },
    methods: {
        async getCZRecord (pageNo) {
            try {
                let openid = this.openid;
                console.log(openid);
                let datalist = await this.$ajax({
                    url: queryCZRecord.queryCZRecord,
                    data: {
                        openId: openid,
                        pageSize: pageNo
                    }
                });
                this.dataList = this.dataList.concat(datalist.data);
                console.log(this.dataList);
            } catch (e) {
                console.log(e);
            };
        }
    },
    /**
     * [onPullDownRefresh() 下拉刷新 ]
     * [e: 当页面达到最底部触发]
     * [-------------------------------------------------]
     */
    onPullDownRefresh () {
        this.pageNo = this.pageNo + 1;
        this.getCZRecord(this.pageNo);
    },
    onLoad () {
        console.log(123123);
        const _this = this;
        this.$UTIL.Login().then(openid => {
            console.log(openid);
            _this.openid = openid.openid;
            _this.getCZRecord(_this.pageNo);
        });
    }
};
</script>

<style lang="css">
.recharge {
    font-family: 'myfont';
}
.re-title {
    font-weight: bold;
    height: 40px;
    line-height: 40px;
    padding-left: 10px;
}
.re-list {
    border-bottom: solid #b9b9b9 1px;
}
.re-list li {
    padding: 10px;
    border-top: 2px solid #fa8987;
    position: relative;
}

.re-price {
    line-height: 40px;
    display: flex;
}
.re-price div {
    width: 125px;
    font-size: 20px;
}
.re-price span {
    font-size: 12px;
}
.re-price .re-y {
    color: #fea200;
    padding-left: 20px;
}
.re-price .re-r {
    color: #fa8987;
    padding-left: 30px;
}

.re-amount{
    line-height: 30px;
    display: flex;
    color: #b9b9b9;
}
.re-amount span {
    width: 125px;
    padding-left: 20px;
}
.re-range {
    color: #b9b9b9;
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    padding-top: 10px;
}
.re-range span {
    width: 50%;
    line-height: 20px;
}
.re-range .sps-dat {
    width: 80%;
}
.re-pricenum {
    color: #b9b9b9;
    position:absolute;
    top:25%;
    right:20px;
    font-size:20px;
}
</style>
