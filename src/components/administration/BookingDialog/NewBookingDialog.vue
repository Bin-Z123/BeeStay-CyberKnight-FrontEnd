<template>
    <!-- <Dialog>
        <DialogContent @pointer-down-outside.prevent
            class="sm:max-w-[425px] grid-rows-[auto_minmax(0,1fr)_auto] p-0 max-h-[90dvh]">
            <form action="">
                <DialogHeader>
                    <DialogTitle class="font-bold text-muesli-400 text-center"> Đặt Phòng Mới | Phòng {{
                        mockData.roomNumber }}
                    </DialogTitle>
                    <hr class="text-muesli-400 bg-muesli-400 h-[2px]" />
                </DialogHeader>
                <div class="grid gap-4 py-4 px-6 overflow-y-auto">
                    <div class="flex flex-col h-[300dvh] justify-between">

                        <p> This is some placeholder content to show the scrolling behavior for modals. We use repeated
                            line breaks to demonstrate how content can exceed minimum inner height, thereby showing
                            inner scrolling. When content becomes longer than the predefined max-height of modal,
                            content will be cropped and scrollable within the modal.
                        </p>
                        <p>This content should appear at the bottom after you scroll.</p>

                    </div>
                </div>
                <DialogFooter class="p-6 pt-0">
                    <Button class="bg-muesli-400 hover:bg-muesli-600 text-white px-3 py-2 rounded-sm">
                        Đặt Phòng
                    </Button>
                </DialogFooter>
            </form>
        </DialogContent>
    </Dialog> -->
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
                <div class="flex flex-col h-[1000px]">
                    <!-- TT DK -->
                    <!-- TT Trái -->
                    <div class="grid grid-cols-2 gap-5 border-2 border-muesli-300 relative h-auto w-auto p-2">
                        <div class="absolute -top-4 left-3 bg-muesli-300 text-white px-2 py-0.5 rounded-xs">Thông tin
                            đăng ký</div>
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
                    <!-- END TT -->
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
import { ref, watch } from "vue";

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
</script>