<template lang="html">
    <div class="myaccount">
        <div class="myaccount-top">
            <p>0.0元</p>
            <p>可用余额</p>
        </div>
        <div class="myaccount-content">
            <div class="myaccount-btn">
                <span @click="isshow=true">充值</span>
            </div>
            <ul class="myaccount-list">
                <li>我的红包</li>
                <li>充值明细</li>
            </ul>
        </div>
        <div class="signClassAlert" v-if="isshow">
            <div :class="['myaccount-dialong', isshow ? 'slideup': 'slidedown']">
                <p>选择充值金额 <span @click="isshow=false">关闭</span></p>
                <div class="myaccount-tr">
                    <span class="myaccount-td">50元</span>
                    <span class="myaccount-td">100元</span>
                    <span class="myaccount-td">200元</span>
                    <span class="myaccount-td">500元</span>
                    <span class="myaccount-td">1000元</span>
                    <span class="myaccount-td">2000元</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {
            isshow: false
        };
    },
    methods: {
        showTost () {
            this.isshow = true;
        }
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
.myaccount-list li {
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
