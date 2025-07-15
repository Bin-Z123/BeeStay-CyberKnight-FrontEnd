<template>
    <section class="">
        <div class="relative w-full lg:h-[900px] md:h-[700px] h-96 overflow-hidden group">
            <div
                class="absolute inset-0 bg-[url('/src/assets/images/home-1.1.png')] brightness-50 z-0 bg-fixed bg-cover bg-center flex items-center">
            </div>
            <div class="relative z-10 flex flex-col items-center justify-center h-full text-white">
                <p class="text-2xl font-bold">Wellcome to BeeStay</p>
                <p class="text-5xl lg:text-6xl lg:w-[800px] md:w-[600px] text-center w-[400px]">
                    Discover the best places to stay, from hotels to vacation rentals.
                </p>
                <div class="absolute z-10 w-full flex justify-between items-center px-6">
                    <button type="button"
                        class="py-2 px-4 bg-muesli-400/10 text-white rounded-lg top-1/2 hidden md:group-hover:block">
                        <MoveLeft class="size-[48px]" />
                    </button>
                    <button type="button"
                        class="py-2 px-4 bg-muesli-400/10 text-white top-1/2 rounded-lg md:group-hover:block hidden">
                        <MoveRight class="size-[48px]" />
                    </button>
                </div>
            </div>
        </div>
    </section>
    <!-- SEARCH BOX -->
    <div class="relative z-10">
        <div class="px-4 lg:mx-0 mx-auto xl:container absolute lg:left-1/2 lg:transform lg:-translate-x-1/2 w-full">
            <form action="" class="bg-white lg:rounded-2xl rounded-b-2xl shadow-xl lg:-mt-14 text-[20px]">
                <div
                    class="lg:flex justify-between items-center md:grid md:grid-cols-3 sm:grid sm:grid-cols-2 gap-5 grid grid-cols-1 py-4 px-6">
                    <div class="space-y-2 flex flex-col border-gray-200 sm:border-r-1 lg:w-4/14">
                        <label>Ngày Đến</label>
                        <VueDatePicker v-model="checkin" :format-locale="vi" :format="'dd/MM/yyyy'"
                            :min-date="new Date()" multi-calendars class="lg:pe-5" />
                    </div>
                    <div class="relative space-y-2 flex flex-col sm:border-r-1 border-gray-200 lg:w-4/14 lg:pe-5">
                        <label>Ngày Đi</label><select
                            class="block w-full rounded-[4px]  bg-white px-3 py-[4px] text-gray-400 text-[17px]" name=""
                            id="" :disabled="!checkin" v-model="numberOfNights">
                            <option :value="null" selected disabled>Chọn số đêm</option>
                            <option :value="i" v-for="i in 30" :key="i">
                                {{ i }} đêm - {{ checkOutDateText(i) }}
                            </option>
                        </select>
                        <!-- 
            <p v-if="checkOutDate" class="hidden">
              Bạn sẽ trả phòng vào {{ formatDate(checkOutDate) }}
            </p> -->
                    </div>
                    <!-- <div class="space-y-2 flex flex-col sm:border-r-1 border-gray-200 lg:w-4/18">
                        <label>Loại Phòng</label> <select type="text" v-model="roomTypeId"
                            class="lg:me-5  px-3 py-[4px] rounded-[4px] text-gray-400 text-[17px]">
                            <option v-for="roomtype in roomTypes.roomtypes" :key="roomtype.id" :value="roomtype.id">{{ roomtype.name }}</option>
                        </select>
                    </div> -->
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
    <!-- END SEARCHBOX -->
    <!-- Section About -->
    <section class="relative w-full bg-white lg:p-[120px] p-[180px] px-4">
        <div class="lg:grid lg:grid-cols-2 gap-[30px] items-center lg:mt-0 md:mt-20 sm:mt-40 mt-80">
            <!-- Image -->
            <div class="lg:grid relative items-center justify-items-center">
                <div
                    class="relative rounded-2xl lg:h-[580px] lg:w-[485px] h-100 w-115 inset-0 bg-[url('/src/assets/images/about.png')] bg-cover bg-center z-1">
                    <div
                        class="absolute lg:block hidden w-78 h-54 -top-5 -right-10 ring-8 bg-[url('/src/assets/images/bg_auth1.png')] bg-cover bg-center rounded-2xl z-20 ring-white">
                    </div>
                    <div
                        class="absolute w-60 h-30 bottom-8 lg:-left-14 bg-white shadow-2xl rounded-2xl z-20 flex items-center justify-center">
                        <div class="w-1/2 flex items-center justify-center">
                            <div class="bg-gray-200/60 w-20 h-20 rounded-2xl">
                                <Users class="w-full h-full p-4 text-muesli-400" />
                            </div>
                        </div>
                        <div class="w-1/2 flex flex-col gap-1">
                            <h2 class="text-2xl font-bold">50+</h2>
                            <p class="text-gray-500 text-sm">Experience Staff</p>
                        </div>
                    </div>
                </div>
            </div>
            <!-- Content -->
            <div class="w-full md:mt-0 mt-10">
                <h2 class="text-3xl font-bold mb-4">About Us</h2>
                <p class="text-lg mb-6">
                    Welcome to Bokinn, where luxury meets comfort in the heart of canada.
                    Since 1999, we have been dedicated to providing an exceptional stay
                    for our guests, blending modern amenities with timeless elegance.Our
                    beautifully designed rooms and suites offer stunning views and plush
                    accommodations, ensuring a restful retreat whether you're here for
                    business or leisure.
                </p>
                <p class="text-lg">
                    Our platform connects you with a wide range of properties, ensuring
                    that you find the perfect place to stay for your next trip.
                </p>
            </div>
        </div>
    </section>

    <section>
        <div class="flex flex-col justify-center items-center px-4 py-25 gap-3 w-full">
            <h2 class="text-2xl text-muesli-400">Dịch Vụ</h2>
            <p class="text-4xl font-bold mb-10">Dịch Vụ Của Khách Sạn</p>
            <div class="lg:container lg:mx-auto">
                <div class="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-5 text-center">
                    <div
                        class="sm:w-auto bg-white flex flex-col justify-center items-center rounded-2xl h-70 p-10 gap-3">
                        <BedDouble class="w-14 h-14 text-muesli-400" />
                        <h1 class="font-bold text-xl">Room And Suite</h1>
                        <h1 class="text-sm text-gray-400">Varied types of rooms, from standard to luxury suites,
                            equipped with essentials like beds.</h1>
                    </div>
                    <div
                        class="sm:w-auto bg-white flex flex-col justify-center items-center rounded-2xl h-70 p-10 gap-3">
                        <ShieldCheck class="w-14 h-14 text-muesli-400" />
                        <h1 class="font-bold text-xl">Room And Suite</h1>
                        <h1 class="text-sm text-gray-400">Varied types of rooms, from standard to luxury suites,
                            equipped with essentials like beds.</h1>
                    </div>
                    <div
                        class="sm:w-auto bg-white flex flex-col justify-center items-center rounded-2xl h-70 p-10 gap-3">
                        <Monitor class="w-14 h-14 text-muesli-400" />
                        <h1 class="font-bold text-xl">Room And Suite</h1>
                        <h1 class="text-sm text-gray-400">Varied types of rooms, from standard to luxury suites,
                            equipped with essentials like beds.</h1>
                    </div>
                    <div
                        class="sm:w-auto bg-white flex flex-col justify-center items-center rounded-2xl h-70 p-10 gap-3">
                        <WavesLadder class="w-14 h-14 text-muesli-400" />
                        <h1 class="font-bold text-xl">Room And Suite</h1>
                        <h1 class="text-sm text-gray-400">Varied types of rooms, from standard to luxury suites,
                            equipped with essentials like beds.</h1>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <section>
        <div class="bg-white px-4 py-25">
            <div class="container mx-auto">
                <div class="flex md:flex-row flex-col gap-8">
                    <div class="md:w-1/2">
                        <h1 class="text-2xl text-muesli-400">Phòng</h1>
                        <h1 class="text-4xl font-bold">Phòng Của Chúng Tôi</h1>
                    </div>
                    <div class="md:w-1/2">
                        <h1 class="text-gray-400">Our rooms offer a harmonious blend of comfort and elegance, designed
                            to
                            provide an exceptional stay
                            for every guest. Each room features plush bedding, high-quality linens, and a selection of
                            pillows
                            to ensure a restful night's sleep.</h1>
                    </div>
                </div>
                <div ref="container" class="keen-slider mt-10 rounded-xl">
                    <div class="keen-slider__slide h-[500px] flex items-center justify-center">
                        <div
                            class="w-full h-full bg-[url('@/assets/images/slider1.png')] bg-cover bg-center rounded-xl shadow-md">
                        </div>
                    </div>
                    <div class="keen-slider__slide h-[500px] flex items-center justify-center">
                        <div
                            class="w-full h-full bg-[url('@/assets/images/slider2.png')] bg-cover bg-center rounded-xl shadow-md">
                        </div>
                    </div>
                    <div class="keen-slider__slide h-[500px] flex items-center justify-center">
                        <div
                            class="w-full h-full bg-[url('@/assets/images/slider3.png')] bg-cover bg-center rounded-xl shadow-md">
                        </div>
                    </div>
                    <div class="keen-slider__slide h-[500px] flex items-center justify-center">
                        <div
                            class="w-full h-full bg-[url('@/assets/images/slider3.png')] bg-cover bg-center rounded-xl shadow-md">
                        </div>
                    </div>
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
    </section>

    <section>
        <div class="bg-[url('@/assets/images/body.png')] bg-fixed bg-cover bg-center h-150 relative">
            <div class="absolute inset-0 bg-blue-900 opacity-16"></div>
        </div>
    </section>

    <section>
        <div class="flex flex-col justify-center items-center px-4 pt-25 gap-3 bg-white pb-25">
            <h1 class="text-2xl text-muesli-400">Dịch Vụ</h1>
            <h1 class="text-4xl font-bold mb-10">Dịch Vụ Của Khách Sạn</h1>
            <div ref="post" class="keen-slider rounded-2xl">
                <div class="keen-slider__slide rounded-2xl">
                    <div>
                        <img src="@/assets/images/bin.png" alt="">
                    </div>
                </div>
                <div class="keen-slider__slide rounded-2xl">
                    <div>
                        <img src="@/assets/images/bin.png" alt="">
                    </div>
                </div>
                <div class="keen-slider__slide rounded-2xl">
                    <div>
                        <img src="@/assets/images/bin.png" alt="">
                    </div>
                </div>
                <div class="keen-slider__slide rounded-2xl">
                    <div>
                        <img src="@/assets/images/bin.png" alt="">
                    </div>
                </div>
                <div class="keen-slider__slide rounded-2xl">
                    <div>
                        <img src="@/assets/images/bin.png" alt="">
                    </div>
                </div>
                <div class="keen-slider__slide rounded-2xl">
                    <div>
                        <img src="@/assets/images/bin.png" alt="">
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
<script setup>
import { MoveRight, MoveLeft, BedDouble, ShieldCheck, WavesLadder, Monitor, Star, Users } from "lucide-vue-next";
import { ref, onMounted, watch, computed } from "vue";
import { vi } from "date-fns/locale";
import { addDays, format } from "date-fns";
import { useKeenSlider } from 'keen-slider/vue'
import { useRouter } from "vue-router";
import { RoomType } from "@/api/roomtype";
import { Bookings } from "@/api/booking";
import path from "path";

const roomTypes = RoomType();
const bookings = Bookings();
const router = useRouter();

console.log("Loại Phòng Đây Nè", roomTypes.roomtypes);

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
    await roomTypes.getAllRoomType();
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

// Slider
const [container] = useKeenSlider({
    loop: true,
    slides: {
        perView: 4,
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

// Slider reviews
const [reviews] = useKeenSlider({
    loop: true,
    slides: {
        perView: 1,
        spacing: 15,
    },
})

// Slider reviews
const [post] = useKeenSlider({
    loop: true,
    slides: {
        perView: 6,
        spacing: 15,
    },
    breakpoints: {
        '(max-width: 768px)': {
            slides: {
                perView: 2,
                spacing: 10,
            },
        },
    }
})

// Tìm Loại phòng trống theo thời gian
const numberOfPeople = ref(1);
const handleSearch = async () => {
    bookings.numberOfPeople = Number(numberOfPeople.value);
    await bookings.getAvailableRooms(checkin.value, checkOutDate.value, numberOfPeople.value);
    console.log("Phòng Còn Trống Nè",JSON.stringify(bookings.listRoomsAvailable, null, 2))
    router.push({ path: "/user/roomtype", query: { checkins: checkin.value, checkouts: checkOutDate.value, numberOfPeoples: numberOfPeople.value } });
};

</script>
<style scoped>
:deep(.dp__input) {
    border: none !important;
    box-shadow: none !important;
    outline: none !important;
}
</style>