import Vue from 'vue';
import Customer from './index';

const app = new Vue(Customer);
app.$mount();
export default {
    config: {
        navigationBarTitleText: '客服中心'
    }
};
