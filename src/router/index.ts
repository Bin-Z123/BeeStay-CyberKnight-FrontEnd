import { createRouter, createWebHistory, type RouteRecordRaw } from "vue-router";
import authRouter from "@/router/routers/AuthRouter";
import administrationRouter from "../router/routers/AdministrationRouter";
const routes: RouteRecordRaw[] = [authRouter, administrationRouter];
 
const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router;