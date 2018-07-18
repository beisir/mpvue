<template lang="html">
    <div class="map">
        <web-view :src="url"></web-view>
        <!-- <web-view ></web-view> -->
    </div>
</template>

<script>
export default {
    props: ['urlParams', 'active'],
    data () {
        return {
            url: 'https://www.wuchangwang.cn/railway.html?'
        };
    },
    mounted () {
        const _this = this;
        this.$UTIL.Login().then(res => {
            _this.url = `${_this.url}openId=${res.openid}&${_this.urlParams}`;
        });
    }
};
</script>

<style lang="css">
.map {
    width: 100%;
    height: 622px;
}
</style>
