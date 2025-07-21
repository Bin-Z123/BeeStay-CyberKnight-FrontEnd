<template>
  <div class="bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200 min-h-screen">
    <div class="container mx-auto max-w-5xl p-4 sm:p-6 lg:p-8">

      <!-- Page Header -->
      <header class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white">Lịch Sử Lưu Trú Của Bạn</h1>
        <p class="text-gray-600 dark:text-gray-400 mt-1">Xem lại tất cả các kỳ nghỉ đã qua và sắp tới tại khách sạn của chúng tôi.</p>
      </header>

      <!-- Tabs Navigation -->
      <div class="mb-6 border-b border-gray-200 dark:border-gray-700">
        <nav class="flex flex-wrap -mb-px" aria-label="Tabs">
          <button @click="activeTab = 'upcoming'" :class="getTabClass('upcoming')">
            Sắp tới
            <span class="ml-2 px-2 py-0.5 rounded-full text-xs font-medium" :class="activeTab === 'upcoming' ? 'bg-blue-600 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-300'">{{ upcomingBookings.length }}</span>
          </button>
          <button @click="activeTab = 'completed'" :class="getTabClass('completed')">
            Đã hoàn thành
            <span class="ml-2 px-2 py-0.5 rounded-full text-xs font-medium" :class="activeTab === 'completed' ? 'bg-blue-600 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-300'">{{ completedBookings.length }}</span>
          </button>
          <button @click="activeTab = 'cancelled'" :class="getTabClass('cancelled')">
            Đã hủy
            <span class="ml-2 px-2 py-0.5 rounded-full text-xs font-medium" :class="activeTab === 'cancelled' ? 'bg-blue-600 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-300'">{{ cancelledBookings.length }}</span>
          </button>
        </nav>
      </div>

      <!-- Tab Content -->
      <div class="tab-content">
        <!-- Upcoming Bookings -->
        <div v-if="activeTab === 'upcoming'">
          <BookingList :bookings="paginatedUpcoming" />
          <Pagination v-if="totalPagesUpcoming > 1" :totalPages="totalPagesUpcoming" :currentPage="currentPageUpcoming" @page-changed="page => currentPageUpcoming = page" />
        </div>

        <!-- Completed Bookings -->
        <div v-if="activeTab === 'completed'">
          <BookingList :bookings="paginatedCompleted" />
          <Pagination v-if="totalPagesCompleted > 1" :totalPages="totalPagesCompleted" :currentPage="currentPageCompleted" @page-changed="page => currentPageCompleted = page" />
        </div>

        <!-- Cancelled Bookings -->
        <div v-if="activeTab === 'cancelled'">
          <BookingList :bookings="paginatedCancelled" />
          <Pagination v-if="totalPagesCancelled > 1" :totalPages="totalPagesCancelled" :currentPage="currentPageCancelled" @page-changed="page => currentPageCancelled = page" />
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, computed, defineComponent, watch } from 'vue';

// --- COMPONENTS (In-file for simplicity) ---

const BookingList = defineComponent({
  props: ['bookings'],
  setup(props) {
    const statusClass = (status) => {
      switch (status) {
        case 'Đã hoàn thành': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
        case 'Sắp tới': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
        case 'Đã hủy': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
        default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
      }
    };
    return { props, statusClass };
  },
  template: `
    <div class="space-y-6">
      <div v-if="!bookings || bookings.length === 0" class="text-center py-12">
        <p class="text-gray-500">Không có đặt phòng nào trong mục này.</p>
      </div>
      <div v-else v-for="booking in bookings" :key="booking.id" class="bg-white dark:bg-gray-800/50 rounded-xl shadow-lg overflow-hidden flex flex-col md:flex-row transition-shadow hover:shadow-xl">
        <div class="md:w-1/3">
          <img class="h-48 w-full object-cover md:h-full" :src="booking.imageUrl" :alt="''">
        </div>
        <div class="p-6 flex flex-col justify-between md:w-2/3">
          <div>
            <div class="flex justify-between items-start gap-4">
              <h3 class="text-xl font-bold text-gray-900 dark:text-white">{{ booking.roomType }}</h3>
              <span :class="statusClass(booking.status)" class="text-xs font-medium px-2.5 py-0.5 rounded-full whitespace-nowrap">{{ booking.status }}</span>
            </div>
            <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">Mã đặt phòng: <span class="font-medium text-gray-700 dark:text-gray-300">{{ booking.bookingId }}</span></p>
            <div class="mt-4 flex items-center text-sm text-gray-600 dark:text-gray-300">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
              <span>{{ booking.checkIn }} - {{ booking.checkOut }}</span>
            </div>
          </div>
          <div class="mt-4 text-right">
            <button class="bg-blue-500 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-600 transition-colors">
              Xem Chi Tiết
            </button>
          </div>
        </div>
      </div>
    </div>
  `
});

const Pagination = defineComponent({
    props: ['totalPages', 'currentPage'],
    emits: ['page-changed'],
    template: `
        <nav class="flex items-center justify-between border-t border-gray-200 dark:border-gray-700 px-4 sm:px-0 mt-8">
            <div class="-mt-px flex w-0 flex-1">
                <button @click="$emit('page-changed', currentPage - 1)" :disabled="currentPage === 1" class="inline-flex items-center border-t-2 border-transparent pr-1 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700 disabled:text-gray-300 disabled:cursor-not-allowed">
                    <svg class="mr-3 h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z" clip-rule="evenodd" /></svg>
                    Trước
                </button>
            </div>
            <div class="hidden md:-mt-px md:flex">
                <button v-for="page in totalPages" :key="page" @click="$emit('page-changed', page)" :class="[currentPage === page ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300', 'inline-flex items-center border-t-2 px-4 pt-4 text-sm font-medium']">
                    {{ page }}
                </button>
            </div>
            <div class="-mt-px flex w-0 flex-1 justify-end">
                <button @click="$emit('page-changed', currentPage + 1)" :disabled="currentPage === totalPages" class="inline-flex items-center border-t-2 border-transparent pl-1 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700 disabled:text-gray-300 disabled:cursor-not-allowed">
                    Tiếp
                    <svg class="ml-3 h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010-1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clip-rule="evenodd" /></svg>
                </button>
            </div>
        </nav>
    `
});


// --- SCRIPT LOGIC ---

const activeTab = ref('upcoming');

// Reset page to 1 when tab changes
watch(activeTab, () => {
  currentPageUpcoming.value = 1;
  currentPageCompleted.value = 1;
  currentPageCancelled.value = 1;
});

const getTabClass = (tabName) => {
  const baseClasses = 'flex items-center py-4 px-1 sm:px-4 -mb-px border-b-2 text-sm font-medium';
  if (activeTab.value === tabName) {
    return `${baseClasses} border-blue-500 text-blue-600 dark:text-blue-400`;
  }
  return `${baseClasses} border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300`;
};

// --- DATA ---
const allBookings = ref([
  // Upcoming
  { id: 1, bookingId: 'VN98765432', roomType: 'Suite Tổng Thống', checkIn: '20/08/2025', checkOut: '25/08/2025', status: 'Sắp tới', imageUrl: 'https://placehold.co/600x400/3b82f6/ffffff?text=Ph%C3%B2ng+Suite' },
  { id: 2, bookingId: 'VN11223344', roomType: 'Deluxe Twin - Hướng Vườn', checkIn: '01/09/2025', checkOut: '03/09/2025', status: 'Sắp tới', imageUrl: 'https://placehold.co/600x400/3b82f6/ffffff?text=Deluxe+Twin' },
  { id: 3, bookingId: 'VN55667788', roomType: 'Bungalow sát biển', checkIn: '15/10/2025', checkOut: '20/10/2025', status: 'Sắp tới', imageUrl: 'https://placehold.co/600x400/3b82f6/ffffff?text=Bungalow' },
  { id: 4, bookingId: 'VN99887766', roomType: 'Deluxe King - Hướng Biển', checkIn: '24/12/2025', checkOut: '28/12/2025', status: 'Sắp tới', imageUrl: 'https://placehold.co/600x400/3b82f6/ffffff?text=Deluxe+King' },
  { id: 5, bookingId: 'VN12121212', roomType: 'Phòng gia đình', checkIn: '01/01/2026', checkOut: '05/01/2026', status: 'Sắp tới', imageUrl: 'https://placehold.co/600x400/3b82f6/ffffff?text=Ph%C3%B2ng+Gia+%C4%90%C3%ACnh' },

  // Completed
  { id: 6, bookingId: 'VN12345678', roomType: 'Deluxe King - Hướng Biển', checkIn: '10/07/2025', checkOut: '12/07/2025', status: 'Đã hoàn thành', imageUrl: 'https://placehold.co/600x400/16a34a/ffffff?text=Ph%C3%B2ng+Deluxe+King' },
  { id: 7, bookingId: 'VN23456789', roomType: 'Standard - Hướng Vườn', checkIn: '01/05/2025', checkOut: '03/05/2025', status: 'Đã hoàn thành', imageUrl: 'https://placehold.co/600x400/16a34a/ffffff?text=Ph%C3%B2ng+Standard' },
  { id: 8, bookingId: 'VN34567890', roomType: 'Suite Hướng Biển', checkIn: '15/04/2025', checkOut: '18/04/2025', status: 'Đã hoàn thành', imageUrl: 'https://placehold.co/600x400/16a34a/ffffff?text=Suite+View+Bi%E1%BB%83n' },
  { id: 9, bookingId: 'VN45678901', roomType: 'Deluxe Twin - Hướng Vườn', checkIn: '20/03/2025', checkOut: '22/03/2025', status: 'Đã hoàn thành', imageUrl: 'https://placehold.co/600x400/16a34a/ffffff?text=Deluxe+Twin' },
  { id: 10, bookingId: 'VN56789012', roomType: 'Standard - Hướng Vườn', checkIn: '10/02/2025', checkOut: '12/02/2025', status: 'Đã hoàn thành', imageUrl: 'https://placehold.co/600x400/16a34a/ffffff?text=Standard+V%C6%B0%E1%BB%9Dn' },
  { id: 11, bookingId: 'VN67890123', roomType: 'Deluxe King - Hướng Biển', checkIn: '01/01/2025', checkOut: '03/01/2025', status: 'Đã hoàn thành', imageUrl: 'https://placehold.co/600x400/16a34a/ffffff?text=Deluxe+King' },
  { id: 12, bookingId: 'VN78901234', roomType: 'Bungalow sát biển', checkIn: '15/12/2024', checkOut: '20/12/2024', status: 'Đã hoàn thành', imageUrl: 'https://placehold.co/600x400/16a34a/ffffff?text=Bungalow' },
  { id: 13, bookingId: 'VN89012345', roomType: 'Suite Tổng Thống', checkIn: '10/11/2024', checkOut: '12/11/2024', status: 'Đã hoàn thành', imageUrl: 'https://placehold.co/600x400/16a34a/ffffff?text=Suite+T%E1%BB%95ng+Th%E1%BB%91ng' },
  { id: 14, bookingId: 'VN90123456', roomType: 'Standard - Hướng Vườn', checkIn: '01/10/2024', checkOut: '05/10/2024', status: 'Đã hoàn thành', imageUrl: 'https://placehold.co/600x400/16a34a/ffffff?text=Standard' },
  { id: 15, bookingId: 'VN01234567', roomType: 'Deluxe King - Hướng Biển', checkIn: '20/09/2024', checkOut: '25/09/2024', status: 'Đã hoàn thành', imageUrl: 'https://placehold.co/600x400/16a34a/ffffff?text=Deluxe+King' },
  { id: 16, bookingId: 'VN11112222', roomType: 'Phòng gia đình', checkIn: '10/08/2024', checkOut: '15/08/2024', status: 'Đã hoàn thành', imageUrl: 'https://placehold.co/600x400/16a34a/ffffff?text=Ph%C3%B2ng+Gia+%C4%90%C3%ACnh' },
  { id: 17, bookingId: 'VN22223333', roomType: 'Standard - Hướng Vườn', checkIn: '01/07/2024', checkOut: '03/07/2024', status: 'Đã hoàn thành', imageUrl: 'https://placehold.co/600x400/16a34a/ffffff?text=Standard' },
  { id: 18, bookingId: 'VN33334444', roomType: 'Deluxe Twin - Hướng Vườn', checkIn: '15/06/2024', checkOut: '18/06/2024', status: 'Đã hoàn thành', imageUrl: 'https://placehold.co/600x400/16a34a/ffffff?text=Deluxe+Twin' },
  { id: 19, bookingId: 'VN44445555', roomType: 'Bungalow sát biển', checkIn: '01/06/2024', checkOut: '05/06/2024', status: 'Đã hoàn thành', imageUrl: 'https://placehold.co/600x400/16a34a/ffffff?text=Bungalow' },
  { id: 20, bookingId: 'VN55556666', roomType: 'Deluxe King - Hướng Biển', checkIn: '10/05/2024', checkOut: '12/05/2024', status: 'Đã hoàn thành', imageUrl: 'https://placehold.co/600x400/16a34a/ffffff?text=Deluxe+King' },
  { id: 21, bookingId: 'VN66667777', roomType: 'Suite Hướng Biển', checkIn: '01/04/2024', checkOut: '03/04/2024', status: 'Đã hoàn thành', imageUrl: 'https://placehold.co/600x400/16a34a/ffffff?text=Suite' },
  { id: 22, bookingId: 'VN77778888', roomType: 'Standard - Hướng Vườn', checkIn: '15/03/2024', checkOut: '20/03/2024', status: 'Đã hoàn thành', imageUrl: 'https://placehold.co/600x400/16a34a/ffffff?text=Standard' },
  { id: 23, bookingId: 'VN88889999', roomType: 'Deluxe King - Hướng Biển', checkIn: '10/02/2024', checkOut: '14/02/2024', status: 'Đã hoàn thành', imageUrl: 'https://placehold.co/600x400/16a34a/ffffff?text=Deluxe+King' },
  { id: 24, bookingId: 'VN99990000', roomType: 'Phòng gia đình', checkIn: '25/01/2024', checkOut: '30/01/2024', status: 'Đã hoàn thành', imageUrl: 'https://placehold.co/600x400/16a34a/ffffff?text=Ph%C3%B2ng+Gia+%C4%90%C3%ACnh' },
  { id: 25, bookingId: 'VN00001111', roomType: 'Bungalow sát biển', checkIn: '01/01/2024', checkOut: '05/01/2024', status: 'Đã hoàn thành', imageUrl: 'https://placehold.co/600x400/16a34a/ffffff?text=Bungalow' },

  // Cancelled
  { id: 26, bookingId: 'VN55558888', roomType: 'Standard - Hướng Vườn', checkIn: '01/06/2025', checkOut: '05/06/2025', status: 'Đã hủy', imageUrl: 'https://placehold.co/600x400/ef4444/ffffff?text=Ph%C3%B2ng+Standard' },
  { id: 27, bookingId: 'VN44443333', roomType: 'Deluxe King - Hướng Biển', checkIn: '15/03/2025', checkOut: '17/03/2025', status: 'Đã hủy', imageUrl: 'https://placehold.co/600x400/ef4444/ffffff?text=Deluxe+King' },
  { id: 28, bookingId: 'VN33332222', roomType: 'Suite Hướng Biển', checkIn: '20/01/2025', checkOut: '22/01/2025', status: 'Đã hủy', imageUrl: 'https://placehold.co/600x400/ef4444/ffffff?text=Suite' },
]);

// --- Computed Properties for Filtering ---
const upcomingBookings = computed(() => allBookings.value.filter(b => b.status === 'Sắp tới'));
const completedBookings = computed(() => allBookings.value.filter(b => b.status === 'Đã hoàn thành'));
const cancelledBookings = computed(() => allBookings.value.filter(b => b.status === 'Đã hủy'));

// --- Pagination Logic ---
const itemsPerPage = ref(5);

// Pagination for Upcoming
const currentPageUpcoming = ref(1);
const totalPagesUpcoming = computed(() => Math.ceil(upcomingBookings.value.length / itemsPerPage.value));
const paginatedUpcoming = computed(() => {
  const start = (currentPageUpcoming.value - 1) * itemsPerPage.value;
  const end = start + itemsPerPage.value;
  return upcomingBookings.value.slice(start, end);
});

// Pagination for Completed
const currentPageCompleted = ref(1);
const totalPagesCompleted = computed(() => Math.ceil(completedBookings.value.length / itemsPerPage.value));
const paginatedCompleted = computed(() => {
  const start = (currentPageCompleted.value - 1) * itemsPerPage.value;
  const end = start + itemsPerPage.value;
  return completedBookings.value.slice(start, end);
});

// Pagination for Cancelled
const currentPageCancelled = ref(1);
const totalPagesCancelled = computed(() => Math.ceil(cancelledBookings.value.length / itemsPerPage.value));
const paginatedCancelled = computed(() => {
  const start = (currentPageCancelled.value - 1) * itemsPerPage.value;
  const end = start + itemsPerPage.value;
  return cancelledBookings.value.slice(start, end);
});

</script>

<style scoped>
/* Sử dụng font Inter làm font chữ mặc định */
:global(body) {
  font-family: 'Inter', sans-serif;
}
.tab-content {
  animation: fadeIn 0.5s;
}
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
