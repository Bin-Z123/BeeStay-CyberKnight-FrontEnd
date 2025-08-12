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


<!-- <template>
  <section class="bg-gray-100/50 p-4 sm:p-6 lg:p-8 font-sans">
    <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
      <div>
        <h1 class="text-3xl font-bold text-gray-900">Trang tổng quan</h1>
        <p class="text-gray-500 mt-1">Chào mừng trở lại! Đây là những gì đang diễn ra hôm nay.</p>
      </div>
      <div class="text-gray-600 mt-3 sm:mt-0 flex items-center bg-white px-4 py-2 rounded-lg shadow-sm border">
        <Calendar class="inline-block w-5 h-5 mr-2 text-gray-500" />
        <span class="font-medium">{{ new Date().toLocaleDateString('vi-VN', { day: 'numeric', month: 'long', year: 'numeric' }) }}</span>
      </div>
    </div>

    <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-5 mb-8">
      <div v-for="card in statCards" :key="card.title" class="bg-white p-5 rounded-2xl shadow-sm border border-gray-200/80 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
        <div class="flex items-center justify-between">
          <h3 class="text-sm font-semibold text-gray-500 uppercase">{{ card.title }}</h3>
          <div :class="card.iconBg" class="p-2 rounded-full">
            <component :is="card.icon" class="w-5 h-5" :class="card.iconColor" />
          </div>
        </div>
        <p class="text-3xl font-bold mt-4 text-gray-800">{{ card.value }}</p>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div class="lg:col-span-1 bg-white rounded-2xl p-6 shadow-sm border border-gray-200/80">
        <h3 class="text-xl font-bold text-gray-800 mb-6">Trạng thái phòng</h3>
        <div class="space-y-6">
          <div class="text-center">
            <div class="relative w-40 h-40 mx-auto">
              <svg class="w-full h-full" viewBox="0 0 36 36">
                <path class="text-gray-200" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke-width="3.8"></path>
                <path class="text-red-500" :stroke-dasharray="`${statistic.statisticActive?.data || 0}, 100`" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke-width="3.8" stroke-linecap="round"></path>
              </svg>
              <div class="absolute inset-0 flex flex-col items-center justify-center">
                <span class="text-3xl font-bold text-gray-800">{{ statistic.statisticActive?.data || 0 }}%</span>
                <span class="text-sm text-gray-500">Có khách</span>
              </div>
            </div>
          </div>
          <div class="grid grid-cols-2 gap-4 text-center">
            <div>
              <p class="text-2xl font-bold text-gray-800">{{ statistic.statisticRoomActive?.data || 0 }}</p>
              <p class="text-sm text-gray-500">Phòng có khách</p>
            </div>
            <div>
              <p class="text-2xl font-bold text-gray-800">{{ statistic.statisticRoomInactive?.data || 0 }}</p>
              <p class="text-sm text-gray-500">Phòng trống</p>
            </div>
          </div>
        </div>
      </div>

      <div class="lg:col-span-2 flex flex-col gap-8">
        <div class="bg-white rounded-2xl p-6 shadow-sm border border-gray-200/80 flex-grow">
          <div class="flex justify-between items-center mb-4">
            <h3 class="text-xl font-bold text-gray-800">Doanh thu hàng tháng</h3>
            <span class="text-sm font-medium text-gray-500">Năm {{ new Date().getFullYear() }}</span>
          </div>
          <div class="h-[380px]">
            <RouterLink to="/administration/statistics" v-if="chartData.length">
              <BarChart :data="chartData" class="w-full h-full" />
            </RouterLink>
            <div v-else class="w-full h-full animate-pulse flex items-end space-x-4 p-4">
              <div v-for="i in 12" :key="i" class="w-1/12 bg-gray-200 rounded-t-lg" :style="{ height: `${Math.random() * 80 + 15}%` }"></div>
            </div>
          </div>
        </div>
      </div>
      
      <div class="lg:col-span-3 bg-white rounded-2xl p-6 shadow-sm border border-gray-200/80">
        <div>
          <div class="border-b border-gray-200">
            <nav class="-mb-px flex space-x-6" aria-label="Tabs">
              <button v-for="tab in tabs" :key="tab.name" @click="activeTab = tab.name" :class="[tab.name === activeTab ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300', 'whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm']">
                {{ tab.name }} ({{ tab.count }})
              </button>
            </nav>
          </div>
          <div class="mt-6">
              <ul v-if="activeTab === 'Khách đến'" class="space-y-3 max-h-64 overflow-y-auto pr-2">
                <li v-for="guest in arrivals" :key="guest.id" class="flex items-center justify-between p-3 transition-colors duration-200 hover:bg-gray-50 rounded-lg">
                  <div><p class="font-medium text-gray-700">{{ guest.name }}</p><p class="text-sm text-gray-500">Phòng {{ guest.room }}</p></div>
                  <div class="text-sm text-green-700 font-semibold flex items-center gap-1.5"><LogIn class="w-4 h-4" /><span>{{ guest.time }}</span></div>
                </li>
                <li v-if="!arrivals.length" class="text-center text-gray-500 py-4">Không có khách đến.</li>
              </ul>
              <ul v-if="activeTab === 'Khách đi'" class="space-y-3 max-h-64 overflow-y-auto pr-2">
                 <li v-for="guest in departures" :key="guest.id" class="flex items-center justify-between p-3 transition-colors duration-200 hover:bg-gray-50 rounded-lg">
                  <div><p class="font-medium text-gray-700">{{ guest.name }}</p><p class="text-sm text-gray-500">Phòng {{ guest.room }}</p></div>
                  <div class="text-sm text-red-700 font-semibold flex items-center gap-1.5"><LogOut class="w-4 h-4" /><span>{{ guest.time }}</span></div>
                </li>
                <li v-if="!departures.length" class="text-center text-gray-500 py-4">Không có khách đi.</li>
              </ul>
              <ul v-if="activeTab === 'Hoạt động'" class="space-y-4 max-h-64 overflow-y-auto pr-2">
                <li v-for="activity in recentActivities" :key="activity.id" class="flex items-start gap-4">
                  <div :class="activityIconClass(activity.type)" class="p-2.5 rounded-full flex-shrink-0"><component :is="activity.icon" class="w-5 h-5" /></div>
                  <div><p class="text-sm text-gray-800" v-html="activity.description"></p><p class="text-xs text-gray-400 mt-0.5">{{ activity.time }}</p></div>
                </li>
                <li v-if="!recentActivities.length" class="text-center text-gray-500 py-4">Chưa có hoạt động nào.</li>
              </ul>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, shallowRef } from "vue";
import BarChart from "@/components/ui/barChart/BarChart.vue";
import {
  UserRoundCheck, UserRoundX, Percent, Users, DoorOpen, Ban,
  LogIn, LogOut, BedDouble, KeyRound, Calendar,
} from "lucide-vue-next";
import { statistics } from "@/api/statistic";

const statistic = statistics();
const rawChartData = ref<any[][]>([]);
const isLoading = ref(true);
const activeTab = ref('Khách đến');

onMounted(async () => {
  isLoading.value = true;
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
  isLoading.value = false;
});

const chartData = computed(() => {
  if (isLoading.value) return [];
  const raw = rawChartData.value;
  if (!raw || !Array.isArray(raw)) return [];
  const filtered = raw.filter(item => {
    const label = String(item[3] || '').toUpperCase().trim();
    return label.includes('TOTAL') && label.includes('MONTH') && item[1] !== null;
  });
  return filtered.map(item => ({ name: `Tháng ${item[1]}`, total: item[2] || 0 }));
});

const arrivals = ref([
  { id: 1, name: "Nguyễn Văn A", room: "P.101", time: "14:00" },
  { id: 2, name: "Trần Thị B", room: "P.203", time: "15:30" },
]);
const departures = ref([
  { id: 1, name: "Lê Văn C", room: "P.102", time: "12:00" },
]);
const recentActivities = ref([
    { id: 1, type: 'checkin', icon: shallowRef(KeyRound), description: "<b>Nguyễn Văn A</b> đã nhận phòng <b>P.101</b>.", time: "5 phút trước" },
    { id: 2, type: 'booking', icon: shallowRef(BedDouble), description: "Có một đặt phòng mới từ <b>Agoda</b> cho phòng <b>P.305</b>.", time: "1 giờ trước" },
    { id: 3, type: 'checkout', icon: shallowRef(LogOut), description: "<b>Phạm Thị D</b> đã trả phòng <b>P.202</b>.", time: "3 giờ trước" },
]);

const statCards = computed(() => [
    { title: "Đến Trong Ngày", value: statistic.statisticCheckin?.data || 0, icon: shallowRef(UserRoundCheck), iconBg: 'bg-blue-100', iconColor: 'text-blue-600' },
    { title: "Đi Trong Ngày", value: statistic.statisticCheckout?.data || 0, icon: shallowRef(UserRoundX), iconBg: 'bg-purple-100', iconColor: 'text-purple-600' },
    { title: "Phòng Có Khách", value: statistic.statisticRoomActive?.data || 0, icon: shallowRef(Users), iconBg: 'bg-red-100', iconColor: 'text-red-600' },
    { title: "Phòng Trống", value: statistic.statisticRoomInactive?.data || 0, icon: shallowRef(DoorOpen), iconBg: 'bg-green-100', iconColor: 'text-green-600' },
    { title: "Tỉ Lệ Đầy Phòng", value: `${statistic.statisticActive?.data || 0}%`, icon: shallowRef(Percent), iconBg: 'bg-orange-100', iconColor: 'text-orange-600' },
    { title: "Tỉ Lệ Hủy", value: `${statistic.statisticCancel?.data || 0}%`, icon: shallowRef(Ban), iconBg: 'bg-yellow-100', iconColor: 'text-yellow-600' },
]);

const tabs = computed(() => [
    { name: 'Khách đến', count: arrivals.value.length },
    { name: 'Khách đi', count: departures.value.length },
    { name: 'Hoạt động', count: recentActivities.value.length },
]);

const activityIconClass = (type: string) => {
    switch (type) {
        case 'checkin': return 'bg-green-100 text-green-600';
        case 'checkout': return 'bg-red-100 text-red-600';
        case 'booking': return 'bg-blue-100 text-blue-600';
        default: return 'bg-gray-100 text-gray-600';
    }
};
</script>

<style scoped>
::-webkit-scrollbar { width: 6px; }
::-webkit-scrollbar-track { background: #f1f1f1; border-radius: 10px; }
::-webkit-scrollbar-thumb { background: #ccc; border-radius: 10px; }
::-webkit-scrollbar-thumb:hover { background: #aaa; }
</style> -->
