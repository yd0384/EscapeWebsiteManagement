import axios from 'axios';
function fetchBranchList() {
    return axios.get('/api/theme');
}

function fetchThemeList() {
    return axios.get('/api/theme/get_themes');
}
function fetchTimetable() {
    return axios.get('/api/theme/get_timetables');
}
function fetchReservationList(date) {
    return axios.get('/api/reservation/get_reservations', {params: { date: date }});
}
function fetchHeadCountAndCost(tid){
    return axios.get('/api/theme/get_costinfo', {params: { tid: tid }});
}
function getUserIp(){
    return axios.get('/api/reservation/get_user_ip');
}
function createReservation(payload){
    return axios.post('/api/reservation/create_reservation', payload);
}
function getReservationByUser(payload){
    return axios.post('/api/reservation/get_reservation_by_user', payload);
}
function deleteReservation(rid){
    console.log(rid);
    return axios.get('/api/reservation/delete_reservation', {params: { rid: rid }});
}
export {
    fetchBranchList,
    fetchThemeList,
    fetchTimetable,
    fetchReservationList,
    fetchHeadCountAndCost,
    getUserIp,
    createReservation,
    getReservationByUser,
    deleteReservation
}