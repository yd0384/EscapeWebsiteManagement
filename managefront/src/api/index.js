import axios from 'axios';
function fetchBranchInfo(){
    return axios.get('/api/branch/get_branch_info');
}
export {
    fetchBranchInfo,
};