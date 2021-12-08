import { fetchBranchInfo, putReservableDate } from '../../api';

const state = () => ({
    branches: [],
});
const getters = {
    getBranchName(state, getters, rootState) {
        if(state.branches.length===0){
            return '로드중'
        }
        return Object.values(state.branches).filter(branch=>
            branch.id === rootState.user.user.branch_id
        )[0].name;
    },
    getBranchReservableDate(state, getters, rootState) {
        if(state.branches.length===0){
            return '로드중'
        }
        return Object.values(state.branches).filter(branch=>
            branch.id === rootState.user.user.branch_id
        )[0].reservable_date;
    }
};
const mutations =  {
    setBranches(state, branches) { 
        state.branches=branches; 
    },
    modifyReservableDate(state, result){
        state.branches[state.branches.findIndex(branch=>branch.id===result.bid)].reservable_date=result.rdate;
    }
};
const actions = {
    fetch_branch_info({ commit }){
        fetchBranchInfo()
        .then(res=>{
            commit('setBranches', JSON.parse(res.data));
        })
        .catch(error => {
            console.error(error);
        })
    },
    change_branch_reservable_date({ commit }, payload){
        putReservableDate(payload)
        .then(res=>{
            if(res.data.message){
                alert(res.data.message);
            }
            else{
                commit('modifyReservableDate', res.data);
            }
        })
        .catch(error => {
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