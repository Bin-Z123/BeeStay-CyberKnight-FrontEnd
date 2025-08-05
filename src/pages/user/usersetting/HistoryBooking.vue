<template>
  <section>
    <div class="pt-5 ms-5 lg:me-25 me-5">
      <h1 class="text-2xl font-bold mb-4">Lịch sử Đặt phòng của bạn</h1>
      <div v-if="isLoading" class="text-center p-10">Đang tải dữ liệu...</div>
      <Tabs v-else default-value="upcoming" class="w-full">
        <TabsList class="grid w-full grid-cols-4 bg-white rounded-b-none">
          <TabsTrigger value="upcoming" class="data-[state=active]:bg-muesli-300 data-[state=active]:text-white data-[state=active]:rounded-b-none">Sắp tới</TabsTrigger>
          <TabsTrigger value="ongoing" class="data-[state=active]:bg-muesli-300 data-[state=active]:text-white data-[state=active]:rounded-b-none">Đang diễn ra</TabsTrigger>
          <TabsTrigger value="history" class="data-[state=active]:bg-muesli-300 data-[state=active]:text-white data-[state=active]:rounded-b-none">Lịch sử</TabsTrigger>
          <TabsTrigger value="cancelled" class="data-[state=active]:bg-muesli-300 data-[state=active]:text-white data-[state=active]:rounded-b-none">Đã hủy</TabsTrigger>
        </TabsList>

        <template v-for="tab in tabs" :key="tab.value">
          <TabsContent :value="tab.value">
            <div v-if="tab.bookings.length > 0">
              <div v-for="booking in tab.paginatedBookings" :key="booking.id" class="border rounded-lg p-4 mb-4 shadow-md bg-white hover:shadow-lg transition-shadow duration-300">
                <div class="flex justify-between items-center pb-3 border-b">
                  <p class="text-sm text-gray-600">Mã Booking: <span class="font-bold text-black">#{{ booking.id }}</span></p>
                  <span :class="['font-semibold text-sm px-3 py-1 rounded-full', getStatusClass(booking.bookingStatus || 'COMPLETED')]">{{ getStatusText(booking.bookingStatus || 'COMPLETED') }}</span>
                </div>
                <div class="flex flex-col md:flex-row gap-5 mt-4">
                  <div class="w-full md:w-1/3 h-48">
                    <div v-if="getBookingImageUrls(booking).length > 1" class="relative w-full h-full group">
                      <img :src="getBookingImageUrls(booking)[sliderIndexes[booking.id] || 0]" alt="Room Image" class="w-full h-full object-cover rounded-md">
                      <button @click.stop="prevImage(booking.id, getBookingImageUrls(booking).length)" class="absolute left-2 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" /></svg>
                      </button>
                      <button @click.stop="nextImage(booking.id, getBookingImageUrls(booking).length)" class="absolute right-2 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" /></svg>
                      </button>
                    </div>
                    <div v-else>
                      <img :src="getBookingImageUrls(booking)[0] || 'https://placehold.co/300x200?text=No+Image'" alt="Room Image" class="w-full h-48 object-cover rounded-md">
                    </div>
                  </div>
                  <div class="w-full md:w-2/3 flex flex-col justify-between">
                    <div>
                      <h3 class="font-bold text-xl text-gray-800 mb-2">Thông tin đơn đặt phòng</h3>
                      <ul class="list-disc list-inside text-gray-700"><li v-for="detail in booking.bookingDetails" :key="detail.id">{{ detail.quantity }} x {{ detail.roomType.name }}</li></ul>
                      <div class="grid grid-cols-2 gap-3 text-sm mt-3">
                        <div class="flex items-center text-gray-600"><svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2 text-muesli-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg><span>{{ formatDate(booking.checkInDate) }} - {{ formatDate(booking.checkOutDate) }}</span></div>
                        <div class="flex items-center text-gray-600"><svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2 text-muesli-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.653-.281-1.264-.742-1.679M12 12a3 3 0 100-6 3 3 0 000 6zM2 12a3 3 0 116 0 3 3 0 01-6 0z" /></svg><span>{{ booking.numGuest }} khách</span></div>
                        <div class="flex items-center text-gray-600"><svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2 text-muesli-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v.01" /></svg><span class="font-semibold">{{ formatCurrency(booking.totalAmount) }}</span></div>
                        <div class="flex items-center text-gray-600"><svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2 text-muesli-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg><span>Đặt ngày: {{ formatDate(booking.bookingDate) }}</span></div>
                      </div>
                    </div>
                    <div class="flex justify-end items-center gap-3 mt-4">
                      <button v-if="tab.value === 'upcoming'" @click="cancelBooking(booking.id)" class="px-4 py-2 text-sm font-medium text-red-600 bg-red-100 rounded-md hover:bg-red-200">Hủy Đặt Phòng</button>
                      <button v-if="tab.value === 'history'" class="px-4 py-2 text-sm font-medium text-white bg-yellow-500 rounded-md hover:bg-yellow-600">Viết đánh giá</button>
                      <!-- <RouterLink :to="`/user/booking-details/${booking.id}`" class="px-4 py-2 text-sm font-medium text-white bg-muesli-500 rounded-md hover:bg-muesli-600">Xem Chi Tiết</RouterLink> -->
                       <button @click.prevent="roomDetails(booking.id)" class="px-4 py-2 text-sm font-medium text-white bg-muesli-500 rounded-md hover:bg-muesli-600">Xem Chi Tiết</button>
                    </div>
                  </div>
                </div>
              </div>
              <div v-if="tab.totalPages > 1" class="flex justify-center items-center gap-4 mt-6">
                <button @click="tab.currentPage.value--" :disabled="tab.currentPage.value === 1" class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">Trước</button>
                <span class="text-sm text-gray-700">Trang {{ tab.currentPage.value }} / {{ tab.totalPages }}</span>
                <button @click="tab.currentPage.value++" :disabled="tab.currentPage.value === tab.totalPages" class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">Sau</button>
              </div>
            </div>
            <p v-else class="text-center text-gray-500 p-10">{{ tab.emptyMessage }}</p>
          </TabsContent>
        </template>
      </Tabs>
    </div>
  </section>
</template>

<script setup>
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs'
import { computed, onMounted, ref } from "vue";
import { Bookings } from "@/api/booking";
import { format } from 'date-fns';
import { RoomType } from '@/api/roomtype';
import { useRouter } from "vue-router";

const router = useRouter();

const bookings = Bookings();
const now = new Date();
const roomType = RoomType();
const isLoading = ref(true);

const sliderIndexes = ref({});
const upcomingCurrentPage = ref(1);
const ongoingCurrentPage = ref(1);
const pastCurrentPage = ref(1);
const cancelledCurrentPage = ref(1);

const upcomingBookings = computed(() => {
  if (!bookings.bookinghistory) return [];
  return bookings.bookinghistory.filter(b => b.bookingStatus === 'CONFIRMED' && new Date(b.checkInDate) > now);
});
const paginatedUpcomingBookings = computed(() => paginate(upcomingBookings.value, upcomingCurrentPage.value));

const ongoingBookings = computed(() => {
  if (!bookings.bookinghistory) return [];
  return bookings.bookinghistory.filter(b => new Date(b.checkInDate) <= now && new Date(b.checkOutDate) > now && b.bookingStatus !== 'CANCELLED');
});
const paginatedOngoingBookings = computed(() => paginate(ongoingBookings.value, ongoingCurrentPage.value));

const pastBookings = computed(() => {
  if (!bookings.bookinghistory) return [];
  return bookings.bookinghistory.filter(b => new Date(b.checkOutDate) <= now && b.bookingStatus !== 'CANCELLED');
});
const paginatedPastBookings = computed(() => paginate(pastBookings.value, pastCurrentPage.value));

const cancelledBookings = computed(() => {
  if (!bookings.bookinghistory) return [];
  return bookings.bookinghistory.filter(b => b.bookingStatus === 'CANCELLED');
});
const paginatedCancelledBookings = computed(() => paginate(cancelledBookings.value, cancelledCurrentPage.value));

const tabs = computed(() => [
  { value: 'upcoming', bookings: upcomingBookings.value, paginatedBookings: paginatedUpcomingBookings.value, currentPage: upcomingCurrentPage, totalPages: Math.ceil(upcomingBookings.value.length / 4), emptyMessage: 'Bạn không có lịch đặt phòng nào sắp tới.' },
  { value: 'ongoing', bookings: ongoingBookings.value, paginatedBookings: paginatedOngoingBookings.value, currentPage: ongoingCurrentPage, totalPages: Math.ceil(ongoingBookings.value.length / 4), emptyMessage: 'Bạn không có phòng nào đang ở hiện tại.' },
  { value: 'history', bookings: pastBookings.value, paginatedBookings: paginatedPastBookings.value, currentPage: pastCurrentPage, totalPages: Math.ceil(pastBookings.value.length / 4), emptyMessage: 'Chưa có lịch sử đặt phòng nào hoàn thành.' },
  { value: 'cancelled', bookings: cancelledBookings.value, paginatedBookings: paginatedCancelledBookings.value, currentPage: cancelledCurrentPage, totalPages: Math.ceil(cancelledBookings.value.length / 4), emptyMessage: 'Bạn không có đặt phòng nào đã hủy.' },
]);

function paginate(array, currentPage) {
  const itemsPerPage = 4;
  const start = (currentPage - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return array.slice(start, end);
}


const baseUrl = import.meta.env.VITE_CLOUDINARY_IMG_URL;
const getImageUrl = (publicId) => {
  if (!publicId) return 'https://placehold.co/300x200?text=No+Image';
  return `${baseUrl}/${publicId}`;
};

const getSingleRoomTypeImage = (roomTypeId) => {
  const roomTypeData = roomType.roomtypes.find(rt => rt.id == roomTypeId);
  if (!roomTypeData || !roomTypeData.rooms) return 'https://placehold.co/300x200?text=No+Data';
  const roomWithImage = roomTypeData.rooms.find(room => room.roomImages && room.roomImages.length > 0);
  if (!roomWithImage) return 'https://placehold.co/300x200?text=No+Image';
  return getImageUrl(roomWithImage.roomImages[0].url);
};

const getBookingImageUrls = (booking) => {
  if (!booking.bookingDetails || booking.bookingDetails.length === 0) return [];
  return booking.bookingDetails.map(detail => getSingleRoomTypeImage(detail.roomType.id));
};

function nextImage(bookingId, totalImages) {
  const currentIndex = sliderIndexes.value[bookingId] || 0;
  sliderIndexes.value[bookingId] = (currentIndex + 1) % totalImages;
}

function prevImage(bookingId, totalImages) {
  const currentIndex = sliderIndexes.value[bookingId] || 0;
  sliderIndexes.value[bookingId] = (currentIndex - 1 + totalImages) % totalImages;
}

onMounted(async () => {
  isLoading.value = true;
  try {
    await Promise.all([
      bookings.bookingHistory(),
      roomType.getAllRoomType()
    ]);
  } catch (error) {
    console.error("Lỗi khi tải dữ liệu:", error);
  } finally {
    isLoading.value = false;
  }
});

const formatDate = (dateString) => {
  if (!dateString) return '';
  return format(new Date(dateString), 'dd/MM/yyyy');
};

const formatCurrency = (amount) => {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
}

const getStatusText = (status) => {
  const statusMap = { 'CONFIRMED': 'Đã xác nhận', 'CANCELLED': 'Đã hủy', 'STAY': 'Đang ở', 'COMPLETED': 'Đã hoàn thành' };
  return statusMap[status] || status;
}

const getStatusClass = (status) => {
  switch (status) {
    case 'CONFIRMED': return 'bg-blue-100 text-blue-800';
    case 'STAY': return 'bg-green-100 text-green-800';
    case 'CANCELLED': return 'bg-red-100 text-red-800';
    case 'COMPLETED': return 'bg-gray-200 text-gray-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

const cancelBooking = async (id) => {
  if (confirm('Bạn có chắc chắn muốn hủy đặt phòng này không?')) {
      console.log('Cancelling booking with ID:', id);
  }
}

const roomDetails = (id) => {
  const routerData = router.resolve({
      name: 'booking-detail',
      params: { id: id }
  })
  window.open(routerData.href, '_blank');
}
</script>