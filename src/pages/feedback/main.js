import Vue from 'vue';
import FeedBack from './index';

const app = new Vue(FeedBack);
app.$mount();

export default {
    config: {
        navigationBarTitleText: '铁路运踪查询历史'
    }
};
