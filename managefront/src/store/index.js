import Vue from 'vue';
import Vuex from 'vuex';
import user from './modules/user';
import branch from './modules/branch';

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        user,
        branch
    },
    strict: true//배포할때빼야됨
});
