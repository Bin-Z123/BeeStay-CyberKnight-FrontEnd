<template>
    <section>
        <div class="flex">
            <div class="w-2/3">
                <div class="flex gap-2 items-center">
                    <VueDatePicker :format-locale="vi" v-model="dateS" :format="'dd-MM-yyyy'" :select-text="'Chọn'"
                        range multi-calendars :min-date="new Date()" :cancel-text="'Hủy'"
                        class="w-2/6 h-10  border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-muesli-200 mb-3  my-3 ms-4 text-center" />

                    <div class="relative w-2/8">
                        <select name="" id=""
                            class="appearance-none w-full h-10 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-muesli-200 mb-3 shadow-sm shadow-muesli-300 my-3 text-center">
                            <option value="">VIP</option>
                            <option value="">Thường</option>
                        </select>
                        <div class="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                            <ChevronDown class="w-5 h-5 text-gray-400" />
                        </div>
                    </div>
                    <input type="text"
                        class="w-2/8 h-10 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-muesli-200 mb-3 shadow-sm shadow-muesli-300 my-3 text-center"
                        placeholder="Tìm kiếm">
                </div>
            </div>

            <div class="w-1/3">
                <div class="flex justify-end px-4">
                    <!-- Btn bật dialog -->
                    <Button @click="isOpenBooking = true"
                        class="bg-white text-muesli-400 border border-muesli-400 hover:bg-muesli-400 hover:text-white px-4 my-3">
                        Thêm
                    </Button>
                </div>
            </div>
        </div>

        <div class="shadow-lg px-4 pb-4 h-[622px]">
            <table class="w-full border border-gray-300 text-sm text-center bg-white">
                <thead class="bg-gradient-to-r from-muesli-200 to-muesli-400 text-white">
                    <tr>
                        <th class="px-4 py-2 border">Khách Hàng</th>
                        <th class="px-4 py-2 border">Ngày Đến</th>
                        <th class="px-4 py-2 border">Ngày Đi</th>
                        <th class="px-4 py-2 border">Loại Phòng</th>
                        <th class="px-4 py-2 border">Email</th>
                        <th class="px-4 py-2 border">SĐT</th>
                        <th class="px-4 py-2 border">Trạng Thái</th>
                        <th class="px-4 py-2 border">Tùy Chọn</th>
                    </tr>
                </thead>
                <tbody class="text-gray-700">
                    <tr class="hover:bg-muesli-100 transition odd:bg-white even:bg-gray-100" v-for="i in 10" :key="i">
                        <td class="py-2">Bin</td>
                        <td class="py-2">06-07-2025</td>
                        <td class="py-2">06-07-2025</td>
                        <td class="py-2">VIP</td>
                        <td class="py-2">Bin@gmail.com</td>
                        <td class="py-2">1234567123</td>
                        <td class="py-2">Chưa Thanh Toán</td>
                        <td class="py-2 flex justify-center items-center gap-5 h-full">
                            <button
                                class="bg-white text-muesli-400 border border-muesli-400 hover:bg-muesli-400 hover:text-white py-[9px] px-3 rounded-lg">
                                <LockKeyhole class="w-4 h-4" />
                            </button>
                            <Button
                                class="bg-white text-muesli-400 border border-muesli-400 hover:bg-muesli-400 hover:text-white">
                                <SquarePen />
                            </Button>
                        </td>
                    </tr>
                </tbody>
            </table>
            <div class="bg-white h-15 mb-4 shadow-lg flex items-center justify-end gap-2 px-5">
                <input type="text" class="w-12 h-8 border border-gray-300 rounded-sm text-center" disabled
                    value="1" /><span>of 16</span>
                <button class="hover:bg-muesli-100 w-10 h-10 flex items-center justify-center rounded-4xl">
                    <ChevronLeft />
                </button>
                <button class="hover:bg-muesli-100 w-10 h-10 flex items-center justify-center rounded-4xl">
                    <ChevronRight />
                </button>
            </div>
        </div>
    </section>
</template>
<script setup lang="ts">
import {
    ChevronDown,
    SquarePen,
    LockKeyhole,
    ChevronLeft,
    ChevronRight,
} from "lucide-vue-next";
import { ref, onMounted } from "vue";
import { Button } from "@/components/ui/button";
import { vi } from "date-fns/locale";
const isOpenBooking = ref(false);
const dateS = ref([] as Date[]);

onMounted(() => {
    const startDate = new Date();
    const endDate = new Date(new Date().setDate(startDate.getDate() + 30));
    dateS.value = [startDate, endDate];
    console.log("dateS: ", dateS.value[0]);
})
</script>