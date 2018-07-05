<template lang="html">
    <div class="recharge">
        <h3 class="re-title">充值明细</h3>
        <ul class="re-list">
            <li>
                <div class="re-price">
                    <div class="re-y">1000<span>元</span></div>
                    <div class="re-r">0<span>元</span></div>
                </div>
                <div class="re-amount">
                    <span>充值金额</span>
                    <span>赠送金额</span>
                </div>
                <div class="re-range">
                    <span>充值内容：国外铁路追踪</span>
                    <span>充值号：090990909909</span>
                    <span>充值日期：090990909909</span>
                </div>
                <div class="re-pricenum">未付款</div>
            </li>
            <li>
                <div class="re-price">
                    <div class="re-y">1000<span>元</span></div>
                    <div class="re-r">0<span>元</span></div>
                </div>
                <div class="re-amount">
                    <span>充值金额</span>
                    <span>赠送金额</span>
                </div>
                <div class="re-range">
                    <span>充值内容：国外铁路追踪</span>
                    <span>充值号：090990909909</span>
                    <span>充值日期：090990909909</span>
                </div>
                <div class="re-pricenum">未付款</div>
            </li>
            <li>
                <div class="re-price">
                    <div class="re-y">1000<span>元</span></div>
                    <div class="re-r">0<span>元</span></div>
                </div>
                <div class="re-amount">
                    <span>充值金额</span>
                    <span>赠送金额</span>
                </div>
                <div class="re-range">
                    <span>充值内容：国外铁路追踪</span>
                    <span>充值号：090990909909</span>
                    <span>充值日期：090990909909</span>
                </div>
                <div class="re-pricenum">未付款</div>
            </li>
            <li>
                <div class="re-price">
                    <div class="re-y">1000<span>元</span></div>
                    <div class="re-r">0<span>元</span></div>
                </div>
                <div class="re-amount">
                    <span>充值金额</span>
                    <span>赠送金额</span>
                </div>
                <div class="re-pricenum">未付款</div>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
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
.re-pricenum {
    color: #b9b9b9;
    position:absolute;
    top:25%;
    right:20px;
    font-size:20px;
}
</style>
