const state = () => ({
    user: null,
});
const getters = {
    user: (state) => {return state.user;}
};
const mutations =  {
    setUser(state, user) { state.user=user; },
};
const actions = {
};

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}