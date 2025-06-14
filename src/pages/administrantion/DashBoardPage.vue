<template>
  <section>
    <div class="bg-white my-3">
      <div class="flex flex-col lg:flex-row mx-5 gap-2 items-center justify-center py-3">
        <div class="bg-muesli-300 h-38 w-full lg:w-1/5 rounded-2xl relative">
          <UserRoundCheck class="absolute right-0 m-3 text-white w-20 h-20" />
          <h1 class="text-white absolute bottom-0 text-5xl font-medium py-9 px-4">
            40
          </h1>
          <h1 class="text-white absolute bottom-0 font-medium py-3 px-4">
            Đến Trong Ngày
          </h1>
        </div>
        <div class="bg-muesli-200 h-38 w-full lg:w-1/5 rounded-2xl relative">
          <UserRoundX class="absolute right-0 m-3 text-white w-20 h-20" />
          <h1 class="text-white absolute bottom-0 text-5xl font-medium py-9 px-4">
            40
          </h1>
          <h1 class="text-white absolute bottom-0 font-medium py-3 px-4">
            Đi Trong Ngày
          </h1>
        </div>
        <div class="bg-blue-400 h-38 w-full lg:w-1/5 rounded-2xl relative">
          <Percent class="absolute right-0 m-3 text-white w-20 h-20" />
          <h1 class="text-white absolute bottom-0 text-5xl font-medium py-9 px-4">
            40
          </h1>
          <h1 class="text-white absolute bottom-0 font-medium py-3 px-4">
            Tỉ Lệ Phòng Có Khách
          </h1>
        </div>
        <div class="bg-red-400 h-38 w-full lg:w-1/5 rounded-2xl relative">
          <Users class="absolute right-0 m-3 text-white w-20 h-20" />
          <h1 class="text-white absolute bottom-0 text-5xl font-medium py-9 px-4">
            40
          </h1>
          <h1 class="text-white absolute bottom-0 font-medium py-3 px-4">
            Phòng Có Khách
          </h1>
        </div>
        <div class="bg-green-400 h-38 w-full lg:w-1/5 rounded-2xl relative">
          <DoorOpen class="absolute right-0 m-3 text-white w-20 h-20" />
          <h1 class="text-white absolute bottom-0 text-5xl font-medium py-9 px-4">
            40
          </h1>
          <h1 class="text-white absolute bottom-0 font-medium py-3 px-4">
            Phòng Trống
          </h1>
        </div>
      </div>
    </div>
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 mx-4">
      <div class="rounded-2xl overflow-hidden shadow border-15 h-[460px] border-white">
        <iframe
          class="w-full h-full"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d21301.168989155052!2d106.6171142580535!3d10.840257303855612!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752a35d7ac0871%3A0x3e3049f42134f17d!2zMUYgMTYsIELDoCDEkGnhu4NtLCBIw7NjIE3DtG4sIEjhu5MgQ2jDrCBNaW5oLCBWaeG7h3QgTmFt!5e1!3m2!1svi!2s!4v1749474727461!5m2!1svi!2s"
          style="border:0"
          allowfullscreen
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>

      <div class="bg-white rounded-2xl p-5 shadow h-[460px] overflow-hidden">
        <RouterLink to="/administration/statistics">
          <BarChart :data="data" class="w-full h-full" />
        </RouterLink>
      </div>
    </div>
  </section>
</template>
<script setup lang="ts">
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
