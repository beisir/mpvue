<template>
  <div>
      <div>
        <a href="/pages/index/main?hellow=123123">跳转页面</a>
        <ul>
            <li v-for="item in dataList" :key="item">{{item}}</li>
        </ul>
      </div>
  </div>
</template>

<script>
export default {
    data: {
        hello: 'hello wrodvvvvv',
        dataList: []
    },
    methods: {
        async getData () {
            const data1 = [
                await this.$ajax({url: 'https://bhyrzk1n.qcloud.la/weapp/hebei'}),
                await this.$ajax({url: 'https://bhyrzk1n.qcloud.la/weapp/hebei'}),
                await this.$ajax({url: 'https://bhyrzk1n.qcloud.la/weapp/hebei'})
            ];
            return data1;
        }
    },
    created () {
        const _this = this;
        this.getData().then(res => {
            _this.dataList = res;
        });
        // console.log(this.dataList)
    }

};
</script>

<style lang="css">
</style>
