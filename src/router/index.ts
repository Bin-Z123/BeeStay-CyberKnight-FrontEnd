import { createRouter, createWebHistory, type RouteRecordRaw } from "vue-router";
import authRouter from "@/router/routers/AuthRouter";
const routes: RouteRecordRaw[] = [authRouter];
 
const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router;