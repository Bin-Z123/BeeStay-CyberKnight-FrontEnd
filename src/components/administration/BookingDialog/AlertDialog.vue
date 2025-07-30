<template>
    <AlertDialog v-model:open="dialogVisible" @update:open="handleDialogClose">
        <AlertDialogContent>
            <AlertDialogHeader>
                <AlertDialogTitle>Bạn có thật sự muốn trả phòng ngay bây giờ? | ID: {{ IdBooking }}</AlertDialogTitle>
                <AlertDialogDescription>
                    <ul class="list-disc ">
                        <li>Hành động này chỉ nên được thực hiện khi khách trả phòng sớm/muộn trên 1 ngày. </li>
                        <li>Nếu khách trả phòng đúng hạn, bạn nên chọn "<b>Trả phòng</b>"</li>
                        <li>Hành động này sẽ <b>không thể hoàn tác.</b>
                        </li>
                    </ul>

                </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
                <AlertDialogCancel>Hủy</AlertDialogCancel>
                <Button variant="destructive" @click="openTabBooking(IdBooking)" class="bg-red-600 disabled:bg-gray-400"
                    :disabled="isActionDisabled || isLoading">
                    <span v-if="isLoading" class="flex items-center space-x-1">
                        <Loader class="animate-spin inline-block" /> <span>Đang cập đặt phòng</span>
                    </span> <span v-else>{{ actionButtonText }}</span></Button>
            </AlertDialogFooter>
        </AlertDialogContent>
    </AlertDialog>
</template>

<script setup lang="ts">
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Loader } from 'lucide-vue-next';
import { Button } from '@/components/ui/button'
import { computed, ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import { Bookings } from '@/api/booking';
import { toast } from 'vue-sonner';

const bookingStore = Bookings()
const router = useRouter()
const isLoading = ref(false)

const props = defineProps<{ IdBooking: number, open: boolean }>()
const emit = defineEmits(['update:open'])
const dialogVisible = computed({
    get: () => props.open,
    set: (val: boolean) => emit('update:open', val)
})
// Ngăn người dùng đóng dialog khi đang loading
const handleDialogClose = (newOpenState: boolean) => {
    if (isLoading.value) {
        // Nếu đang loading, không cho phép đóng, giữ nguyên trạng thái mở
        emit('update:open', true);
        return;
    }
    // Nếu không loading, cho phép đóng
    emit('update:open', newOpenState);
};

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))
const openTabBooking = async (id: number) => {
    isLoading.value = true
    try {
        await bookingStore.checkoutBooking(id)
        await delay(2000)

        const routerData = router.resolve({
            name: 'booking-detail',
            params: { id: id }
        })
        window.open(routerData.href, '_blank');

    } catch (error) {
        toast.error("Trả phòng thất bại, vui lòng thử lại sau")
    } finally {
        isLoading.value = false
        dialogVisible.value = false
    }

}
// --- State cho việc đếm ngược ---
const isActionDisabled = ref(true); // 1. Bắt đầu với trạng thái khóa
const countdown = ref(3); // 2. Thời gian đếm ngược
let intervalId: number | undefined = undefined;


// --- Computed property cho nội dung nút ---
const actionButtonText = computed(() => {
    if (isActionDisabled.value) {
        return `Trả phòng (${countdown.value}s)`;
    }
    return 'Trả phòng';
});

// --- Watch: Theo dõi khi dialog được mở/đóng ---
watch(() => props.open, (isOpen) => {
    // Khi dialog được MỞ
    if (isOpen) {

        // Reset lại trạng thái ban đầu
        isActionDisabled.value = true;
        countdown.value = 3;

        // Bắt đầu đếm ngược
        intervalId = window.setInterval(() => {
            countdown.value -= 1;
            console.log(countdown.value);
            if (countdown.value <= 0) {
                clearInterval(intervalId);
                isActionDisabled.value = false; // Mở khóa nút
            }
        }, 1000);
    } else {
        // Khi dialog được ĐÓNG (quan trọng để dọn dẹp)
        if (intervalId) {
            clearInterval(intervalId);
        }
    }
});
</script>