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

        // Receptionist
        {
            path: "bookings",
            name: "bookings",
            component: () => import("../../pages/administrantion/receptionist/BookingsPage.vue")
        }
    ]
}

export default administrationRouter;