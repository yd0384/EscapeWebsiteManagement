import { fetchReservationList, fetchHeadCountAndCost, getUserIp, getReservationByUser, deleteReservation } from '../../api';
var now = new Date();
const state = () => ({
    reservations: {},
    booker_reservations: [{len:0}],
    date: new Date(now.getFullYear(), now.getMonth(), now.getDate()),
    cost_info: {},
    user_ip: ''
});

const getters = {
    getReservationByTheme(state, getters, rootState, rootGetters) {
        var tids = rootGetters['theme/getThemeView'].map(x=>x.id);
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
    },
    set_userip(state, user_ip){
        state.user_ip=user_ip;
    },
    set_booker_reservations(state, booker_reservations){
        state.booker_reservations=booker_reservations;
    },
    delete_reservation(state, reservation_id){
        for(var idx in state.booker_reservations){
            if(state.booker_reservations[idx].id === reservation_id){
                state.booker_reservations.splice(idx,1);
            }
        }
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
    },
    getUserIP({ commit }){
        getUserIp()
        .then(res=>{
            console.log(res.data);
            commit('set_userip', res.data);
        })
        .catch(error => {
            console.error(error);
        })
    },
    async fetch_reservations_of_booker({ commit }, payload){
        let res = await getReservationByUser(payload);
        if(res.data==='empty'){
            return 'empty';
        }
        commit('set_booker_reservations', await JSON.parse(res.data));
    },
    delete_reservation_of_booker({ commit }, id){
        deleteReservation(id)
        .then(res => {
            if(res.data=='success'){
                commit('delete_reservation', id);
                return "success";
            }
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