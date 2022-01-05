import AuthService from '../services/auth.service';
import { ActionContext, Store } from "vuex";
import { LoginUser, StoreUser } from "@/services/model";

// @ts-ignore
const user = JSON.parse(localStorage.getItem('user'));
const initialState = user
    ? {status: {loggedIn: true}, user}
    : {status: {loggedIn: false}, user: null};

export const auth = {
    namespaced: true,
    state: initialState,
    actions: {
        login({commit}: ActionContext<any, any>, user: LoginUser) {
            return AuthService.login(user).then(
                user => {
                    commit('loginSuccess', user);
                    return Promise.resolve(user);
                },
                error => {
                    commit('loginFailure');
                    return Promise.reject(error);
                }
            );
        },
        logout({commit}: ActionContext<any, any>) {
            AuthService.logout();
            commit('logout');
        },
        register({commit}: ActionContext<any, any>, user: LoginUser) {
            return AuthService.register(user).then(
                response => {
                    commit('registerSuccess');
                    return Promise.resolve(response.data);
                },
                error => {
                    commit('registerFailure');
                    return Promise.reject(error);
                }
            );
        }
    },
    mutations: {
        loginSuccess(state: StoreUser, user: LoginUser) {
            state.status.loggedIn = true;
            state.user = user;
        },
        loginFailure(state: StoreUser) {
            state.status.loggedIn = false;
            state.user = undefined;
        },
        logout(state: StoreUser) {
            state.status.loggedIn = false;
            state.user = undefined;
        },
        registerSuccess(state: StoreUser) {
            state.status.loggedIn = false;
        },
        registerFailure(state: StoreUser) {
            state.status.loggedIn = false;
        }
    }
};
