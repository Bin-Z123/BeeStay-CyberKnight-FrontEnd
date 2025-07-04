<template>
    <Dialog>
        <DialogContent class="sm:max-w-[900px] grid-rows-[auto_minmax(0,1fr)_auto] p-0 max-h-[90dvh]"
            @pointer-down-outside.prevent>
            <DialogHeader class="p-6 pb-0">
                <DialogTitle class="font-bold text-muesli-400 text-center">Xác Nhận Đặt Phòng | Khách hàng: {{
                    bookingData.user?.fullname || bookingData.guestBooking?.fullname }}</DialogTitle>
                <DialogDescription>
                    Make changes to your profile here. Click save when you're done. ID: {{ bookingData.id }}
                </DialogDescription>
            </DialogHeader>

            <div class="grid gap-4 py-4 overflow-y-auto px-6">
                <div class="flex flex-col h-[1000px] space-y-4">
                    <!-- Thông tin đã đăng ký -->
                    <div class="grid grid-cols-2 gap-5 border-2 border-muesli-500 relative h-auto w-auto p-2">
                        <div class="absolute -top-4 left-3 bg-muesli-300 text-white text-center  px-2 py-0.5 rounded-xs flex
                            justify-items-center space-x-1">
                            <span>Thông tin đã
                                đăng ký</span> <input type="checkbox" v-model="checkBoxInfo"
                                class="justify-self-center">
                        </div>
                        <label class="col-span-2 text-center"><b class="">Thông tin cơ bản</b></label>
                        <div>

                            <div>
                                <label for="">Tên người đặt</label>
                                <input :disabled="!checkBoxInfo" type="text" class="input-booking"
                                    v-model="bookingData.user.fullname">
                            </div>
                            <div>
                                <label for="">Sđt</label>
                                <input :disabled="!checkBoxInfo" type="text" class="input-booking"
                                    v-model="bookingData.user.phone">
                            </div>
                            <div>
                                <label for="">Email</label>
                                <input :disabled="!checkBoxInfo" type="text" class="input-booking"
                                    v-model="bookingData.user.email">
                            </div>
                            <div>
                                <label for="">CCCD</label>
                                <input :disabled="!checkBoxInfo" type="text" class="input-booking"
                                    v-model="bookingData.user.cccd">
                            </div>
                        </div>
                        <div>
                            <div>
                                <label for="">Số tiền đã thanh toán</label>
                                <input disabled type="text" class="input-booking" value="0">
                            </div>
                            <div>
                                <label for="">Số tiền còn lại</label>
                                <input disabled type="text" class="input-booking" :value="bookingData.totalAmount">
                            </div>
                            <div>
                                <label for="">Ngày đến</label>
                                <input disabled type="text" class="input-booking"
                                    :value="formatDateWithTimeToUI(bookingData.checkInDate)">
                            </div>
                            <div>
                                <label for="">Ngày đi</label>
                                <input disabled type="text" class="input-booking"
                                    :value="formatDateWithTimeToUI(bookingData.checkOutDate)">
                            </div>
                        </div>

                        <hr class="col-span-2">

                        <label class="col-span-2 text-center"><b>Loại phòng đã đặt</b></label>
                        <div class="col-span-2 flex items-center gap-4 mb-2 text-start">
                            <label class="w-2/3 input-booking border-0!">Loại phòng đã đặt</label>
                            <label class="w-1/3 input-booking border-0!">Số lượng phòng</label>
                            <button
                                class="btn btn-add-booking border-0! text-white! hover:bg-white! hover:text-white!">Xóa</button>
                        </div>
                        <div class="col-span-2 flex items-center gap-4 mb-2 -mt-5"
                            v-for="detail in bookingDetailsUpdate" :key="detail.id">
                            <select class="input-booking w-2/3" :disabled="!checkBoxInfo">
                                <option v-for="(roomType, index) in bookingStore.listRoomsAvailable" :key="index">{{
                                    roomType.nameRoomType }}</option>
                            </select>
                            <select class="input-booking w-1/3" :disabled="!checkBoxInfo">
                                <option value="">{{ detail.quantity }}</option>
                            </select>
                            <button class="btn btn-del-booking">
                                Xóa
                            </button>
                        </div>
                        <div class="col-span-2 flex items-center gap-4 mb-2 text-start -mt-5">
                            <label class="w-2/3 input-booking border-0!">Loại phòng mới</label>
                            <label class="w-1/3 input-booking border-0!">Số lượng phòng</label>
                            <button
                                class="btn btn-add-booking border-0! text-white! hover:bg-white! hover:text-white!">Xóa</button>
                        </div>
                        <div class="col-span-2 flex items-center gap-4 mb-2 -mt-5"
                            v-for="(detail, index) in bookingData.bookingDetails" :key="detail.id">
                            <select class="input-booking w-2/3" :disabled="!checkBoxInfo">
                                <option v-for="(roomType, index) in bookingStore.listRoomsAvailable" :key="index">{{
                                    roomType.nameRoomType
                                }}</option>
                            </select>
                            <select class="input-booking w-1/3" :disabled="!checkBoxInfo">
                                <option value="">{{ detail.quantity }}</option>
                            </select>
                            <button class="btn btn-del-booking"
                                @click="bookingData.bookingDetails.splice(index, 1)">Xóa</button>
                        </div>

                    </div>

                    <!-- Xếp phòng -->
                    <div class=" grid grid-cols-2 gap-5 border-2 border-muesli-500 relative h-auto w-auto p-2">
                        <div class="absolute -top-4 left-3 bg-muesli-300 text-white px-2 py-0.5 rounded-xs">Xếp
                            Phòng
                        </div>
                    </div>
                </div>
            </div>

            <DialogFooter class="p-6 pt-0 flex justify-between">
                <Button class="justify-self-start">Tổng tiền phải trả: <b>{{ formatVND(bookingData.totalAmount)
                }}</b></Button>
                <Button class="bg-muesli-400 hover:bg-muesli-600 text-white px-3 py-2 rounded-sm">
                    Xác nhận
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
} from "@/components/ui/dialog";
import {
    Booking,
} from "@/interface/booking.interface";
import { onMounted, ref, watch, computed, watchEffect } from "vue";
import { formatDateWithTimeToUI, formatVND } from "@/utils";
import { Bookings } from "@/api/booking";

const bookingStore = Bookings()
const props = defineProps<{ Booking: Booking }>()
const bookingData = ref<Booking>(props.Booking)

watch(() => props.Booking, (newVal) => {
    bookingData.value = { ...newVal }
    bookingDetailsUpdate.value = bookingData.value.bookingDetails.map(detail => ({
        id: detail.id,
        roomTypeId: detail.roomType?.id,
        quantity: detail.quantity
    }))
})

interface BookingDetailUpdate {
    id: number
    roomTypeId: number
    quantity: number
}
const bookingDetailsUpdate = ref<BookingDetailUpdate[]>([
    {
        id: 0,
        roomTypeId: 0,
        quantity: 0
    }
])
interface Room {
    nameRoomType: string;
    id: number;
    roomNumber: string;
    roomTypeId: number;
    roomStatus: string;
    floor: number;
}
// Tính lại số phòng (Stay)
const listRoomNumber = computed(() => {
    const selectedRomTypeIds = bookingDetailsUpdate.value
        .filter(detail => detail.roomTypeId !== 0)
        .map(detail => detail.roomTypeId);


    const rooms: Room[] = [];
    for (const typeId of selectedRomTypeIds) {
        const found = bookingStore.listRoomsAvailable.find(type => type.roomTypeId === typeId);
        if (found?.availableRoomDTO) {
            rooms.push(...found.availableRoomDTO);
        }
    }
    return rooms;
})

// watchEffect(() => {
//     if (bookingData.value.bookingDetails?.length) {

//     }
// })
// Chỉnh sửa thông tin đăng ký
const checkBoxInfo = ref(false)

onMounted(async () => {
    // bookingDetails.value = bookingData.value.bookingDetails.map(detail => ({
    //     id: detail.id,
    //     roomTypeId: detail.roomType.id,
    //     quantity: detail.quantity
    // }))
    if (bookingData.value.checkInDate && bookingData.value.checkOutDate) {
        await bookingStore.getAvailableRoomsByDate(bookingData.value.checkInDate, bookingData.value.checkOutDate)
        console.log("Danh sách phòng trống:", bookingStore.listRoomsAvailable);
    }


})
</script>
