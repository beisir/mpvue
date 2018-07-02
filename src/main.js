import Vue from 'vue';
import App from './App';
import ajax from './utils/http.js';
Vue.config.productionTip = false;
Vue.prototype.$ajax = ajax;

App.mpType = 'app';

const app = new Vue(App);
app.$mount();

export default {
    // 这个字段走 app.json
    config: {
    // 页面前带有 ^ 符号的，会被编译成首页，其他页面可以选填，我们会自动把 webpack entry 里面的入口页面加进去
        'pages': [
            'pages/customer/main',
            'pages/railtrack/main',
            'pages/range/main',
            'pages/picker/main',
            'pages/manage/main',
            '^pages/recharge/main',
            'pages/personinfo/main',
            'pages/feedback/main',
            'pages/trahistory/main',
            'pages/lmmediate/main',
            'pages/myaccount/main',
            'pages/redenvelopes/main'

        ],
        'window': {
            'backgroundTextStyle': 'light',
            'navigationBarBackgroundColor': '#EA5149',
            'navigationBarTitleText': 'WeChat',
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
                    'pagePath': 'pages/railtrack/main',
                    'text': '国内运踪',
                    'iconPath': '/static/image/plan.png',
                    'selectedIconPath': '/static/image/plan-cur.png'
                },
                {
                    'pagePath': 'pages/lmmediate/main',
                    'text': '国外运踪',
                    'iconPath': '/static/image/run.png',
                    'selectedIconPath': '/static/image/run-cur.png'
                },
                {
                    'pagePath': 'pages/range/main',
                    'text': '客服中心',
                    'iconPath': '/static/image/phone.png',
                    'selectedIconPath': '/static/image/phone-cur.png'
                },
                {
                    'pagePath': 'pages/manage/main',
                    'text': '个人中心',
                    'iconPath': '/static/image/mange.png',
                    'selectedIconPath': '/static/image/mange-cur.png'
                }
            ]
        },
        'networkTimeout': {
            'request': 10000,
            'downloadFile': 10000
        },
        'debug': false
    }
};
