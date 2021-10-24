import router from '@/router';
import { fetchBranchList, fetchThemeList, fetchTimetable } from '../../api';
const state = () => ({
    branches: {},
    themes: {},
    timetables: {},
    selected_branch: null,
});

const getters = {
    getThemeView(state) {
        return Object.values(state.themes).filter(theme=>
            theme.branch_id === state.selected_branch
        );
    },
    getThemeName(state) {
        return Object.values(state.themes).filter(theme=>
            theme.id === router.currentRoute.params.items[1]
        )[0].title;
    },
    getBranchName(state, id) {
        return Object.values(state.branches).filter(branch=>
            branch.id === router.currentRoute.params.items[0]
        )[0].name;
    },
    getBranchNameAndReservableDate(state) {
        if(typeof state.branches != 'undefined' && state.selected_branch != null){
            var filtered = Object.values(state.branches).filter(branch=>
                branch.id === state.selected_branch
            )
            if(filtered[0].hasOwnProperty('name') && filtered[0].hasOwnProperty('reservable_date')){
                return [filtered[0].name, filtered[0].reservable_date];
            }
        }
        return ['', -1];
    },
    getTimeTableView(state, getters){
        var tids = getters.getThemeView.map(x=>x.id);
        var timetables = {};
        for(var i in tids){
            timetables[tids[i]]=(Object.values(state.timetables).filter(timetable=>
                timetable.theme_id === tids[i]    
            )); 
        }
        return timetables;
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
    set_timetables(state, timetables){
        state.timetables=timetables;
    }
};
const actions = {
    fetch_branches({ commit }){
        fetchBranchList()
        .then(res => {
            var data = JSON.parse(res.data);
            commit('set_branches', data);
            if(router.currentRoute.params.branch_id){
                commit('select_branch', router.currentRoute.params.branch_id);
            }
            else{
                commit('select_branch', data[0].id);
            }
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
    },
    fetch_timetables({ commit }){
        fetchTimetable()
        .then(res=>{
            commit('set_timetables', JSON.parse(res.data));
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