import Vue from 'vue';
import Recharge from './index';

const app = new Vue(Recharge);
app.$mount();

export default {
    config: {
        navigationBarTitleText: '充值明细'
    }
};
