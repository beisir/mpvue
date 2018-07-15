<template lang="html">
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
            props: ['GPS'],
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
            markers: [
                // {
                //     iconPath: '/static/image/location.png',
                //     id: 0,
                //     latitude: 23.191994, // 维度
                //     longitude: 113.324520, // 经度
                //     width: 24,
                //     height: 24,
                //     callout: {
                //         content: '萨克的',
                //         color: '#ffffff',
                //         fontSize: 12,
                //         borderRadius: 5,
                //         bgColor: '#e92d27', // 背景色String 1.2.0
                //         padding: 5, // 文本边缘留白Number1.2.0
                //         display: 'ALWAYS', // 'BYCLICK':点击显示; 'ALWAYS': 常显String1.2.0
                //         textAlign: 'center'
                //     }
                //     // ,
                //     // label: {
                //     //     content: '这是一个', // 文本String1.2.0
                //     //     color: '#cccccc', // 文本颜色String1.2.0
                //     //     fontSize: 16, // 文字大小Number1.2.0
                //     //     x: 1, // label的坐标，原点是 marker 对应的经纬度Number1.2.0
                //     //     y: 2, // label的坐标，原点是 marker 对应的经纬度Number1.2.0
                //     //     borderWidth: 20, // 边框宽度Number1.6.0
                //     //     borderColor: '#000000', // 边框颜色String1.6.0
                //     //     borderRadius: 50, // 边框圆角Number1.6.0
                //     //     bgColor: '#eeeeee', // 背景色String1.6.0
                //     //     padding: 10, // 文本边缘留白Number1.6.0
                //     //     textAlign: 'center' // 文本对齐方式。有效值: left, right, centerString1.6.0
                //     // }
                // },
                // {
                //     iconPath: '/static/image/location.png',
                //     id: 1,
                //     latitude: 23.292996,
                //     longitude: 113.324520,
                //     width: 24,
                //     height: 24,
                //     callout: {
                //         content: '哈萨克斯坦1',
                //         color: '#ffffff',
                //         fontSize: 12,
                //         borderRadius: 5,
                //         bgColor: '#e92d27',
                //         padding: 5,
                //         display: 'ALWAYS',
                //         textAlign: 'center'
                //     }
                // },
                // {
                //     iconPath: '/static/image/location.png',
                //     id: 2,
                //     latitude: 23.393999,
                //     longitude: 113.324536,
                //     width: 24,
                //     height: 24,
                //     callout: {
                //         content: '哈萨克斯坦',
                //         color: '#ffffff',
                //         fontSize: 12,
                //         borderRadius: 5,
                //         bgColor: '#e92d27',
                //         padding: 5,
                //         display: 'ALWAYS',
                //         textAlign: 'center'
                //     }
                // },
                // {
                //     iconPath: '/static/image/end.png',
                //     id: 3,
                //     latitude: 23.494994,
                //     longitude: 113.324540,
                //     width: 24,
                //     height: 24,
                //     callout: {
                //         content: '哈萨克斯坦',
                //         color: '#ffffff',
                //         fontSize: 12,
                //         borderRadius: 5,
                //         bgColor: '#e92d27',
                //         padding: 5,
                //         display: 'ALWAYS',
                //         textAlign: 'center'
                //     }
                // }
            ]
            // ,
            // polyline: [{
            //     points: [{
            //         longitude: 113.3245211,
            //         latitude: 23.10229
            //     }, {
            //         longitude: 113.324520,
            //         latitude: 23.21229
            //     }],
            //     color: '#FF0000DD',
            //     width: 2,
            //     dottedLine: true
            // }]
            // ,
            // controls: [{
            //     id: 1,
            //     iconPath: '/static/image/location.png',
            //     position: {
            //         left: 0,
            //         top: 300 - 50,
            //         width: 50,
            //         height: 50
            //     },
            //     clickable: true
            // }]
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
            let newList = this.GPS.map((item, index) => {
                let mapdata = JSON.stringify(_this.mapDataOptions);
                let newData = JSON.parse(mapdata);
                return Object.assign(newData, {
                    id: index,
                    latitude: item.wgLat,
                    longitude: item.wgLon,
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
        this.getMapData();
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
