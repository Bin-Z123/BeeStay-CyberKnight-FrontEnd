<template>
    <section>
        <div class="flex">
            <div class="w-2/3">
                <div class="flex gap-2 items-center">
                    <input type="date"
                        class="w-2/8 h-10 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-muesli-200 mb-3 shadow-sm shadow-muesli-300 my-3 ms-4 text-center">
                    <label class="text-muesli-400 mx-4 font-medium">Đến</label>
                    <input type="date"
                        class="w-2/8 h-10 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-muesli-200 mb-3 shadow-sm shadow-muesli-300 my-3 text-center">
                    <div class="relative w-2/8">
                        <select name="" id=""
                            class="appearance-none w-full h-10 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-muesli-200 mb-3 shadow-sm shadow-muesli-300 my-3 text-center">
                            <option value="">Tất cả </option>
                            <option value="">Thường</option>
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
                        Thêm
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
                    <tr class="hover:bg-muesli-100 transition odd:bg-white even:bg-gray-100"
                        v-for="booking in paginatedRoomTypes" :key="booking.id">
                        <td class="py-2">{{ booking.user?.fullname || booking.guestBooking.fullname + ' (Guest)' }}</td>
                        <td class="py-2">{{ booking.user?.phone || booking.guestBooking.phone }}</td>
                        <td class="py-2">{{ booking.user?.email || booking.guestBooking.email }}</td>
                        <td class="py-2">{{ formatDateWithTimeToUI(booking.checkInDate) }}</td>
                        <td class="py-2">{{ formatDateWithTimeToUI(booking.checkOutDate) }}</td>
                        <!-- <td class="py-2">{{ booking.user?.email || booking.guestBooking.email }}</td>
                        <td class="py-2">{{ booking.user?.phone || booking.guestBooking.phone }}</td> -->
                        <td class="py-2">{{ booking.totalAmount }}</td>
                        <td class="py-2"
                            :class="booking.bookingStatus == 'CONFIRMED' ? 'text-green-500' : 'text-red-500'">{{
                                booking.bookingStatus }}</td>
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
    </section>
</template>
<script setup lang="ts">
import {
    ChevronDown,
    SquarePen,
    LockKeyhole,
    ChevronLeft,
    ChevronRight,
} from "lucide-vue-next";
import { ref, onMounted, computed } from "vue";
import { Button } from "@/components/ui/button";
import { Bookings } from "@/api/booking";
import { formatDateWithTimeToUI } from "@/utils";
import {
    Booking,
    BookingResponse,
    BookingStatus,
    BlacklistStatus
} from "@/interface/booking.interface";

const bookings = Bookings();
const isOpenBooking = ref(false);

const currentPage = ref(1);
const pageSize = ref(10);
const totalPages = computed(() => {
    return Math.ceil(filteredBookings.value.length / pageSize.value);
});
const paginatedRoomTypes = computed(() => {
    const startIndex = (currentPage.value - 1) * pageSize.value;
    const endIndex = startIndex + pageSize.value;
    return filteredBookings.value.slice(startIndex, endIndex);
});
// Sort theo ngày mới nhất
const sortedBookings = ref<Booking[]>([]);
onMounted(async () => {
    await bookings.getBookings();
    sortedBookings.value = [...bookings.bookings].sort((a, b) => new Date(b.bookingDate).getTime() - new Date(a.bookingDate).getTime());
});

//Search booking
const searchInput = ref('');
const filteredBookings = computed(() => {
    const keyword = searchInput.value.trim().toLowerCase();
    if (!keyword) return sortedBookings.value;

    return sortedBookings.value.filter(b => {
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
</script>