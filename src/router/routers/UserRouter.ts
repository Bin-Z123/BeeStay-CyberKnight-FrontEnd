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
        {
            path: "roomdetail",
            name: "roomdetail",
            component: () => import("../../pages/user/roomDetail/RoomDetail.vue"),
        },
        {
            path: "about",
            name: "about",
            component: () => import("../../pages/user/about/AboutPages.vue"),
        },
        {
            path: "roomtype",
            name: "roomtype",
            component: () => import("../../pages/user/room/RoomType.vue"),
        },
        {
            path: "contact",
            name: "contact",
            component: () => import("../../pages/user/contact/ConTact.vue"),
        }
    ],
};

export default userRouter;