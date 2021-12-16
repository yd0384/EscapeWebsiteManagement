import { fetchReservationList, fetchTodayReservationList, fetchCanceledReservationList, completePlay, noShow, fetchNoshowList, cancelReservation, createReservation } from '../../api';
const state = () => ({
    reservations: [],
    todayReservationList: [],
    canceledReservationList: [],
    noshowList: [],
});
const getters = {

};
const mutations =  {
    setReservations(state, reservations){
        state.reservations = reservations;
    },
    setTodayReservationList(state, todayReservationList){
        state.todayReservationList = todayReservationList;
    },
    setCanceledReservationList(state, canceledReservationList){
        state.canceledReservationList = canceledReservationList;
    },
    setNoshowList(state, noshowList){
        state.noshowList = noshowList;
    }
};
const actions = {
    fetch_reservations({commit, rootState}){
        fetchReservationList(rootState.user.user.branch_id)
        .then(res => {
            commit('setReservations', JSON.parse(res.data));
        })
        .catch(error=>{
            console.error(error);
        })
    },
    fetch_today_reservations({commit}, payload){
        fetchTodayReservationList(payload)
        .then(res=>{
            commit('setTodayReservationList', JSON.parse(res.data));
        })
        .catch(error=>{
            console.error(error);
        })
    },
    fetch_canceled_reservations({commit, rootState}){
        fetchCanceledReservationList(rootState.user.user.branch_id)
        .then(res => {
            commit('setCanceledReservationList', JSON.parse(res.data));
        })
        .catch(error=>{
            console.error(error);
        })
    },
    complete_play({commit}, rid){
        return completePlay(rid);
    },
    cancel_reservation({commit}, payload){
        return cancelReservation(payload);
    },
    no_show({commit}, payload){
        return noShow(payload);
    },
    fetch_noshow_list({commit}){
        fetchNoshowList()
        .then(res=>{
            commit('setNoshowList', JSON.parse(res.data));
        })
        .catch(error=>{
            console.error(error);
        })
    },
    create_reservation({commit}, payload){
        return createReservation(payload);
    }
};

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}