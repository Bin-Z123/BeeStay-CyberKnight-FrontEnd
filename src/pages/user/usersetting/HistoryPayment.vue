<template>
    <section class="ps-4 pt-4 flex flex-col gap-5">
        <div>
            <h1 class="text-2xl font-bold">Lịch sử Giao dịch</h1>
            <p class="text-gray-500">Xem lại tất cả giao dịch gần đây của bạn</p>
        </div>
        <div class="bg-white rounded-2xl shadow-lg pb-4">
            <div>
                <form>
                    <div class="flex gap-4 p-5">
                        <div class="w-full">
                            <input type="text" v-model="bookingid"
                                class="text-center w-full h-12 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-muesli-200 shadow-sm shadow-muesli-300"
                                placeholder="Mã Đặt Phòng">
                        </div>
                        <div class="w-full">
                            <input type="date" v-model="bookingdate"
                                class="text-center w-full h-12 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-muesli-200 shadow-sm shadow-muesli-300">
                        </div>
                        <div class="w-full">
                            <select name="" id="" v-model="bookingstatus"
                                class="text-center w-full h-12 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-muesli-200 shadow-sm shadow-muesli-300">
                                <option value="" selected>Tất cả trạng thái</option>
                                <option value="STAY">Thanh toán</option>
                                <option value="NOTPAID">Chưa thanh toán</option>
                                <option value="PAID">Chờ Thanh Toán</option>
                                <option value="CONFIRMED">Đã Thanh Toán</option>
                            </select>
                        </div>
                    </div>
                </form>
                <div class="px-5">
                    <table class="w-full text-sm" v-if="paginatedUsers.length > 0">
                        <thead>
                            <tr class="bg-gray-200">
                                <th class="text-left p-5">Ngày Giao Dịch</th>
                                <th class="text-left p-5">Mã Đặt Phòng</th>
                                <th class="text-left p-5">Chi Tiết Đặt Phòng</th>
                                <th class="text-left p-5">Thanh toán</th>
                                <!-- <th class="text-left p-5">Trạng thái</th> -->
                                <th class="text-left p-5"></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr class="border-b" v-for="historypayment in paginatedUsers" :key="historypayment.id">
                                <td class="p-5">{{ formatDateWithTimeToUI(historypayment.bookingDate) }}</td>
                                <td class="p-5 text-gray-500">#{{ historypayment.id }}</td>
                                <td class="p-5 w-60">
                                    <h1 v-for="name in historypayment.bookingDetails">{{ name.roomType.name }}</h1>
                                    <p class="text-gray-500 text-[12px]">Ngày Đến: <span>{{ historypayment.checkInDate
                                    }}</span></p>
                                    <p class="text-gray-500 text-[12px]">Ngày Đi: <span>{{ historypayment.checkOutDate
                                    }}</span></p>
                                </td>
                                <td class="p-5 w-30 font-bold" :class="getStatus1(historypayment.bookingStatus)">{{
                                    historypayment.bookingStatus == 'PAID' || historypayment.bookingStatus == 'STAY' ?
                                    '-' + historypayment.totalAmount : '' + historypayment.totalAmount }} VND</td>
                                <!-- <td class="p-5 font-bold text-[12px]" :class="getStatus(historypayment.bookingStatus)">{{ historypayment.bookingStatus }}</td> -->
                                <!-- <td class="p-5"><RouterLink to="" class="text-blue-500 underline">Xem chi tiết</RouterLink></td> -->
                                <td class="p-5"><button @click.prevent="roomDetails(historypayment.id)"
                                        class="text-blue-500 underline">Xem Chi Tiết</button></td>
                            </tr>
                        </tbody>
                    </table>
                    <h1 v-else class="text-center text-gray-500 mt-8">Hiện tại không có lịch sử giao dịch nào.</h1>
                    <div class="bg-white flex items-center justify-end gap-2 px-5 py-2">
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
            </div>
        </div>
    </section>
</template>
<script setup lang="ts">
import { ref, onMounted, computed, watch } from 'vue';
import { Bookings } from '@/api/booking';
import { formatDateWithTimeToUI } from "@/utils";
import { useRouter } from "vue-router";
import {
    ChevronLeft,
    ChevronRight,
} from "lucide-vue-next";

const bookings = Bookings();
const router = useRouter();

const roomDetails = (id: number) => {
    const routerData = router.resolve({
        name: 'booking-detail',
        params: { id: id }
    })
    window.open(routerData.href, '_blank');
}

const getStatus = (status: String) => {
    switch (status) {
        case 'NOTPAID':
            return "text-yellow-500"
        case 'STAY':
            return "text-red-500"
        case 'CONFIRMED':
            return "text-green-500"
        case 'PAID':
            return "text-red-500"
    }
}

const getStatus1 = (status: String) => {
    switch (status) {
        case 'NOTPAID':
            return "text-yellow-500"
        case 'STAY':
            return "text-red-500"
        case 'CONFIRMED':
            return "text-green-500"
        case 'PAID':
            return "text-red-500"
    }
}
const bookingid = ref('');
const bookingdate = ref('');
const bookingstatus = ref('');

// const filterByKey = computed(() => {
//     if (!bookings.bookinghistory) return [];
//     if (bookingid.value == '') return bookings.bookinghistory;
//     return bookings.bookinghistory.filter(b => Number(b.id) == Number(bookingid.value));
// })

// const filterHistoryPayment = computed(() => {
//     if (!filterByKey.value) return [];
//     return filterByKey.value.sort((a, b) => b.id - a.id);
// });

const filterHistoryPayment = computed(() => {
    if (!bookings.bookinghistory) return [];
    if (bookingid.value) {
        return bookings.bookinghistory.filter(b => Number(b.id) == Number(bookingid.value));
    }
    if (bookingdate.value) {
        return bookings.bookinghistory.filter(b => b.bookingDate.split("T")[0] == bookingdate.value);
    }
    if (bookingstatus.value) {
        return bookings.bookinghistory.filter(b => b.bookingStatus == bookingstatus.value);
    }
    return bookings.bookinghistory.sort((a, b) => b.id - a.id);
});

const currentPage = ref(1);
const pageSize = ref(5);
const totalPages = computed(() => {
    return Math.ceil(filterHistoryPayment.value.length / pageSize.value);
});
const paginatedUsers = computed(() => {
    const startIndex = (currentPage.value - 1) * pageSize.value;
    const endIndex = startIndex + pageSize.value;
    return filterHistoryPayment.value.slice(startIndex, endIndex);
});

watch([bookingid.value, bookingdate.value, bookingstatus.value], () => {
    currentPage.value = 1;
})

onMounted(async () => {
    await bookings.bookingHistory();
});
</script>