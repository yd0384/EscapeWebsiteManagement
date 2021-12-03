import { fetchBranchInfo } from '../../api';

const state = () => ({
    branches: [],
});
const getters = {
    getBranchInfo(state, getters, rootState) {
        return Object.values(state.branches).filter(branch=>
            branch.id === rootState.user.user.branch_id
        )[0];
    },
};
const mutations =  {
    setBranches(state, branches) { state.branches=branches; }
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
    }
};

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}