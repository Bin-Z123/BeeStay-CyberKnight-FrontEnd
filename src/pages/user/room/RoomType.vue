<template>
  <section>
    <div class="bg-white">
      <div class="w-full h-[700px] relative">
        <div class="bg-[url('@/assets/images/header__bg.webp')] bg-cover bg-center h-full w-full"></div>
        <div class="absolute inset-0 bg-blue-900/40"></div>
      </div>
      <div class="relative z-10">
        <div class="px-4 lg:mx-0 mx-auto xl:container absolute lg:left-1/2 lg:transform lg:-translate-x-1/2 w-full">
          <h1
            class="lg:text-7xl md:text-6xl sm:text-5xl text-4xl text-white absolute -mt-160 lg:-mt-120 left-1/2 transform -translate-x-1/2">
            Loại Phòng
          </h1>
          <form action="" class="bg-white rounded-2xl shadow-xl -mt-130 lg:-mt-80 text-[20px]">
            <div
              class="lg:flex justify-between items-center md:grid md:grid-cols-3 sm:grid sm:grid-cols-2 gap-5 grid grid-cols-1 py-4 px-6">
              <div class="space-y-2 flex flex-col border-gray-200 sm:border-r-1 lg:w-4/14">
                <label>Ngày Đến</label>
                <VueDatePicker v-model="checkin" :format-locale="vi" :format="'dd/MM/yyyy'" :min-date="new Date()"
                  multi-calendars class="lg:pe-5" />
              </div>
              <div class="relative space-y-2 flex flex-col sm:border-r-1 border-gray-200 lg:w-4/14 lg:pe-5">
                <label>Ngày Đi</label><select
                  class="block w-full rounded-[4px]  bg-white px-3 py-[4px] text-gray-400 text-[17px]" name="" id=""
                  :disabled="!checkin" v-model="numberOfNights">
                  <option :value="null" selected disabled>Chọn số đêm</option>
                  <option :value="i" v-for="i in 30" :key="i">
                    {{ i }} đêm - {{ checkOutDateText(i) }}
                  </option>
                </select>
              </div>
              <div class="space-y-2 flex flex-col sm:border-r-1 border-gray-200 lg:w-4/14">
                <label>Số Người</label>
                <select type="text" v-model="numberOfPeople"
                  class="lg:me-5  px-3 py-[4px] rounded-[4px] text-gray-400 text-[17px]">
                  <option value="1">1 người</option>
                  <option value="2">2 người</option>
                  <option value="3">3 người</option>
                  <option value="4">4 người</option>
                  <option value="5">5 người</option>
                </select>
              </div>
              <div class="flex items-center justify-end border-gray-400 lg:w-2/14">
                <button class="w-full px-4 py-3 bg-muesli-400 text-white rounded-xl" @click.prevent="handleSearch">
                  Kiểm Tra
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </section>

  <section>
    <div class="bg-gray-50">
      <div class="py-15 container mx-auto flex lg:flex-row flex-col gap-5">
        <div class="flex flex-col lg:w-2/3 px-4 lg:px-0">
          <div v-for="roomType in roomsFullMatched" :key="roomType.roomTypeId"
            class="text-center border-2 rounded-xl p-6 mb-10 bg-muesli-50 border-muesli-200">
            <h2 class="text-2xl font-bold mb-2">
              Loại phòng "{{ roomType.nameRoomType }}" đã hết chỗ
            </h2>
            <p>Dưới đây là một số loại phòng khác mà bạn có thể quan tâm:</p>
          </div>

          <div v-if="roomsWithAvailable.length" class="flex flex-col gap-10">
            <div v-for="(roomType, index) in roomsWithAvailable" :key="roomType.roomTypeId" :class="[
              'flex flex-col lg:flex-row items-center bg-white shadow-lg rounded-2xl lg:py-0 py-4 lg:gap-0',
              index % 2 === 0 ? '' : 'lg:flex-row-reverse'
            ]">
              <div class="lg:w-2/5 px-4 lg:px-0">
                <img v-if="roomType.availableRoomDTO?.[0]?.roomImage?.[0]?.url"
                  :src="getImageUrl(roomType.availableRoomDTO[0].roomImage[0].url)" alt="Ảnh phòng"
                  :class="['w-full h-65 object-cover', index % 2 === 0 ? 'lg:rounded-l-2xl' : 'lg:rounded-r-2xl']" />
              </div>
              <div class="lg:w-3/5 flex flex-col gap-5 justify-center px-10">
                <h1 class="font-bold text-3xl text-muesli-400">
                  {{ roomType.nameRoomType }}
                  <span class="text-gray-500 text-[16px]">
                    (Còn {{ roomType.availableRooms }} phòng trống)
                  </span>
                </h1>
                <div class="flex items-center gap-4 text-gray-500">
                  <span class="flex items-center gap-1">
                    <Square class="inline-block w-5 h-5" />{{ roomType.size }} m²
                  </span>
                  <span class="flex items-center gap-1">
                    <User class="inline-block w-5 h-5" />{{ roomType.peopleAbout }} người
                  </span>
                </div>
                <p class="text-xl font-bold">{{ roomType.price }} VNĐ<span
                    class="text-gray-500 font-normal">/ngày</span></p>
                <div class="flex">
                  <div class="w-1/2">
                    <a :href="getRoomDetails(roomType.roomTypeId)" target="_blank" class="text-muesli-400 underline">
                      Xem Chi Tiết
                    </a>
                  </div>
                  <div class="w-1/2 flex justify-end items-center">
                    <div class="flex items-center gap-2 border border-gray-300 rounded-lg px-2 py-1">
                      <button @click="decrementRoom(roomType)" :disabled="!numberOfNights"
                        class="px-2 font-bold text-lg disabled:text-gray-300 disabled:cursor-not-allowed">-</button>
                      <input type="text" :value="selectedRooms[roomType.roomTypeId]?.quantity || 0"
                        class="w-12 text-center border-x" readonly />
                      <button @click="incrementRoom(roomType)" :disabled="!numberOfNights"
                        class="px-2 font-bold text-lg disabled:text-gray-300 disabled:cursor-not-allowed">+</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="lg:w-1/3 self-start sticky top-25 w-full px-4 lg:px-0">
          <form>
            <div class="bg-white rounded-2xl shadow-lg p-6 flex flex-col gap-4">
              <h1 class="text-xl font-bold">Thông Tin Đặt Phòng</h1>
              <hr>
              <div class="flex flex-col gap-2">
                <p class="text-gray-500">Ngày Đến: <span class="font-bold text-black float-end">{{ formatDate(checkin)
                    }}</span>
                </p>
                <p class="text-gray-500">Ngày Đi: <span class="font-bold text-black float-end">{{
                  formatDate(checkOutDate) }}</span>
                </p>
                <p class="text-gray-500">Số Người: <span class="font-bold text-black float-end">{{ numberOfPeople
                    }}</span></p>
                <p class="font-bold">Tổng Số Đêm: <span class="font-bold float-end">{{ numberOfNights || 0 }}</span></p>
              </div>
              <hr>
              <div class="flex flex-col gap-2 min-h-[50px]">
                <div v-if="!numberOfNights"
                  class="text-center text-red-500 font-semibold p-2 bg-red-50 rounded-lg my-auto">
                  Vui lòng chọn Ngày đến và Số đêm.
                </div>
                <div v-else-if="bookingSummary.length">
                  <div v-for="item in bookingSummary" :key="item.roomTypeId">
                    <p class="text-gray-500">{{ item.nameRoomType }} x {{ item.quantity }}: <span
                        class="font-bold text-black float-end">{{ formatCurrency(item.subtotal) }}</span></p>
                  </div>
                </div>
                <div v-else class="text-center text-gray-500 my-auto">
                  Vui lòng chọn phòng
                </div>
              </div>
              <hr>
              <div class="flex flex-col gap-3">
                <div v-for="facility in facilities.facilities" :key="facility.id"
                  class="flex justify-between items-center text-sm">
                  <div>
                    <label :for="'facility-' + facility.id">{{ facility.facilityName }}</label>
                    <p class="text-xs text-gray-500">{{ facility.price === 0 ? 'Miễn Phí' : formatCurrency(facility.price)+ " / dịch vụ" }}</p>
                  </div>

                  <div v-if="facility.price !== 0" class="flex items-center gap-2 border border-gray-300 rounded-lg px-2 py-1">
                    <button @click.prevent="decrementFacility(facility)"
                      class="px-2 font-bold text-lg disabled:text-gray-300 disabled:cursor-not-allowed">-</button>
                    <input type="text" :value="selectedFacilityQuantities[facility.id] || 0"
                      class="w-10 text-center bg-transparent" readonly />
                    <button @click.prevent="incrementFacility(facility)" class="px-2 font-bold text-lg">+</button>
                  </div>
                  <div v-if="facility.price === 0" class="flex items-center justify-center w-1/3">
                    <input type="checkbox" :id="'facility-' + facility.id" v-model="selectedFacilityQuantities[facility.id]"
                      true-value="1" false-value="0" class="w-5 h-5" />
                  </div>
                </div>
              </div>
              <hr>
              <div class="flex justify-between items-center">
                <p class="font-bold">Tổng Cộng:</p>
                <p class="text-xl font-bold text-muesli-400">{{ formatCurrency(totalPrice) }}</p>
              </div>
              <button @click.prevent="proceedToBooking()"
                class="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors disabled:bg-gray-400"
                :disabled="totalPrice === 0">
                Điền Thông Tin & Đặt Phòng
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </section>

  <section>
    <div class="px-4">
      <div class="container mx-auto">
        <div class="flex flex-col justify-center items-center px-4 py-25 gap-3 w-full">
            <h2 class="text-2xl text-muesli-400" data-aos="fade-up">Dịch Vụ</h2>
            <p class="text-4xl font-bold mb-10" data-aos="fade-up">Dịch Vụ Của Khách Sạn</p>
            <div class="lg:container lg:mx-auto" data-aos="fade-up" data-aos-delay="100">
                <div ref="facilitys" class="keen-slider rounded-2xl">
                    <div class="keen-slider__slide sm:w-auto bg-white flex flex-col justify-center items-center rounded-2xl h-70 p-10 gap-3"
                        v-for="facility in facilities.facilities" :key="facility.id">
                        <img :src="getImageUrl(facility.publicId)" class="w-14 h-14" alt="">
                        <h1 class="font-bold text-xl">{{ facility.facilityName }}</h1>
                        <h1 class="text-sm text-gray-400">{{ facility.description }}</h1>
                    </div>

                </div>
            </div>
        </div>
      </div>
    </div>
    <BookingUserDialog v-model:open="isBookingUserDialogOpen"></BookingUserDialog>
  </section>
</template>

<script setup>
import {
  Square,
  User,
  Star,
} from 'lucide-vue-next';
import { ref, onMounted, computed, watch, nextTick } from "vue";
import { vi } from "date-fns/locale";
import { addDays, format, parseISO, differenceInDays } from "date-fns";
import 'keen-slider/keen-slider.min.css';
import { useKeenSlider } from 'keen-slider/vue';
import KeenSlider from 'keen-slider';
import { Bookings } from '@/api/booking';
import { useRoute, useRouter } from "vue-router";
import BookingUserDialog from '@/components/user/BookingUserDialog/BookingUserDialog.vue';
import { Facilities } from '@/api/facilities';

const baseUrl = import.meta.env.VITE_CLOUDINARY_IMG_URL;
const bookings = Bookings();
const route = useRoute();
const router = useRouter();
const isBookingUserDialogOpen = ref(false);
const selectedRooms = ref({});
const facilities = Facilities();
const selectedFacilities = ref([]);
const selectedFacilityQuantities = ref({});

const incrementFacility = (facility) => {
  const currentQty = selectedFacilityQuantities.value[facility.id] || 0;
  selectedFacilityQuantities.value[facility.id] = currentQty + 1;
};

const decrementFacility = (facility) => {
  const currentQty = selectedFacilityQuantities.value[facility.id];
  // Nếu không có dịch vụ này hoặc số lượng là 0 thì không làm gì
  if (!currentQty) return;

  if (currentQty > 1) {
    // Nếu số lượng lớn hơn 1, chỉ cần giảm đi 1
    selectedFacilityQuantities.value[facility.id]--;
  } else {
    // Nếu số lượng là 1, xóa dịch vụ khỏi object
    delete selectedFacilityQuantities.value[facility.id];
  }
};

const totalFacilitiesPrice = computed(() => {
  const allAvailableFacilities = facilities.facilities || [];
  let total = 0;

  // Lặp qua object các dịch vụ đã chọn
  for (const facilityId in selectedFacilityQuantities.value) {
    const quantity = selectedFacilityQuantities.value[facilityId];
    // Tìm thông tin chi tiết của dịch vụ dựa trên ID
    const facility = allAvailableFacilities.find(f => f.id === Number(facilityId));

    if (facility && quantity > 0) {
      total += facility.price * quantity;
    }
  }
  return total;
});

const getRoomDetails = (roomTypeId) => {
  return router.resolve({
    path: '/user/roomdetail',
    query: { roomTypeId }
  }).href
}

const checkin1 = ref();
const checkout1 = ref();
const numberOfPeople1 = ref(0);

const checkin = ref();
const formatDate = (date) => {
  return date ? format(date, "dd/MM/yyyy") : "";
};

const numberOfNights = ref(1);
const checkOutDateText = (night) => {
  if (!checkin.value) return "";
  const date = addDays(checkin.value, night);
  return format(date, "dd/MM/yyyy");
};

const checkOutDate = computed(() => {
  return checkin.value && numberOfNights.value
    ? addDays(checkin.value, numberOfNights.value)
    : null;
});

// Slider facilities
const facilitiesInstance = ref(null);
const facilitys = ref(null);
watch(() => bookings.listRoomsAvailable, (newValue) => {
    nextTick(() => {
        if (facilitiesInstance.value) facilitiesInstance.value.destroy();
        if (newValue && newValue.length > 0 && facilitys.value) {
            facilitiesInstance.value = new KeenSlider(facilitys.value, {
                loop: true,
                slides: { perView: 4, spacing: 15 },
                breakpoints: { '(max-width: 768px)': { slides: { perView: 1, spacing: 10 } } },
            });
        }
    });
}, { deep: true });

const [reviews] = useKeenSlider({
  loop: true,
  slides: {
    perView: 1,
    spacing: 15,
  },
});

const filterAndSortRooms = computed(() => {
  const matched = bookings.listRoomsAvailable.filter(
    room => room.peopleAbout === bookings.numberOfPeople
  );
  const others = bookings.listRoomsAvailable.filter(
    room => room.peopleAbout !== bookings.numberOfPeople
  );
  return [...matched, ...others];
});

const roomsWithAvailable = computed(() =>
  filterAndSortRooms.value.filter(
    (room) => room.availableRoomDTO?.length && room.availableRooms > 0
  )
);

const roomsFullMatched = computed(() =>
  filterAndSortRooms.value.filter(
    (room) =>
      room.availableRoomDTO?.length &&
      room.availableRooms === 0 &&
      room.peopleAbout === bookings.numberOfPeople
  )
);

const getImageUrl = (publicId) => {
  return `${baseUrl}/${publicId}`;
};

const numberOfPeople = ref(1);
const handleSearch = async () => {
  bookings.numberOfPeople = Number(numberOfPeople.value);
  await bookings.getAvailableRooms(
    checkin.value,
    checkOutDate.value,
    Number(numberOfPeople.value)
  );
  console.log(JSON.stringify(bookings.listRoomsAvailable, null, 2));
};

onMounted(async () => {
  checkin.value = new Date();
  checkin1.value = route.query.checkins;
  checkout1.value = route.query.checkouts;
  numberOfPeople1.value = Number(route.query.numberOfPeoples);

  await facilities.getAllFacilities();
  bookings.numberOfPeople = numberOfPeople1.value || 1;

  console.log(
    "checkin",
    checkin1.value,
    "checkout",
    checkout1.value,
    "numberOfPeople",
    numberOfPeople1.value
  );
  await bookings.getAvailableRooms(checkin1.value, checkout1.value, numberOfPeople1.value);
  console.log("Available Rooms:", JSON.stringify(bookings.listRoomsAvailable, null, 2));
});

const formatCurrency = (value) => {
  const numberValue = Number(value);
  if (isNaN(numberValue)) return "0 VNĐ";
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(numberValue);
};

const incrementRoom = (roomType) => {
  const existingEntry = selectedRooms.value[roomType.roomTypeId];
  const currentQty = existingEntry ? existingEntry.quantity : 0;
  if (currentQty < roomType.availableRooms) {
    if (existingEntry) {
      existingEntry.quantity++;
    } else {
      selectedRooms.value[roomType.roomTypeId] = {
        roomData: roomType,
        quantity: 1
      };
    }
  }
};

const decrementRoom = (roomType) => {
  const existingEntry = selectedRooms.value[roomType.roomTypeId];
  if (!existingEntry) return;
  if (existingEntry.quantity > 1) {
    existingEntry.quantity--;
  } else {
    delete selectedRooms.value[roomType.roomTypeId];
  }
};

const bookingSummary = computed(() => {
  if (!numberOfNights.value) return [];
  return Object.values(selectedRooms.value).map(entry => {
    const { roomData, quantity } = entry;
    return {
      roomTypeId: roomData.roomTypeId,
      nameRoomType: roomData.nameRoomType,
      quantity: quantity,
      subtotal: parseFloat(roomData.price) * quantity * numberOfNights.value
    };
  });
});

const totalPrice = computed(() => {
  return bookingSummary.value.reduce((total, item) => total + item.subtotal, 0) + totalFacilitiesPrice.value;
});
const proceedToBooking = () => {
  bookings.finalSelectedRooms = selectedRooms.value;
  bookings.finalNumberOfNights = numberOfNights.value;

  const allAvailableFacilities = facilities.facilities || [];

  // Tạo mảng các đối tượng dịch vụ, mỗi đối tượng chứa thông tin và số lượng đã chọn
  bookings.selectedFacilities = Object.entries(selectedFacilityQuantities.value).map(([id, quantity]) => {
    const facilityDetails = allAvailableFacilities.find(f => f.id === Number(id));
    if (facilityDetails) {
      return {
        ...facilityDetails, // Giữ lại toàn bộ thông tin gốc của dịch vụ
        quantity: quantity  // Thêm thuộc tính số lượng
      };
    }
    return null;
  }).filter(Boolean); // Lọc bỏ các giá trị null nếu có
  handleSearch();
  isBookingUserDialogOpen.value = true;
  console.log("CHeckout: ", checkOutDate.value);
  console.log("Selected BK:", JSON.stringify(bookings, null, 2));
};
</script>