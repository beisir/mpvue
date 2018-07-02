import Vue from 'vue';
import RailTrack from './index';

const app = new Vue(RailTrack);
app.$mount();
export default {
    config: {
        navigationBarTitleText: '铁路运输'
    }
};
