<template lang="html">
    <div class="myaccount">
        <div class="myaccount-top">
            <p>{{some}}元</p>
            <p>可用余额</p>
        </div>
        <div class="myaccount-content">
            <div class="myaccount-btn">
                <span @click="isshow=true">充值</span>
            </div>
            <div class="myaccount-list">
                <a href="/pages/redenvelopes/main">我的红包</a>
                <a href="/pages/recharge/main">充值明细</a>
            </div>
        </div>
        <div class="signClassAlert" v-if="isshow">
            <div :class="['myaccount-dialong', isshow ? 'slideup': 'slidedown']">
                <p>选择充值金额 <span @click="isshow=false">关闭</span></p>
                <div class="myaccount-tr">
                    <span
                        class="myaccount-td"
                        v-for="(priceItem, priceIndex) in priceList"
                        :key="priceIndex"
                        @click="submitOrder"
                        :data-price="priceItem"
                        >{{priceItem}}元</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {saveWxXd, util} from '../../utils/config.js';
export default {
    data () {
        return {
            some: 0,
            isshow: false,
            priceList: [0.01, 100, 200, 500, 1000, 2000]
        };
    },
    methods: {
        async getYUe () {
            let openid = await this.$UTIL.Login();
            let some = await this.$ajax({
                url: util.queryTraceType,
                data: {
                    openId: openid.openid
                }
            });
            this.some = some.data.accountBlance.transOriPrice;
        },
        async submitOrder (e) {
            let {price} = e.mp.currentTarget.dataset;
            try {
                let options = await this.$UTIL.WeChatRechat(price);
                this.timerDate(options.r.recOrderNo); // accRechargeId
                // if (prepay_id !== '') {
                //     console.log('支付成功', prepay_id);
                // };
            } catch (err) {
                console.log(err);
            };
            this.isshow = false;
        },
        async timerDate (recOrderNo) {
            const _this = this;
            let url = saveWxXd.query;
            let count = 0;
            wx.showLoading({
                title: '正在支付',
                mask: true
            });
            let timer = setInterval(() => {
                if (count < 20) {
                    wx.request({
                        url: url,
                        data: {
                            recOrderNo: recOrderNo
                        },
                        success (result) {
                            let data = result.data;
                            if (data.state === '200') {
                                clearInterval(timer);
                                wx.showToast({
                                    title: data.msg,
                                    icon: 'none'
                                });
                                _this.getYUe();
                            } else {
                                if (count >= 20) {
                                    wx.showToast({
                                        title: data.msg,
                                        icon: 'none'
                                    });
                                    clearInterval(timer);
                                };
                            }
                            console.log(result);
                        }
                    });
                    count++;
                    console.log(count);
                } else {
                    clearInterval(timer);
                    wx.showToast({
                        title: '充值失败',
                        icon: 'none'
                    });
                    wx.hideLoading();
                };
            }, 2000);
        }
    },
    onLoad () {
        this.getYUe();
    }
};
</script>

<style lang="css">
.myaccount-top {
    background-color: #ff0102;
}
.myaccount-top p {
    line-height: 30px;
    text-align: center;
    color: #ffffff;
}

.myaccount-btn {
    line-height: 50px;
    text-align: center;
    border-bottom: solid #f5f4f5 1px;
}
.myaccount-btn span {
    padding: 5px 20px;
    background-color: #fea202;
    color: #ffffff;
    border-radius: 5px;
    font-size: 12px;
}
.myaccount-list a {
    display: block;
    line-height: 40px;
    padding-left: 10px;
    border-bottom: solid #f5f4f5 1px;
}

.signClassAlert{
    position: fixed;
    width: 100%;
    height:100%;
    background:rgba(0,0,0,0.5);
    z-index:500;
    left:0;
    top:0;
}
.myaccount-dialong {
    position: absolute;
    bottom: 0;
    width: 100%;
    transform: translateY(100);
}
.myaccount-dialong p {
    font-size: 14px;
    line-height: 40px;
    text-align: center;
    border-top: 1px solid #f5f4f5;
    background-color: #ffffff;
}
.myaccount-dialong p span {
    color: #fea202;
    float: right;
    margin-right: 30px;
}
.myaccount-tr {
    width: 100%;
    background-color: #fff7f7;
    display: flex;
    flex-wrap: wrap;
}
.myaccount-td {
    width: 32.333333%;
    line-height: 50px;
    text-align: center;
    border: 1px solid #f5f4f5;
}

.slidedown {
    animation: slidedown 0.3s linear;
    animation-fill-mode: forwards;
}
.slideup {
    animation: slideup 0.3s linear;
    animation-fill-mode: forwards;
}

@keyframes slidedown {
    from {
        transform: translateY(0);
    }
    to {
        transform: translateY(100%);
    }
}

@keyframes slideup {
    from {
        transform: translateY(100%);
    }
    to {
        transform: translateY(0);
    }
}

</style>
