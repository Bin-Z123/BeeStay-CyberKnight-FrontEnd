<template>
    <AlertDialog v-model:open="dialogVisible" :default-open="dialogVisible">
        <AlertDialogContent>
            <AlertDialogHeader>
                <AlertDialogTitle>Bạn chắc chắn muốn hủy phòng {{ Booking }}</AlertDialogTitle>
                <AlertDialogDescription>
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Culpa impedit veniam rerum temporibus
                    itaque est tenetur optio cupiditate accusantium quaerat quos non fugiat saepe, nesciunt, vero dicta
                    atque voluptate. Illo!
                </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
                <AlertDialogCancel>Thoát</AlertDialogCancel>
                <Button @click="handleCancelBooking" :disabled="isVisible || isLoadingCancelBooking || isLoading"
                    class="disabled:bg-gray-400 disabled:cursor-not-allowed bg-red-600"><span
                        v-if="isLoadingCancelBooking || isLoading" class="flex items-center space-x-1">
                        <Loader class="animate-spin inline-block" /> <span>Đang hủy phòng</span>
                    </span><span v-else>{{
                        actionText }}</span> </Button>
            </AlertDialogFooter>
        </AlertDialogContent>
    </AlertDialog>
</template>
<script setup lang="ts">
import { Loader } from 'lucide-vue-next';
import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { computed, watch } from 'vue';
import { Button } from '@/components/ui/button';
import { ref } from 'vue';
import { toast } from 'vue-sonner';
import { nextTick } from 'vue';
import { useCancelBooking } from '@/hook/useBooking';

import { resolve } from 'path';

const emit = defineEmits(['update:open'])
const props = defineProps<{
    open: boolean,
    Booking: any
}>()
const dialogVisible = computed({
    get: () => props.open,
    set: (val: boolean) => emit('update:open', val)
})
const actionText = computed(() => {
    if (isVisible.value) {
        return `Xác Nhận (${countDown.value}s)`
    }
    return 'Xác Nhận'
})

const { isPending: isLoadingCancelBooking, mutateAsync: cancelBooking } = useCancelBooking()
const countDown = ref(3)
const isVisible = ref(true)
let intervalId: number | undefined = undefined;

watch(() => props.open, async (isOpen) => {
    await nextTick()
    if (isOpen) {
        countDown.value = 3
        isVisible.value = true

        intervalId = window.setInterval(() => {
            countDown.value -= 1
            if (countDown.value <= 0) {
                clearInterval(intervalId)
                isVisible.value = false
            }
        }, 1000)
    } else {
        if (intervalId) {
            clearInterval(intervalId)
        }
    }

})
const bookingID = computed(() => {
    return props.Booking
})
const isLoading = ref(false)
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))
const handleCancelBooking = async () => {
    isLoading.value = true
    try {
        await cancelBooking(bookingID.value)
        await delay(2000)

        dialogVisible.value = false
    } catch (error) {
        toast.error("Hủy phòng thất bại, vui lòng thử lại sau")
    } finally {
        isLoading.value = false
    }

}
</script>