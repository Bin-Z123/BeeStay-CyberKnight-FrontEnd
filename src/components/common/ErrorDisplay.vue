<template>
    <AlertDialog :open="true">
        <AlertDialogContent class="text-center max-w-md">
            <AlertDialogHeader>
                <AlertDialogTitle>Rất tiếc! 😭</AlertDialogTitle>
                <AlertDialogDescription>
                    Không thể tải thành phần. Vui lòng thử lại sau hoặc kiểm tra kết nối mạng.
                </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
                <AlertDialogCancel @click="close">Đóng</AlertDialogCancel>
            </AlertDialogFooter>
        </AlertDialogContent>
    </AlertDialog>
</template>

<script setup>
import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogFooter,
    AlertDialogTitle,
    AlertDialogDescription,
    AlertDialogCancel
} from '@/components/ui/alert-dialog'

function close() {
    // Optional: reload trang hoặc emit ra ngoài nếu xài global dialog system
    window.location.reload()
}
</script>
