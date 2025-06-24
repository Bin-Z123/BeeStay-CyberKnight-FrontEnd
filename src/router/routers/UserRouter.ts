import { RouteRecordRaw } from "vue-router";

const userRouter: RouteRecordRaw = {
    path: "/user",
    name: "user",
    component: () => import("../../layouts/user/UserLayout.vue"),
    children: [
        {
            path: "home",
            name: "home",
            component: () => import("../../pages/user/home/HomePages.vue"),
        },
    ],
};

export default userRouter;