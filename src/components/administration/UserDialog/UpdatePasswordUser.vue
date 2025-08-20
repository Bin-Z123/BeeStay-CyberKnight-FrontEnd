<template>
    <Dialog>
        <DialogContent>
            <h1 class="font-bold text-muesli-400 text-2xl">Đổi mật khẩu</h1>
            <hr class="bg-muesli-200 h-1">
            <div>
                <form>
                    <div class="flex flex-col gap-3">
                        <div>
                            <label for="password" class="text-muesli-400">Nhập Mật Khẩu Mới</label>
                            <input type="text"
                                class="w-full h-10 rounded-lg focus:outline-none px-5 text-center shadow-sm border-gray-300 focus:ring-2 focus:ring-muesli-200 shadow-muesli-300"
                                placeholder="Nhập mật khẩu" />
                        </div>
                        <div>
                            <label for="passwordcheck" class="text-muesli-400">Xác Nhận Mật Khẩu Mới</label>
                            <input type="text"
                                class="w-full h-10 rounded-lg focus:outline-none px-5 text-center shadow-sm border-gray-300 focus:ring-2 focus:ring-muesli-200 shadow-muesli-300"
                                placeholder="Nhập mật khẩu" />
                        </div>
                    </div>
                    <div class="flex justify-end mt-4 gap-4">
                        <button class="px-4 py-2 bg-muesli-400 rounded-lg text-white border border-muesli-400 hover:bg-white hover:text-muesli-400 transition-all duration-300 hover:scale-105">Lưu</button>
                    </div>
                </form>
            </div>
        </DialogContent>
    </Dialog>
</template>
<script setup>
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
</script>