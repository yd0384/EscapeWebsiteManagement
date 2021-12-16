import { fetchThemeList, createTheme, fetchThemeInfo, updateTheme, deleteTheme } from '../../api';
const state = () => ({
    themeList: [],
    themeInfo: null,
});
const getters = {
    
};
const mutations =  {
    setThemeList(state, themeList){
        state.themeList = themeList;
    },
    setThemeInfo(state, themeInfo){
        state.themeInfo = themeInfo;
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
    fetch_theme_info({commit}, tid){
        fetchThemeInfo(tid)
        .then(res=>{
            commit('setThemeInfo', JSON.parse(res.data));
        }) 
        .catch(error=>{
            console.error(error);
        })
    },
    create_theme({commit, rootState}, payload){
        payload.branch_id = rootState.user.user.branch_id;
        return createTheme(payload);
    },
    update_theme({commit}, payload){
        return updateTheme(payload);
    },
    delete_theme({commit}, tid){
        return deleteTheme(tid);
    }
};

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}