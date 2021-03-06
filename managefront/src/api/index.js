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
function fetchReservationList(bid){
    return axios.get('/api/reservation/fetchReservationList', {params: {bid: bid}});
};
function fetchL1UserList(bid){
    return axios.get('/api/auth/fetchL1UserList', {params: {bid: bid}});
};
function issueRandomPassword(payload){
    return axios.put('/api/auth/issueRandomPassword', payload);
};
function deleteUser(payload){
    return axios.delete('/api/auth/deleteUser', {data: payload});
};
function fetchTodayReservationList(payload){
    return axios.get('/api/reservation/fetchTodayReservationList', {params: {bid: payload.bid, date: payload.date}});
};
function fetchCanceledReservationList(bid){
    return axios.get('/api/reservation/fetchCanceledReservationList', {params: {bid: bid}});
};
function fetchThemeList(bid){
    return axios.get('/api/theme/fetchThemeList', {params: {bid: bid}});
};
function createL1User(payload){
    return axios.post('/api/auth/createL1User', payload);
};
function createTheme(payload){
    return axios.post('/api/theme/createTheme', payload);
};
function fetchThemeInfo(tid){
    return axios.get('/api/theme/fetchThemeInfo', {params: {tid: tid}});
};
function updateTheme(payload){
    return axios.put('/api/theme/updateTheme', payload);
};
function deleteTheme(tid){
    return axios.delete('/api/theme/deleteTheme', {params: {tid: tid}});
};
function completePlay(rid){
    return axios.put('/api/reservation/completePlay', {rid: rid});
};
function noShow(payload){
    return axios.put('/api/reservation/noShow', payload);
};
function fetchNoshowList(){
    return axios.get('/api/reservation/fetchNoshowList');
};
function cancelReservation(payload){
    return axios.delete('/api/reservation/cancelReservation', {data: payload});
};
function createReservation(payload){
    return axios.post('/api/reservation/createReservation', payload);
};
export {
    fetchBranchInfo,
    putReservableDate,
    logout,
    changeUserPassword,
    fetchReservationList,
    fetchL1UserList,
    issueRandomPassword,
    deleteUser,
    fetchTodayReservationList,
    fetchCanceledReservationList,
    fetchThemeList,
    createL1User,
    createTheme,
    fetchThemeInfo,
    updateTheme,
    deleteTheme,
    completePlay,
    noShow,
    fetchNoshowList,
    cancelReservation,
    createReservation
};