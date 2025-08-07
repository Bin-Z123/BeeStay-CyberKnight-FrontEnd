import { title } from "process";
import { RouteRecordRaw } from "vue-router";

const userRouter: RouteRecordRaw = {
    path: "/user",
    name: "user",
    component: () => import("../../layouts/user/UserLayout.vue"),
    children: [
        {
            path: "payment-success",
            name: "payment-success",
            component: () => import("../../pages/pay/success.vue"),
            meta: {
                title: "Thanh toán thành công",
                redirectPath: '/user/home'
            }
        }, {
            path: "payment-failed",
            name: "payment-failed",
            component: () => import("../../pages/pay/failed.vue"),
            meta: {
                title: "Thanh toán thất bại",
                redirectPath: '/user/home'
            }
        },

        {
            path: "home",
            name: "home",
            component: () => import("../../pages/user/home/HomePages.vue"),
            meta: {
                title: "Trang chủ",
            }
        },
        {
            path: "gsap",
            name: "gsap",
            component: () => import("../../pages/user/TestGsap.vue"),
            meta: {
                title: "GSAP",
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
            path: "booking/:id",
            name: "booking-payment",
            component: () => import("../../pages/user/PaymentBooking.vue"),
            props: true,
            meta: {
                title: "Chi tiết đặt phòng"
            }
        },
        {
            path: "booking-details/:id",
            name: "booking-detail",
            component: () => import("../../pages/user/booking/BookingDetail.vue"),
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
                },
                {
                    path: "historypayment",
                    name: "historypayment",
                    component: () => import("../../pages/user/usersetting/HistoryPayment.vue"),
                },
                {
                    path: "refund/:id",
                    name: "refund",
                    component: () => import("../../pages/user/usersetting/RefundPayment.vue"),
                },
                {
                    path: "notification",
                    name: "notification",
                    component: () => import("../../pages/user/usersetting/NotificationUser.vue"),
                }
            ]
        }
    ],
};

export default userRouter;