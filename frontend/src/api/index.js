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
    return axios.get('/api/reservation/get_reservations', { params: { date: date }});
}
export {
    fetchBranchList,
    fetchThemeList,
    fetchTimetable,
    fetchReservationList
}