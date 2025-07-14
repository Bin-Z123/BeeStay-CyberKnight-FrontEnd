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
        },
        {
            path: 'forgot-password',
            name: 'forgot-password',
            component: () => import('../../pages/auth/ForgetPassword.vue')
        },
        {
            path: 'otp',
            name: 'otp',
            component: () => import('../../pages/auth/OTPPage.vue')
        }
    ]
    
}

export default authRouter;