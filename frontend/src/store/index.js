import Vue from 'vue';
import Vuex from 'vuex';
import theme from './modules/theme';
import reservation from './modules/reservation';

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        theme,
        reservation
    },
});
