import Vue from 'vue';
import Vuex from 'vuex';
import user from './modules/user';
import branch from './modules/branch';
import reservation from './modules/reservation';
Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        user,
        branch,
        reservation
    },
    strict: true//배포할때빼야됨
});
