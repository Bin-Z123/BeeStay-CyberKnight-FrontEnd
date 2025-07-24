<template>
    <section class="">
        <div class="flex ">
            <div class="w-2/3 ">
                <div class="flex gap-2 items-center">
                    <VueDatePicker v-model="date" range multi-calendars :format-locale="vi"
                        :format="customFormatDatePicker" :select-text="'Chọn'" :cancel-text="'Hủy'"
                        class="w-78 h-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-muesli-200 mb-3 shadow-sm shadow-muesli-300 my-3 ms-4 ">
                        <template #day="{ date, day }">
                            <div :class="isToday(date) ? 'bg-green-500 text-white w-full h-full rounded-2xl' : ''">
                                {{ day }}
                            </div>
                        </template>
                    </VueDatePicker>
                    <Button @click="selectToday"
                        class=" me-4 h-10  bg-white text-muesli-400 border border-muesli-400 hover:bg-muesli-400 hover:text-white my-3">Hôm
                        nay</Button>

                    <div class="relative w-2/8">
                        <select v-model="selectedStatus"
                            class="appearance-none w-full h-10 px-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-muesli-200 mb-3 shadow-sm shadow-muesli-300 my-3 text-start">
                            <option value="">Tất cả </option>
                            <option value="CONFIRMED">Chờ nhận phòng</option>
                            <option value="CHECKOUT">Đã trả phòng</option>
                            <option value="STAY">Đang ở</option>
                            <option value="PAID">Đã thanh toán</option>
                            <option value="PENDING">Chờ thanh toán</option>
                            <option value="CANCEL">Đã Hủy</option>
                            <option value="LATE">Giữ phòng</option>
                        </select>
                        <div class="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                            <ChevronDown class="w-5 h-5 text-gray-400" />
                        </div>
                    </div>
                    <input type="text" v-model="searchInput"
                        class="w-2/8 h-10 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-muesli-200 mb-3 shadow-sm shadow-muesli-300 my-3 text-center"
                        placeholder="Tìm kiếm">

                </div>
            </div>

            <div class="w-1/3">
                <div class="flex justify-end px-4">
                    <!-- Btn bật dialog -->
                    <Button @click="isOpenBooking = true"
                        class="bg-white text-muesli-400 border border-muesli-400 hover:bg-muesli-400 hover:text-white px-4 my-3">
                        Ở ngay
                    </Button>
                    <Button @click="isOpenPendingBooking = true"
                        class="bg-white text-muesli-400 border border-muesli-400 hover:bg-muesli-400 hover:text-white px-4 my-3">
                        Đặt trước
                    </Button>
                </div>
            </div>
        </div>

        <div class="shadow-lg px-4 pb-4 h-[622px]">
            <table class="w-full border border-gray-300 text-sm text-center bg-white">
                <thead class="bg-gradient-to-r from-muesli-200 to-muesli-400 text-white">
                    <tr>
                        <th class="px-4 py-2 border">Khách Hàng</th>
                        <th class="px-4 py-2 border">SĐT</th>
                        <th class="px-4 py-2 border">Email</th>
                        <th class="px-4 py-2 border">Ngày Đến</th>
                        <th class="px-4 py-2 border">Ngày Đi</th>
                        <th class="px-4 py-2 border">Tổng Tiền</th>
                        <th class="px-4 py-2 border">Trạng Thái</th>
                        <th class="px-4 py-2 border">Tùy Chọn</th>
                    </tr>
                </thead>
                <tbody class="text-gray-700">
                    <tr class="hover:bg-muesli-100 focus:bg-muesli-200 transition odd:bg-white even:bg-gray-100"
                        tabindex="0" v-for="booking in paginatedRoomTypes" :key="booking.id"
                        @contextmenu.prevent="openContextMenu($event, booking)">
                        <td class="py-2">{{ booking.user?.fullname || booking.guestBooking.fullname + ' (Guest)' }}</td>
                        <td class="py-2">{{ booking.user?.phone || booking.guestBooking.phone }}</td>
                        <td class="py-2">{{ booking.user?.email || booking.guestBooking.email }}</td>
                        <td class="py-2">{{ formatDateWithTimeToUI(booking.checkInDate) }}</td>
                        <td class="py-2">{{ formatDateWithTimeToUI(booking.checkOutDate) }}</td>
                        <!-- <td class="py-2">{{ booking.user?.email || booking.guestBooking.email }}</td>
                        <td class="py-2">{{ booking.user?.phone || booking.guestBooking.phone }}</td> -->
                        <td class="py-2">{{ booking.totalAmount }}</td>
                        <td class="py-2" :class="booking.bookingStatus == 'CONFIRMED' ? 'text-green-500'
                            : booking.bookingStatus === 'STAY'
                                ? 'text-blue-500'
                                : booking.bookingStatus === 'LATE' ? 'text-yellow-500'
                                    : 'text-red-500'">
                            {{
                                booking.bookingStatus === 'CONFIRMED'
                                    ? 'Chờ Nhận Phòng'
                                    : booking.bookingStatus === 'PENDING'
                                        ? 'Chờ Thanh Toán'
                                        : booking.bookingStatus === 'CANCEL'
                                            ? 'Đã Hủy'
                                            : booking.bookingStatus === 'STAY'
                                                ? 'Đang Ở'
                                                : booking.bookingStatus === 'CHECKOUT'
                                                    ? 'Đã Trả Phòng'
                                                    : booking.bookingStatus === 'PAID'
                                                        ? 'Đã Thanh Toán'
                                                        : booking.bookingStatus === 'LATE'
                                                            ? 'Giữ phòng'
                                                            : 'Chưa Nhận Phòng' }}</td>
                        <td class="py-2 flex justify-center items-center gap-5 h-full">
                            <button
                                class="bg-white text-muesli-400 border border-muesli-400 hover:bg-muesli-400 hover:text-white py-[9px] px-3 rounded-lg">
                                <LockKeyhole class="w-4 h-4" />
                            </button>
                            <Button
                                class="bg-white text-muesli-400 border border-muesli-400 hover:bg-muesli-400 hover:text-white">
                                <SquarePen />
                            </Button>
                        </td>
                    </tr>
                </tbody>
            </table>
            <div class="bg-white h-15 mb-4 shadow-lg flex items-center justify-end gap-2 px-5">
                <input type="text" class="w-12 h-8 border border-gray-300 rounded-sm text-center" disabled
                    :value="currentPage" /><span>of {{ totalPages }}</span>
                <button @click="currentPage--" :disabled="currentPage == 1"
                    class="hover:bg-muesli-100 w-10 h-10 flex items-center justify-center rounded-4xl">
                    <ChevronLeft />
                </button>
                <button @click="currentPage++" :disabled="currentPage == totalPages"
                    class="hover:bg-muesli-100 w-10 h-10 flex items-center justify-center rounded-4xl">
                    <ChevronRight />
                </button>
            </div>
        </div>
        <!-- Menu Context -->
        <div v-if="menu.isOpen" class="absolute bg-white border rounded-xs shadow-md z-50 w-48 "
            :style="{ top: menu.y + 'px', left: menu.x + 'px' }">
            <p class="bg-muesli-100/50 px-4 py-2 font-bold text-muesli-400">Khách: {{ menu.data.guestBooking?.fullname
                ||
                menu.data.user?.fullname }}
            </p>
            <div v-if="menu.data.bookingStatus == 'CONFIRMED'">
                <button @click="isOpenConfirmBooking = true" class="w-full text-left px-4 py-2 hover:bg-gray-100">Xác
                    nhận đặt
                    phòng</button>


                <hr>
                <button class="w-full  text-left px-4 py-2 hover:bg-gray-100">
                    Hủy phòng
                </button>
            </div>
            <div v-if="menu.data.bookingStatus == 'STAY'">
                <button class="w-full text-left px-4 py-2 hover:bg-gray-100" @click="openTabBooking(menu.data.id)">Trả
                    phòng</button>
                <button class="w-full text-left px-4 py-2 hover:bg-gray-100" @click="openAlert = true">Trả
                    phòng bây giờ </button>
            </div>
            <div v-if="menu.data.bookingStatus == 'PENDING'">
                <button class="w-full text-left px-4 py-2 hover:bg-gray-100" @click="openTabBooking(menu.data.id)">
                    Thanh Toán </button>
            </div>
            <div v-if="menu.data.bookingStatus == 'NOSHOW'">
                <button class="w-full text-left px-4 py-2 hover:bg-gray-100">Gia hạn ngày đến</button>
                <hr>
                <button class="w-full  text-left px-4 py-2 hover:bg-gray-100">
                    Hủy phòng
                </button>
            </div>
        </div>

    </section>
    <AsyncConfirmBookingDialog v-if="isOpenConfirmBooking" v-model:open="isOpenConfirmBooking" :Booking="menu.data"
        @update:open="handleDialogUpdate" ref="editDialogRef">
    </AsyncConfirmBookingDialog>
    <AsyncNewBookingDialog v-model:open="isOpenBooking"></AsyncNewBookingDialog>
    <AsyncPendingBookingDialog v-model:open="isOpenPendingBooking"></AsyncPendingBookingDialog>
    <AsyncAlertDialog v-model:open="openAlert" :IdBooking="menu.data.id"></AsyncAlertDialog>
</template>
<script setup lang="ts">
import {
    ChevronDown,
    SquarePen,
    LockKeyhole,
    ChevronLeft,
    ChevronRight,
} from "lucide-vue-next";
import { ref, onMounted, computed, reactive, defineAsyncComponent, Component, Ref, defineComponent } from "vue";
import { Button } from "@/components/ui/button";
import { Bookings } from "@/api/booking";
import { formatDateWithTimeToUI, customFormatDatePicker } from "@/utils";
import { id, vi } from 'date-fns/locale';
import { useRouter } from "vue-router";
import NewBookingDialog from "@/components/administration/BookingDialog/NewBookingDialog.vue";
import ConfirmBookingDialog from "@/components/administration/BookingDialog/ConfirmBookingDialog.vue";
import LoadingSpinner from "@/components/common/LoadingSpinner.vue";
import ErrorDisplay from "@/components/common/ErrorDisplay.vue";
import {
    Booking,
    BookingResponse,
    BookingStatus,
    BlacklistStatus
} from "@/interface/booking.interface";

import { resolve } from "path";
import { set } from "lodash";

const router = useRouter();
const AsyncConfirmBookingDialog = defineAsyncComponent({
    loader: () => import("@/components/administration/BookingDialog/ConfirmBookingDialog.vue"),
})
const AsyncAlertDialog = defineAsyncComponent({
    loader: () => import("@/components/administration/BookingDialog/AlertDialog.vue"),
})
const AsyncPendingBookingDialog = defineAsyncComponent({
    loader: () => import("@/components/administration/BookingDialog/PendingBookingDialog.vue")
})
const AsyncNewBookingDialog = defineAsyncComponent({
    loader: () => import("@/components/administration/BookingDialog/NewBookingDialog.vue"),
    //  loader: (): Promise<Component> => {
    //     return new Promise(resolve => {
    //         setTimeout(() => {
    //             resolve(import("@/components/administration/BookingDialog/NewBookingDialog.vue"));
    //         }, 4000)
    //     })
    // },
    // loadingComponent: LoadingSpinner,
    // delay: 200,
    // errorComponent: ErrorDisplay,
    // timeout: 3000
})
const editDialogRef: Ref<any> = ref(null);
const handleDialogUpdate = () => {
    if (editDialogRef.value) {
        editDialogRef.value?.reloadDataRoomType();
        console.log("Dialog closed, data reloaded");
    }

}


const bookings = Bookings();
const isOpenBooking = ref(false);
const isOpenConfirmBooking = ref(false);
const isOpenPendingBooking = ref(false);
const openAlert = ref(false);

const currentPage = ref(1);
const pageSize = ref(10);
const totalPages = computed(() => {
    return Math.ceil(filteredBookings.value.length / pageSize.value);
});
const paginatedRoomTypes = computed(() => {
    const startIndex = (currentPage.value - 1) * pageSize.value;
    const endIndex = startIndex + pageSize.value;
    return fillterselectedStatus.value.slice(startIndex, endIndex);
});
// Sort theo ngày mới nhất
const sortedBookings = ref<Booking[]>([]);
onMounted(async () => {
    await bookings.getBookings();
    sortedBookings.value = [...bookings.bookings]
        .filter(b => b.bookingStatus !== 'X')
        .sort((a, b) => new Date(b.bookingDate).getTime() - new Date(a.bookingDate).getTime());

    // const startDate = new Date();
    // const endDate = new Date(new Date().setDate(startDate.getDate() + 30));
    // date.value = [startDate, endDate];
});

//Search booking
const searchInput = ref('');
const filteredBookings = computed(() => {
    const keyword = searchInput.value.trim().toLowerCase();
    if (!keyword) return fillteredBookingsByDate.value;

    return fillteredBookingsByDate.value.filter(b => {
        const user = b.user
        const guest = b.guestBooking

        const userMatch = b.user &&
            (user.phone.toLowerCase().includes(keyword) ||
                user.email.toLowerCase().includes(keyword) ||
                user.fullname?.toLowerCase().includes(keyword));

        const guestMatch = b.guestBooking &&
            (guest.phone.toLowerCase().includes(keyword) ||
                guest.email.toLowerCase().includes(keyword) ||
                guest.fullname?.toLowerCase().includes(keyword));

        return userMatch || guestMatch;
    })
})
//Lọc ngày checkin-out
const date = ref();
const isToday = (d: Date) => {
    const t = new Date();
    return d.getDate() === t.getDate() &&
        d.getMonth() === t.getMonth() &&
        d.getFullYear() === t.getFullYear();
}
const selectToday = () => {
    const sDate = new Date();
    sDate.setHours(0, 0, 0, 0);
    const eDate = new Date(new Date().setDate(sDate.getDate() + 1));
    eDate.setHours(23, 59, 59, 0);
    date.value = [sDate, eDate];
}

const fillteredBookingsByDate = computed(() => {
    if (!date.value || !date.value[1]) return sortedBookings.value;

    const [start, end] = date.value;
    return sortedBookings.value.filter(b => {
        return new Date(b.checkInDate) >= start && new Date(b.checkInDate) <= end
    })
})


// Lọc theo trạng thái
const selectedStatus = ref('')
const fillterselectedStatus = computed(() => {
    if (selectedStatus.value === '') return filteredBookings.value
    return filteredBookings.value.filter(b => b.bookingStatus === selectedStatus.value)
})

// Mở Menu context
const menu = reactive({
    x: 0,
    y: 0,
    isOpen: false,
    data: {} as Booking,
});

const openContextMenu = (e: MouseEvent, i: Booking) => {
    const pageRect = document.body.getBoundingClientRect();
    menu.x = e.clientX - pageRect.left;
    menu.y = e.clientY - pageRect.top;
    e.preventDefault();
    menu.isOpen = true;
    menu.data = i;
};
window.addEventListener("click", () => {
    menu.isOpen = false;
});

const openTabBooking = (id: number) => {
    const routerData = router.resolve({
        name: 'booking-detail',
        params: { id: id }
    })
    window.open(routerData.href, '_blank');
}



</script>