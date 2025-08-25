<template>
    <section>
        <div class="relative w-2/10 mx-4">
            <select v-model="selectYear"
                class="appearance-none w-full h-10 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-muesli-200 mb-3 shadow-sm shadow-muesli-300 my-3 text-center">
                <option v-for="year in [2025, 2026, 2027, 2028]" :key="year" :value="year">{{ year }}</option>
            </select>
            <div class="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                <ChevronDown class="w-5 h-5 text-gray-400" />
            </div>
        </div>
        <div class="flex justify-center">
            <div class="w-1/2">
                <div class="flex flex-col justify-center">
                    <div class="bg-white shadow-sm mx-4 rounded-2xl">
                        <BarChart v-if="chartData.length" :data="chartData" class="m-5 my-15 px-5" />
                        <BarChart v-else :data="chartData" class="m-5 my-15 px-5"></BarChart>
                    </div>
                    <div class="bg-white shadow-sm mx-4 rounded-2xl mt-4 relative">
                        <ChartNoAxesCombined class="text-muesli-400 absolute right-0 m-5 w-30 h-30" />
                        <div class="flex flex-col justify-center mx-5 my-10">
                            <h1 class="font-bold">Tổng Doanh Thu</h1>
                            <h1 class="text-muesli-400 font-bold text-3xl">{{ totalYear.total.toLocaleString("vi-VI") }}
                                VNĐ</h1>
                            <h1 class="text-gray-400">({{ totalYear.year }})</h1>
                        </div>
                    </div>
                </div>
            </div>
            <div class="w-1/2">
                <div class="bg-white shadow-sm h-full me-4 rounded-2xl">
                    <div class="px-4">
                        <h1 class="font-bold pt-6">Khách hàng của năm {{ selectYear }}</h1>
                        <table class="w-full border border-gray-300 text-sm text-center bg-white my-3">
                            <tbody class="text-gray-700">
                                <tr class="hover:bg-muesli-100 transition odd:bg-white even:bg-gray-100"
                                    v-for="(user, index) in filterSumPriceBookingByYear" :key="user.email">
                                    <td class="py-3.5">{{ index + 1 }}</td>
                                    <td class="py-3.5">{{ user.email }}</td>
                                    <td class="py-3.5">{{ user.total }}</td>
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
    ChartNoAxesCombined,
} from "lucide-vue-next";
import { ref, computed, onMounted, watchEffect, watch } from "vue";
import BarChart from "@/components/ui/barChart/BarChart.vue";
import { statistics } from "@/api/statistic";
import { Bookings } from "@/api/booking";
import { User } from "@/api/user";

const booking = Bookings();
const statistic = statistics();
const user = User();

const rawChartData = ref<any[][]>([]);
const selectYear = ref(new Date().getFullYear().toString());

const chartData = computed(() => {
    const raw = rawChartData.value;
    if (!raw || !Array.isArray(raw)) return [];
    const filtered = raw.filter((item) => {
        const label = String(item[3] || '').toUpperCase().trim();
        return label.includes('TOTAL') && label.includes('MONTH') && item[1] !== null;
    });
    return filtered.map((item) => ({
        name: `Tháng ${item[1]}`,
        total: item[2],
        predicted: 0,
    }));
});

const totalYear = computed(() => {
    const yearData = rawChartData.value.find(item => item[3] === "TOTAL YEAR");
    return yearData ? { total: yearData[2], year: yearData[0] } : { total: 0, year: selectYear.value };
})

const sortedUsers = computed(() => {
    return [...user.users].filter(user => user.role.id === 1).sort((a, b) => b.point - a.point).slice(0, 10);
})

onMounted(async () => {
    // await statistic.getChartData(selectYear.value);
    // await booking.getBookings();
    // rawChartData.value = statistic.statisticChart?.data || [];
    await user.getAllUser();
    await booking.getBookings();
    console.log("Thông tin", filterSumPriceBookingByYear.value);
})

watch(selectYear, async (newYear) => {
    if (!newYear) return;
    await statistic.getChartData(newYear);
    await booking.getBookings();
    rawChartData.value = statistic.statisticChart?.data || [];
})

// Lọc và tính tổng tiền theo email trong năm được chọn
const filterSumPriceBookingByYear = computed(() => {
    const filtered = booking.bookings.filter(booking => {
        const bookingYear = new Date(booking.bookingDate).getFullYear().toString();
        return bookingYear === selectYear.value;
    });

    const sumBuEmail: { [key: string]: number } = {};
    filtered.forEach(booking => {
        const email = booking.guestBooking?.email || booking.user?.email || 'Unknown';
        if (!sumBuEmail[email]) {
            sumBuEmail[email] = 0;
        }
        sumBuEmail[email] += booking.totalAmount;
    });

    return Object.entries(sumBuEmail).map(([email, total]) => ({ email, total }));
})

watchEffect(async () => {
    if (!selectYear.value) return;
    await statistic.getChartData(selectYear.value);
    await booking.getBookings();
    rawChartData.value = statistic.statisticChart?.data || [];
});

</script>