import Vue from 'vue';
import ImmedIate from './index';

const app = new Vue(ImmedIate);

app.$mount();

export default {
    config: {
        navigationBarTitleText: '国内即时运踪'
    }
};
