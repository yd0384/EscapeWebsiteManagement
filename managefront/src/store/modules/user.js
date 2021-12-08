import { changeUserPassword, logout } from '../../api';
import router from '../../router';
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
            commit('setUser', null);
        })
        .catch((error)=>{
            console.error(error);
        })
    },
};

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}