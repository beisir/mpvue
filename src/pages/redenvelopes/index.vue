<template lang="html">
    <div class="redenvel">
        <h4 class="red-title">您的红包列表</h4>
        <ul class="red-list" v-if="resultList.length">
            <li v-for="(redItem, redIndex) in resultList"
                :key="redItem.regTime">
                <div class="red-top">
                    <div class="red-price">{{redItem.remain}}<span>元</span></div>
                    <div class="">
                        <p>无门槛使用（剩余：{{redItem.remain}}元）</p>
                        <p class="red-ps">{{redItem.useRange}}</p>
                    </div>
                </div>
                <div class="red-bottom">
                    <span class="red-span">有效日期</span>
                    <span class="red-time">{{redItem.sdate}} 至 {{redItem.edate}}</span>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
import {util} from '../../utils/config.js';
export default {
    data () {
        return {
            resultList: []
        };
    },
    methods: {
        async getRedList () {
            try {
                let openid = await this.$UTIL.Login();
                let result = await this.$ajax({
                    url: util.queryHbDetails,
                    data: {
                        openId: openid.openid
                    }
                });
                console.log(result.data);
                this.resultList = result.data;
            } catch (e) {
                console.log(e);
            };
        }
    },
    onLoad () {
        this.getRedList();
    }
};
</script>

<style lang="css">
.redenvel {
    background: #f3f3f3;
    height: 750px;
}
.red-title {
    line-height: 40px;
    padding-left: 10px;
    background-color: #ffffff;
}


.red-list {
    padding: 10px;
    background-color: #ffffff;
}
.red-list li {
    border-radius: 10px;
    position: relative;
    margin-bottom: 15px;
}

.red-list li::after, .red-list li::before  {
    content: '';
    width: 15px;
    height: 15px;
    position: absolute;
    background-color: #ffffff;
    border-radius: 50%;
    z-index: 200;
    left: 70px;
}
.red-list li::before {
    top: -7.5px;
}
.red-list li::after {
    bottom: -7.5px;
    border-top: 1px solid #898989;

}

.red-top {
    color: #ffffff;
    height: 80px;
    background-color: #fc756b;
    padding: 10px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    border-radius: 10px 10px 0 0;
    overflow: hidden;
}
.red-price {
    width: 70px;
}
.red-price span {
    font-size: 10px;
}
.red-top .red-ps {
    font-size: 10px;
}
.red-bottom {
    line-height: 30px;
    background-color: #ffffff;
    padding-left: 10px;
    color: #898989;
    border-radius: 0 0 10px 10px;
    border: solid #898989 1px;
    border-top: none;
}

.red-span {
    font-size: 12px;
    display: inline-block;
    width: 70px;
}
.red-time {
    font-size: 10px;
}
</style>
