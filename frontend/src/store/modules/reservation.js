import router from '@/router';
import { fetchReservationList, fetchHeadCountAndCost } from '../../api';
var now = new Date();
const state = () => ({
    reservations: {},
    date: new Date(now.getFullYear(), now.getMonth(), now.getDate()),
    cost_info: {}
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
    getCost(state){
        var arr=[];
        for(var i in state.cost_info){
            arr.push(state.cost_info[i].price);
        } 
        return arr;
    },
    getHeadCounts(state){
        var arr=[];
        for(var i in state.cost_info){
            arr.push({ idx: i, item: state.cost_info[i].number_of_player, name: state.cost_info[i].number_of_player+"명"})
        }
        return arr;
    }
};
const mutations = {
    set_reservations(state, reservations){
        state.reservations=reservations;
    },
    set_date(state, date){
        state.date=date;
    },
    set_costinfo(state, cost_info){
        state.cost_info=cost_info;
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
    },
    fetch_costinfo({ commit }, tid){
        fetchHeadCountAndCost(tid)
        .then(res => {
            commit('set_costinfo', JSON.parse(res.data));
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