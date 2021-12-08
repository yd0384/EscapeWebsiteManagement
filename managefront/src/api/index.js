import axios from 'axios';
function fetchBranchInfo(){
    return axios.get('/api/branch/get_branch_info');
};
function putReservableDate(payload){
    return axios.put('/api/branch/put_reservable_date', payload);
};
function logout(){
    return axios.get('/api/auth/logout');
};
function changeUserPassword(payload){
    return axios.put('/api/auth/change_password', payload);
};
function fetchReservationList(){
    return axios.get('/api/reservation/fetchReservationList');
};
export {
    fetchBranchInfo,
    putReservableDate,
    logout,
    changeUserPassword,
    fetchReservationList,
};