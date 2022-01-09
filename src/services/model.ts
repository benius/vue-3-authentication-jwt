import { array } from "yup";

export interface LoginUser {
    accessToken: string,
    id: string,
    username: string,
    password?: string,
    email?: string,
    authorities?: []
}

export interface StoreUser {
    status: StoreUserStatus,
    user?: LoginUser
}

export interface StoreUserStatus {
    loggedIn: boolean
}
