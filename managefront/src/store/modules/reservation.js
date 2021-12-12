import { fetchReservationList, fetchTodayReservationList, fetchCanceledReservationList } from '../../api';

const state = () => ({
    reservations: [],
    todayReservationList: [],
    canceledReservationList: []
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
    }
};

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}