import router from '@/router';
import { fetchReservationList } from '../../api';
var now = new Date();
const state = () => ({
    reservations: {},
    date: new Date(now.getFullYear(), now.getMonth(), now.getDate())
});

const getters = {
    getReservationByTheme(state) {
        var tids = rootGetters.getThemeView.map(x=>x.id);
        var reservations = {};
        for(var i in tids){
            reservations[tids[i]]=Object.values(state.reservations).filter(reservation => 
                reservation.theme_id === tids[i]
            );
        }
        return reservations;
    },
};
const mutations = {
    set_reservations(state, reservations){
        state.reservations=reservations;
    },
    set_date(state, date){
        state.date=date;
    }
};
const actions = {
    fetch_reservations({ commit }, date){
        fetchReservationList(date)
        .then(res => {
            commit('set_reservations', JSON.parse(res.data));
        })
        .catch(error => {
            console.error(error);
        })
    }
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
};