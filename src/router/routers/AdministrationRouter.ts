import { title } from "process";
import { RouteRecordRaw } from "vue-router";

const administrationRouter: RouteRecordRaw = {
    path: "/administration",
    name: "administration",
    component: () => import("../../layouts/administration/AdministrationLayout.vue"),
    children: [
        {
            path: "dashboard",
            name: "dashboard",
            component: () => import("../../pages/administrantion/DashBoardPage.vue")
        },
        // ADMIN
        {
            path: "logs",
            name: "logs",
            component: () => import("../../pages/administrantion/admin/ManageLogsPage.vue")
        },

        // Manger

        {
            path: "roomtypes",
            name: "roomtypes",
            component: () => import("../../pages/administrantion/manager/ManageRoomTypesPage.vue")
        },
        {
            path: "rooms",
            name: "rooms",
            component: () => import("../../pages/administrantion/manager/ManagerRoomsPage.vue")
        },
        {
            path: "bookingmanager",
            name: "bookingmanager",
            component: () => import("../../pages/administrantion/manager/ManagerBookingPage.vue"),
            meta: {
                title: "Quản lý đặt phòng"
            }
        },
        {
            path: "bookingmanager/:id",
            name: "booking-detail",
            component: () => import("../../pages/administrantion/manager/BookingDetailPage.vue"),
            props: true,
            meta: {
                title: "Chi tiết đặt phòng"
            }
        },
        {
            path: "statistics",
            name: "statistics",
            component: () => import("../../pages/administrantion/manager/ManagerStatisticsPage.vue")
        },
        {
            path: "users",
            name: "users",
            component: () => import("../../pages/administrantion/manager/ManagerUsersPage.vue")
        },
        {
            path: "receptionist",
            name: "receptionist",
            component: () => import("../../pages/administrantion/manager/ManagerReceptionistPage.vue")
        },
        {
            path: "promotions",
            name: "promotions",
            component: () => import("../../pages/administrantion/manager/ManagerPromotionPage.vue")
        },
        {
            path: "notification",
            name: "notification",
            component: () => import("../../pages/administrantion/manager/ManagerNotificationPage.vue")
        },
        {
            path: "facilities",
            name: "facilities",
            component: () => import("../../pages/administrantion/manager/ManagerFacilitiesPage.vue")
        },

        // Receptionist
        {
            path: "bookings",
            name: "bookings",
            component: () => import("../../pages/administrantion/receptionist/BookingsPage.vue")
        },
        {
            path: "listbooking",
            name: "listbooking",
            component: () => import("../../pages/administrantion/receptionist/ListBookingPage.vue")
        },
    ]
}

export default administrationRouter;