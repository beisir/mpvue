<template lang="html">
    <div class="map">
        <!-- :longitude="" -->
        <!-- :latitude="23.099994" -->
        <!-- :polyline="polyline" -->
        <!-- :controls="controls" -->
        <map id="map"
            scale="14"
            :longitude="longitude"
            :latitude="latitude"
            :show-location="true"
            :markers="markers"
            @markertap="makertap"
        ></map>
    </div>
</template>

<script>
import bmap from '../libs/bmap-wx.js';
export default {
    props: ['result', 'active'],
    data () {
        return {
            latitude: '',
            longitude: '',
            placeData: {},

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
        makertap: function(e) {
            var that = this;
            var id = e.markerId;
            that.showSearchInfo(wxMarkerData, id);
            that.changeMarkerColor(wxMarkerData, id);
        },
        showSearchInfo: function(data, i) {
            var that = this;
            that.setData({
                placeData: {
                    title: '名称：' + data[i].title + '\n',
                    address: '地址：' + data[i].address + '\n',
                    telephone: '电话：' + data[i].telephone
                }
            });
        },
        changeMarkerColor: function(data, i) {
            var that = this;
            var markers = [];
            for (var j = 0; j < data.length; j++) {
                if (j == i) {
                    // 此处需要在相应路径放置图片文件
                    data[j].iconPath = "../../img/marker_yellow.png";
                } else {
                    // 此处需要在相应路径放置图片文件
                    data[j].iconPath = "../../img/marker_red.png";
                }
                markers[j](data[j]);
            }
            that.setData({
                markers: markers
            });
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
                // return _this.markers = newList;
                return _this.markers = newList;
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
        const _this = this;
        let wxMarkerData;
        // 新建百度地图对象
        var BMap = new bmap({
            ak: '8ITmCGEknm0bdf2xGrN2xZ7lxrCu1PPn'
        });
        // console.log(bmap);
        console.log(BMap);
        var fail = function(data) {
            console.log(data)
        };
        var success = function(data) {
            console.log(data);
            wxMarkerData = data.wxMarkerData;
            _this.markers = wxMarkerData;
            _this.latitude = wxMarkerData[0].latitude;
            _this.longitude = wxMarkerData[0].longitude
        }
        BMap.regeocoding({
            // wxMarkerData: ['49.6249456465,117.3559570313', '49.6249456465,117.3559570313'],
            location: '49.6249456465,117.3559570313',
            fail: fail,
            success: success,
            // 此处需要在相应路径放置图片文件
            iconPath: '../../static/image/location.png',
            // 此处需要在相应路径放置图片文件
            iconTapPath: '../../static/image/location.png'
        });
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
