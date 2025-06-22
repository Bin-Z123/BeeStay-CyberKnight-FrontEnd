<template>
    <Dialog>
        <DialogContent class="sm:max-w-[900px] grid-rows-[auto_minmax(0,1fr)_auto] p-0 max-h-[90dvh]">
            <DialogHeader class="p-6 pb-0">
                <DialogTitle class="font-bold text-muesli-400 text-center">Đặt Phòng Mới | Phòng {{
                    mockData.roomNumber }}</DialogTitle>
                <DialogDescription>
                    Make changes to your profile here. Click save when you're done.
                </DialogDescription>
            </DialogHeader>
            <div class="grid gap-4 py-4 overflow-y-auto px-6">
                <div class="flex flex-col h-[1000px] space-y-4">
                    <!-- Thông tin Người Đặt -->
                    <div class="grid grid-cols-2 gap-5 border-2 border-muesli-300 relative h-auto w-auto p-2">
                        <div class="absolute -top-4 left-3 bg-muesli-300 text-white px-2 py-0.5 rounded-xs">Thông tin
                            người đặt phòng</div>
                        <div class="h-36  grid grid-cols-3 items-center">
                            <div class="col-1 pr-2 flex flex-col items-end space-y-1">
                                <div>Họ & tên: </div>
                                <div>Sđt: </div>
                            </div>
                            <div class="col-span-2 flex flex-col space-y-1 pr-2">
                                <div>
                                    <input type="text"
                                        class="border border-muesli-300 w-full disabled:border-gray-300 disabled:bg-gray-50 disabled:text-gray-600">
                                </div>
                                <div>
                                    <input type="text"
                                        class="border border-muesli-300 w-full disabled:border-gray-300 disabled:bg-gray-50 disabled:text-gray-600">
                                </div>
                            </div>
                        </div>
                        <!-- TT Phải -->
                        <div class="h-36  grid grid-cols-3 items-center">
                            <div class="col-1 pr-2 flex flex-col items-end space-y-1">
                                <div>Email: </div>
                                <div>CCCD: </div>
                            </div>
                            <div class="col-span-2 flex flex-col space-y-1 pr-2">
                                <div>
                                    <input type="text"
                                        class="border border-muesli-300 w-full disabled:border-gray-300 disabled:bg-gray-50 disabled:text-gray-600">
                                </div>
                                <div>
                                    <input type="text"
                                        class="border border-muesli-300 w-full disabled:border-gray-300 disabled:bg-gray-50 disabled:text-gray-600">
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- END Thông tin Người Đặt -->
                    <!-- TT Đặt phòng -->
                    <!-- TT Trái -->
                    <div class="grid grid-cols-2 gap-5 border-2 border-muesli-300 relative h-auto w-auto p-2">
                        <div class="absolute -top-4 left-3 bg-muesli-300 text-white px-2 py-0.5 rounded-xs">Thông tin
                            đặt phòng</div>
                        <div class="h-36  grid grid-cols-3 items-center">
                            <div class="col-1 pr-2 flex flex-col items-end space-y-1">
                                <div>Giá: </div>
                                <div>Ngày đến: </div>
                                <div>Ngày ra dự kiến: </div>
                            </div>
                            <div class="col-span-2 flex flex-col space-y-1 pr-2">
                                <div>
                                    <input type="text" v-model="mockData.roomType.price" disabled
                                        class="border border-muesli-300 w-full disabled:border-gray-300 disabled:bg-gray-50 disabled:text-gray-600">
                                </div>
                                <div class="flex space-x-1"><input type="date" class="border border-muesli-300">
                                    <span>Lúc:</span>
                                    <input class="inline border border-muesli-300 w-full" type="text">
                                </div>
                                <div class="flex space-x-1">
                                    <input type="date" class="border border-muesli-300">
                                    <span>Lúc:</span>
                                    <input class="inline border border-muesli-300 w-full" type="text">
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
                                        <input type="text" v-model="mockData.roomType.price"
                                            class="w-2/3 border border-muesli-300  disabled:border-gray-300 disabled:bg-gray-50 disabled:text-gray-600">
                                    </div>
                                    <div>
                                        <textarea
                                            class="  w-56 border border-muesli-300 resize-y overflow-auto max-h-[200px] "></textarea>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- END TT Đặt phòng-->
                    <!-- Loại phòng gợi ý -->
                    <div class="grid grid-cols-2 gap-5 border-2 border-muesli-300 relative h-auto w-auto p-2">
                        <div class="absolute -top-4 left-3 bg-muesli-300 text-white px-2 py-0.5 rounded-xs">Loại phòng
                            còn trống</div>
                        <div v-for="(detail, index) in bookingDetails" :key="index"
                            class="col-span-2 flex items-center gap-4 mb-2">
                            <select v-model="detail.roomTypeId" class="input w-2/3">
                                <option disabled value="0">-- Chọn loại phòng --</option>
                                <option v-for="type in getAvailableRoomTypeOptions(index).value" :key="type.id"
                                    :value="type.id">
                                    {{ type.name }} ({{ type.quantityAvailable }} lượt đặt phòng)
                                </option>
                            </select>
                            <input type="number" min="1" v-model.number="detail.quantity"
                                @input="listenQuantity(detail)" :disabled="detail.roomTypeId === 0" class="input w-1/3"
                                placeholder="Số lượng" />
                            <button class="btn btn-error" @click="bookingDetails.splice(index, 1)">Xóa</button>
                        </div>
                        <button class="btn btn-info" @click="addRoomType">+ Thêm
                            loại phòng</button>
                    </div>

                    <!-- Danh sách người ở (StayRequest) -->
                    <div class="grid grid-cols-2 gap-5 border-2 border-muesli-300 relative p-2">
                        <div class="absolute -top-4 left-3 bg-muesli-300 text-white px-2 py-0.5 rounded-xs">Danh sách
                            người ở</div>
                        <div v-for="(stay, sIndex) in stayList" :key="sIndex"
                            class="col-span-2 border p-2 rounded-xl space-y-2">
                            <div class="grid grid-cols-2 gap-4">
                                <select v-model="stay.stayStatus" class="input">
                                    <option value="0" disabled selected>-- Chọn số phòng --</option>
                                    <option v-for="room in listRoomNumber" :key="room.id">{{ room.roomNumber }} Trống
                                    </option>
                                </select>
                                <!-- <input v-model="stay.roomNumber" class="input" placeholder="Số phòng" /> -->
                                <select v-model="stay.stayStatus" class="input">
                                    <option value="PENDING">PENDING</option>
                                    <option value="ONGOING">ONGOING</option>
                                    <option value="DONE">DONE</option>
                                </select>
                            </div>
                            <div class="grid grid-cols-2 gap-4">
                                <input type="datetime-local" v-model="stay.actualCheckIn" class="input" />
                                <input type="datetime-local" v-model="stay.actualCheckOut" class="input" />
                            </div>
                            <textarea v-model="stay.note" class="input w-full resize-y"
                                placeholder="Ghi chú thêm..."></textarea>

                            <div>
                                <div class="font-semibold mb-1">Thông tin khách ở:</div>
                                <div v-for="(guest, gIndex) in stay.infoGuests" :key="gIndex"
                                    class="grid grid-cols-2 gap-4 mb-2">
                                    <input v-model="guest.name" class="input" placeholder="Tên khách" />
                                    <input v-model="guest.phone" class="input" placeholder="Số điện thoại" />
                                    <input v-model="guest.cccd" class="input" placeholder="CCCD" />
                                    <input v-model="guest.occupantType" class="input" placeholder="Loại (chính/phụ)" />
                                </div>
                                <button class="btn btn-info" @click="addGuestToStay(sIndex)">+ Thêm khách ở</button>
                            </div>
                        </div>
                        <button class="btn btn-info" @click="addStay">+ Thêm lượt ở</button>
                    </div>
                </div>
            </div>
            <DialogFooter class="p-6 pt-0">
                <Button class="bg-muesli-400 hover:bg-muesli-600 text-white px-3 py-2 rounded-sm">
                    Đặt Phòng
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
import { computed, ref, watch } from "vue";
import { CreateBookingRequest } from "@/types";
import { toast } from "vue-sonner";
const props = defineProps<{
    bookingRoom: {
        id: number;
        roomNumber: string;
        roomStatus: string;
        floor: number;
        roomType: {
            id: number;
            name: string;
            size: number;
            price: number;
            peopleAbout: number;
        };
        roomImages: {
            id: number;
            url: string;
            altext: string;
            isThum: boolean;
        }[];
    }
}>();
const mockData = ref({ ...props.bookingRoom });

watch(() => props.bookingRoom, (newVal) => {
    mockData.value = { ...newVal };
})
// Xử lý Thằng booking
const newBooking: CreateBookingRequest = {
    guestBookingRequest: {
        fullname: '',
        phone: '',
        email: '',
        cccd: ''
    },
    bookingRequest: {
        checkInDate: '',
        checkOutDate: '',
        isDeposit: false,
        bookingStatus: '',
        numGuest: 1,
        userId: 1
    },
    bookingDetailRequest: [],
    bookingFacilityRequest: [],
    stayRequest: []
}

const availableRoomTypes = ref([
    {
        id: 1, name: 'Phòng đơn', quantityAvailable: 5, rooms: [{
            id: 1,
            roomNumber: "A101",
            roomStatus: "AVAILABLE",
        }, {
            id: 2,
            roomNumber: "A102",
            roomStatus: "AVAILABLE",
        }, {
            id: 3,
            roomNumber: "A103",
            roomStatus: "AVAILABLE",
        }, {
            id: 4,
            roomNumber: "A104",
            roomStatus: "AVAILABLE",
        }, {
            id: 5,
            roomNumber: "A105",
            roomStatus: "AVAILABLE",
        }]
    },
    {
        id: 2, name: 'Phòng đôi', quantityAvailable: 2, rooms: [{
            id: 3,
            roomNumber: "B101",
            roomStatus: "AVAILABLE",
        }, {
            id: 4,
            roomNumber: "B102",
            roomStatus: "AVAILABLE",
        }, {
            id: 5,
            roomNumber: "B103",
            roomStatus: "AVAILABLE",
        }, {
            id: 6,
            roomNumber: "B103",
            roomStatus: "AVAILABLE",
        }]
    },
])
const bookingDetails = ref([{ roomTypeId: 0, quantity: 1 }])
const addRoomType = () => {
    bookingDetails.value.push({ roomTypeId: 0, quantity: 1 })
}
const stayList = ref([
    {
        roomNumber: '',
        actualCheckIn: '',
        actualCheckOut: '',
        stayStatus: 'PENDING',
        note: '',
        infoGuests: [
            { name: '', phone: '', cccd: '', occupantType: '' }
        ]
    }
])
const addStay = () => {
    stayList.value.push({
        roomNumber: '',
        actualCheckIn: '',
        actualCheckOut: '',
        stayStatus: 'PENDING',
        note: '',
        infoGuests: [
            { name: '', phone: '', cccd: '', occupantType: '' }
        ]
    })
}

const addGuestToStay = (stayIndex: number) => {
    stayList.value[stayIndex].infoGuests.push({ name: '', phone: '', cccd: '', occupantType: '' })
}
// Tính lại số phòng khi nhập số phòng (Booking Detail)
const listenQuantity = (detail: any) => {
    if (detail.roomTypeId.quantityAvailable < detail.quantity) {
        toast.error('Thông báo', {
            description: 'Số lượng phòng không được vượt quá số phòng trống'
        })
        detail.quantity = 1
    }
}
interface Room {
    id: number
    roomNumber: string
    roomStatus: string
}
// Tính lại số phòng (Stay)
const listRoomNumber = computed(() => {
    const selectedRomTypeIds = bookingDetails.value
        .filter(detail => detail.roomTypeId !== 0)
        .map(detail => detail.roomTypeId);

    const rooms: Room[] = [];
    for (const typeId of selectedRomTypeIds) {
        const found = availableRoomTypes.value.find(type => type.id === typeId);
        if (found?.rooms) {
            rooms.push(...found.rooms);
        }
    }
    return rooms;
})
//  Trả ra danh sách ID loại phòng đã chọn (trừ chính mình)
const getAvailableRoomTypeOptions = (index: number) => {
    return computed(() => {
        const selectedIds = bookingDetails.value
            .map((d, i) => (i !== index ? d.roomTypeId : ''))
            .filter(id => id !== '')
        return availableRoomTypes.value.filter(rt => !selectedIds.includes(rt.id))
    })
}
</script>