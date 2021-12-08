import { fetchReservationList } from '../../api';

const state = () => ({
    reservations: [],
});
const getters = {
    
};
const mutations =  {
    setReservations(state, reservations){
        state.reservations = reservations;
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
    }
};

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}