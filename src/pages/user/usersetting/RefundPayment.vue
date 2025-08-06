<template>
    <section>
        <div class="ps-4 pt-5 flex flex-col gap-5">
            <div>
                <h1 class="text-2xl font-bold">Yêu Cầu Hoàn Tiền</h1>
                <p class="text-gray-500">Vui lòng cung cấp thông tin đặt phòng muốn hoàn tiền.</p>
            </div>
            <div class="flex justify-center items-center py-40" v-if="!bookingData">
                <RouterLink to="/user/setting/historypayment"
                    class="bg-muesli-400 text-white py-2 px-4 rounded-md hover:bg-muesli-500">Chọn Đặt Phòng Để Hoàn
                    Tiền</RouterLink>
            </div>
            <div class="bg-white rounded-2xl shadow-lg py-5" v-if="bookingData">
                <div class="flex flex-col md:flex-row p-5 gap-5">
                    <div class="w-full md:w-1/2">
                        <h1 class="font-bold text-lg">Thông tin đặt phòng</h1>
                        <div class="bg-gray-50 p-5 my-5 flex flex-col gap-3 rounded-2xl">
                            <h1>Mã đặt phòng <span class="float-end">{{ bookingData.id }}</span></h1>
                            <h1>Loại phòng <span class="float-end text-right">{{ bookingRoomTypes }}</span></h1>
                            <h1>Ngày đặt <span class="float-end">{{ formattedBookingDate }}</span></h1>
                            <h1>Tên khách <span class="float-end">{{ bookingData.user.fullname }}</span></h1>
                        </div>
                    </div>
                    <div class="w-full md:w-1/2">
                        <h1 class="font-bold text-lg">Chi tiết hoàn tiền</h1>
                        <div class="bg-gray-50 p-5 my-5 flex flex-col gap-3 rounded-2xl">
                            <h1>Số tiền đã thanh toán <span class="float-end font-bold">{{
                                formatCurrency(totalAmount) }}</span></h1>
                            <h1>Phí hủy (10%) <span class="float-end text-red-500 font-bold">- {{
                                formatCurrency(cancellationFee) }}</span></h1>
                            <hr>
                            <h1 class="font-bold text-lg">Số tiền được hoàn <span class="float-end">{{
                                formatCurrency(refundAmount) }}</span>
                            </h1>
                        </div>
                    </div>
                </div>
                <div class="px-4">
                    <hr>
                </div>
                <div>
                    <form action="" class="flex flex-col p-5 gap-5">
                        <div class="w-full">
                            <label for="reason">Lý Do Hoàn Tiền</label>
                            <select name="reason" id="reason"
                                class="w-full h-12 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-muesli-200 shadow-sm shadow-muesli-300 mt-1">
                                <option value="" disabled selected>Vui lòng chọn lý do</option>
                                <option value="1">Thay đổi lịch trình</option>
                                <option value="2">Lý do sức khỏe</option>
                                <option value="3">Khác</option>
                            </select>
                        </div>
                        <div class="w-full">
                            <label for="email">Email Liên Hệ</label>
                            <input type="email" id="email" v-model="contactEmail"
                                class="w-full h-12 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-muesli-200 shadow-sm shadow-muesli-300 mt-1"
                                placeholder="Nhập email của bạn">
                        </div>
                        <div class="w-full">
                            <label for="notes">Ghi chú (Không bắt buộc)</label>
                            <textarea name="notes" id="notes"
                                class="w-full p-5 h-32 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-muesli-200 shadow-sm shadow-muesli-300 mt-1"></textarea>
                        </div>
                        <div class="w-full">
                            <button
                                class="bg-muesli-400 text-white py-2 px-4 rounded-md hover:bg-muesli-500 float-end">Gửi
                                Yêu Cầu Hoàn Tiền</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import { ref, onMounted, computed, watch } from 'vue';
import { BookingDetails } from '@/api/bookingdetail';

const bookingDetails = BookingDetails();
const route = useRoute();

const contactEmail = ref('');

const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
};

const bookingData = computed(() => bookingDetails.bookingdetails?.data);

const bookingRoomTypes = computed(() => {
    if (!bookingData.value?.bookingDetails) return 'N/A';
    return bookingData.value.bookingDetails.map(detail => detail.roomType.name).join(', ');
});

const formattedBookingDate = computed(() => {
    if (!bookingData.value?.bookingDate) return 'N/A';
    const date = new Date(bookingData.value.bookingDate);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
});

const totalAmount = computed(() => bookingData.value?.totalAmount || 0);
const cancellationFee = computed(() => totalAmount.value * 0.10);
const refundAmount = computed(() => totalAmount.value - cancellationFee.value);


onMounted(async () => {
    const bookingId = Number(route.params.id);
    if (bookingId) {
        await bookingDetails.fetchBookingDetails(bookingId);
    }
});

watch(bookingData, (newData) => {
    if (newData?.user?.email) {
        contactEmail.value = newData.user.email;
    }
}, { immediate: true });

</script>