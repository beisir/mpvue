<!-- <template lang="html">
    <div class="map">
        <map id="map"
            longitude="113.324520"
            latitude="23.099994"
            scale="14"
            :controls="controls"
            :markers="markers"
            @markertap="markertap"
            :polyline="polyline"
            @regionchange="regionchange"
            show-location
            @callouttap="bindcallouttapFn"
            @controltap="bindcontroltapFn"
        ></map>
    </div>
</template>

<script>
export default {
    data () {
        return {
            mapDataOptions: {
                iconPath: '/static/image/location.png',
                width: 24,
                height: 24,
                callout: {
                    content: '萨克的',
                    color: '#ffffff',
                    fontSize: 12,
                    borderRadius: 5,
                    bgColor: '#e92d27', // 背景色String 1.2.0
                    padding: 5, // 文本边缘留白Number1.2.0
                    display: 'ALWAYS', // 'BYCLICK':点击显示; 'ALWAYS': 常显String1.2.0
                    textAlign: 'center'
                }
            },
            markers: []
        };
    },
    methods: {
        bindcallouttapFn (e) {
            console.log(e);
        },
        bindcontroltapFn (e) {
            console.log(e);
        },
        regionchange (e) {
            console.log(e.type);
        },
        markertap (e) {
            console.log(e.markerId);
        },
        controltap (e) {
            console.log(e.controlId);
        },
        async getMapData () {
            const _this = this;
            const dataList = await this.$ajax({url: 'https://www.easy-mock.com/mock/5b39baec73a49f4fe3433dd9/xcx/map'});
            let newList = dataList.map((item, index) => {
                let mapdata = JSON.stringify(_this.mapDataOptions);
                let newData = JSON.parse(mapdata);
                return Object.assign(newData, {
                    id: index,
                    latitude: item.latitude,
                    longitude: item.longitude,
                    callout: {
                        ...newData.callout,
                        content: item.content
                    }
                });
            });
            this.markers = newList;
        }
    },
    created () {
        // this.getMapData();
    }
};
</script>

<style lang="css">
#map {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    bottom: 0;
}
</style> -->
<template lang="html">
    <div class="">
        <web-view src="https://www.wuchangwang.cn/vendors/map/map.htm"></web-view>
    </div>
</template>

<script>
export default {
};
</script>

<style lang="css">
</style>
