import Vue from 'vue';
import Domestic from './index.vue';

const app = new Vue(Domestic);
app.$mount();
export default {
    config: {
        navigationBarTitleText: '国内运踪'
    }
};
