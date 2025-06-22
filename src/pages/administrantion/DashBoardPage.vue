<template>
  <section>
    <div class="bg-white my-3">
      <div class="flex flex-col lg:flex-row mx-5 gap-2 items-center justify-center py-3">
        <div class="bg-muesli-300 h-38 w-full lg:w-1/5 rounded-2xl relative">
          <UserRoundCheck class="absolute right-0 m-3 text-white w-18 h-18" />
          <h1 v-if="statistic.statisticCheckin" class="text-white absolute bottom-0 text-5xl font-medium py-9 px-4">
            {{ statistic.statisticCheckin.data }}
          </h1>
          <h1 class="text-white absolute bottom-0 font-medium py-3 px-4">
            Đến Trong Ngày
          </h1>
        </div>
        <div class="bg-muesli-200 h-38 w-full lg:w-1/5 rounded-2xl relative">
          <UserRoundX class="absolute right-0 m-3 text-white w-18 h-18" />
          <h1 v-if="statistic.statisticCheckout" class="text-white absolute bottom-0 text-5xl font-medium py-9 px-4">
            {{ statistic.statisticCheckout.data }}
          </h1>
          <h1 class="text-white absolute bottom-0 font-medium py-3 px-4">
            Đi Trong Ngày
          </h1>
        </div>
        <div class="bg-red-400 h-38 w-full lg:w-1/5 rounded-2xl relative">
          <Users class="absolute right-0 m-3 text-white w-18 h-18" />
          <h1 v-if="statistic.statisticRoomActive" class="text-white absolute bottom-0 text-5xl font-medium py-9 px-4">
            {{ statistic.statisticRoomActive.data }}
          </h1>
          <h1 class="text-white absolute bottom-0 font-medium py-3 px-4">
            Phòng Có Khách
          </h1>
        </div>
        <div class="bg-green-400 h-38 w-full lg:w-1/5 rounded-2xl relative">
          <DoorOpen class="absolute right-0 m-3 text-white w-18 h-18" />
          <h1 v-if="statistic.statisticRoomInactive"
            class="text-white absolute bottom-0 text-5xl font-medium py-9 px-4">
            {{ statistic.statisticRoomInactive.data }}
          </h1>
          <h1 class="text-white absolute bottom-0 font-medium py-3 px-4">
            Phòng Trống
          </h1>
        </div>
        <div class="bg-blue-400 h-38 w-full lg:w-1/5 rounded-2xl relative">
          <Percent class="absolute right-0 m-3 text-white w-18 h-18" />
          <h1 v-if="statistic.statisticActive" class="text-white absolute bottom-0 text-5xl font-medium py-9 px-4">
            {{ statistic.statisticActive.data }}
          </h1>
          <h1 class="text-white absolute bottom-0 font-medium py-3 px-4">
            Tỉ Lệ Phòng Có Khách
          </h1>
        </div>
        <div class="bg-yellow-500 h-38 w-full lg:w-1/5 rounded-2xl relative">
          <Percent class="absolute right-0 m-3 text-white w-18 h-18" />
          <h1 v-if="statistic.statisticCancel" class="text-white absolute bottom-0 text-5xl font-medium py-9 px-4">
            {{ statistic.statisticCancel.data }}
          </h1>
          <h1 class="text-white absolute bottom-0 font-medium py-3 px-4">
            Tỉ Lệ Phòng Bị Hủy
          </h1>
        </div>
      </div>
    </div>
    <div class="flex flex-col lg:flex-row gap-4 mx-4">
      <div class="rounded-2xl overflow-hidden shadow border-15 h-[460px] border-white lg:w-1/3 w-full">
        <iframe class="w-full h-full"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d21301.168989155052!2d106.6171142580535!3d10.840257303855612!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752a35d7ac0871%3A0x3e3049f42134f17d!2zMUYgMTYsIELDoCDEkGnhu4NtLCBIw7NjIE3DtG4sIEjhu5MgQ2jDrCBNaW5oLCBWaeG7h3QgTmFt!5e1!3m2!1svi!2s!4v1749474727461!5m2!1svi!2s"
          style="border:0" allowfullscreen loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
      </div>

      <div class="bg-white rounded-2xl p-5 shadow h-[460px] overflow-hidden lg:w-2/3 w-full">
        <RouterLink to="/administration/statistics">
          <BarChart v-if="chartData.length" :data="chartData" class="w-full h-full" />
        </RouterLink>
      </div>
    </div>
  </section>
</template>
<script setup lang="ts">
import { ref, onMounted } from "vue";
import { computed } from "vue";
import BarChart from "@/components/ui/barChart/BarChart.vue";
import {
  UserRoundCheck,
  UserRoundX,
  Percent,
  Users,
  DoorOpen,
} from "lucide-vue-next";
import { statistics } from "@/api/statistic";
const statistic = statistics();

const rawChartData = ref<any[][]>([]);

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


onMounted(async () => {
  await Promise.all([
    statistic.getStatisticActive(),
    statistic.getStatisticCancel(),
    statistic.getStatisticCheckin(),
    statistic.getStatisticCheckout(),
    statistic.getStatisticRoomActive(),
    statistic.getStatisticRoomInactive(),
    statistic.getChartData(new Date().getFullYear().toString()),
  ]);
  rawChartData.value = statistic.statisticChart?.data || [];
  console.log("Chart Data:", rawChartData.value);
});
</script>
