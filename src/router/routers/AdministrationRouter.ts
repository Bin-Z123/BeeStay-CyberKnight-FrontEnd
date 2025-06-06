import { RouteRecordRaw } from "vue-router";

const administrationRouter: RouteRecordRaw = {
    path: "/",
    name: "admin",
    component: () => import("@/layouts/user/UserLayout.vue")
}

export default administrationRouter;