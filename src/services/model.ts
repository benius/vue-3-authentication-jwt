export interface LoginUser {
    username: string,
    password?: string,
    email?: string
}

export interface StoreUser {
    status: StoreUserStatus,
    user?: LoginUser
}

export interface StoreUserStatus {
    loggedIn: boolean
}
