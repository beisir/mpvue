<template lang="html">
    <div class="hello" >
		<swiper class="swiper" indicator-dots="true" autoplay="true" interval="5000" duration="1000">
		    <block v-for="(item, index) in list" :index="index" :key="key">
		        <swiper-item>
		            <image :src="item.img" class="slide-image" mode="aspectFill"/>
		        </swiper-item>
		    </block>
		</swiper>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                list: [
                    { img: 'https://qiniu.epipe.cn/5456575529551388672?imageslim&imageView2/1/w/750/h/360' },
                    { img: 'https://qiniu.epipe.cn/5430983074181545984?imageslim&imageView2/1/w/750/h/360' },
                    { img: 'https://qiniu.epipe.cn/5464226412548325376?imageslim&imageView2/1/w/750/h/360' }
                ]
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .slide-image {
        width: 100%;
        height: 115rpx;
    }
    .swiper {
        width: 100%;
        height: 115rpx;
    }
</style>