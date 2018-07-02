import Vue from 'vue';
import Manage from './index';

const app = new Vue(Manage);
app.$mount();

export default {
    config: {
        navigationBarTitleText: '个人中心'
    }
};
