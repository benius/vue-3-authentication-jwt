import { createRouter, createWebHistory } from "vue-router";
import home from "./components/Home.vue";
import login from "./components/Login.vue";
import register from "./components/Register.vue";
// lazy-loaded
const profile = () => import("./components/Profile.vue")
const boardAdmin = () => import("./components/BoardAdmin.vue")
const boardModerator = () => import("./components/BoardModerator.vue")
const boardUser = () => import("./components/BoardUser.vue")

const routes = [
    {
        path: "/",
        name: "home",
        component: home,
    },
    {
        path: "/home",
        component: home,
    },
    {
        path: "/login",
        component: login,
    },
    {
        path: "/register",
        component: register,
    },
    {
        path: "/profile",
        name: "profile",
        // lazy-loaded
        component: profile,
    },
    {
        path: "/admin",
        name: "admin",
        // lazy-loaded
        component: boardAdmin,
    },
    {
        path: "/mod",
        name: "moderator",
        // lazy-loaded
        component: boardModerator,
    },
    {
        path: "/user",
        name: "user",
        // lazy-loaded
        component: boardUser,
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach((to, from, next) => {
    const publicPages = ['/login', '/register', '/home'];
    const authRequired = !publicPages.includes(to.path);
    const loggedIn = localStorage.getItem('user');

    // trying to access a restricted page + not logged in
    // redirect to login page
    if (authRequired && !loggedIn) {
        next('/login');
    } else {
        next();
    }
});

export default router;
