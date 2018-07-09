<template lang="html">
    <div class="balance">
        <div class="range-balance">
            <div class="range-title">
                <span class="icon iconfont icon-27"></span>
                <p class="range-head">{{ruleOptions.name}}</p>
                <span class="range-ace">账户余额: 0.00 元</span>
            </div>
        </div>
        <div class="range-whole">
            <p>￥{{ruleOptions.price}}/次·全程</p>
            <p>物畅网会员尊享7折—9折优惠，低至{{ruleOptions.discount}}元</p>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        ruleOptions: {
            type: Object
        }
    },
    created () {
        const title = this.ruleOptions.name;
        wx.setNavigationBarTitle({
            title: title
        });
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
