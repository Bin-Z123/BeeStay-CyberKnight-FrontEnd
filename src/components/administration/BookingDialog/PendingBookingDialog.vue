<template>
    <Dialog>
        <DialogContent class="sm:max-w-[900px] grid-rows-[auto_minmax(0,1fr)_auto] p-0 max-h-[90dvh]"
            @pointer-down-outside.prevent>
            <DialogHeader class="p-6 pb-0">
                <DialogTitle class="font-bold text-muesli-400 text-center">Đặt Phòng Trước </DialogTitle>
                <DialogDescription>
                    Make changes to your profile here. Click save when you're done.
                </DialogDescription>
            </DialogHeader>
            <div class="grid gap-4 py-4 overflow-y-auto px-6">
                <div class="flex flex-col h-[1000px] space-y-4">
                    <!-- Thông tin Người Đặt -->
                    <div class="grid grid-cols-2 gap-5 border-2 border-muesli-500 relative h-auto w-auto p-2">
                        <div class="absolute -top-4 left-3 bg-muesli-300 text-white px-2 py-0.5 rounded-xs">Thông tin
                            người đặt phòng</div>
                        <div class="h-36  grid grid-cols-3 items-center">
                            <div class="col-1 pr-2 flex flex-col items-end space-y-1 gap-2">
                                <div :class="['', error.fullname ? 'text-red-600' : '']">Họ & tên: </div>
                                <div :class="['', error.phone ? 'text-red-600' : '']">Sđt: </div>
                            </div>
                            <div class="col-span-2 flex flex-col space-y-1 pr-2 gap-2">
                                <div>
                                    <input type="text" v-model="newBooking.guestBookingRequest.fullname"
                                        :class="['input-booking disabled:border-gray-300 disabled:bg-gray-50 disabled:text-gray-600', error.fullname? 'border-red-500 ring-2 ring-red-300 shadow-red-200 text-red-600' : '']">
                                </div>
                                <div>
                                    <input type="text" v-model="newBooking.guestBookingRequest.phone"
                                        :class="['input-booking disabled:border-gray-300 disabled:bg-gray-50 disabled:text-gray-600', error.phone ? 'border-red-500 ring-2 ring-red-300 shadow-red-200 text-red-600' : '']">
                                </div>
                            </div>
                        </div>
                        <!-- TT Phải -->
                        <div class="h-36  grid grid-cols-3 items-center">
                            <div class="col-1 pr-2 flex flex-col items-end space-y-1 gap-2">
                                <div :class="['', error.email ? 'text-red-600' : '']">Email: </div>
                                <div :class="['', error.cccd ? 'text-red-600' : '']">CCCD: </div>
                            </div>
                            <div class="col-span-2 flex flex-col space-y-1 pr-2 gap-2">
                                <div>
                                    <input type="email" v-model="newBooking.guestBookingRequest.email"
                                        :class="['input-booking', error.email ? 'border-red-500 ring-2 ring-red-300 shadow-red-200 text-red-600' : ''] ">
                                </div>
                                <div>
                                    <input type="text" v-model="newBooking.guestBookingRequest.cccd"
                                        :class="['input-booking', error.cccd ? 'border-red-500 ring-2 ring-red-300 shadow-red-200 text-red-600' : ''] ">
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- END Thông tin Người Đặt -->
                    <!-- TT Đặt phòng -->
                    <!-- TT Trái -->
                    <div class="grid grid-cols-2 gap-5 border-2 border-muesli-500 relative h-auto w-auto p-2">
                        <div class="absolute -top-4 left-3 bg-muesli-300 text-white px-2 py-0.5 rounded-xs">Thông tin
                            đặt phòng</div>
                        <div class="h-36  grid grid-cols-3 items-center">
                            <div class="col-1 pr-2 flex flex-col items-end space-y-3">
                                <div>Giá (tạm tính): </div>
                                <div>Ngày đến: </div>
                                <div>Số đêm dự kiến: </div>
                            </div>
                            <div class="col-span-2 flex flex-col space-y-1 pr-2">
                                <div>
                                    <input type="text" :value="formatPrice(totalPrice)" disabled class="input-booking ">
                                </div>
                                <div class="space-x-1">
                                    <VueDatePicker class="border border-muesli-300 " :min-date="new Date()"
                                        v-model="dateCheckin" teleport="body" multi-calendars :format="'dd/MM/yyyy'"
                                        :format-locale="vi" select-text="Chọn" cancel-text="Hủy" />
                                    <!-- <span>Lúc:</span>
                                    <input class="inline border border-muesli-300 w-full" type="text"> -->
                                </div>
                                <div class="flex space-x-1">
                                    <select v-model="numberOfNights" class="input-booking" :disabled="!dateCheckin">
                                        <option :value="null" disabled selected>Chọn số đêm</option>
                                        <option :value="i" v-for="i in 30" :key="i">
                                            {{ i }} Đêm - {{ checkoutDateText(i) }}
                                        </option>
                                    </select>
                                    <!-- <span>Lúc:</span>
                                    <input class="inline border border-muesli-300 w-full" type="text"> -->
                                </div>
                            </div>
                        </div>
                        <!-- TT Phải -->
                        <div class="h-auto w-auto flex items-center">
                            <div class="grid grid-cols-3">
                                <div class="col-1 pr-2 flex flex-col items-end space-y-1">
                                    <div>Trả trước: </div>
                                    <div>Ghi chú: </div>
                                </div>
                                <div class="col-span-2 flex flex-col space-y-1 pr-2">
                                    <div>
                                        <input type="text" class="input-booking">
                                    </div>
                                    <div>
                                        <textarea
                                            class="px-1 rounded-xs focus:outline-none focus:ring-2 focus:ring-muesli-200  shadow-muesli-300  w-56 border border-muesli-300 resize-y overflow-auto max-h-[200px] "></textarea>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- END TT Đặt phòng-->
                    <!-- Loại phòng gợi ý -->
                    <div class="grid grid-cols-2 gap-5 border-2 border-muesli-500 relative h-auto w-auto p-2 pt-4">
                        <div class="absolute -top-4 left-3 bg-muesli-300 text-white px-2 py-0.5 rounded-xs">Loại phòng
                            còn trống</div>
                        <div v-for="(detail, index) in bookingDetails" :key="index"
                            class="col-span-2 flex items-center gap-4 mb-2">
                            <select v-model="detail.roomTypeId" class="input-booking w-2/3!">
                                <option disabled value="0">-- Chọn loại phòng --</option>
                                <option v-for="type in getAvailableRoomTypeOptions(index).value" :key="type.roomTypeId"
                                    :value="type.roomTypeId">
                                    {{ type.nameRoomType }} - {{ type.availableRooms }} Phòng trống - Giá/đêm:
                                    {{
                                        formatPrice(type.price) }}
                                </option>
                            </select>
                            <!-- <input type="number" min="1" v-model.number="detail.quantity"
                                @input="listenQuantity(detail)" :disabled="detail.roomTypeId === 0" class="input w-1/3"
                                placeholder="Số lượng" /> -->
                            <select v-model="detail.quantity" class="input-booking w-1/3!">
                                <option :value="0" disabled selected>--Chọn số lượng phòng --</option>
                                <option v-for="qty in getAvailableQuantities(detail.roomTypeId ?? 0)" :key="qty"
                                    :value="qty">{{ qty }}</option>
                            </select>
                            <button class="btn btn-del-booking"
                                @click="newBooking.bookingDetailRequest.splice(index, 1)">Xóa</button>
                        </div>
                        <div class="flex flex-row space-x-1 col-span-2">
                            <button class="btn btn-add-booking w-1/4" @click="addRoomType">Thêm
                                loại phòng</button>
                            <span class="">Tổng số phòng: {{ totalBookedRoom }}</span>
                        </div>

                    </div>

                    <!-- Danh sách người ở (StayRequest) -->

                </div>
            </div>
            <DialogFooter class="p-6 pt-0">
                <Button @click="handleCrateBooking" :disabled="bookingStore.isloading"
                    class="bg-muesli-400 hover:bg-muesli-600 text-white px-3 py-2 rounded-sm disabled:opacity-80 disabled:bg-muesli-600">
                    <span v-if="!bookingStore.isloading">Đặt Phòng</span>
                    <span v-else>
                        <LoaderCircle class="animate-spin" />
                    </span>
                </Button>
            </DialogFooter>
        </DialogContent>
    </Dialog>
</template>
<script setup lang="ts">
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { computed, onMounted, ref, watch } from "vue";
import { de, vi } from "date-fns/locale";
import { addDays, format } from "date-fns";
import { LoaderCircle } from 'lucide-vue-next';
import type {
    CreateBookingRequest,
    GuestBookingRequest,
    BookingRequest,
    BookingDetailRequest,
    BookingFacilityRequest,
    StayRequest,
    InfoGuestRequest
} from "@/types";
import { RoomType } from "@/api/roomtype";
import { toast } from "vue-sonner";
import { Bookings } from "@/api/booking";
import { formatVND, formatDateWithTime, formatDateWithTimeToSQL } from "@/utils";
import { RoomAvailabilityResponse } from "@/types";
const roomTypes = RoomType();
const bookingStore = Bookings();
const formatPrice = (price: number) => formatVND(price);

onMounted(async () => {
    await roomTypes.getAllRoomType();
    await bookingStore.getAvailableRoomsByDate(dateCheckin.value, dateCheckout.value);

    // console.log("Danh sách phòng trống:", bookingStore.listRoomsAvailable);
})
// Thông tin đặt phòng
//Theo dõi ngày check-in check-out để tìm phòng trống
const dateCheckin = ref(new Date());
const numberOfNights = ref(1);
const checkoutDateText = (night: number) => {
    if (!dateCheckin.value) return "";
    const date = addDays(dateCheckin.value, night);
    return format(date, "dd/MM/yyyy");
}
const dateCheckout = computed(() => {
    return dateCheckin.value && numberOfNights.value ? addDays(dateCheckin.value, numberOfNights.value) : addDays(new Date(), 1);

})
// Tính lại số đêm
watch(() => numberOfNights.value, (newValue) => {
    newBooking.value.bookingRequest.numberOfNights = newValue
})
// Theo dõi checkin checkout
watch([dateCheckin, dateCheckout], ([checkin, checkout]) => {
    newBooking.value.bookingRequest.checkInDate = formatDateWithTime(checkin, 14, 0, 0);
    newBooking.value.bookingRequest.checkOutDate = formatDateWithTime(checkout, 12, 0, 0);
    newBooking.value.stayRequest.forEach(stay => {
        stay.actualCheckIn = formatDateWithTime(checkin, 14, 0, 0);
        stay.actualCheckOut = formatDateWithTime(checkout, 12, 0, 0);
    })
    bookingStore.getAvailableRoomsByDate(dateCheckin.value, dateCheckout.value);
    toast.success("Thêm ngày check-in, check-out");
})


//Tính lại tổng giá
const getRoomPrice = (roomTypeId: number): number => {
    const room = bookingStore.listRoomsAvailable.find(r => r.roomTypeId === roomTypeId);
    return room?.price ?? 0;
};

const calculateSubtotal = (detail: { roomTypeId: number; quantity?: number }): number => {
    if (!detail.quantity || detail.quantity <= 0) return 0;

    const price = getRoomPrice(detail.roomTypeId);
    return price * detail.quantity;
};

const totalPrice = computed(() => {
    return bookingDetails.value.reduce((sum, detail) => {
        return sum + calculateSubtotal(detail);
    }, 0);
});




const roomtypes = roomTypes.roomtypes
//  Trả ra danh sách ID loại phòng đã chọn (trừ chính mình)
const getAvailableRoomTypeOptions = (index: number) => {
    return computed(() => {
        const selectedIds = bookingDetails.value
            .map((d, i) => (i !== index ? d.roomTypeId : ''))
            .filter(id => id !== '')
        return bookingStore.listRoomsAvailable.filter(rt => !selectedIds.includes(rt.roomTypeId))
    })
}
// Trả về danh sách số lượng có thể chọn ứng với roomTypeId
const getAvailableQuantities = (roomTypeId: number): number[] => {
    const selectedType = bookingStore.listRoomsAvailable.find(type => type.roomTypeId === roomTypeId);
    if (!selectedType) return [];
    const quantity = selectedType.availableRooms;
    return Array.from({ length: quantity }, (_, i) => i + 1);
};

// Dữ liệu thật
// Xử lý Thằng booking
const newBooking = ref<CreateBookingRequest>({
    guestBookingRequest: {
        fullname: '',
        phone: '',
        email: '',
        cccd: ''
    },
    bookingRequest: {
        checkInDate: formatDateWithTime(dateCheckin.value, 14, 0, 0),
        checkOutDate: formatDateWithTime(dateCheckout.value, 12, 0, 0),
        isDeposit: false,
        bookingStatus: 'CONFIRMED',
        numGuest: 1,
        userId: 0,
        numberOfNights: numberOfNights.value
    },
    bookingDetailRequest: [],
    bookingFacilityRequest: [],
    stayRequest: []
})

const bookingDetails = ref(newBooking.value.bookingDetailRequest)
const addRoomType = () => {
    newBooking.value.bookingDetailRequest.push({ roomTypeId: 0, quantity: 0 })
}


interface Room {
    nameRoomType: string;
    id: number;
    roomNumber: string;
    roomTypeId: number;
    roomStatus: string;
    floor: number;
}
//Tính số phòng
const totalBookedRoom = computed(() => {
    return bookingDetails.value.reduce((sum, detail) => {
        return sum + (detail.quantity ?? 0);
    }, 0);
})
//Kiểm tra hợp lệ trước khi booking
const validateStayBeforeSubmit = (): boolean => {
    if (totalBookedRoom.value === 0) {
        toast.error("Vui lòng chọn số lượng phòng !")
        return false;
    }
    return true
}

const error = ref({ fullname: '', phone: '', email: '', cccd: '' })

const validateForm = () => {
    const fullname = (newBooking.value.guestBookingRequest.fullname ?? '').toString().trim();
    const phone = (newBooking.value.guestBookingRequest.phone ?? '').toString().trim();
    const email = (newBooking.value.guestBookingRequest.email ?? '').toString().trim();
    const cccd = (newBooking.value.guestBookingRequest.cccd ?? '').toString().trim();

    if (!fullname) {
        error.value.fullname = "1"
    }
    if (!phone) {
        error.value.phone = "2"
    }
    if (!email) {
        error.value.email = "3"
    }
    if (!cccd) {
        error.value.cccd = "4"
    }
    toast.error("Vui lòng nhập đày đủ thông tin!")
    return fullname && phone && email && cccd
}

// Validate Khách ở
// Xử lý tạo Booking
const handleCrateBooking = async () => {
    if (!validateForm()) return
    if (!validateStayBeforeSubmit()) return
    await bookingStore.createBooking(newBooking.value);
    // console.log("Booking: ", newBooking.value);
}


</script>