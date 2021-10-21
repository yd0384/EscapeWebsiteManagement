import { fetchBranchList, fetchThemeList } from '../../api';
const state = () => ({
    branches: {},
    themes: {},
    selected_branch: null,
});

const getters = {
    getThemeView(state) {
        return Object.values(state.themes).filter(theme=>
            theme.branch_id === state.selected_branch
        );
    },
    getBranchName(state) {
        if(typeof state.branches != 'undefined' && state.selected_branch != null){
            var filtered = Object.values(state.branches).filter(branch=>
                branch.id === state.selected_branch
            )
            if(filtered[0].hasOwnProperty('name')){
                return filtered[0].name;
            }
        }
        return '';
    }
};
const mutations = {
    select_branch(state, id){
        state.selected_branch=id;
    },
    set_branches(state, branches){
        state.branches=branches;
    },
    set_themes(state, themes){
        state.themes=themes;
    },
};
const actions = {
    fetch_branches({ commit }){
        fetchBranchList()
        .then(res => {
            var data = JSON.parse(res.data);
            commit('set_branches', data);
            commit('select_branch', data[0].id);
        })
        .catch(error => {
            console.error(error);
        })
    },
    fetch_themes({ commit }){
        fetchThemeList()
        .then(res => {
            commit('set_themes', JSON.parse(res.data));
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
};