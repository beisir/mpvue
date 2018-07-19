<template lang="html">
    <div class="balance" v-if="yu">
        <div class="range-balance">
            <div class="range-title">
                <span class="icon iconfont icon-27"></span>
                <p class="range-head">{{ruleOptions.name}}</p>
                <span class="range-ace">账户余额: {{transOriPrice}} 元</span>
            </div>
        </div>
        <div class="range-whole">
            <p>￥{{price}}/次·{{ruleOptions.every}}</p>
            <p>活动期间优惠低至{{ruleOptions.discount}}元，会员尊享折上折</p>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        ruleOptions: {
            type: Object
        },
        // 余额
        transOriPrice: {
            type: Number,
            default: 0
        },
        price: {
            type: Number,
            default: 0
        },
        yu: {
            type: Boolean
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

</style>
