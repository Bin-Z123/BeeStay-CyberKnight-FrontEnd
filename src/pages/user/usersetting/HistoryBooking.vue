<template>
  <section>
    <div class="pt-5 ms-5 lg:me-25 me-5">
      <h1 class="text-2xl font-bold mb-4">Lịch sử Đặt phòng của bạn</h1>
      <Tabs default-value="upcoming" class="w-full">
        <TabsList class="grid w-full grid-cols-4">
          <TabsTrigger value="upcoming">Sắp tới</TabsTrigger>
          <TabsTrigger value="ongoing">Đang diễn ra</TabsTrigger>
          <TabsTrigger value="history">Lịch sử</TabsTrigger>
          <TabsTrigger value="cancelled">Đã hủy</TabsTrigger>
        </TabsList>
        <TabsContent value="upcoming">
            <div v-if="upcomingBookings.length > 0">
                <div v-for="booking in upcomingBookings" :key="booking.id" class="border rounded-lg p-4 mb-4 shadow-md bg-white hover:shadow-lg transition-shadow duration-300">
                    <div class="flex justify-between items-center pb-3 border-b">
                        <p class="text-sm text-gray-600">Mã Booking: <span class="font-bold text-black">#{{ booking.id }}</span></p>
                        <span :class="['font-semibold text-sm px-3 py-1 rounded-full', getStatusClass(booking.bookingStatus)]">{{ getStatusText(booking.bookingStatus) }}</span>
                    </div>
                    <div class="flex flex-col md:flex-row gap-5 mt-4">
                        <div class="w-full md:w-1/3"><img src="https://via.placeholder.com/300x200.png?text=Hotel+Room" alt="Room Image" class="w-full h-48 object-cover rounded-md"></div>
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
                                <button @click="cancelBooking(booking.id)" class="px-4 py-2 text-sm font-medium text-red-600 bg-red-100 rounded-md hover:bg-red-200">Hủy Đặt Phòng</button>
                                <RouterLink :to="`/booking-details/${booking.id}`" class="px-4 py-2 text-sm font-medium text-white bg-muesli-500 rounded-md hover:bg-muesli-600">Xem Chi Tiết</RouterLink>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <p v-else class="text-center text-gray-500 p-10">Bạn không có lịch đặt phòng nào sắp tới.</p>
        </TabsContent>
        <TabsContent value="ongoing">
             <div v-if="ongoingBookings.length > 0">
                <div v-for="booking in ongoingBookings" :key="booking.id" class="border rounded-lg p-4 mb-4 shadow-md bg-white">
                    <div class="flex justify-between items-center pb-3 border-b">
                        <p class="text-sm text-gray-600">Mã Booking: <span class="font-bold text-black">#{{ booking.id }}</span></p>
                        <span :class="['font-semibold text-sm px-3 py-1 rounded-full', getStatusClass(booking.bookingStatus)]">{{ getStatusText(booking.bookingStatus) }}</span>
                    </div>
                    <div class="flex flex-col md:flex-row gap-5 mt-4">
                        <div class="w-full md:w-1/3"><img src="https://via.placeholder.com/300x200.png?text=Hotel+Room" alt="Room Image" class="w-full h-48 object-cover rounded-md"></div>
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
                                <RouterLink :to="`/booking-details/${booking.id}`" class="px-4 py-2 text-sm font-medium text-white bg-muesli-500 rounded-md hover:bg-muesli-600">Xem Chi Tiết</RouterLink>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <p v-else class="text-center text-gray-500 p-10">Bạn không có phòng nào đang ở hiện tại.</p>
        </TabsContent>
        <TabsContent value="history">
            <div v-if="pastBookings.length > 0">
                <div v-for="booking in pastBookings" :key="booking.id" class="border rounded-lg p-4 mb-4 shadow-md bg-white">
                     <div class="flex justify-between items-center pb-3 border-b">
                        <p class="text-sm text-gray-600">Mã Booking: <span class="font-bold text-black">#{{ booking.id }}</span></p>
                        <span :class="['font-semibold text-sm px-3 py-1 rounded-full', getStatusClass('COMPLETED')]">{{ getStatusText('COMPLETED') }}</span>
                    </div>
                    <div class="flex flex-col md:flex-row gap-5 mt-4">
                        <div class="w-full md:w-1/3"><img src="https://via.placeholder.com/300x200.png?text=Hotel+Room" alt="Room Image" class="w-full h-48 object-cover rounded-md"></div>
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
                               <button class="px-4 py-2 text-sm font-medium text-white bg-yellow-500 rounded-md hover:bg-yellow-600">Viết đánh giá</button>
                                <RouterLink :to="`/booking-details/${booking.id}`" class="px-4 py-2 text-sm font-medium text-white bg-muesli-500 rounded-md hover:bg-muesli-600">Xem Chi Tiết</RouterLink>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <p v-else class="text-center text-gray-500 p-10">Chưa có lịch sử đặt phòng nào hoàn thành.</p>
        </TabsContent>
        <TabsContent value="cancelled">
            <div v-if="cancelledBookings.length > 0">
                <div v-for="booking in cancelledBookings" :key="booking.id" class="border rounded-lg p-4 mb-4 shadow-md bg-gray-50">
                     <div class="flex justify-between items-center pb-3 border-b">
                        <p class="text-sm text-gray-500">Mã Booking: <span class="font-bold text-gray-700">#{{ booking.id }}</span></p>
                        <span :class="['font-semibold text-sm px-3 py-1 rounded-full', getStatusClass(booking.bookingStatus)]">{{ getStatusText(booking.bookingStatus) }}</span>
                    </div>
                    <div class="flex flex-col md:flex-row gap-5 mt-4 opacity-60">
                        <div class="w-full md:w-1/3"><img src="https://via.placeholder.com/300x200.png?text=Hotel+Room" alt="Room Image" class="w-full h-48 object-cover rounded-md"></div>
                        <div class="w-full md:w-2/3 flex flex-col justify-between">
                            <div>
                                <h3 class="font-bold text-xl text-gray-500 mb-2">Chi tiết phòng</h3>
                                <ul class="list-disc list-inside text-gray-500"><li v-for="detail in booking.bookingDetails" :key="detail.id">{{ detail.quantity }} x {{ detail.roomType.name }}</li></ul>
                                <div class="grid grid-cols-2 gap-3 text-sm mt-3">
                                    <div class="flex items-center text-gray-500"><svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg><span>{{ formatDate(booking.checkInDate) }} - {{ formatDate(booking.checkOutDate) }}</span></div>
                                    <div class="flex items-center text-gray-500"><svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.653-.281-1.264-.742-1.679M12 12a3 3 0 100-6 3 3 0 000 6zM2 12a3 3 0 116 0 3 3 0 01-6 0z" /></svg><span>{{ booking.numGuest }} khách</span></div>
                                    <div class="flex items-center text-gray-500"><svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v.01" /></svg><span class="font-semibold">{{ formatCurrency(booking.totalAmount) }}</span></div>
                                    <div class="flex items-center text-gray-500"><svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg><span>Đặt ngày: {{ formatDate(booking.bookingDate) }}</span></div>
                                </div>
                            </div>
                            <div class="flex justify-end items-center gap-3 mt-4">
                               <RouterLink :to="`/booking-details/${booking.id}`" class="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300">Xem Chi Tiết</RouterLink>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <p v-else class="text-center text-gray-500 p-10">Bạn không có đặt phòng nào đã hủy.</p>
        </TabsContent>
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

const bookings = Bookings();
const now = new Date();

const upcomingBookings = computed(() => {
  if (!bookings.bookinghistory) return [];
  return bookings.bookinghistory.filter(b => 
    b.bookingStatus === 'CONFIRMED' && new Date(b.checkInDate) > now
  );
});

const ongoingBookings = computed(() => {
  if (!bookings.bookinghistory) return [];
  return bookings.bookinghistory.filter(b => {
    const checkIn = new Date(b.checkInDate);
    const checkOut = new Date(b.checkOutDate);
    return (checkIn <= now && checkOut > now && b.bookingStatus !== 'CANCELLED');
  });
});

const pastBookings = computed(() => {
  if (!bookings.bookinghistory) return [];
  return bookings.bookinghistory.filter(b => 
    new Date(b.checkOutDate) <= now && b.bookingStatus !== 'CANCELLED'
  );
});

const cancelledBookings = computed(() => {
  if (!bookings.bookinghistory) return [];
  return bookings.bookinghistory.filter(b => b.bookingStatus === 'CANCELLED');
});


onMounted(async () => {
  await bookings.bookingHistory();
});

const formatDate = (dateString) => {
  if (!dateString) return '';
  return format(new Date(dateString), 'dd/MM/yyyy');
};

const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount * 1000);
}

const getStatusText = (status) => {
    const statusMap = {
        'CONFIRMED': 'Đã xác nhận',
        'CANCELLED': 'Đã hủy',
        'STAY': 'Đang ở',
        'COMPLETED': 'Đã hoàn thành'
    };
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

const cancelBooking = (id) => {
    if(confirm('Bạn có chắc chắn muốn hủy đặt phòng này không?')) {
        console.log('Hủy phòng với ID:', id);
        alert('Yêu cầu hủy đã được gửi đi.');
    }
}
</script>