<template>
    <h1>Booking Detail {{ props.id }}</h1>
    <div class="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8 printable-area">
        <div class="bg-white rounded-lg  overflow-hidden ">
            <div class="p-6 sm:p-8">
                <!-- Header: Logo, Title, Booking ID & Status -->
                <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-6 border-b">
                    <div>
                        <h1 class="text-2xl font-bold text-gray-800">Xác Nhận Đặt Phòng</h1>
                        <p class="text-sm text-gray-500 mt-1">Mã Booking: <span
                                class="font-semibold text-gray-700">#BK-{{ BookingStore.bookingTicket?.id }}</span></p>
                        <p class="text-sm text-gray-500">Ngày đặt: 14/07/2025</p>
                    </div>
                    <div class="mt-4 sm:mt-0">
                        <span
                            class="inline-block px-3 py-1 text-sm font-semibold text-green-800 bg-green-100 rounded-full">{{
                                BookingStore.bookingTicket?.bookingStatus === 'CONFIRMED'
                                    ? 'Chờ Nhận Phòng'
                                    : BookingStore.bookingTicket?.bookingStatus === 'CANCEL'
                                        ? 'Đã Hủy'
                                        : BookingStore.bookingTicket?.bookingStatus === 'STAY'
                                            ? 'Đang ở'
                                            : BookingStore.bookingTicket?.bookingStatus === 'COMPLETED'
                                                ? 'Đã Trả Phòng'
                                                : BookingStore.bookingTicket?.bookingStatus === 'LATE'
                                                    ? 'Giữ phòng'
                                                    : 'Chưa Nhận Phòng' }}</span>
                    </div>
                </div>

                <!-- Trip Summary: Check-in, Check-out, Duration -->
                <div class="grid grid-cols-1 sm:grid-cols-3 gap-6 py-6 border-b">
                    <div>
                        <h3 class="text-sm font-semibold text-gray-500 uppercase">Nhận phòng</h3>
                        <p class="text-lg font-semibold text-gray-800"> {{
                            formatDateWithTimeToTicket(BookingStore.bookingTicket?.checkInDate ?? new Date()) }}</p>
                        <p class="text-sm text-gray-500">Từ {{
                            formatDateWithTimeToHour(BookingStore.bookingTicket?.checkInDate ?? new Date()) }}</p>
                    </div>
                    <div>
                        <h3 class="text-sm font-semibold text-gray-500 uppercase">Trả phòng</h3>
                        <p class="text-lg font-semibold text-gray-800"> {{
                            formatDateWithTimeToTicket(BookingStore.bookingTicket?.checkOutDate ?? new Date()) }}</p>
                        <p class="text-sm text-gray-500">Trước {{
                            formatDateWithTimeToHour(BookingStore.bookingTicket?.checkOutDate ?? new Date()) }}</p>
                    </div>
                    <div>
                        <h3 class="text-sm font-semibold text-gray-500 uppercase">Tổng thời gian</h3>
                        <p class="text-lg font-semibold text-gray-800">{{ numberOfNights }} đêm, {{ quantityGuest == 0 ?
                            'Chưa xếp phòng' :
                            quantityGuest + ' khách' }}</p>
                    </div>
                </div>

                <!-- Booker Information -->
                <div class="py-6 border-b">
                    <h3 class="text-lg font-bold text-gray-800 mb-4">Thông Tin Người Đặt</h3>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                        <div><span class="font-semibold">Họ và tên:</span> {{ BookingStore.bookingTicket?.user?.fullname
                            || BookingStore.bookingTicket?.guestBooking.fullname }}</div>
                        <div><span class="font-semibold">Hạng thành viên:</span> <span
                                v-if="BookingStore.bookingTicket?.user">{{
                                    BookingStore.bookingTicket?.user?.rank?.nameRank + " (Giảm " +
                                    BookingStore.bookingTicket?.user?.rank?.discount_percent + "%)" || "Không có hạng"
                                }}</span>
                            <span v-else>Không có hạng</span>
                        </div>
                        <div><span class="font-semibold">Email:</span> {{ BookingStore.bookingTicket?.user?.email ||
                            BookingStore.bookingTicket?.guestBooking.email }}</div>
                        <div><span class="font-semibold">Số điện thoại:</span> {{
                            BookingStore.bookingTicket?.user?.phone || BookingStore.bookingTicket?.guestBooking.phone }}
                        </div>
                        <div><span class="font-semibold">CCCD/CMND:</span> {{ BookingStore.bookingTicket?.user?.cccd ||
                            BookingStore.bookingTicket?.guestBooking.cccd }}</div>
                    </div>
                </div>

                <!-- Booking Details: Rooms -->
                <div class="py-6 border-b">
                    <h3 class="text-lg font-bold text-gray-800 mb-4">Chi Tiết Phòng Đã Đặt</h3>
                    <div class="overflow-x-auto">
                        <table class="w-full text-left">
                            <thead>
                                <tr class="border-b bg-gray-50">
                                    <th class="p-3 text-sm font-semibold text-gray-600">Loại Phòng</th>
                                    <th class="p-3 text-sm font-semibold text-gray-600 text-center">Số Lượng</th>
                                    <th class="p-3 text-sm font-semibold text-gray-600 text-right">Đơn Giá / Đêm</th>
                                    <th class="p-3 text-sm font-semibold text-gray-600 text-right">Thành Tiền</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr class="border-b" v-for="(bkdt, index) in BookingStore.bookingTicket?.bookingDetails"
                                    :key="index">
                                    <td class="p-3">
                                        <p class="font-semibold text-gray-800"> {{
                                            bkdt.roomType.name }}</p>
                                        <p class="text-sm text-gray-500">{{ bkdt.roomType.size }}m², 1 giường King, tối
                                            đa {{ bkdt.roomType.peopleAbout }} người</p>
                                    </td>
                                    <td class="p-3 text-center">{{ bkdt.quantity }}</td>
                                    <td class="p-3 text-right">{{ formatVND(bkdt.roomType.price) }}</td>
                                    <td class="p-3 text-right">{{
                                        formatVND(calculatePriceForRoomType(bkdt.roomType.price, bkdt.quantity)) }}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <!-- Booking Details: Facilities -->
                <div class="py-6 border-b">
                    <h3 class="text-lg font-bold text-gray-800 mb-4">Dịch Vụ Đi Kèm</h3>
                    <div class="overflow-x-auto">
                        <table class="w-full text-left">
                            <thead>
                                <tr class="border-b bg-gray-50">
                                    <th class="p-3 text-sm font-semibold text-gray-600">Tên Dịch Vụ</th>
                                    <th class="p-3 text-sm font-semibold text-gray-600 text-center">Số Lượng</th>
                                    <th class="p-3 text-sm font-semibold text-gray-600 text-right">Đơn Giá</th>
                                    <th class="p-3 text-sm font-semibold text-gray-600 text-right">Thành Tiền</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr class="border-b"
                                    v-for="(service, index) in BookingStore.bookingTicket?.bookingFacilities"
                                    :key="index">
                                    <td class="p-3">
                                        <p class="font-semibold text-gray-800">Đưa đón sân bay {{
                                            service.facility.facilityName }}</p>
                                    </td>
                                    <td class="p-3 text-center">{{ service.facility.description }}</td>
                                    <td class="p-3 text-right">{{ formatVND(service.facility.price) }}</td>
                                    <td class="p-3 text-right">500.000 ₫</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <!-- Guest & Room Assignment -->
                <div class="py-6 border-b">
                    <h3 class="text-lg font-bold text-gray-800 mb-4">Thông Tin Khách Lưu Trú</h3>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div class="bg-gray-50 p-4 rounded-lg" v-for="(stay, index) in BookingStore.bookingTicket?.stay"
                            :key="index">
                            <h4 class="font-semibold text-gray-700">{{
                                getRoomByIdForStay(stay.roomId) }}</h4>
                            <ul class="mt-2 text-sm text-gray-600 list-disc list-inside"
                                v-for="guest in stay.infoGuests" :key="guest.id">
                                <li>{{ guest.name }} (CCCD: {{ guest.cccd }})</li>
                            </ul>
                        </div>

                    </div>
                </div>

                <!-- Payment Summary -->
                <div class="pt-6 flex justify-end">
                    <div class="w-full max-w-sm">
                        <h3 class="text-lg font-bold text-gray-800 mb-4">Tổng Kết Thanh Toán</h3>
                        <div class="space-y-3">
                            <div class="flex justify-between">
                                <span class="text-gray-600">Tiền phòng ({{ quantityRoom }} phòng x {{ numberOfNights }}
                                    đêm)</span>
                                <span class="font-medium text-gray-800">{{ formatVND(totalPriceRoom) }}</span>
                            </div>
                            <div class="flex justify-between">
                                <span class="text-gray-600">Tiền dịch vụ</span>
                                <span class="font-medium text-gray-800">{{ formatVND(totalPriceFacility) }}</span>
                            </div>
                            <div class="flex justify-between">
                                <span class="text-gray-600">Tạm tính</span>
                                <span class="font-medium text-gray-800">{{ formatVND(totalPriceRoom +
                                    totalPriceFacility) }}</span>
                            </div>
                            <div class="flex justify-between">
                                <span class="text-gray-600">Giảm giá <span v-if="BookingStore.bookingTicket?.user">({{
                                    BookingStore.bookingTicket?.user?.rank?.nameRank + " " +
                                    BookingStore.bookingTicket?.user?.rank?.discount_percent + "%"
                                        }})</span>
                                    <span v-else>(Không có hạng)</span></span>
                                <span class="font-medium text-red-600">- 2.050.000 ₫</span>
                            </div>
                            <div class="flex justify-between">
                                <span class="text-gray-600">Thuế & Phí (0%)</span>
                                <span class="font-medium text-gray-800">0 ₫</span>
                            </div>
                            <div class="border-t my-2"></div>
                            <div class="flex justify-between text-xl font-bold">
                                <span class="text-gray-900">Tổng Cộng</span>
                                <span class="text-blue-600">{{ formatVND(BookingStore.bookingTicket?.totalAmount ?? 0)
                                    }}</span>
                            </div>
                            <div class="flex justify-between">
                                <span class="text-gray-600">Đã thanh toán (Cọc đêm đầu)</span>
                                <span class="font-medium text-gray-800">10.147.500 ₫</span>
                            </div>
                            <div class="flex justify-between  text-lg font-bold bg-yellow-100 p-3 rounded-lg  ">
                                <span class="text-yellow-800 my-auto w-48">Cần thanh toán khi nhận phòng </span>
                                <span class="text-yellow-800 my-auto"> 10.147.500 ₫</span>
                            </div>
                            <!-- STAFF ONLY SECTION -->
                            <div id="staff-payment-section" class="mt-6 pt-6 border-t border-dashed printable-hidden">
                                <h4 class="font-bold text-gray-700 text-center mb-4">Ghi nhận thanh toán</h4>

                                <!-- Payment Method Radio Buttons -->
                                <fieldset class="flex justify-center gap-4">
                                    <legend class="sr-only">Phương thức thanh toán</legend>
                                    <div>
                                        <input type="radio" name="paymentMethod" value="cash" id="pay-cash"
                                            v-model="paymentMethod" class="peer hidden" checked>
                                        <label for="pay-cash"
                                            class="block cursor-pointer rounded-lg border border-gray-300 p-2 text-sm font-medium shadow-sm peer-checked:border-blue-500 peer-checked:ring-1 peer-checked:ring-blue-500">Thanh
                                            toán tại quầy</label>
                                    </div>
                                    <div>
                                        <input type="radio" name="paymentMethod" value="qr" id="pay-qr"
                                            v-model="paymentMethod" class="peer hidden">
                                        <label for="pay-qr"
                                            class="block cursor-pointer rounded-lg border border-gray-300 p-2 text-sm font-medium shadow-sm peer-checked:border-blue-500 peer-checked:ring-1 peer-checked:ring-blue-500">Thanh
                                            toán Online (QR)</label>
                                    </div>
                                </fieldset>

                                <!-- Cash Payment UI -->
                                <div id="cash-payment-ui" class="mt-4" v-if="paymentMethod === 'cash'">
                                    <label for="cash-input" class="block text-sm font-medium text-gray-700">Số tiền
                                        khách đưa (VND)</label>
                                    <input type="number" id="cash-input" v-model="paymentCash.amount"
                                        class="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                        placeholder="Nhập số tiền...">

                                    <p class="text-xs text-red-500">* Lưu ý: Nhập tối đa {{
                                        formatVND(paymentStore.paymentOsData.data.amount) }}</p>
                                    <button id="confirm-cash-payment" @click="handleConfirmCashPayment"
                                        class="mt-4 w-full bg-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 transition">Xác
                                        nhận thanh toán <span v-if="paymentCash.amount > 0">{{
                                            formatVND(paymentCash.amount) }}</span></button>
                                </div>

                                <!-- QR Payment UI -->
                                <div id="qr-payment-ui" class=" mt-4 text-center" v-if="paymentMethod === 'qr'">
                                    <p class="text-sm text-gray-600 mb-3">Nhấn nút bên dưới để hiển thị mã QR cho khách
                                        hàng quét.</p>
                                    <button id="show-qr-button"
                                        class="w-full bg-gray-800 text-white font-bold py-2 px-4 rounded-lg hover:bg-gray-700 transition"
                                        @click="showQR = true">Hiển
                                        thị mã QR</button>
                                </div>

                                <p id="payment-success-msg"
                                    class="hidden mt-3 text-center text-sm font-semibold text-green-600">Đã ghi nhận
                                    thanh toán thành công!</p>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            <!-- Footer & Actions -->
            <div class="bg-gray-50 p-6 text-center no-print">
                <button @click="printBookingTicket"
                    class="bg-blue-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-blue-700 transition duration-300 printable-hidden">
                    In Phiếu Xác Nhận
                </button>
                <p class="text-xs text-gray-500 mt-4">Cảm ơn bạn đã lựa chọn dịch vụ của chúng tôi. Vui lòng liên hệ bộ
                    phận hỗ trợ nếu có bất kỳ thắc mắc nào.</p>
            </div>
        </div>
        <!-- QR Payment Modal with Vue binding -->
        <transition name="fade">
            <!-- Modal hiển thị QR Code (Thiết kế mới) -->
            <div id="qr-popup-overlay" class="fixed inset-0 bg-black/60 flex items-center justify-center p-4 "
                v-if="showQR" @click.self="showQR = false">
                <div id="qr-popup-content"
                    class="bg-gray-50 rounded-2xl shadow-2xl w-full max-w-md text-center transform transition-all">

                    <!-- Header -->
                    <div class="bg-white p-5 rounded-t-2xl border-b border-gray-200 flex justify-between items-center">
                        <div class="flex items-center space-x-3">
                            <img src="../../../assets/images/LogoBeeStay2.svg" alt="VietQR Logo" class="h-8">
                            <h2 class="text-lg font-bold text-gray-800">Thanh toán VietQR</h2>
                        </div>
                        <button @click="showQR = false" id="close-popup-btn" class="text-gray-400 hover:text-gray-700">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    <!-- QR Code & Hướng dẫn -->
                    <div class="p-6">
                        <p class="text-sm text-gray-600 mb-4">Quét mã dưới đây để thanh toán từ <br> <strong>ứng dụng
                                Ngân hàng</strong> hoặc <strong>Ví điện tử</strong> của bạn.</p>
                        <div class="flex justify-center bg-white p-4 rounded-xl shadow-inner">
                            <!--  THAY ĐỔI: Dùng thẻ <img> thay cho <canvas> -->
                            <div class="flex justify-center my-4">
                                <qrcode-vue :value="fiexdQRString" :size="250" level="H" />
                            </div>
                        </div>
                    </div>

                    <!-- Thông tin chi tiết -->
                    <div class="px-6 pb-6 space-y-4">
                        <div class="text-left bg-white p-4 rounded-xl border border-gray-200">
                            <div class="flex justify-between items-center py-2 border-b border-gray-100">
                                <span class="text-sm text-gray-500">Số tiền</span>
                                <span id="qr-amount" class="font-bold text-lg text-blue-600">{{
                                    formatVND(paymentStore.paymentOsData.data.amount) }}</span>
                            </div>
                            <div class="flex justify-between items-center py-2 border-b border-gray-100">
                                <span class="text-sm text-gray-500">Người thụ hưởng</span>
                                <span id="qr-account-name" class="font-semibold text-gray-800">{{
                                    paymentStore.paymentOsData.data.accountName }}</span>
                            </div>
                            <div class="flex justify-between items-center py-2 border-b border-gray-100">
                                <span class="text-sm text-gray-500">Số tài khoản</span>
                                <div class="flex items-center space-x-2">
                                    <span id="qr-account-number" class="font-semibold text-gray-800">{{
                                        paymentStore.paymentOsData.data.accountNumber }}</span>
                                    <button class="copy-btn p-1 text-gray-500 hover:text-blue-600"
                                        data-copy-target="qr-account-number">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none"
                                            viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                            <path stroke-linecap="round" stroke-linejoin="round"
                                                d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                            <div class="flex justify-between items-center pt-2">
                                <span class="text-sm text-gray-500">Nội dung</span>
                                <div class="flex items-center space-x-2">
                                    <span id="qr-description" class="font-semibold text-gray-800">{{
                                        paymentStore.paymentOsData.data.description }}</span>
                                    <button class="copy-btn p-1 text-gray-500 hover:text-blue-600"
                                        data-copy-target="qr-description">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none"
                                            viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                            <path stroke-linecap="round" stroke-linejoin="round"
                                                d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="bg-white p-4 rounded-b-2xl border-t border-gray-200">
                        <p class="text-xs text-gray-500">Đơn hàng <strong id="qr-order-code"></strong> sẽ hết hạn sau ít
                            phút.</p>
                        <p>*Nếu không quét mã được hãy bấm vào <br><a class="text-blue-600 hover:underline"
                                @click="handleOpenVietQR">Quét
                                mã tại đây</a></p>
                    </div>
                </div>
            </div>
        </transition>
    </div>


</template>

<script setup lang="ts">
import { computed, onMounted, ref, shallowReactive, watch } from 'vue';
import { toast } from 'vue-sonner';
import { Bookings } from '@/api/booking';
import { BookingTicketResponse, Booking, Room } from '@/interface/booking.interface';
import { formatDateWithTimeToHour, formatDateWithTimeToTicket, formatVND } from '@/utils';
import { RoomAPI } from '@/api/room';
import { RoomResponse } from '@/types';
import { PaymentAPI } from '@/api/payment';
import { CreatePaymentLinkRequest, PaymentCashRequest } from '@/types/payment-dto';
import QrcodeVue from 'qrcode.vue';
import { nextTick } from 'process';


const paymentStore = PaymentAPI();
const roomStore = RoomAPI();
const booking = ref<Booking>();
const BookingStore = Bookings();
const showQR = ref(false);
const props = defineProps<{
    id: number;
}>();
const paymentCash = ref<PaymentCashRequest>({
    bookingId: props.id,
    amount: 0
})
// Tạo map để lưu id Stay và thông tin phòng
const roomMap = ref<Map<number, RoomResponse>>(new Map());
const paymentPayOs = ref<CreatePaymentLinkRequest>({
    bookingId: props.id,
    returnUrl: 'https://www.youtube.com/',
    cancelUrl: 'https://github.com/'
})
const paymentMethod = ref('qr'); // Phương thức thanh toán mặc định là tiền mặt


const printBookingTicket = () => {
    window.print();
};
onMounted(async () => {
    if (!props.id) {
        toast.error('Booking ID is required!');
        return;
    }
    await BookingStore.updatePriceForBooking(props.id);
    // Tải thông tin booking bằng ID
    await BookingStore.getBookingbyId(props.id)
    await paymentStore.createPaymentPayOsLink(paymentPayOs.value);
    if (BookingStore.bookingTicket?.stay) {
        try {
            BookingStore.bookingTicket.stay.forEach(async (stay) => {
                await roomStore.getRoomById(stay.roomId)

                if (roomStore.room) {
                    const roomData = JSON.parse(JSON.stringify(roomStore.room));
                    roomMap.value.set(stay.roomId, roomData);
                }
            })
        } catch (error) {
            toast.error('Error fetching booking details: ' + error);
            console.error('Error fetching booking details:', error);
        }
    }

    // await paymentStore.getPaymentOsData(props.id);


    console.log('Booking Detail Page Mounted with ID:', JSON.stringify(BookingStore.bookingTicket, null, 2));
    console.log("QR Code:", paymentStore.paymentOsData.data.qrCode);
    // Fetch booking details using props.id
    toast.success(`Booking Detail for ID: ${props.id} loaded successfully!`);
    calculateNumberOfNights();
    calculateGuestCount();
    getRoomCount();
    calculateTotalPriceByRoomAndQuantity();

});

const quantityGuest = ref(0);
const quantityRoom = ref(0);
const numberOfNights = ref(0);
const totalPriceRoom = ref(0);
const totalPriceFacility = ref(0);

// Đếm số lượng khách
const calculateGuestCount = () => {
    BookingStore.bookingTicket?.stay?.forEach(stay => {
        stay.infoGuests?.forEach(guest => {
            if (guest) {
                quantityGuest.value++;
            }
        });
    });
};
// Đếm số lượng đêm
const calculateNumberOfNights = () => {
    const checkInDateStr = BookingStore.bookingTicket?.checkInDate;
    const checkOutDateStr = BookingStore.bookingTicket?.checkOutDate;

    if (checkInDateStr && checkOutDateStr) {
        const checkInDate = new Date(checkInDateStr);
        const checkOutDate = new Date(checkOutDateStr);
        const timeDiff = checkOutDate.getTime() - checkInDate.getTime();

        if (timeDiff < 0) {
            numberOfNights.value = 0;
            return;
        }

        const dayDiff = Math.round(timeDiff / (1000 * 3600 * 24));
        numberOfNights.value = dayDiff
    } else {
        numberOfNights.value = 0;
    }
};
// Lấy số lượng phòng
const getRoomCount = () => {
    if (BookingStore.bookingTicket?.bookingDetails) {
        BookingStore.bookingTicket.bookingDetails.forEach(detail => {
            if (detail.quantity) {
                quantityRoom.value += detail.quantity;
            }
        })
    }
};

// Lấy phòng
const getRoomByIdForStay = (id: number): string => {
    const room = roomMap.value.get(id);
    if (!room) {
        return 'Đang tải thông tin phòng...';
    }
    return `Phòng ${room.roomNumber} - ${room.roomType.name}`;
}

// Tính giá từng loại phòng
const calculatePriceForRoomType = (price: number, quantity: number): number => {
    return price * quantity
}
// Tính tổng giá phòng
const calculateTotalPriceByRoomAndQuantity = () => {
    if (BookingStore.bookingTicket?.bookingDetails) {
        BookingStore.bookingTicket.bookingDetails.forEach(detail => {
            if (detail.roomType && detail.quantity) {
                totalPriceRoom.value += calculatePriceForRoomType(detail.roomType.price, detail.quantity);
            }
        })
    }
}
// Tính tổng giá dịch vụ
const calculateTotalPriceByFacility = () => {
    if (BookingStore.bookingTicket?.bookingFacilities) {
        BookingStore.bookingTicket.bookingFacilities.forEach(facility => {
            if (facility.facility && facility.facility.price) {
                totalPriceFacility.value += facility.facility.price;
            }
        })
    }
}

// Fix Lại Mã QR
/**
 * Hàm tính toán mã kiểm tra CRC-16/CCITT-FALSE cho chuỗi dữ liệu.
 * @param {string} data - Chuỗi dữ liệu đầu vào.
 * @returns {string} - Mã CRC gồm 4 ký tự HEX viết hoa.
 */
const crc16_ccitt_false = (data: string): string => {
    let crc = 0xFFFF; // Khởi tạo CRC với giá trị 0xFFFF
    for (let i = 0; i < data.length; i++) {
        crc ^= data.charCodeAt(i) << 8;
        for (let j = 0; j < 8; j++) {
            if ((crc & 0x8000) !== 0) {
                crc = (crc << 1) ^ 0x1021;
            } else {
                crc <<= 1;
            }
        }
    }
    return (crc & 0xFFFF).toString(16).toUpperCase().padStart(4, '0');
}
/**
 * Sửa lỗi chuỗi QR không hợp lệ từ PayOS.
 * @param {string} qrString - Chuỗi QR gốc từ PayOS.
 * @returns {string} - Chuỗi QR đã được sửa lỗi và có thể quét được.
 */
const fixPayOSQRCode = (qrString: string): string => {
    const invalidField = "0208QRIBFTTA"; // Trường dữ liệu thừa
    const invalidParentLength = "3857"; // Độ dài sai của trường cha
    const correctParentLength = "3845"; // Độ dài đúng (57 - 12)

    // Chỉ thực hiện sửa lỗi nếu chuỗi chứa phần không hợp lệ
    if (qrString && qrString.includes(invalidField)) {

        let fixedQR = qrString.replace(invalidField, ""); // Loại bỏ trường không hợp lệ

        fixedQR = fixedQR.replace(invalidParentLength, correctParentLength); // Sửa độ dài trường cha

        const mainBody = fixedQR.slice(0, -4); // Lấy phần thân chính của chuỗi

        const newCRC = crc16_ccitt_false(mainBody); // Tính toán CRC mới

        const fixedQRString = mainBody + newCRC; // Ghép phần thân chính với CRC mới

        return fixedQRString;
    }
    return qrString; // Trả về chuỗi gốc nếu không cần sửa lỗi
}
const fiexdQRString = ref<string>('');

/**
 * Tính tiền mặt
 */
const handleConfirmCashPayment = () => {
    if (paymentCash.value.amount > paymentStore.paymentOsData.data.amount) {
        toast.error('Số tiền nhập vào không hợp lệ')
        return;
    } else if (paymentCash.value.amount < 1000) {
        toast.error('Số tiền phải nhất lớn hơn 1000')
        return;
    }

    // console.log("Payment Cash: ", paymentCash.value)
    paymentStore.createPaymentByCash(paymentCash.value)
}

// Mở VietQR
const handleOpenVietQR = () => {
    window.open(paymentStore.paymentOsData.data.checkoutUrl, '_blank');
}
watch(() => paymentStore.paymentOsData.data, (newValue) => {
    if (newValue) {
        fiexdQRString.value = fixPayOSQRCode(newValue.qrCode)
        console.log('Fixed QR String:', fiexdQRString.value);
    }
}, { deep: true });
</script>