import { createRouter, createWebHistory, type RouteRecordRaw } from "vue-router";
import authRouter from "../router/routers/AuthRouter";
import administrationRouter from "../router/routers/AdministrationRouter";
import userRouter from "../router/routers/UserRouter";
import { useAuthStore } from "../stores/auth/login";
import { toast } from "vue-sonner";
const routes: RouteRecordRaw[] = [authRouter, administrationRouter, userRouter,
    {
        path: "/:pathMatch(.*)*",
        name: "not-found",
        component: () => import("../pages/error/error.vue")
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
            return next("/auth/login");
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