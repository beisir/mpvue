<template>
  <div>
      <div>
        <navigator url="/pages/index/main">跳转页面</navigator>
      </div>
  </div>
</template>

<script>
export default {
  data: {
    hello: 'hello wrodvvvvv'
  },
  methods: {
    async fn () {
      const index = await wx.request({
        url: 'https://wsprod.hc360.com/get/prodbytime?pageSize=10&pageNo=0',
        success (options) {
          console.log(options)
        }
      })
      return index
    }
  },
  created () {
    this.fn().then((options) => {
      console.log(options)
    })
  }

}
</script>

<style lang="css">
</style>
