<template>
    <Dialog>
        <DialogContent @pointer-down-outside.prevent @escape-key-down.prevent>
            <form action="">
                <DialogHeader>
                    <DialogTitle class="font-bold text-muesli-400">Thêm Đặt Phòng Mới</DialogTitle>
                    <hr class="text-muesli-400 bg-muesli-400 h-[2px]" />
                </DialogHeader>
                <div class="flex">
                    <div class="w-1/2 flex flex-col gap-2">
                        <div class="bg-white shadow-lg h-40 w-40 rounded-2xl">

                        </div>
                        <div class="bg-muesli-200 h-40 w-40">

                        </div>
                    </div>
                    <div class="w-1/2 bg-amber-400">
                        
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
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
</script>