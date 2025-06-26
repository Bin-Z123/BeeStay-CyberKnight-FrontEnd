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
                        Phòng VIP
                    </h1>
                    <form action="" class="bg-white rounded-2xl shadow-xl -mt-130 lg:-mt-80 text-[20px]">
                        <div
                            class="lg:flex justify-between items-center md:grid md:grid-cols-3 sm:grid sm:grid-cols-2 gap-5 grid grid-cols-1 py-4 px-6">
                            <div class="space-y-2 flex flex-col border-gray-200 sm:border-r-1 lg:w-4/18">
                                <label>Ngày Đến</label>
                                <VueDatePicker v-model="checkin" :format-locale="vi" :format="'dd/MM/yyyy'"
                                    :min-date="new Date()" multi-calendars class="lg:pe-5" />
                            </div>
                            <div
                                class="relative space-y-2 flex flex-col sm:border-r-1 border-gray-200 lg:w-4/18 lg:pe-5">
                                <label>Ngày Đi</label><select
                                    class="block w-full rounded-[4px]  bg-white px-3 py-[4px] text-gray-400 text-[17px]"
                                    name="" id="" :disabled="!checkin" v-model="numberOfNights">
                                    <option :value="null" selected disabled>Chọn số đêm</option>
                                    <option :value="i" v-for="i in 30" :key="i">
                                        {{ i }} đêm - {{ checkOutDateText(i) }}
                                    </option>
                                </select>
                            </div>
                            <div class="space-y-2 flex flex-col sm:border-r-1 border-gray-200 lg:w-4/18">
                                <label>Loại Phòng</label> <select type="text"
                                    class="lg:me-5  px-3 py-[4px] rounded-[4px] text-gray-400 text-[17px]">
                                    <option value="all">Tất Cả Loại Phòng</option>
                                </select>
                            </div>
                            <div class="space-y-2 flex flex-col sm:border-r-1 border-gray-200 lg:w-4/18">
                                <label>Số Người</label><input type="text"
                                    class="lg:me-5  px-3 py-[4px] rounded-[4px] text-gray-400 text-[17px]"
                                    placeholder="Nhập số người" />
                            </div>
                            <div class="flex items-center justify-end border-gray-400 lg:w-2/18">
                                <button class="w-full px-4 py-3 bg-muesli-400 text-white rounded-xl">
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
        <div class="bg-white">
            <div class="py-25 container mx-auto flex flex-col gap-18">
                <div class="grid lg:grid-cols-2 grid-cols-1 gap-10 lg:gap-0">
                    <div class="px-4 lg:px-0">
                        <img src="@/assets/images/room1.png" alt="" class="rounded-2xl">
                    </div>
                    <div class="flex flex-col gap-5 justify-center lg:px-20 px-4">
                        <h1 class="font-bold text-4xl">Phòng Thượng Hạng</h1>
                        <div class="flex items-center gap-4 text-gray-500">
                            <span class="flex items-center gap-1">
                                <Square class="inline-block w-5 h-5" />30 m²
                            </span>
                            <span class="flex items-center gap-1">
                                <User class="inline-block w-5 h-5" />30 m²
                            </span>
                        </div>
                        <p class="text-gray-500">Our rooms offer a harmonious blend of comfort and elegance, designed to
                            provide an exceptional stay for every guest.</p>
                        <p class="text-muesli-400 text-3xl">120.000 VNĐ</p>
                        <RouterLink to="/" class="text-muesli-400 underline">Xem Chi Tiết</RouterLink>
                    </div>
                </div>
                <div class="grid lg:grid-cols-2 grid-cols-1 gap-10 lg:gap-0">
                    <div class="flex flex-col gap-5 justify-center lg:px-20 px-4 order-2 lg:order-1">
                        <h1 class="font-bold text-4xl">Phòng Thượng Hạng</h1>
                        <div class="flex items-center gap-4 text-gray-500">
                            <span class="flex items-center gap-1">
                                <Square class="inline-block w-5 h-5" />30 m²
                            </span>
                            <span class="flex items-center gap-1">
                                <User class="inline-block w-5 h-5" />30 m²
                            </span>
                        </div>
                        <p class="text-gray-500">Our rooms offer a harmonious blend of comfort and elegance, designed to
                            provide an exceptional stay for every guest.</p>
                        <p class="text-muesli-400 text-3xl">120.000 VNĐ</p>
                        <RouterLink to="/" class="text-muesli-400 underline">Xem Chi Tiết</RouterLink>
                    </div>
                    <div class="px-4 lg:px-0 lg:order-2 order-1">
                        <img src="@/assets/images/room1.png" alt="" class="rounded-2xl">
                    </div>
                </div>
            </div>
            <div class="flex justify-center pb-20">
                <button class="px-5 py-3 border-1 border-gray-500 text-gray-500 rounded-md">Xem Thêm</button>
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
</template>
<script setup>
import { Square, User, Wifi, Bath, Refrigerator, Monitor, UtensilsCrossed, ShowerHead, Telescope, HeartPlus } from 'lucide-vue-next';
import { ref, onMounted, watch, computed } from "vue";
import { vi } from "date-fns/locale";
import { addDays, format } from "date-fns";
import { useKeenSlider } from 'keen-slider/vue'
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
onMounted(() => {
    checkin.value = new Date();
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

// Slider reviews
const [reviews] = useKeenSlider({
    loop: true,
    slides: {
        perView: 1,
        spacing: 15,
    },
})
</script>