import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        phone_num: ''
    },
    mutations: {
        phone_num (state, res) {
            state.phone_num = res;
        }
    }
});
