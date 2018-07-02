import Vue from 'vue';
import Personinfo from './index';

const app = new Vue(Personinfo);
app.$mount();

export default {
    config: {
        navigationBarTitleText: '个人信息'
    }
};
