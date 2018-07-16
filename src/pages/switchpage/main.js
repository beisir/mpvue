import Vue from 'vue';
import SwitchPage from './index';
const app = new Vue(SwitchPage);

app.$mount();
export default {
    config: {
        navigationBarTitleText: '切换账号'
    }
};
