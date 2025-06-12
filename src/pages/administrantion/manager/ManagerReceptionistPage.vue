<template>
    <section>
        <div class="flex">
            <input type="text" class="mx-4 my-3 h-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-muesli-200 shadow-sm shadow-muesli-300 px-5 text-center" placeholder="Tìm kiếm">
        </div>
        <div class="px-4">
                    <table class="w-full border border-gray-300 text-sm text-center bg-white">
                        <thead class="bg-gradient-to-r from-muesli-200 to-muesli-400 text-white">
                            <tr>
                                <th class="px-4 py-2 border">Khách Hàng</th>
                                <th class="px-4 py-2 border">Giới Tính</th>
                                <th class="px-4 py-2 border">Ngày Sinh</th>
                                <th class="px-4 py-2 border">Email</th>
                                <th class="px-4 py-2 border">Xếp Hạng</th>
                                <th class="px-4 py-2 border">Tích Điểm</th>
                                <th class="px-4 py-2 border">Tùy Chọn</th>
                            </tr>
                        </thead>
                        <tbody class="text-gray-700">
                            <tr class="hover:bg-muesli-100 transition odd:bg-white even:bg-gray-100" v-for="i in 10"
                                :key="i">
                                <td class="py-2">Bin</td>
                                <td class="py-2">Nam</td>
                                <td class="py-2">01-01-2001</td>
                                <td class="py-2">Bin@gmail.com</td>
                                <td class="py-2">Đồng</td>
                                <td class="py-2">{{ i }}</td>
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
                    <div class="bg-white h-15 shadow-lg flex items-center justify-end gap-2 px-5">
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
import { Button } from "@/components/ui/button";
</script>