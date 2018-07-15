import Vue from 'vue';
import App from './App';
import ajax from './utils/http.js';
import UTIL from './utils/util.js';
import {util} from './utils/config.js';
import store from './store/index.js';
Vue.config.productionTip = false;
Vue.prototype.$store = store; // 状态管理，
Vue.prototype.$ajax = ajax; // 服
Vue.prototype.$UTIL = UTIL;
App.mpType = 'app';
const app = new Vue(App);

/**
 * 获取全局 注册信息 手机号 防止在分享出去之后也能从不同入口拿到手机号
 * @param {object} null
 */
const getInfo = async () => {
    try {
        let openid = await UTIL.Login();
        let info = await ajax({
            url: util.login,
            data: {
                openId: openid.openid
            }
        });
        app.$store.commit('phone_num', info.data.phone_num);
        app.$mount();
    } catch (e) {
        app.$mount();
    };
};
getInfo();

export default {
    // 这个字段走 app.json
    config: {
    // 页面前带有 ^ 符号的，会被编译成首页，其他页面可以选填，我们会自动把 webpack entry 里面的入口页面加进去
        'pages': [
            '^pages/index/main', // 首页
            'pages/domestic/main', // 首页2
            'pages/range/main', // 国外全程运踪
            'pages/picker/main',
            'pages/personinfo/main', // 个人信息
            'pages/feedback/main', // 铁路运踪查询历史
            'pages/trahistory/main', // 铁路运踪查询历史
            'pages/lmmediate/main', // 国内即时运踪
            'pages/myaccount/main', // 我的账户
            'pages/recharge/main', // 充值明细
            // 'pages/map/main',
            'pages/customer/main', // 客服中心
            'pages/redenvelopes/main', // 我的红包
            'pages/manage/main'
        ],
        'window': {
            'backgroundTextStyle': 'light',
            'navigationBarBackgroundColor': '#fea200',
            'navigationBarTitleText': '铁路追中',
            'navigationBarTextStyle': 'light'
        },
        'tabBar': {
            'color': '#333',
            'selectedColor': '#fea200',
            'borderStyle': '#e4e4e4',
            'backgroundColor': '#fff',
            'font-size': '22rpx',
            'list': [
                {
                    'pagePath': 'pages/index/main',
                    'text': '国内运踪',
                    'iconPath': '/static/image/run.png',
                    'selectedIconPath': '/static/image/run-cur.png'
                },
                {
                    'pagePath': 'pages/domestic/main',
                    'text': '国外运踪',
                    'iconPath': '/static/image/train.png',
                    'selectedIconPath': '/static/image/train-cur.png'
                },
                {
                    'pagePath': 'pages/customer/main',
                    'text': '客服中心',
                    'iconPath': '/static/image/tel.png',
                    'selectedIconPath': '/static/image/tel-cur.png'
                },
                {
                    'pagePath': 'pages/manage/main',
                    'text': '个人中心',
                    'iconPath': '/static/image/my.png',
                    'selectedIconPath': '/static/image/my-cur.png'
                }
            ]
        },
        'networkTimeout': {
            'request': 1000000,
            'downloadFile': 10000
        },
        'debug': false
    }
};
