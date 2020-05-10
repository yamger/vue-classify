import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        token: ""

    },
    getters: {
        getToken(state) {
            return state.token;
        }
    },
    mutations: {
        set_token(state, payload) {
            state.token = payload.token;
        }

    },
    actions: {},
    modules: {}
})
