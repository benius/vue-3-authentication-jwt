import axios from 'axios';
import { LoginUser } from "@/services/model";

// const LOGIN_URL = 'http://localhost/account/visitor/login';
// const REGISTER_URL = 'http://localhost/account/user/';
const LOGIN_URL = 'http://10.7.181.229/account/visitor/login';
const REGISTER_URL = 'http://10.7.181.229/account/user/';

class AuthService {
    login(user: LoginUser) {
        return axios
            .get(LOGIN_URL + '?account=' + user.username + '&password=' + user.password)
            .then(response => {
                if (response.data.data.accessToken) {
                    localStorage.setItem('user', JSON.stringify(response.data.data));
                }
                return response.data.data;
            })
            .catch(error => {
                return error;
            });
    }

    logout() {
        localStorage.removeItem('user');
    }

    register(user: LoginUser) {
        return axios.post(REGISTER_URL, {
            account: user.username,
            password: user.password,
            email: user.email,
            displayName: user.username,
            domainId: 'CDW',
            disable: false
        });
    }
}

export default new AuthService();
