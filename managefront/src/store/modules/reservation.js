import { fetchReservationList, fetchTodayReservationList } from '../../api';

const state = () => ({
    reservations: [],
    todayReservationList: [],
});
const getters = {
    
};
const mutations =  {
    setReservations(state, reservations){
        state.reservations = reservations;
    },
    setTodayReservationList(state, todayReservationList){
        state.todayReservationList = todayReservationList;
    }
};
const actions = {
    fetch_reservations({commit}){
        fetchReservationList()
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
            console.log(JSON.parse(res.data));
            commit('setTodayReservationList', JSON.parse(res.data));
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