<template>
    <Dialog v-model:open="dialogVisible" @update:open="$emit('update:open', $event)">
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
                            v-for="(detail, index) in bookingData.bookingDetails" :key="index">
                            <select class="input-booking w-2/3" :disabled="!checkBoxInfo" v-model="detail.roomType.id">
                                <option disabled :value="0">-- Chọn loại phòng --</option>
                                <option v-for="type in getAvailableRoomTypeOptions(index).value" :key="type.roomTypeId"
                                    :value="type.roomTypeId">{{
                                        type.nameRoomType }} - {{ type.availableRooms }} Phòng trống</option>
                            </select>
                            <select class="input-booking w-1/3" :disabled="!checkBoxInfo" v-model="detail.quantity">
                                <option :value="0" disabled selected>--Chọn số lượng phòng --</option>
                                <option v-for="qty in getAvailableQuantities(detail.roomType.id ?? 0)" :key="qty"
                                    :value="qty">
                                    {{ qty }}
                                </option>
                            </select>
                            <button class="btn btn-del-booking disabled:opacity-50" @click="deleteRoomType(index)"
                                :disabled="!checkBoxInfo">
                                Xóa
                            </button>
                        </div>
                        <div class="flex flex-row space-x-1 col-span-2 justify-between">
                            <div class="w-full space-x-1.5">
                                <button class="disabled-btn btn-add-booking w-1/4" :disabled="!checkBoxInfo"
                                    @click="addRoomType">Thêm
                                    loại phòng</button>
                                <span class="">Tổng số phòng: {{ totalBookedRoom }}</span>
                            </div>
                            <button @click="reloadDataRoomType"
                                class=" disabled:opacity-50 bg-muesli-400 hover:bg-muesli-600 text-white px-2 py-1 rounded-xs justify-center"
                                :disabled="!checkBoxInfo || !isDirty">
                                <RefreshCcw />
                            </button>
                            <button :disabled="!checkBoxInfo || !isDirty || bookingDetailStore.isLoading"
                                @click="handleUpdateQuantityRoom"
                                class="disabled-btn bg-muesli-400 hover:bg-muesli-600 text-white px-2 py-1 rounded-xs w-1/2">
                                <span v-if="bookingDetailStore.isLoading">
                                    <LoaderCircle />
                                </span>
                                <span v-else> Cập
                                    nhật số lượng phòng</span>
                            </button>
                        </div>
                        <span v-if="isDirty" class="col-span-2 text-red-500 text-sm justify-self-end -mt-2">Hãy cập nhật
                            số lượng phòng
                            trước
                            khi xếp phòng
                        </span>

                    </div>

                    <!-- Xếp phòng -->
                    <div class=" grid grid-cols-2 gap-5 border-2 border-muesli-500 relative h-auto w-auto p-2">
                        <div class="absolute -top-4 left-3 bg-muesli-300 text-white px-2 py-0.5 rounded-xs">Xếp
                            Phòng
                        </div>
                        <div v-for="(stay, sIndex) in stayList" :key="sIndex"
                            class="col-span-2 border p-2 rounded-xl space-y-2">
                            <div class="font-semibold">Lượt ở: {{ sIndex + 1 }}</div>
                            <hr>
                            <div class="grid grid-cols-2 gap-4">
                                <select v-model="stay.roomId" class="input-booking">
                                    <option value="0" disabled selected>-- Chọn số phòng --</option>
                                    <option :value="room.id" v-for="room in getAvailableRoomsForStay(sIndex)"
                                        :key="room.id">{{
                                            room.roomNumber }} -
                                        Trống | Lầu {{ room.floor }} | Loại {{ room.nameRoomType }} - ID:{{ room.id }}
                                    </option>
                                </select>
                                <!-- <input v-model="stay.roomNumber" class="input" placeholder="Số phòng" /> -->
                                <select v-model="stay.stayStatus" disabled class="input-booking">
                                    <option value="PENDING">Chờ</option>
                                    <option value="NOW" selected>Ở ngay</option>
                                    <!-- <option value="DONE">Đã xong</option> -->
                                </select>
                            </div>
                            <div class="grid grid-cols-2 gap-4">
                                <input type="datetime-local" disabled v-model="stay.actualCheckIn"
                                    class="input-booking" />
                                <input type="datetime-local" disabled v-model="stay.actualCheckOut"
                                    class="input-booking" />
                            </div>
                            <textarea v-model="stay.note"
                                class="px-1 rounded-xs focus:outline-none focus:ring-2 focus:ring-muesli-200  shadow-muesli-300  w-full border border-muesli-300 resize-y overflow-auto max-h-[200px] "
                                placeholder="Ghi chú thêm..."></textarea>

                            <div>
                                <div class="font-semibold mb-1"> Thông tin khách ở:</div>
                                <div v-for="(guest, gIndex) in updateBooking.stayRequest[sIndex].infoGuests"
                                    :key="gIndex" class="grid grid-cols-2 gap-4 mb-2">
                                    <input v-model="guest.name" class="input-booking" placeholder="Tên khách" />
                                    <input v-model="guest.phone" class="input-booking" placeholder="Số điện thoại" />

                                    <input v-model="guest.cccd" class="input-booking" placeholder="CCCD" />
                                    <select v-model="guest.occupantType" class="input-booking">
                                        <option value="" selected disabled>Chọn loại khách ở</option>
                                        <option value="INFANT">Người đặt</option>
                                        <option value="ADULT">Người lớn</option>
                                        <option value="CHILD">Trẻ em</option>
                                    </select>
                                    <div class="col-2  justify-self-end"><button class="btn btn-del-booking "
                                            @click=" handleDeleteGuest(sIndex, gIndex)">Xóa</button>
                                    </div>

                                </div>
                                <div class="flex justify-end">
                                    <button class="btn btn-add-booking" @click="addGuestToStay(sIndex)">Thêm
                                        khách ở</button>
                                </div>

                            </div>
                            <button class="btn btn-del-booking  justify-self-end"
                                @click="stayList.splice(sIndex, 1)">Xóa
                                lượt
                                ở</button>
                        </div>
                        <div class="flex justify-start"><button class="btn btn-add-booking " @click="addStay">Thêm lượt
                                ở</button></div>
                    </div>
                </div>
            </div>

            <DialogFooter class="p-6 pt-0 flex justify-between">
                <Button class="justify-self-start">Tổng tiền phải trả: <b>{{ formatVND(bookingData.totalAmount)
                }}</b></Button>
                <Button @click="handleConfirm(bookingData.id)" :disabled="isDirty"
                    class="bg-muesli-400 hover:bg-muesli-600 disabled:opacity-50 text-white px-3 py-2 rounded-sm">
                    Xác nhận
                </Button>
            </DialogFooter>
        </DialogContent>
    </Dialog>
</template>
<script setup lang="ts">
import { RefreshCcw, LoaderCircle } from 'lucide-vue-next';
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
import { formatDateWithTimeToUI, formatVND, formatDateWithTime } from "@/utils";
import { Bookings } from "@/api/booking";
import { toast } from "vue-sonner";
import cloneDeep from 'lodash/cloneDeep'
import { UpdateBookingRequest, StayCreateRequest } from '@/types';
import { BookingDetails } from '@/api/bookingdetail';
import { Stay } from '@/api/stay';
import { useRouter } from 'vue-router';

const router = useRouter()
const StayStore = Stay()
const bookingDetailStore = BookingDetails()
const bookingStore = Bookings()
const props = defineProps<{ Booking: Booking, open: boolean }>()
const emit = defineEmits(['update:open'])
const isDirty = ref(false)

const dialogVisible = computed({
    get: () => props.open,
    set: (val: boolean) => emit('update:open', val)
})
const bookingData = ref<Booking>(props.Booking)
const originalBookingData = ref<Booking>(props.Booking)

watch(() => props.open, (isOpen) => {
    if (isOpen) {

        const data = cloneDeep(props.Booking)
        originalBookingData.value = data
        isDirty.value = false
        toast.success("Đã mở Dialog")
    }
})

watch(() => props.Booking, (newVal) => {
    if (newVal) {
        bookingData.value = cloneDeep(newVal)
        updateBooking.value.bookingDetailRequest = newVal.bookingDetails.map(detail => ({
            id: detail.id,
            roomTypeId: detail.roomType?.id,
            quantity: detail.quantity
        }))
    }
})

watch(() => bookingData.value.bookingDetails, (newVal, oldVal) => {
    if (oldVal) {
        isDirty.value = true
    }
}, { deep: true })

// watch(() => bookingData.value?.bookingDetails, (newVal) => {
//     if (!newVal) return
//     bookingDetailsUpdate.value = newVal.map(detail => ({
//         id: detail.id,
//         roomTypeId: detail.roomType?.id,
//         quantity: detail.quantity
//     }))
//     toast.success('Cap nhat thanh cong', {
//         description: bookingDetailsUpdate.value
//     })
// }, { deep: true })
// watch(() => props.open, (isOpen) => {
//     if (isOpen) {
//         originalBookingData.value = cloneDeep(props.Booking)
//         bookingData.value = cloneDeep(props.Booking)
//     }
// })



const updateBooking = ref<UpdateBookingRequest>({
    guestBookingRequest: {
        fullname: '',
        phone: '',
        email: '',
        cccd: ''
    },
    bookingRequest: {
        checkInDate: formatDateWithTime(bookingData.value.checkInDate, 14, 0, 0),
        checkOutDate: formatDateWithTime(bookingData.value.checkOutDate, 12, 0, 0),
        isDeposit: false,
        bookingStatus: 'STAY',
        numGuest: 1,
        userId: bookingData.value.user?.id,
        // numberOfNights: numberOfNights.value
    },
    bookingDetailRequest: [],
    bookingFacilityRequest: [],
    stayRequest: []
})
interface BookingDetailUpdate {
    id: number
    roomTypeId: number
    quantity: number
}
// const bookingDetailsUpdate = ref(updateBooking.value.bookingDetailRequest)
interface Room {
    nameRoomType: string;
    id: number;
    roomNumber: string;
    roomTypeId: number;
    roomStatus: string;
    floor: number;
}
// Tính lại số lượt đặt phòng và phòng trống
const listRoomNumber = computed(() => {
    const selectedRomTypeIds = updateBooking.value.bookingDetailRequest
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
//  Tính lại phòng đã chọn
const flattenedBookingDetails = computed(() => {
    const result: number[] = [];
    updateBooking.value.bookingDetailRequest.forEach(detail => {
        for (let i = 0; i < detail.quantity; i++) {
            result.push(detail.roomTypeId);
        }
    })
    return result;
})
const getRoomTypeIdForStay = (sIndex: number): number => {
    return flattenedBookingDetails.value[sIndex] ?? 0;
}
const getAvailableRoomsForStay = (sIndex: number) => {
    const currentRoomTypeId = getRoomTypeIdForStay(sIndex);
    // Tập hợp các phòng đã được chọn trước đó (stay trước)
    const usedRoomNumbers = stayList.value
        .filter((stay, index) => index !== sIndex) // Loại trừ chính nó
        .map((stay) => stay.roomNumber)
        .filter(Boolean); // Loại undefined/null
    return listRoomNumber.value.filter(
        (room) =>
            room.roomTypeId === currentRoomTypeId &&
            !usedRoomNumbers.includes(room.roomNumber)
    );

};
// Validate Khách ở
const handleDeleteGuest = (stayIndex: number, guestIndex: number) => {
    if (guestIndex <= 0) {
        toast.error("Phải có ít nhất 1 người lớn")
        return;
    }
    stayList.value[stayIndex].infoGuests.splice(guestIndex, 1)
}

// Trả ra danh sách loại phòng đã đặt
const getAvailableRoomTypeOptions = (index: number) => {
    return computed(() => {
        const selectedIds = bookingData.value.bookingDetails
            .map((d, i) => (i !== index ? d.roomType.id : ''))
            .filter(id => id !== '')
        return bookingStore.listRoomsAvailable.filter(rt => !selectedIds.includes(rt.roomTypeId))
    })
}
// Trả về danh sách số lượng đặt phòng ứng cới loại phòng đã chọn
const getAvailableQuantities = (roomTypeId: number): number[] => {
    const selectedType = bookingStore.listRoomsAvailable.find(type => type.roomTypeId === roomTypeId);
    if (!selectedType) return [];
    const quantity = selectedType.availableRooms;
    return Array.from({ length: quantity }, (_, i) => i + 1);
}

// Ràng buộc không cho xóa loại phòng cuối cùng
const deleteRoomType = (index: number) => {
    let result = 0
    bookingData.value.bookingDetails.forEach((detail, i) => {
        result += i
    })
    console.log(result);
    if (result == 0) {
        toast.error("Không được xóa loại phòng cuối cùng")
        return
    }
    bookingData.value.bookingDetails.splice(index, 1);

}

// Thêm loại phòng mới 
const addRoomType = () => {
    bookingData.value.bookingDetails.push({
        roomType: {
            id: 0
        },
        quantity: 0
    })
}

// Tính số lượng phòng
const totalBookedRoom = computed(() => {
    return originalBookingData.value.bookingDetails.reduce((sum, detail) => {
        return sum + (detail.quantity ?? 0);
    }, 0)
})
// Tính stay
const totalStay = computed(() => stayList.value.length)

// Bật chỉnh sửa thông tin đăng ký
const checkBoxInfo = ref(false)

onMounted(async () => {
    updateBooking.value.bookingDetailRequest = bookingData.value.bookingDetails.map(detail => ({
        id: detail.id,
        roomTypeId: detail.roomType?.id,
        quantity: detail.quantity
    }))
    if (bookingData.value.checkInDate && bookingData.value.checkOutDate) {
        await bookingStore.getAvailableRoomsByDate(bookingData.value.checkInDate, bookingData.value.checkOutDate)
        console.log("Danh sách phòng trống:", bookingStore.listRoomsAvailable);

    }
    const data = cloneDeep(props.Booking)
    originalBookingData.value = data

    isDirty.value = false
})

// Reload lại danh sách loại phòng
const reloadDataRoomType = async () => {
    bookingData.value.bookingDetails = []
    bookingData.value.bookingDetails = cloneDeep(originalBookingData.value?.bookingDetails)
    setTimeout(() => {
        isDirty.value = false
    }, 50)
}

defineExpose({
    reloadDataRoomType
})
// Cập nhật STAY
const stayList = ref(updateBooking.value.stayRequest)
const addStay = () => {
    if (totalBookedRoom.value <= totalStay.value) {
        toast.error("Số lượt ở vượt quá số lượng phòng đã đặt!", {
            description: "Vui lòng cập nhật số lượng phòng trước khi xếp phòng."
        })
        return;
    }
    updateBooking.value.stayRequest.push({
        roomId: 0,
        roomNumber: '0',
        stayStatus: 'NOW',
        note: '',
        actualCheckIn: formatDateWithTime(new Date(), new Date().getHours(), new Date().getMinutes(), 0),
        actualCheckOut: formatDateWithTime(bookingData.value.checkOutDate),
        infoGuests: [{
            name: '',
            phone: '',
            cccd: '',
            occupantType: ''
        }]
    })
}
// Thêm khách vào lượt ở
const addGuestToStay = (stayIndex: number) => {
    stayList.value[stayIndex].infoGuests.push({
        name: '',
        phone: '',
        cccd: '',
        occupantType: ''
    })
}

// Cập nhật lại số lượng phòng
const handleUpdateQuantityRoom = async () => {

    updateBooking.value.bookingDetailRequest = bookingData.value.bookingDetails.map(detail => ({
        id: detail.id,
        roomTypeId: detail.roomType?.id,
        quantity: detail.quantity
    }))
    originalBookingData.value.bookingDetails = cloneDeep(bookingData.value.bookingDetails)
    isDirty.value = false
    await bookingDetailStore.updateBookingDetail(updateBooking.value.bookingDetailRequest, bookingData.value.id)
    await bookingStore.getBookings
    await bookingStore.updatePriceForBooking(bookingData.value.id)
}
// Validate và xác nhận đặt phòng
const validateStayBeforeSubmit = (): boolean => {
    if (totalBookedRoom.value === 0 && totalStay.value === 0) {
        toast.error("Vui lòng chọn số lượng phòng và số lượt ở!")
        return false;
    }
    if (totalBookedRoom.value < totalStay.value) {
        toast.error("Số lượt ở vượt quá số lượng phòng đã đặt!")
        return false;
    }
    if (totalBookedRoom.value > totalStay.value) {
        toast.error("Chưa đủ số lượt ở, Vui lòng thêm đủ số lượng phòng!")
        return false;
    }
    stayList.value.forEach((stay, index) => {
        if (stay.roomNumber === '') {
            toast.error(`Vui lòng chọn số phòng: Lượt ở ${index + 1}`)
            return false;
        }
    })
    stayList.value.forEach((stay, index) => {
        stay.infoGuests.forEach((guest, guestIndex) => {
            if (guest.name === '' || guest.occupantType === '') {
                toast.error(`Vui lòng nhập đủ thông tin người ở gồm 'tên' và 'loại người ở'`)
                return false;
            }
        })
    })
    return true
}

const handleConfirm = async (bookingID: number) => {
    const routerData = router.resolve({
        name: 'booking-detail',
        params: { id: bookingID }
    })
    window.open(routerData.href, '_blank')
    if (!validateStayBeforeSubmit()) {
        return;
    }
    const newStay: StayCreateRequest[] = updateBooking.value.stayRequest.map(stay => {
        return {
            roomId: stay.roomId,
            bookingId: bookingData.value.id,
            note: stay.note,
            actualCheckIn: stay.actualCheckIn,
            actualCheckOut: stay.actualCheckOut,
            infoGuests: stay.infoGuests
        }
    })

    await StayStore.createStay(newStay)



    // console.log("BookingDataJSON: ", JSON.stringify(updateBooking.value, null, 2));
    // console.log("StayJSON: ", JSON.stringify(newStay, null, 2));
}
</script>
