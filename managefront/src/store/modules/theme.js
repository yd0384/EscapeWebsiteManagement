import { fetchThemeList, createTheme } from '../../api';
const state = () => ({
    themeList: []
});
const getters = {
    
};
const mutations =  {
    setThemeList(state, themeList){
        state.themeList = themeList;
    }
};
const actions = {
    fetch_theme_list({commit, rootState}){
        fetchThemeList(rootState.user.user.branch_id)
        .then(res=>{
            commit('setThemeList', JSON.parse(res.data));
        })
        .catch(error=>{
            console.error(error);
        })
    },
    create_theme({commit, rootState}, payload){
        payload.branch_id = rootState.user.user.branch_id;
        return createTheme(payload);
    }
};

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}