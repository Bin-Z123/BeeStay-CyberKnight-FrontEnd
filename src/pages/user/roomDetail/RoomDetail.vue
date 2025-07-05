<template>
    <section>
        <div class="bg-white">
            <div class="w-full lg:h-[700px] md:h-[600px] h-96 relative">
                <div class="bg-[url('@/assets/images/header__bg.webp')] bg-cover bg-center h-full w-full"></div>
                <div class="absolute inset-0 bg-blue-900/40"></div>
            </div>
            <div class="container mx-auto pt-20">
                <div class="flex lg:flex-row flex-col">
                    <div v-if="bookings.listRoomsAvailable.length"
                        class="lg:w-2/3 flex flex-col gap-4 md:pe-5 px-4 md:px-0">
                        <div v-for="roomType in bookings.listRoomsAvailable" :key="roomType.id">
                            <div class="flex flex-col gap-5" v-if="roomType.roomTypeId == roomtypeid">
                                <div class="flex flex-col gap-2">
                                    <h1 class="text-4xl font-bold">{{ roomType.nameRoomType }}</h1>
                                    <p class="text-2xl text-muesli-400">{{ roomType.price }} VNĐ</p>
                                    <div class="flex items-center gap-4 text-gray-500">
                                        <span class="flex items-center gap-1">
                                            <Square class="inline-block w-5 h-5" />{{ roomType.size }} m²
                                        </span>
                                        <span class="flex items-center gap-1">
                                            <User class="inline-block w-5 h-5" />{{ roomType.peopleAbout }} m²
                                        </span>
                                    </div>
                                </div>
                                <div v-if="roomtypes.roomtype">
                                    <p>{{ roomtypes.roomtype.description }}</p>
                                </div>
                                <div class="flex flex-col gap-5">
                                    <h1 class="text-2xl font-bold">Tiện Nghi</h1>
                                    <div class="text-lg flex">
                                        <span class="w-full">
                                            <Wifi class="inline-block text-muesli-400 w-8 h-8" /> Miễn Phí Wifi
                                        </span>
                                        <span class="w-full">
                                            <Bath class="inline-block text-muesli-400 w-8 h-8" /> Bồn Tắm
                                        </span>
                                        <span class="w-full">
                                            <Refrigerator class="inline-block text-muesli-400 w-8 h-8" /> Tủ Lạnh
                                        </span>
                                    </div>
                                    <div class="text-lg flex border-t border-b py-5 border-gray-300">
                                        <span class="w-full">
                                            <Monitor class="inline-block text-muesli-400 w-8 h-8" /> TV
                                        </span>
                                        <span class="w-full">
                                            <UtensilsCrossed class="inline-block text-muesli-400 w-8 h-8" /> Ăn Uống
                                        </span>
                                        <span class="w-full">
                                            <ShowerHead class="inline-block text-muesli-400 w-8 h-8" /> Vòi Sen
                                        </span>
                                    </div>
                                    <div class="text-lg flex">
                                        <span class="w-full">
                                            <Telescope class="inline-block text-muesli-400 w-8 h-8" /> Cảnh Đẹp
                                        </span>
                                        <span class="w-full">
                                            <HeartPlus class="inline-block text-muesli-400 w-8 h-8" /> Hổ Trợ 24/7
                                        </span>
                                        <span class="w-full">
                                            <Wifi class="inline-block text-muesli-400 w-8 h-8" /> Miễn Phí Wifi
                                        </span>
                                    </div>
                                </div>
                                <div class="flex flex-col gap-5">
                                    <h1 class="text-2xl font-bold">Ảnh</h1>
                                    <div>
                                        <img v-if="roomType.availableRoomDTO[0]?.roomImage[0]?.url"
                                            :src="getImageUrl(roomType.availableRoomDTO[0].roomImage[0].url)"
                                            alt="Ảnh Phòng" class="w-full rounded-2xl" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="lg:w-1/3 px-4 md:px-0 mt-8 md:mt-0">
                        <div class="bg-gray-100 rounded-2xl">
                            <form action="" class="p-2">
                                <p class="text-2xl font-bold text-center pt-4">Đặt Phòng Của Chúng Tôi</p>
                                <div class="flex flex-col justify-between items-center py-4 px-6 gap-5">
                                    <div class="space-y-2 flex flex-col border-gray-200 w-full">
                                        <label>Ngày Đến</label>
                                        <VueDatePicker v-model="checkin" :format-locale="vi" :format="'dd/MM/yyyy'"
                                            :min-date="new Date()" multi-calendars class="" />
                                    </div>
                                    <div class="relative space-y-2 flex flex-col border-gray-200 w-full">
                                        <label>Ngày Đi</label><select
                                            class="block w-full rounded-[4px]  bg-white px-3 py-[4px] text-gray-400 text-[17px]"
                                            name="" id="" :disabled="!checkin" v-model="numberOfNights">
                                            <option :value="null" selected disabled>Chọn số đêm</option>
                                            <option :value="i" v-for="i in 30" :key="i">
                                                {{ i }} đêm - {{ checkOutDateText(i) }}
                                            </option>
                                        </select>
                                    </div>
                                    <div class="space-y-2 flex flex-col border-gray-200 w-full">
                                        <label>Loại Phòng</label><select type="text"
                                            class="px-3 py-[4px] rounded-[4px] text-gray-400 text-[17px] bg-white">
                                            <option value="all">Tất Cả Loại Phòng</option>
                                        </select>
                                    </div>
                                    <div class="space-y-2 flex flex-col border-gray-200 w-full">
                                        <label>Số Người</label><input type="text"
                                            class="px-3 py-[4px] rounded-[4px] text-gray-400 text-[17px] bg-white"
                                            placeholder="Nhập số người" />
                                    </div>
                                    <div class="flex items-center justify-end border-gray-400 w-full">
                                        <button class="w-full px-4 py-3 bg-muesli-400 text-white rounded-lg">
                                            Kiểm Tra
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <div class="flex flex-col items-center mt-20 gap-3 mx-4 lg:mx-0 pb-25 ">
                    <p class="text-2xl text-muesli-400">Một Số Loại Phòng Khác</p>
                    <h1 class="text-4xl font-bold">Một Số Loại Phòng Khác</h1>
                    <div ref="roomtype" class="keen-slider rounded-2xl mt-10" v-if="bookings.listRoomsAvailable.length">
                        <div class="keen-slider__slide rounded-2xl border-1"
                            v-for="roomType in bookings.listRoomsAvailable" :key="roomType.roomTypeId">
                            <img v-if="roomType.availableRoomDTO[0]?.roomImage[0]?.url"
                                :src="getImageUrl(roomType.availableRoomDTO[0].roomImage[0].url)" alt="Ảnh Phòng"
                                class="h-85 w-full">
                            <div class="flex flex-col gap-4 p-6">
                                <h1 class="font-bold text-2xl">{{ roomType.nameRoomType }}</h1>
                                <div class="flex items-center gap-4 text-gray-500">
                                    <span class="flex items-center gap-1">
                                        <Square class="inline-block w-5 h-5" />{{ roomType.size }} m²
                                    </span>
                                    <span class="flex items-center gap-1">
                                        <User class="inline-block w-5 h-5" />{{ roomType.peopleAbout }} người
                                    </span>
                                </div>
                                <p class="text-muesli-400 text-xl">{{ roomType.price }} VNĐ</p>
                                <RouterLink
                                    :to="{ path: '/user/roomdetail', query: { roomTypeId: roomType.roomTypeId } }"
                                    class="text-muesli-400 underline">Xem Chi Tiết</RouterLink>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
<script setup>
import { Square, User, Wifi, Bath, Refrigerator, Monitor, UtensilsCrossed, ShowerHead, Telescope, HeartPlus } from 'lucide-vue-next';
import { ref, onMounted, watch, computed } from "vue";
import { vi } from "date-fns/locale";
import { addDays, format } from "date-fns";
import { useKeenSlider } from 'keen-slider/vue'
import { Bookings } from '@/api/booking';
import { RoomType } from '@/api/roomtype';
import { useRoute } from "vue-router";
const bookings = Bookings();
const roomtypes = RoomType();

const router = useRoute();

const roomtypeid = ref(router.query.roomTypeId);

watch(() => router.query.roomTypeId, (newRoomTypeId) => {
    roomtypeid.value = newRoomTypeId
}
)
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

onMounted(async () => {
    checkin.value = new Date();
    await bookings.getAvailableRooms(bookings.checkin, bookings.checkout, bookings.numberOfPeople);
    await roomtypes.getRoomTypeById(roomtypeid.value);
    console.log(JSON.stringify(roomtypes.roomtype, null, 2));
    console.log("📦 Mô tả:", roomtypes.roomtype.description);
});

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

const [roomtype] = useKeenSlider({
    loop: true,
    slides: {
        perView: 3,
        spacing: 15,
    },
    breakpoints: {
        '(max-width: 768px)': {
            slides: {
                perView: 1,
                spacing: 10,
            },
        },
    },
})

// Load Ảnh
const baseUrl = import.meta.env.VITE_CLOUDINARY_IMG_URL;

const getImageUrl = (image) => {
    return `${baseUrl}/${image}`;
};
</script>