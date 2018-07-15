import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        phoneNumber: ''
    },
    getters: {
        phoneNumber (state, phoneNumber) {
            console.log(phoneNumber);
            state.phoneNumber = phoneNumber;
        }
    },
    actions: {
        phoneNumber ({commit}, num) {
            console.log(num);
            commit('phoneNumber', num);
        }
    },
    moutation: {

    }
});
