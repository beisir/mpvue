<template lang="html">
    <div class="balance">
        <div class="range-balance">
            <div class="range-title">
                <span class="icon iconfont icon-27"></span>
                <p class="range-head">{{ruleTitle}}</p>
                <span class="range-ace">账户余额: 0.00 元</span>
            </div>
        </div>
        <div class="range-whole">
            <p>￥52元/次·全程</p>
            <p>物畅网会员尊享7折—9折优惠，低至21元</p>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        ruleTitle: {
            type: String
        }
    },
    created () {
        const title = this.ruleTitle;
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
