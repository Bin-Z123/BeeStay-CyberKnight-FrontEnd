<template>
  <div class="dark:bg-gray-900 text-gray-800 dark:text-gray-200">
    <div class="container mx-auto max-w-5xl p-4 sm:p-6 lg:p-8">

      <!-- Phần Header Chào mừng và Tổng điểm -->
      <header class="bg-gradient-to-br from-muesli-500 to-muesli-200 text-white rounded-2xl shadow-xl p-8 mb-8 transition-all duration-300 hover:shadow-muesli-500/50">
        <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center" v-if="authStore.user">
          <div>
            <h1 class="text-2xl font-bold">Xin chào, {{ authStore.user.fullname }}!</h1>
            <p class="text-white mt-1">Chào mừng bạn trở lại trang điểm thưởng.</p>
          </div>
          <div class="mt-4 sm:mt-0 text-left sm:text-right">
            <p class="text-sm uppercase text-white tracking-wider">Điểm khả dụng</p>
            <p class="text-5xl font-extrabold tracking-tight">{{ authStore.user.point }}</p>
          </div>
        </div>
      </header>

      <!-- Phần Hạng thành viên và Tiến trình -->
      <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 mb-8">
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-xl font-bold text-gray-900 dark:text-white">{{ user.tier.name }}</h2>
          <div class="flex items-center text-sm font-medium text-amber-500">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-1"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path></svg>
            Thành viên ưu tú
          </div>
        </div>
        <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 mb-2">
          <div class="bg-gradient-to-r from-amber-400 to-orange-500 h-2.5 rounded-full" :style="{ width: user.tier.progress + '%' }"></div>
        </div>
        <p class="text-sm text-gray-600 dark:text-gray-400">Bạn cần thêm <span class="font-bold text-gray-800 dark:text-white">{{ user.tier.pointsToNext.toLocaleString() }}</span> điểm nữa để thăng hạng {{ user.tier.nextTier }}.</p>
      </div>


      <div class="bg-white h-30 w-full my-15 shadow-2xl rounded-2xl p-6 mb-8 keen-slider" ref="ranks">
        <div class="keen-slider__slide">
          1
        </div>
        <div class="keen-slider__slide">
          2
        </div>
        <div class="keen-slider__slide">
          3
        </div>
      </div>

      <!-- Phần Tabs Điều Hướng -->
      <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-2 sm:p-4">
        <div class="border-b border-gray-200 dark:border-gray-700">
          <nav class="flex flex-wrap -mb-px">
            <button
              v-for="tab in tabs"
              :key="tab.id"
              @click="activeTab = tab.id"
              :class="[
                'whitespace-nowrap py-4 px-6 text-sm font-medium border-b-2',
                activeTab === tab.id
                  ? 'border-blue-600 dark:border-blue-400 text-blue-600 dark:text-blue-400'
                  : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
              ]"
            >
              {{ tab.name }}
            </button>
          </nav>
        </div>

        <!-- Nội dung các Tabs -->
        <div class="py-6 px-2 sm:px-4">
          <!-- Tab 1: Tổng Quan -->
          <div v-show="activeTab === 'overview'" class="tab-content active">
            <h3 class="text-lg font-semibold mb-4">Ưu đãi độc quyền cho {{ user.tier.name }}</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div class="bg-gray-100 dark:bg-gray-700/50 rounded-lg p-4 flex items-center gap-4">
                <div class="bg-blue-100 dark:bg-blue-900/50 p-3 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-blue-500"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
                </div>
                <div>
                  <p class="font-semibold">Miễn phí nâng hạng phòng</p>
                  <p class="text-sm text-gray-600 dark:text-gray-400">Áp dụng tại các khách sạn đối tác.</p>
                </div>
              </div>
              <div class="bg-gray-100 dark:bg-gray-700/50 rounded-lg p-4 flex items-center gap-4">
                <div class="bg-green-100 dark:bg-green-900/50 p-3 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-green-500"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/><path d="m9 12 2 2 4-4"/></svg>
                </div>
                <div>
                  <p class="font-semibold">Ưu tiên làm thủ tục</p>
                  <p class="text-sm text-gray-600 dark:text-gray-400">Tại các sân bay được chọn.</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Tab 2: Lịch Sử Điểm -->
          <div v-show="activeTab === 'history'" class="tab-content active">
            <div class="overflow-x-auto">
              <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" class="py-3 px-6">Hoạt động</th>
                    <th scope="col" class="py-3 px-6">Ngày</th>
                    <th scope="col" class="py-3 px-6 text-right">Điểm</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in history" :key="item.id" class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                    <td class="py-4 px-6 font-medium text-gray-900 dark:text-white">{{ item.activity }}</td>
                    <td class="py-4 px-6">{{ item.date }}</td>
                    <td class="py-4 px-6 text-right font-bold" :class="item.points > 0 ? 'text-green-500' : 'text-red-500'">
                      {{ item.points > 0 ? '+' : '' }}{{ item.points.toLocaleString() }}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <!-- Tab 3: Cách Tích Điểm -->
          <div v-show="activeTab === 'earn'" class="tab-content active">
            <div class="space-y-6">
              <!-- Rendered dynamically, could be a v-for loop if data-driven -->
              <div class="flex items-start gap-4 p-4 rounded-lg bg-gray-50 dark:bg-gray-700/50">
                  <div class="bg-blue-100 dark:bg-blue-900/50 p-3 rounded-full"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-blue-500"><path d="M2 21h18v-2H2v2Z"/><path d="M20 19v-2h-2v2h2Z"/><path d="M4 19v-2H2v2h2Z"/><path d="M12 4v15h-2V4h2Z"/><path d="M10 4H6v3h4V4Z"/><path d="M18 4h-4v3h4V4Z"/></svg></div>
                  <div>
                      <h4 class="font-semibold">Đặt phòng khách sạn</h4>
                      <p class="text-sm text-gray-600 dark:text-gray-400">Nhận 1 điểm cho mỗi 1.000đ chi tiêu. Thành viên hạng cao nhận thưởng đến 2x điểm.</p>
                  </div>
              </div>
              <div class="flex items-start gap-4 p-4 rounded-lg bg-gray-50 dark:bg-gray-700/50">
                  <div class="bg-purple-100 dark:bg-purple-900/50 p-3 rounded-full"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-purple-500"><path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z"/></svg></div>
                  <div>
                      <h4 class="font-semibold">Đặt vé máy bay</h4>
                      <p class="text-sm text-gray-600 dark:text-gray-400">Tích lũy điểm dựa trên giá vé và hãng hàng không. Khám phá thế giới và tích điểm không ngừng.</p>
                  </div>
              </div>
                <div class="flex items-start gap-4 p-4 rounded-lg bg-gray-50 dark:bg-gray-700/50">
                  <div class="bg-green-100 dark:bg-green-900/50 p-3 rounded-full"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-green-500"><path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg></div>
                  <div>
                      <h4 class="font-semibold">Viết đánh giá</h4>
                      <p class="text-sm text-gray-600 dark:text-gray-400">Chia sẻ trải nghiệm của bạn và nhận ngay 100 điểm cho mỗi đánh giá được duyệt.</p>
                  </div>
              </div>
            </div>
          </div>

          <!-- Tab 4: Đổi Thưởng -->
          <div v-show="activeTab === 'redeem'" class="tab-content active">
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <div v-for="reward in rewards" :key="reward.id" class="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden group">
                <img :src="reward.imageUrl" :alt="reward.title" class="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300">
                <div class="p-4">
                  <h4 class="font-bold text-lg">{{ reward.title }}</h4>
                  <p class="text-sm text-gray-600 dark:text-gray-400 mb-4">{{ reward.description }}</p>
                  <div class="flex justify-between items-center">
                    <p class="font-bold text-blue-600 dark:text-blue-400">{{ reward.points.toLocaleString() }} điểm</p>
                    <button class="bg-blue-500 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-600 transition-colors">Đổi ngay</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useAuthStore } from '@/stores/auth/login';
import KeenSlider from 'keen-slider';
import 'keen-slider/keen-slider.min.css';
import { useKeenSlider } from 'keen-slider/vue'

const authStore = useAuthStore();
onMounted( async () => {
  await authStore.fetchUser();
})

const [ranks] = useKeenSlider({
  slides: {
    perView: 1,
    spacing: 10,
  },
  loop: true,
})

// --- Reactive State ---
const activeTab = ref('overview');

const user = ref({
  name: 'Nguyễn Văn An',
  points: 12850,
  tier: {
    name: 'Hạng Vàng',
    progress: 75,
    pointsToNext: 2150,
    nextTier: 'Bạch Kim',
  }
});

const tabs = ref([
    { id: 'overview', name: 'Tổng Quan' },
    { id: 'history', name: 'Lịch Sử Điểm' },
    { id: 'earn', name: 'Cách Tích Điểm' },
    { id: 'redeem', name: 'Đổi Thưởng' },
]);

const history = ref([
  { id: 1, activity: 'Đặt khách sạn The Reverie Saigon', date: '15/07/2025', points: 2500 },
  { id: 2, activity: 'Đổi voucher ăn uống 200k', date: '10/07/2025', points: -5000 },
  { id: 3, activity: 'Đặt vé máy bay SGN - HAN', date: '01/07/2025', points: 1250 },
  { id: 4, activity: 'Điểm thưởng chào mừng', date: '01/01/2025', points: 1000 },
]);

const rewards = ref([
  { id: 1, title: 'Voucher khách sạn 500.000đ', description: 'Giảm giá trực tiếp khi đặt phòng.', points: 10000, imageUrl: 'https://placehold.co/600x400/3498db/ffffff?text=Voucher+Kh%C3%A1ch+S%E1%BA%A1n' },
  { id: 2, title: 'Voucher The Coffee House 100.000đ', description: 'Thưởng thức cà phê và bánh ngọt.', points: 2500, imageUrl: 'https://placehold.co/600x400/e74c3c/ffffff?text=Voucher+%C4%82n+U%E1%BB%91ng' },
  { id: 3, title: 'Miễn phí phòng chờ sân bay', description: 'Tận hưởng không gian yên tĩnh, tiện nghi.', points: 7500, imageUrl: 'https://placehold.co/600x400/2ecc71/ffffff?text=D%E1%BB%8Bch+V%E1%BB%A5+S%C3%A2n+Bay' },
]);

</script>