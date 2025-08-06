<template>
  <div class="bg-gray-50 min-h-screen p-4 sm:p-6 lg:p-8">
    <div class="max-w-7xl mx-auto">
      <div v-if="bookingDetails.isLoading" class="text-center py-20">
        <p>Đang tải dữ liệu...</p>
      </div>

      <div v-else-if="booking" class="space-y-8">
        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 class="text-2xl font-bold text-gray-900">Chi Tiết Đặt Phòng</h1>
            <p class="mt-1 text-sm text-gray-500">
              Mã đặt phòng: <span class="font-medium text-gray-700">#{{ booking.id }}</span>
            </p>
          </div>
          <div class="mt-4 sm:mt-0">
            <span
              :class="bookingStatusInfo.class"
              class="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold"
            >
              {{ bookingStatusInfo.text }}
            </span>
          </div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div class="lg:col-span-2 space-y-8">
            <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h2 class="text-lg font-semibold text-gray-800 border-b pb-3 mb-4">Thông tin chuyến đi</h2>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div class="flex items-center space-x-3">
                  <div class="bg-blue-100 p-2 rounded-full">
                    <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                  </div>
                  <div>
                    <p class="text-sm text-gray-500">Nhận phòng</p>
                    <p class="font-semibold text-gray-700">{{ formatDate(booking.checkInDate) }}</p>
                  </div>
                </div>
                <div class="flex items-center space-x-3">
                  <div class="bg-blue-100 p-2 rounded-full">
                    <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H3"></path></svg>
                  </div>
                  <div>
                    <p class="text-sm text-gray-500">Trả phòng</p>
                    <p class="font-semibold text-gray-700">{{ formatDate(booking.checkOutDate) }}</p>
                  </div>
                </div>
              </div>
            </div>

            <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h2 class="text-lg font-semibold text-gray-800 border-b pb-3 mb-4">Chi tiết phòng đã đặt</h2>
              <ul class="divide-y divide-gray-200">
                <li v-for="detail in booking.bookingDetails" :key="detail.id" class="py-4 flex justify-between items-center">
                  <div>
                    <p class="font-semibold text-gray-800">{{ detail.roomType.name }}</p>
                    <p class="text-sm text-gray-500">Số lượng: {{ detail.quantity }}</p>
                  </div>
                  <p class="font-semibold text-gray-700">{{ formatCurrency(detail.roomType.price * detail.quantity) }}</p>
                </li>
              </ul>
            </div>

            <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h2 class="text-lg font-semibold text-gray-800 border-b pb-3 mb-4">Dịch vụ đã đặt</h2>
              <div v-if="detailedFacilities && detailedFacilities.length > 0">
                <ul class="divide-y divide-gray-200">
                  <li v-for="item in detailedFacilities" :key="item.id" class="py-4 flex justify-between items-center">
                    <div v-if="item.details">
                      <p class="font-semibold text-gray-800">{{ item.details.facilityName }}</p>
                      <p class="text-sm text-gray-500">Số lượng: {{ item.quantity }}</p>
                    </div>
                     <div v-else>
                      <p class="font-semibold text-gray-800 italic">Không tìm thấy chi tiết dịch vụ (ID: {{ item.facilityId }})</p>
                    </div>
                    <p v-if="item.details" class="font-semibold text-gray-700">
                      {{ formatCurrency(item.details.price * item.quantity) }}
                    </p>
                  </li>
                </ul>
              </div>
              <div v-else>
                  <p class="text-sm text-gray-500">Không có dịch vụ nào được đặt.</p>
              </div>
            </div>
          </div>
          
          <div class="lg:col-span-1 space-y-8">
            <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h2 class="text-lg font-semibold text-gray-800 border-b pb-3 mb-4">Thông tin khách hàng</h2>
              <div v-if="booking.user" class="space-y-4">
                <div class="flex items-center space-x-3">
                   <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                   <span class="text-gray-700">{{ booking.user.fullname }}</span>
                </div>
                <div class="flex items-center space-x-3">
                   <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                   <span class="text-gray-700">{{ booking.user.email }}</span>
                </div>
                <div class="flex items-center space-x-3">
                   <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                   <span class="text-gray-700">{{ booking.user.phone }}</span>
                </div>
              </div>
            </div>

            <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
               <div class="flex justify-between items-center">
                  <p class="text-lg font-semibold text-gray-800">Tổng thanh toán</p>
                  <p class="text-2xl font-bold text-indigo-600">{{ formatCurrency(booking.totalAmount) }}</p>
               </div>
            </div>

            <div class="flex justify-end">
              <button class="bg-muesli-400 text-white py-2 px-4 rounded-md hover:bg-muesli-500" @click.prevent="handleRefund(booking.id)">Hoàn Tiền</button>
            </div>
          </div>
        </div>
      </div>

      <div v-else class="text-center py-20">
        <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
          <path vector-effect="non-scaling-stroke" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h14a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2z" />
        </svg>
        <h3 class="mt-2 text-sm font-medium text-gray-900">Không tìm thấy thông tin</h3>
        <p class="mt-1 text-sm text-gray-500">Mã đặt phòng này không tồn tại hoặc đã bị xóa.</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';
import { BookingDetails } from '@/api/bookingdetail';
import { Facilities } from '@/api/facilities';
import { useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();
const bookingDetails = BookingDetails();
const facilities = Facilities();

const booking = computed(() => bookingDetails.bookingdetails?.data);

const detailedFacilities = computed(() => {
  if (!booking.value?.bookingFacilities || !facilities.facilities?.length) {
    return [];
  }

  return booking.value.bookingFacilities.map(bookedFacility => {
    const facilityDetails = facilities.facilities.find(
      f => f.id === bookedFacility.facilityId 
    );
    return {
      ...bookedFacility,
      details: facilityDetails 
    };
  });
});

const bookingStatusInfo = computed(() => {
  if (!booking.value) return { text: '', class: '' };
  const status = booking.value.bookingStatus;
  switch (status) {
    case 'CONFIRMED':
      return { text: 'Đã Xác Nhận', class: 'bg-green-100 text-green-800' };
    case 'PENDING':
      return { text: 'Đang Chờ', class: 'bg-yellow-100 text-yellow-800' };
    case 'CANCELLED':
      return { text: 'Đã Hủy', class: 'bg-red-100 text-red-800' };
    default:
      return { text: status, class: 'bg-gray-100 text-gray-800' };
  }
});

function formatDate(dateString) {
  if (!dateString) return '';
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('vi-VN', {
    day: '2-digit', month: '2-digit', year: 'numeric',
    hour: '2-digit', minute: '2-digit', hour12: false
  }).format(date);
}

function formatCurrency(amount) {
  if (typeof amount !== 'number') return 0;
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency', currency: 'VND'
  }).format(amount);
}

const handleRefund = (id) => {
  const routerData = router.resolve({
      name: 'refund',
      params: { id: id }
  })
  window.open(routerData.href, '_blank');
}

onMounted(async () => {
  const bookingId = Number(route.params.id);
  if (bookingId) {
    await Promise.all([
        bookingDetails.fetchBookingDetails(bookingId),
        facilities.getAllFacilities()
    ]);
  }
  console.log('Booking details loaded:', JSON.stringify(bookingDetails.bookingdetails, null, 2));
  console.log('Facilities loaded:', JSON.stringify(facilities.facilities, null, 2));
});
</script>