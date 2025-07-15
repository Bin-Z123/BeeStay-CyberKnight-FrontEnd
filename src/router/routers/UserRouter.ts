import { title } from "process";
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
            meta: {
                title: "Trang chủ",
            }
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
        },
        {
            path: "setting",
            name: "setting",
            component: () => import("../../layouts/user/UserLayoutSetting.vue"),
            children: [
                {
                    path: "profile",
                    name: "profile",
                    component: () => import("../../pages/user/usersetting/Profile.vue"),
                },
                {
                    path: "historybooking",
                    name: "historybooking",
                    component: () => import("../../pages/user/usersetting/HistoryBooking.vue"),
                },
                {
                    path: "point",
                    name: "point",
                    component: () => import("../../pages/user/usersetting/Point.vue"),
                }
            ]
        }
    ],
};

export default userRouter;