import axios from 'axios';
import authHeader from './auth-header';

// const API_URL = 'http://localhost/account/';
const API_URL = 'http://10.7.181.229/account/';

class UserService {
    getPublicContent() {
        return axios.get(API_URL + 'req/findTodo', {headers: authHeader()});
    }

    getUserBoard() {
        let user = JSON.parse(localStorage.getItem('user'));
        if (user && user.id) {
            return axios.get(API_URL + 'user/' + user.id, {headers: authHeader()});
        } else {
            return axios.get(API_URL + 'user/unknown', {headers: authHeader()});
        }
    }

    getModeratorBoard() {
        return axios.get(API_URL + 'mod', {headers: authHeader()});
    }

    getAdminBoard() {
        return axios.get(API_URL + 'admin', {headers: authHeader()});
    }
}

export default new UserService();
