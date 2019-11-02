import Vue from 'vue';
import Vuex from 'vuex';
import test from './modules/test.js';

Vue.use(Vuex);

const state ={
    //个人信息
    userInfo: {
        name: '',
        personcard: '',
        mobile: '',
    },
};
const getters = {};
const mutations = {
    userInfo(state, data) {
        state.userInfo = data;
    },
};
const actions = {
    /**
     * [getUserInfo 获取用户信息]
     * @return {[type]}            [description]
     */
    getUserInfo({commit, state}) {
        return new Promise((resolve, reject) => {
            this.$httpServer.get('/url').then((res) => {
                commit('userInfo',res);
                resolve();
            });
        });
    },
};

export default new Vuex.Store({
    state,
    getters,
    mutations,
    actions,
    modules: {
        test
    },
});