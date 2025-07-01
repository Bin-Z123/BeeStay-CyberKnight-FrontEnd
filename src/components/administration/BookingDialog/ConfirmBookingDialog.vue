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
            <!-- Thông tin đã đăng ký -->
            <div class="grid gap-4 py-4 overflow-y-auto px-6">
                <div class="flex flex-col h-[1000px] space-y-4">
                    <div class="grid grid-cols-2 gap-5 border-2 border-muesli-500 relative h-auto w-auto p-2">
                        <div class="absolute -top-4 left-3 bg-muesli-300 text-white px-2 py-0.5 rounded-xs">Thông tin đã
                            đăng ký</div>
                    </div>
                </div>
            </div>
            <!-- Xếp phòng -->
            <div class="grid gap-4 py-4 overflow-y-auto px-6">
                <div class="flex flex-col h-[1000px] space-y-4">
                    <div class="grid grid-cols-2 gap-5 border-2 border-muesli-500 relative h-auto w-auto p-2">
                        <div class="absolute -top-4 left-3 bg-muesli-300 text-white px-2 py-0.5 rounded-xs">Xếp Phòng
                        </div>
                    </div>
                </div>
            </div>
            <DialogFooter class="p-6 pt-0">
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
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    Booking,
    BookingResponse,
    BookingStatus,
    BlacklistStatus
} from "@/interface/booking.interface";
import { ref, watch } from "vue";

const props = defineProps<{ Booking: Booking }>()
const bookingData = ref<Booking>(props.Booking)

watch(() => props.Booking, (newVal) => {
    bookingData.value = { ...newVal }
})
</script>
