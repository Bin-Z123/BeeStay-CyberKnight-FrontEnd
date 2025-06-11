<template>
    <section>
        <div class="relative w-2/10 mx-4">
            <select name="" id=""
                class="appearance-none w-full h-10 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-muesli-200 mb-3 shadow-sm shadow-muesli-300 my-3 text-center">
                <option value="">2024</option>
                <option value="">2025</option>
            </select>
            <div class="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                <ChevronDown class="w-5 h-5 text-gray-400" />
            </div>
        </div>
        <div class="flex justify-center">
            <div class="w-1/2">
                <div class="flex flex-col justify-center">
                    <div class="bg-white shadow-sm mx-4 rounded-2xl">
                        <BarChart :data="data" class="m-5 my-15 px-5" />
                    </div>
                    <div class="bg-white shadow-sm mx-4 rounded-2xl mt-4 relative">
                        <ChartNoAxesCombined class="text-muesli-400 absolute right-0 m-5 w-30 h-30" />
                        <div class="flex flex-col justify-center mx-5 my-10">
                            <h1 class="font-bold">Tổng Doanh Thu</h1>
                            <h1 class="text-muesli-400 font-bold text-3xl">10.000.000 VNĐ</h1>
                            <h1 class="text-gray-400">(2025)</h1>
                        </div>
                    </div>
                </div>
            </div>
            <div class="w-1/2">
                <div class="bg-white shadow-sm h-full me-4 rounded-2xl">
                    <div class="px-4">
                        <h1 class="font-bold pt-6">10 Khách Hàng Nhiều Điểm Nhất</h1>
                        <table class="w-full border border-gray-300 text-sm text-center bg-white my-3">
                            <tbody class="text-gray-700">
                                <tr class="hover:bg-muesli-100 transition odd:bg-white even:bg-gray-100" v-for="i in 10" :key="i">
                                    <td class="py-3.5">{{ i }}</td>
                                    <td class="py-3.5">Võ Thanh Bin</td>
                                    <td class="py-3.5">1000{{ i }}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
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
    ChartNoAxesCombined,
} from "lucide-vue-next";
import BarChart from "@/components/ui/barChart/BarChart.vue";
import {
    UserRoundCheck,
    UserRoundX,
    Percent,
    Users,
    DoorOpen,
} from "lucide-vue-next";
const data = [
    { name: "Jan", total: 1500, predicted: 1800 },
    { name: "Feb", total: 1300, predicted: 1700 },
    { name: "Mar", total: 1700, predicted: 1600 },
    { name: "Apr", total: 1800, predicted: 1900 },
    { name: "May", total: 2000, predicted: 2100 },
    { name: "Jun", total: 1400, predicted: 1500 },
];
</script>