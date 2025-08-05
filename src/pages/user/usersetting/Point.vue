<template>
  <div class="dark:bg-gray-900 text-gray-800 dark:text-gray-200">
    <div class="container mx-auto max-w-5xl p-4 sm:p-6 lg:p-8">

      <!-- Phần Header Chào mừng và Tổng điểm -->
      <header
        class="bg-gradient-to-br from-blue-500 to-blue-300 dark:from-blue-700 dark:to-blue-500 text-white rounded-2xl shadow-xl p-8 mb-8 transition-all duration-300 hover:shadow-blue-500/50">
        <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center" v-if="authStore.user">
          <div>
            <h1 class="text-2xl font-bold">Xin chào, {{ authStore.user.fullname }}!</h1>
            <p class="text-white/90 mt-1">Chào mừng bạn trở lại trang điểm thưởng.</p>
          </div>
          <div class="mt-4 sm:mt-0 text-left sm:text-right">
            <p class="text-sm uppercase text-white/90 tracking-wider">Điểm khả dụng</p>
            <p class="text-5xl font-extrabold tracking-tight">{{ authStore.user.point.toLocaleString() }}</p>
          </div>
        </div>
      </header>

      <!-- Phần Hạng thành viên và Tiến trình -->
      <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 mb-8">
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-xl font-bold text-gray-900 dark:text-white">{{ user.tier.name }}</h2>
          <div class="flex items-center text-sm font-medium text-amber-500">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"
              class="mr-1 text-amber-400">
              <path
                d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27z">
              </path>
            </svg>
            Thành viên ưu tú
          </div>
        </div>
        <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 mb-2">
          <div class="bg-gradient-to-r from-amber-400 to-orange-500 h-2.5 rounded-full"
            :style="{ width: user.tier.progress + '%' }"></div>
        </div>
        <p class="text-sm text-gray-600 dark:text-gray-400">Bạn cần thêm <span
            class="font-bold text-gray-800 dark:text-white">{{ user.tier.pointsToNext.toLocaleString() }}</span> điểm
          nữa để thăng hạng {{ user.tier.nextTier }}.</p>
      </div>

      <!-- Slider các hạng thành viên -->
      <div class="mb-8">
        <h2 class="text-xl font-bold text-gray-900 dark:text-white mb-4">Thông Tin Hạng Thành Viên</h2>
        <div ref="ranksSlider" class="keen-slider rounded-2xl">
          <div v-for="rank in allRanks" :key="rank.name"
            class="keen-slider__slide p-6 rounded-2xl flex flex-col justify-between h-48" :class="rank.gradient">
            <div class="flex justify-between items-start">
              <h3 class="text-2xl font-bold text-white">{{ rank.name }}</h3>
              <div class="w-12 h-12 text-white/70" v-html="rank.icon"></div>
            </div>
            <div>
              <p class="text-sm text-white/90">Yêu cầu</p>
              <p class="text-2xl font-semibold text-white">{{ rank.points.toLocaleString() }}+ điểm</p>
            </div>
          </div>
        </div>
      </div>


      <!-- Phần Tabs Điều Hướng -->
      <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-2 sm:p-4">
        <div class="border-b border-gray-200 dark:border-gray-700">
          <nav class="flex flex-wrap -mb-px">
            <button v-for="tab in tabs" :key="tab.id" @click="activeTab = tab.id" :class="[
              'whitespace-nowrap py-4 px-6 text-sm font-medium border-b-2',
              activeTab === tab.id
                ? 'border-blue-600 dark:border-blue-400 text-blue-600 dark:text-blue-400'
                : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
            ]">
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
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                    class="text-blue-500">
                    <path
                      d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                  </svg>
                </div>
                <div>
                  <p class="font-semibold">Miễn phí nâng hạng phòng</p>
                  <p class="text-sm text-gray-600 dark:text-gray-400">Áp dụng tại các khách sạn đối tác.</p>
                </div>
              </div>
              <div class="bg-gray-100 dark:bg-gray-700/50 rounded-lg p-4 flex items-center gap-4">
                <div class="bg-green-100 dark:bg-green-900/50 p-3 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                    class="text-green-500">
                    <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
                    <path d="m9 12 2 2 4-4" />
                  </svg>
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
                  <tr v-for="item in history" :key="item.id"
                    class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                    <td class="py-4 px-6 font-medium text-gray-900 dark:text-white">{{ item.activity }}</td>
                    <td class="py-4 px-6">{{ item.date }}</td>
                    <td class="py-4 px-6 text-right font-bold"
                      :class="item.points > 0 ? 'text-green-500' : 'text-red-500'">
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
              <div class="flex items-start gap-4 p-4 rounded-lg bg-gray-50 dark:bg-gray-700/50">
                <div class="bg-blue-100 dark:bg-blue-900/50 p-3 rounded-full"><svg xmlns="http://www.w3.org/2000/svg"
                    width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                    stroke-linecap="round" stroke-linejoin="round" class="text-blue-500">
                    <path d="M2 21h18v-2H2v2Z" />
                    <path d="M20 19v-2h-2v2h2Z" />
                    <path d="M4 19v-2H2v2h2Z" />
                    <path d="M12 4v15h-2V4h2Z" />
                    <path d="M10 4H6v3h4V4Z" />
                    <path d="M18 4h-4v3h4V4Z" />
                  </svg></div>
                <div>
                  <h4 class="font-semibold">Đặt phòng khách sạn</h4>
                  <p class="text-sm text-gray-600 dark:text-gray-400">Nhận 1 điểm cho mỗi 1.000đ chi tiêu. Thành viên
                    hạng cao nhận thưởng đến 2x điểm.</p>
                </div>
              </div>
              <div class="flex items-start gap-4 p-4 rounded-lg bg-gray-50 dark:bg-gray-700/50">
                <div class="bg-purple-100 dark:bg-purple-900/50 p-3 rounded-full"><svg
                    xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                    class="text-purple-500">
                    <path
                      d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z" />
                  </svg></div>
                <div>
                  <h4 class="font-semibold">Đặt vé máy bay</h4>
                  <p class="text-sm text-gray-600 dark:text-gray-400">Tích lũy điểm dựa trên giá vé và hãng hàng không.
                    Khám phá thế giới và tích điểm không ngừng.</p>
                </div>
              </div>
              <div class="flex items-start gap-4 p-4 rounded-lg bg-gray-50 dark:bg-gray-700/50">
                <div class="bg-green-100 dark:bg-green-900/50 p-3 rounded-full"><svg xmlns="http://www.w3.org/2000/svg"
                    width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                    stroke-linecap="round" stroke-linejoin="round" class="text-green-500">
                    <path d="M12 20h9" />
                    <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" />
                  </svg></div>
                <div>
                  <h4 class="font-semibold">Viết đánh giá</h4>
                  <p class="text-sm text-gray-600 dark:text-gray-400">Chia sẻ trải nghiệm của bạn và nhận ngay 100 điểm
                    cho mỗi đánh giá được duyệt.</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Tab 4: Đổi Thưởng -->
          <div v-show="activeTab === 'redeem'" class="tab-content active">
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <div v-for="reward in rewards" :key="reward.id"
                class="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden group">
                <img :src="reward.imageUrl" :alt="reward.title"
                  class="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300">
                <div class="p-4">
                  <h4 class="font-bold text-lg">{{ reward.title }}</h4>
                  <p class="text-sm text-gray-600 dark:text-gray-400 mb-4">{{ reward.description }}</p>
                  <div class="flex justify-between items-center">
                    <p class="font-bold text-blue-600 dark:text-blue-400">{{ reward.points.toLocaleString() }} điểm</p>
                    <button
                      class="bg-blue-500 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-600 transition-colors">Đổi
                      ngay</button>
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
import 'keen-slider/keen-slider.min.css';
import { useKeenSlider } from 'keen-slider/vue';

const authStore = useAuthStore();
const [ranksSlider] = useKeenSlider({
  loop: true,
  slides: {
    perView: 1,
    spacing: 16,
  },
});

const activeTab = ref('overview');

const user = ref({
  name: 'Nguyễn Văn An',
  tier: {
    name: 'Hạng Vàng',
    progress: 75,
    pointsToNext: 2150,
    nextTier: 'Bạch Kim',
  }
});

const allRanks = ref([
  {
    name: 'Hạng Đồng',
    points: 0,
    icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L4.5 5v6c0 5.55 3.36 10.55 7.5 11.95c4.14-1.4 7.5-6.4 7.5-11.95V5L12 2z"></path></svg>`,
    gradient: 'bg-gradient-to-br from-orange-400 to-amber-600'
  },
  {
    name: 'Hạng Bạc',
    points: 5000,
    icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L4.5 5v6c0 5.55 3.36 10.55 7.5 11.95c4.14-1.4 7.5-6.4 7.5-11.95V5L12 2z"></path></svg>`,
    gradient: 'bg-gradient-to-br from-slate-400 to-gray-500'
  },
  {
    name: 'Hạng Vàng',
    points: 15000,
    icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L4.5 5v6c0 5.55 3.36 10.55 7.5 11.95c4.14-1.4 7.5-6.4 7.5-11.95V5L12 2z"></path></svg>`,
    gradient: 'bg-gradient-to-br from-yellow-400 to-amber-500'
  },
  {
    name: 'Bạch Kim',
    points: 50000,
    icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12c5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z"></path></svg>`,
    gradient: 'bg-gradient-to-br from-gray-200 to-blue-200'
  },
  {
    name: 'Kim Cương',
    points: 100000,
    icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12.01 2.01L12 2l-.01.01C7.04 2.02 3.02 6.04 3.01 11H3v1.14C3.62 16.23 7.38 20 12 20s8.38-3.77 9-7.86V11h-.01c0-4.96-4.02-8.98-8.98-8.99z"></path></svg>`,
    gradient: 'bg-gradient-to-br from-sky-400 to-indigo-500'
  }
]);


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
