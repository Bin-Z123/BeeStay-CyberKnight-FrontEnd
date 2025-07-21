<template>
    <section>
        <div class="bg-white">
            <div class="w-full h-[700px] relative">
                <div class="bg-[url('@/assets/images/header__bg.webp')] bg-cover bg-center h-full w-full"></div>
                <div class="absolute inset-0 bg-blue-900/40"></div>
            </div>
            <div class="relative z-10">
                <div
                    class="px-4 lg:mx-0 mx-auto xl:container absolute lg:left-1/2 lg:transform lg:-translate-x-1/2 w-full">
                    <h1
                        class="lg:text-7xl md:text-6xl sm:text-5xl text-4xl text-white absolute -mt-160 lg:-mt-120 left-1/2 transform -translate-x-1/2">
                        Loại Phòng
                    </h1>
                    <form action="" class="bg-white rounded-2xl shadow-xl -mt-130 lg:-mt-80 text-[20px]">
                        <div
                            class="lg:flex justify-between items-center md:grid md:grid-cols-3 sm:grid sm:grid-cols-2 gap-5 grid grid-cols-1 py-4 px-6">
                            <div class="space-y-2 flex flex-col border-gray-200 sm:border-r-1 lg:w-4/14">
                                <label>Ngày Đến</label>
                                <VueDatePicker v-model="checkin" :format-locale="vi" :format="'dd/MM/yyyy'"
                                    :min-date="new Date()" multi-calendars class="lg:pe-5" />
                            </div>
                            <div
                                class="relative space-y-2 flex flex-col sm:border-r-1 border-gray-200 lg:w-4/14 lg:pe-5">
                                <label>Ngày Đi</label><select
                                    class="block w-full rounded-[4px]  bg-white px-3 py-[4px] text-gray-400 text-[17px]"
                                    name="" id="" :disabled="!checkin" v-model="numberOfNights">
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
                                <button class="w-full px-4 py-3 bg-muesli-400 text-white rounded-xl"
                                    @click.prevent="handleSearch">
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
                <div class="flex flex-col lg:flex-row gap-10 lg:w-2/3 px-4 lg:px-0">
                    <div v-for="roomType in roomsFullMatched" :key="roomType.roomTypeId"
                        class="text-center border-2 rounded-xl p-6 mb-10 bg-muesli-50 border-muesli-200">
                        <h2 class="text-2xl font-bold mb-2">
                            Loại phòng "{{ roomType.nameRoomType }}" đã hết chỗ
                        </h2>
                        <p>Dưới đây là một số loại phòng khác mà bạn có thể quan tâm:</p>
                    </div>

                    <div v-if="roomsWithAvailable.length">
                        <div v-for="(roomType, index) in roomsWithAvailable" :key="roomType.roomTypeId" :class="[
                            'flex flex-col lg:flex-row items-center mb-10 bg-white shadow-lg rounded-2xl lg:py-0 py-4 lg:gap-0',
                            index % 2 === 0 ? '' : 'lg:flex-row-reverse'
                        ]">
                            <div class="lg:w-2/5 px-4 lg:px-0">
                                <img v-if="roomType.availableRoomDTO?.[0]?.roomImage?.[0]?.url"
                                    :src="getImageUrl(roomType.availableRoomDTO[0].roomImage[0].url)" alt="Ảnh phòng"
                                    :class="['w-full h-65', index % 2 === 0 ? 'lg:rounded-l-2xl' : 'lg:rounded-r-2xl']" />
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
                                        <a :href="getRoomDetails(roomType.roomTypeId)" target="_blank"
                                            class="text-muesli-400 underline">
                                            Xem Chi Tiết
                                        </a>
                                    </div>
                                    <div class="w-1/2 flex justify-end items-center">
                                        <div class="flex items-center gap-2 border border-gray-300 rounded-lg px-2 py-1">
                                            <!-- <button @click="toggleDarkMode"
                                                class="bg-muesli-400 text-white px-4 py-2 rounded-lg">
                                                Chọn Phòng
                                            </button> -->
                                            <button>-</button>
                                            <input type="text" value="1" class="w-12 text-center border border-t-0 border-b-0" />
                                            <button>+</button>
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
                                <p class="text-gray-500">Ngày Đến: <span class="font-bold float-end">11/11/2023</span>
                                </p>
                                <p class="text-gray-500">Ngày Đi: <span class="font-bold float-end">11/11/2023</span>
                                </p>
                                <p class="text-gray-500">Số Người: <span class="font-bold float-end">2</span></p>
                                <p class="font-bold">Tổng Số Đêm: <span class="font-bold float-end">0</span></p>
                            </div>
                            <hr>
                            <div class="flex flex-col gap-2">
                                <p class="text-gray-500">Phòng Thường x 1: <span class="font-bold float-end">0
                                        VNĐ</span></p>
                                <p class="text-gray-500">Phòng Thường x 1: <span class="font-bold float-end">0
                                        VNĐ</span></p>
                            </div>
                            <hr>
                            <div class="flex justify-between items-center">
                                <p class="font-bold">Tổng Cộng:</p>
                                <p class="text-xl font-bold">0 VNĐ</p>
                            </div>
                            <button @click.prevent="isBookingUserDialogOpen = true" class="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors">
                                Điền Thông Tin & Đặt Phòng
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </section>

    <section>
        <div class="bg-white px-4 pb-15">
            <div class="container mx-auto">
                <div>
                    <h1 class="text-2xl text-muesli-400">Minh Chứng</h1>
                    <h1 class="text-4xl font-bold">Những Đánh Giá Tốt Của Khách Hàng</h1>
                </div>
                <div ref="reviews" class="keen-slider">
                    <div class="keen-slider__slide flex flex-col md:flex-row items-center justify-center">
                        <div class="md:w-1/5 py-10 w-70">
                            <img src="@/assets/images/bin.png" alt="" class="rounded-full border-6 border-gray-400/15">
                        </div>
                        <div class="md:w-4/5 md:p-10 flex flex-col gap-3">
                            <div class="flex flex-row">
                                <Star class="text-muesli-400" />
                                <Star class="text-muesli-400" />
                                <Star class="text-muesli-400" />
                                <Star class="text-muesli-400" />
                                <Star class="text-muesli-400" />
                            </div>
                            <div>
                                <h1 class="text-gray-500">Lorem ipsum dolor sit amet consectetur adipisicing elit.Lorem
                                    ipsum dolor sit amet
                                    consectetur adipisicing elit.Lorem ipsum dolor sit amet consectetur adipisicing
                                    elit.Lorem ipsum dolor sit amet consectetur adipisicing elit.Lorem ipsum dolor sit
                                    amet consectetur adipisicing elit.Lorem ipsum dolor sit amet consectetur adipisicing
                                    elit.Lorem ipsum dolor sit amet consectetur adipisicing elit.</h1>
                            </div>
                            <div>
                                <h1 class="font-bold">Võ Thanh Bin1</h1>
                            </div>
                        </div>
                    </div>
                    <div class="keen-slider__slide flex flex-col md:flex-row items-center justify-center">
                        <div class="md:w-1/5 py-10 w-70">
                            <img src="@/assets/images/bin.png" alt="" class="rounded-full border-6 border-gray-400/15">
                        </div>
                        <div class="md:w-4/5 md:p-10 flex flex-col gap-3">
                            <div class="flex flex-row">
                                <Star class="text-muesli-400" />
                                <Star class="text-muesli-400" />
                                <Star class="text-muesli-400" />
                                <Star class="text-muesli-400" />
                                <Star class="text-muesli-400" />
                            </div>
                            <div>
                                <h1 class="text-gray-500">Lorem ipsum dolor sit amet consectetur adipisicing elit.Lorem
                                    ipsum dolor sit amet
                                    consectetur adipisicing elit.Lorem ipsum dolor sit amet consectetur adipisicing
                                    elit.Lorem ipsum dolor sit amet consectetur adipisicing elit.Lorem ipsum dolor sit
                                    amet consectetur adipisicing elit.Lorem ipsum dolor sit amet consectetur adipisicing
                                    elit.Lorem ipsum dolor sit amet consectetur adipisicing elit.</h1>
                            </div>
                            <div>
                                <h1 class="font-bold">Võ Thanh Bin2</h1>
                            </div>
                        </div>
                    </div>
                    <div class="keen-slider__slide flex flex-col md:flex-row items-center justify-center">
                        <div class="md:w-1/5 py-10 w-70">
                            <img src="@/assets/images/bin.png" alt="" class="rounded-full border-6 border-gray-400/15">
                        </div>
                        <div class="md:w-4/5 md:p-10 flex flex-col gap-3">
                            <div class="flex flex-row">
                                <Star class="text-muesli-400" />
                                <Star class="text-muesli-400" />
                                <Star class="text-muesli-400" />
                                <Star class="text-muesli-400" />
                                <Star class="text-muesli-400" />
                            </div>
                            <div>
                                <h1 class="text-gray-500">Lorem ipsum dolor sit amet consectetur adipisicing elit.Lorem
                                    ipsum dolor sit amet
                                    consectetur adipisicing elit.Lorem ipsum dolor sit amet consectetur adipisicing
                                    elit.Lorem ipsum dolor sit amet consectetur adipisicing elit.Lorem ipsum dolor sit
                                    amet consectetur adipisicing elit.Lorem ipsum dolor sit amet consectetur adipisicing
                                    elit.Lorem ipsum dolor sit amet consectetur adipisicing elit.</h1>
                            </div>
                            <div>
                                <h1 class="font-bold">Võ Thanh Bin3</h1>
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
    Wifi,
    Bath,
    Refrigerator,
    Monitor,
    UtensilsCrossed,
    ShowerHead,
    Telescope,
    HeartPlus
} from 'lucide-vue-next';
import { ref, onMounted, watch, computed } from "vue";
import { vi } from "date-fns/locale";
import { addDays, format } from "date-fns";
import { useKeenSlider } from 'keen-slider/vue';
import { Bookings } from '@/api/booking';
import { useRoute } from "vue-router";
import { parseISO } from 'date-fns';
import { useRouter } from 'vue-router';
import BookingUserDialog from '@/components/user/BookingUserDialog/BookingUserDialog.vue';

const baseUrl = import.meta.env.VITE_CLOUDINARY_IMG_URL;
const bookings = Bookings();
const route = useRoute();
const router = useRouter();
const isBookingUserDialogOpen = ref(false);

const getRoomDetails = (roomTypeId) => {
    return router.resolve({
        path: '/user/roomdetail',
        query: { roomTypeId }
    }).href
}

const checkin1 = ref();
const checkout1 = ref();
const numberOfPeople1 = ref(0);

const toggleDarkMode = () => {
    const htmlElement = document.documentElement;
    htmlElement.classList.toggle("dark");
    localStorage.setItem(
        "darkMode",
        htmlElement.classList.contains("dark") ? "enabled" : "disabled"
    );
};

const checkin = ref();
const formatDate = (date) => {
    return date ? format(date, "dd/MM/yyyy") : "";
};

const selectedRoomType = computed(() =>
    bookings.listRoomsAvailable.find(r => r.roomTypeId === bookings.roomTypeId)
);

const numberOfNights = ref(null);
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

// Slider reviews
const [reviews] = useKeenSlider({
    loop: true,
    slides: {
        perView: 1,
        spacing: 15,
    },
});

// Lọc phòng và sắp xếp
const filterAndSortRooms = computed(() => {
    const matched = bookings.listRoomsAvailable.filter(
        room => room.peopleAbout === bookings.numberOfPeople
    );
    const others = bookings.listRoomsAvailable.filter(
        room => room.peopleAbout !== bookings.numberOfPeople
    );

    return [...matched, ...others];
});

// Tách rõ phòng còn và phòng hết chỗ
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

// Lấy ảnh phòng
const getImageUrl = (publicId) => {
    return `${baseUrl}/${publicId}`;
};

// Tìm kiếm
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
</script>
