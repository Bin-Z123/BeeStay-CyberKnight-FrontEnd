<template>
    <Dialog>
        <DialogContent class="max-w-2xl">
            <div>
                <form class="flex flex-col gap-4">
                    <div>
                        <h1 class="text-2xl text-muesli-400 font-bold">Thông tin khách hàng</h1>
                    </div>
                    <hr>
                    <div class="flex lg:flex-row flex-col gap-4">
                        <div class="lg:w-1/2">
                            <div class="mb-4">
                                <label for="name" class="block text-sm font-medium text-gray-700">Họ và Tên</label>
                                <input type="text"
                                    class="w-full h-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-muesli-200 shadow-sm shadow-muesli-300 px-5 text-center"
                                    placeholder="Nhập họ và tên" />
                            </div>
                            <div class="mb-4">
                                <label for="sdt" class="block text-sm font-medium text-gray-700">Số Điện Thoại</label>
                                <input type="text"
                                    class="w-full h-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-muesli-200 shadow-sm shadow-muesli-300 px-5 text-center"
                                    placeholder="Nhập số điện thoại" />
                            </div>
                        </div>
                        <div class="lg:w-1/2">
                            <div class="mb-4">
                                <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
                                <input type="email"
                                    class="w-full h-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-muesli-200 shadow-sm shadow-muesli-300 px-5 text-center"
                                    placeholder="Nhập email" />
                            </div>
                            <div class="mb-4">
                                <label for="cccd" class="block text-sm font-medium text-gray-700">CCCD</label>
                                <input type="text"
                                    class="w-full h-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-muesli-200 shadow-sm shadow-muesli-300 px-5 text-center"
                                    placeholder="Nhập cccd" />
                            </div>
                        </div>
                    </div>
                    <hr>
                    <div class="flex justify-end gap-2">
                        <button class="px-6 py-2 bg-gray-500 text-white font-semibold rounded-md hover:bg-gray-600">Hủy</button>
                        <button class="px-6 py-2 bg-green-600 text-white font-semibold rounded-md hover:bg-green-700">Xác Nhận Đặt Phòng</button>
                    </div>
                </form>
            </div>
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
</script>