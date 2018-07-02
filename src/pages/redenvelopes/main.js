import Vue from 'vue';
import RedEnvelopes from './index';

const app = new Vue(RedEnvelopes);
app.$mount();

export default {
    config: {
        navigationBarTitleText: '我的红包'
    }
};
