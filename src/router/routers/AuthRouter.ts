import { RouteRecordRaw } from "vue-router";

const authRouter: RouteRecordRaw = {
    path: '/auth',
    name: 'auth',
    component: () => import('../../layouts/auth/AuthLayout.vue'),
    children: [
        {
            path: 'login',
            name: 'login',
            component: () => import('../../pages/auth/LoginPage.vue')
        },
        {
            path: 'register',
            name: 'register',
            component: () => import('../../pages/auth/RegisterPages.vue')
        }
    ]
    
}

export default authRouter;