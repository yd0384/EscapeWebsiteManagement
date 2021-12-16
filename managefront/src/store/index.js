import Vue from 'vue';
import Vuex from 'vuex';
import user from './modules/user';
import branch from './modules/branch';
import reservation from './modules/reservation';
import theme from './modules/theme';
Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        user,
        branch,
        reservation,
        theme
    },
});
