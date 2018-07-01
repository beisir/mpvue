<template lang="html">
    <!--动态切换组件 -->
    <div class='tabTitBox'>
        <div class='tabTit'
            v-for="(item, index) in titleList"
            :key="item.key"
            @click="toogerTitle(index)">
            <span :class="currentTab === index ? 'cur': ''">{{item.text}}</span>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        titleList: {
            type: Array,
            default: []
        },
        currentTab: {
            type: Number,
            default: 0
        }
    },
    methods: {
        toogerTitle (index) {
            this.$emit('toogerTitle', index);
        }
    }
};
</script>

<style lang="css">
.tabTitBox {
    height: 45px;
    line-height: 45px;
    background: #fff;
    box-shadow: 0rpx 0rpx 10px #ddd;
    display: flex;
}

.tabTit {
    flex: 1;
    text-align: center;
    font-size: 14px;
    position: relative;
}

span.cur {
    color: #101010;
}

span.cur::after {
    content: "";
    margin: 0 auto;
    position: absolute;
    bottom: 0;
    display: block;
    width: 100%;
    height: 3px;
    background: #fea200;
    border-radius: 5px;
}

</style>
