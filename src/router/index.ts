import { createRouter, createWebHistory, type RouteRecordRaw } from "vue-router";
import authRouter from "../router/routers/AuthRouter";
import administrationRouter from "../router/routers/AdministrationRouter";
import userRouter from "../router/routers/UserRouter";
import { useAuthStore } from "../stores/auth/login";
import { toast } from "vue-sonner";
import { time } from "console";
import { title } from "process";
const routes: RouteRecordRaw[] = [authRouter, administrationRouter, userRouter,
    {
        path: "/:pathMatch(.*)*",
        name: "not-found",
        component: () => import("../pages/error/notFoundPage.vue")
    },
    {
        path: "/payment-success",
        name: "success",
        component: () => import("../pages/pay/success.vue"),
        props: true,
        meta: {
            title: "Thanh toán thành công"
        }
    }, {
        path: "/payment-failed",
        name: "failed",
        component: () => import("../pages/pay/failed.vue")
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
})
router.afterEach((to, from) => {
    document.title = (to.meta.title as string) || "BeeStay - CyberKnights";
})

router.beforeEach(async (to, from, next) => {
    const authStore = useAuthStore();
    const requiredRole = to.meta.requiredRole as string | undefined;

    if (!authStore.isAuthenticated) {
        try {
            await authStore.fetchUser();
        } catch (error) {
            toast.error("Vui lòng đăng nhập!");
            return next("/login");
        }
    }

    // const authRoutes = ["/auth/login", "/auth/otp", "/auth/register"];

    // if (authRoutes.includes(to.path) && authStore.isAuthenticated) {
    //     return next("/user/home");
    // }

    if (requiredRole && authStore.user?.role.roleName.toUpperCase() !== requiredRole.toUpperCase()) {
        toast.error("Không có quyền truy cập!");
        return next("/user/home");
    }
    next();
})

export default router;