<template>
    <div>
        
      <!-- <div>
        <a href="/pages/index/main?hellow=123123">跳转页面</a>
        <ul>
            <li v-for="item in dataList" :key="item">{{item}}</li>
        </ul>
      </div> -->
      <!-- <Calendar
        :months="CalendarOptions.months"
        :weeks="CalendarOptions.weeks"
        :value="CalendarOptions.value"
        :begin="CalendarOptions.begin"
        :end="CalendarOptions.end"
        :disabled="CalendarOptions.disabled"
        :events="CalendarOptions.events"
        :lunar="CalendarOptions.lunar"
        :clean="CalendarOptions.clean"
        :range="CalendarOptions.range"
        :multi="CalendarOptions.multi"
        @select="CalendarSelect"
        @setToday="CalendarSetToday"
        @selectYear="CalendarSelectYear"
        @prev="CalendarPrev"
        @next="CalendarNext" /> -->
        <!-- <img src="/static/image/run.jpg" mode="widthFix" /> -->
        <!-- <Calendar
            ref="calendar"
            :months="months"
            :value="value"
            :events="events"
            lunar
            clean
            @next="CalendarNext"
            @prev="CalendarPrev"
            @select="CalendarSelect"
            @setToday="CalendarSetToday"
            @selectMonth="CalendarSelectMonth"
            @selectYear="CalendarSelectYear"
        /> -->
    </div>
</template>

<script>
import Calendar from 'mpvue-calendar';
import config from '../../utils/config.js';
export default {
    data () {
        return {
            hello: 'hello wrodvvvvv',
            dataList: [],
            // CalendarOptions: {
            //     months: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], // 自定义月份，不传默认为中文一到十二月
            //     weeks: [2], // 自定义星期，不传默认为中文日到六
            //     value: [2018, 6, 21], // 默认选中日期
            //     begin: ['2017-01-01'], // 限制开始日期，不传则不限制
            //     end: ['2018-06-01'], // 限制结束日期，不传则不限制
            //     disabled: ['2018-06-02'], // 禁用日期
            //     events: { // 自定义备注
            //         '2018-6-29': 'hello word'
            //     },
            //     lunar: false, // 是否显示农历，默认为false
            //     clean: false, // 是否为简洁模式，简洁模式下自定义备注会显示为圆点，默认为false
            //     range: false, // 是否为范围模式，默认为false
            //     multi: false // 是否为多选模式，默认为false
            // }
            months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
            disabledarr: ['2018-6-27', '2018-6-25'],
            value: [2018, 6, 7],
            begin: [2016, 1, 1],
            end: [2020, 1, 1],
            events: {
                '2018-6-7': '今日备注',
                '2018-6-8': '一条很长的明日备注'
            }
        };
    },
    methods: {
        CalendarSelect (val1, val2) {
            console.log(val1, val2);
        },
        CalendarSetToday (options) {
            console.log(options);
        },
        CalendarSelectYear (val) {
            console.log(val);
        },
        CalendarPrev (val) {
            console.log(val);
        },
        CalendarNext (val) {
            console.log(val);
        },
        async getData () {
            const {app} = config;
            const data1 = [
                await this.$ajax({url: app.hebei}, true),
                await this.$ajax({url: app.hebei}),
                await this.$ajax({url: app.hebei})
            ];
            return data1;
        }
    },
    created () {
        // console.log(this.$root.$mp.query); // 访问小程序页面参数

        const _this = this;
        this.getData().then(res => {
            console.log(res);
            _this.dataList = res;
        });
    },
    components: {
        Calendar
    }

};
</script>

<style lang="css">
</style>
