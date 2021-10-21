import axios from 'axios';
function fetchBranchList() {
    return axios.get('/api/theme');
}

function fetchThemeList() {
    return axios.get('/api/theme/get_themes');
}
export {
    fetchBranchList,
    fetchThemeList
}