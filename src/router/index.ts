import { createRouter, createWebHistory, type RouteRecordRaw } from "vue-router";
import authRouter from "../router/routers/AuthRouter";
import administrationRouter from "../router/routers/AdministrationRouter";
import userRouter from "../router/routers/UserRouter";
const routes: RouteRecordRaw[] = [authRouter, administrationRouter, userRouter];
 
const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router;