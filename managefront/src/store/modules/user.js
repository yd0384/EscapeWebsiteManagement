import { changeUserPassword, logout, fetchL1UserList } from '../../api';
import router from '../../router';
const state = () => ({
    user: null,
    L1UserList: [],
});
const getters = {
    user: (state) => {return state.user;}
};
const mutations =  {
    setUser(state, user) { state.user=user; },
    resetState(state){
        Object.assign(state, getDefaultState());
    },
    setL1UserList(state, L1UserList){
        state.L1UserList=L1UserList;
    }
};
const actions = {
    change_user_password({dispatch, commit}, payload){
        changeUserPassword(payload)
        .then(res=> {
            if(res.data.message){
                alert(res.data.message);
            }
            else{
                alert('비밀번호가 변경되었습니다. 다시 로그인하세요.');
                dispatch('logout');
                router.push({path: '/'});
                router.go();
            }
        })
        .catch(error => {
            console.error(error);
        })
    },
    logout({commit}){
        logout()
        .then(()=>{
            commit('resetState', state);
        })
        .catch((error)=>{
            console.error(error);
        })
    },
    fetch_l1_user_list({commit, state}){
        fetchL1UserList(state.user.branch_id)
        .then(res=>{
            console.log(res.data);
            commit('setL1UserList', JSON.parse(res.data));
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