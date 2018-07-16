<template lang="html">
    <div class="map">
        <!-- :longitude="" -->
        <!-- :latitude="23.099994" -->
        <!-- :polyline="polyline" -->
        <!-- :controls="controls" -->

        <map id="map"
            scale="5"
            :markers="markers"
            :polyline="polyline"
            @markertap="markertap"
            @regionchange="regionchange"
            show-location
            @callouttap="bindcallouttapFn"
            @controltap="bindcontroltapFn"
        ></map>
    </div>
</template>

<script>
// let bmap = require('../../libs/bmap-wx.js');
import BMapWX from '../libs/bmap-wx.js';
console.log(BMapWX);
export default {
    props: ['result', 'active'],
    data () {
        return {
            mapDataOptions: {
                iconPath: '/static/image/location.png',
                width: 24,
                height: 24,
                callout: {
                    content: '',
                    color: '#ffffff',
                    fontSize: 12,
                    borderRadius: 5,
                    bgColor: '#e92d27', // 背景色String 1.2.0
                    padding: 5, // 文本边缘留白Number1.2.0
                    display: 'ALWAYS', // 'BYCLICK':点击显示; 'ALWAYS': 常显String1.2.0
                    textAlign: 'center'
                }
            },
            markers: [],
            polyline: []

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
            let {TQ, end, start, GPS} = this.result;
            let active = this.active;
            let key = active === 0 ? 'opeStation' : 'currentEntire';
            try {
                let newList = [];
                let points = [];
                let len = TQ.length + 2;
                for (let i = 0; i < len; i++) {
                    let mapdata = JSON.stringify(_this.mapDataOptions);
                    let newData = JSON.parse(mapdata);
                    if (i === 0) {
                        newList.push(_this.paramsFilter(newData, i, {
                            resultId: 1,
                            stationPosition: start
                        }, '起点'));
                        // points.push({
                        //     longitude: start.split(',')[1],
                        //     latitude: start.split(',')[0]
                        // });
                    } else if (i === len - 1) {
                        newList.push(_this.paramsFilter(newData, i, {
                            resultId: 2,
                            stationPosition: end
                        }, '终点'));
                        // points.push({
                        //     longitude: end.split(',')[1],
                        //     latitude: end.split(',')[0]
                        // });
                    } else {
                        let index = i - 1;
                        let text = TQ[index][key];
                        newList.push(_this.paramsFilter(newData, i, TQ[index], text));
                        // points.push({
                        //     longitude: GPS[index].wgLon,
                        //     latitude: GPS[index].wgLat
                        // });
                    };
                };
                newList[newList.length - 1].iconPath = '/static/image/end.png';
                _this.markers = newList;
                // _this.polyline = [{
                //     points: points,
                //     color:"#FF0000DD",
                //     width: 2,
                //     dottedLine: false
                // }];
            } catch (e) {
                console.log(e);
            };
        },
        paramsFilter (newData, index, item, text) {
            let postion = item.stationPosition.split(',');
            let wgLat = postion[1] * 1;
            let wgLon = postion[0] * 1;
            try {
                return Object.assign(newData, {
                    id: item.regTime,
                    latitude: wgLat + index,
                    longitude: wgLon + index,
                    callout: {
                        ...newData.callout,
                        content: text
                    }
                });
            } catch (e) {
                console.log(e);
            };
        }
    },
    mounted () {
        console.log(BMapWX());
        // this.getMapData();
    }
};
</script>

<style lang="css">
#map {
    width: 100%;
    height: 622px;
    /* position: absolute;
    top: 0;
    bottom: 0; */
}
</style>
