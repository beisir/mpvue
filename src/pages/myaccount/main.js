import Vue from 'vue';
import MyAccount from './index';

const app = new Vue(MyAccount);
app.$mount();

export default {
    config: {
        navigationBarTitleText: '我的账户'
    }
};
