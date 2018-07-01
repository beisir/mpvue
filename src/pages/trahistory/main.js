import Vue from 'vue';
import TroHistory from './index';

const app = new Vue(TroHistory);
app.$mount();

export default {
    config: {
        navigationBarTitleText: '铁路运踪查询历史'
    }
};
