<template>
    <Dialog :open="open" @update:open="emit('update:open', $event)">
        <DialogContent class="sm:max-w-[425px]" @pointer-down-outside.prevent @escape-key-down.prevent>
            <form action="" class="flex flex-col gap-3">
                <DialogHeader>
                    <DialogTitle class="font-bold text-muesli-400">Thêm Phòng Mới</DialogTitle>
                    <hr class="text-muesli-400 bg-muesli-400 h-[2px]" />
                </DialogHeader>
                <div>
                    <label class="text-muesli-400">Số Phòng</label><br />
                    <input type="text"
                        class="w-full h-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-muesli-200 shadow-sm shadow-muesli-300 px-5 text-center"
                        placeholder="Nhập số phòng" />
                </div>
                <div>
                    <label class="text-muesli-400">Tầng</label><br />
                    <input type="number"
                        class="w-full h-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-muesli-200 shadow-sm shadow-muesli-300 px-5 text-center"
                        placeholder="Nhập tầng" />
                </div>
                <div>
                    <label class="text-muesli-400">Loại Phòng</label><br />
                    <div class="relative">
                        <select name="" id=""
                            class="appearance-none w-full h-10 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-muesli-200 shadow-sm shadow-muesli-300 text-center">
                            <option value="">Thường</option>
                            <option value="">VIP</option>
                        </select>
                        <div class="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                            <ChevronDown class="w-5 h-5 text-gray-400" />
                        </div>
                    </div>
                </div>
                <div>
                    <label class="text-muesli-400">Trạng Thái</label><br />
                    <div class="relative">
                        <select name="" id=""
                            class="appearance-none w-full h-10 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-muesli-200 shadow-sm shadow-muesli-300 text-center">
                            <option value="">Đang dọn dẹp</option>
                            <option value="">Đang sử dụng</option>
                        </select>
                        <div class="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                            <ChevronDown class="w-5 h-5 text-gray-400" />
                        </div>
                    </div>
                </div>
                <DialogFooter>
                    <Button type="submit" class="bg-muesli-400 hover:bg-muesli-600 text-white px-3 py-2 rounded-sm">
                        Lưu
                    </Button>
                </DialogFooter>
            </form>
        </DialogContent>
    </Dialog>
</template>
<script setup lang="ts">
import {
    ChevronDown,
    SquarePen,
    LockKeyhole,
    ChevronLeft,
    ChevronRight,
} from "lucide-vue-next";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
const emit = defineEmits<{
    (e: "update:open", value: boolean): void;
}>();
defineProps<{
    open: boolean;
}>();
</script>