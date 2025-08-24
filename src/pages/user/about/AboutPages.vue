<template>
    <section>
        <div class="bg-white">
            <div class="w-full lg:h-[700px] md:h-[600px] h-96 relative">
                <div class="bg-[url('@/assets/images/header__bg.webp')] bg-cover bg-center h-full w-full"></div>
                <div class="absolute inset-0 bg-blue-900/40"></div>
            </div>
            <div class="flex lg:flex-row flex-col container mx-auto lg:py-25 py-10">
                <div class="lg:w-2/5 lg:pb-20 pb-10 px-4 lg:px-0">
                    <div
                        class="relative bg-[url('@/assets/images/about1.png')] bg-cover bg-center h-[550px] me-20 rounded-2xl w-full lg:w-auto">
                        <img src="@/assets/images/about2.png" alt=""
                            class="absolute md:block hidden top-70 -right-15 h-[450px] border-10 border-white rounded-2xl">
                    </div>
                </div>
                <div class="lg:w-3/5 px-4 lg:px-0">
                    <div class="flex flex-col justify-center h-full lg:gap-8 gap-4">
                        <p class="text-2xl text-muesli-400">Thông Tin Chúng Tôi</p>
                        <h1 class="lg:text-5xl md:text-4xl text-3xl font-bold">Chào Mừng Bạn Đến Với
                            Khách Sạn BEESTAY
                        </h1>
                        <p class="text-gray-500 text-lg mt-6">Chào mừng bạn đến với Boking, nơi sang trọng gặp gỡ sự
                            thoải mái ngay tại trung tâm Canada. Kể từ năm 1999, chúng tôi đã tận tâm mang đến một trải
                            nghiệm lưu trú tuyệt vời cho khách hàng, kết hợp tiện nghi hiện đại với vẻ đẹp vượt thời
                            gian. Các phòng và suite được thiết kế đẹp mắt của chúng tôi cung cấp tầm nhìn tuyệt đẹp và
                            chỗ ở sang trọng, đảm bảo một kỳ nghỉ thư giãn cho dù bạn đến đây vì công việc hay giải trí.
                        </p>
                    </div>
                </div>
            </div>

            <div class="flex relative">
                <div class="lg:w-6/10 bg-gray-100 lg:px-28 px-4 lg:py-20 py-15 lg:mt-20">
                    <h2 class="lg:text-2xl text-xl text-muesli-400 mb-5">Dịch Vụ</h2>
                    <p class="lg:text-4xl md:text-3xl text-2xl font-bold mb-15">Dịch Vụ Của Khách Sạn</p>
                    <div class="grid lg:grid-cols-2 gap-10 mb-10 lg:mb-0">
                        <div class="sm:w-auto flex flex-col justify-center rounded-2xl pe-10 gap-3">
                            <BedDouble class="w-14 h-14 text-muesli-400" />
                            <h1 class="font-bold text-xl">Phòng và Suite</h1>
                            <h1 class="text-sm text-gray-500">Các loại phòng đa dạng, từ tiêu chuẩn đến phòng sang
                                trọng, được trang bị những tiện nghi cần thiết như giường.</h1>
                        </div>
                        <div class="sm:w-auto flex flex-col justify-center rounded-2xl pe-10 gap-3">
                            <ShieldCheck class="w-14 h-14 text-muesli-400" />
                            <h1 class="font-bold text-xl">Phòng và Suite</h1>
                            <h1 class="text-sm text-gray-500">Các loại phòng đa dạng, từ tiêu chuẩn đến phòng sang
                                trọng, được trang bị những tiện nghi cần thiết như giường.</h1>
                        </div>
                        <div class="sm:w-auto flex flex-col justify-center rounded-2xl pe-10 gap-3">
                            <Monitor class="w-14 h-14 text-muesli-400" />
                            <h1 class="font-bold text-xl">Phòng và Suite</h1>
                            <h1 class="text-sm text-gray-500">Các loại phòng đa dạng, từ tiêu chuẩn đến phòng sang
                                trọng, được trang bị những tiện nghi cần thiết như giường.</h1>
                        </div>
                        <div class="sm:w-auto flex flex-col justify-center rounded-2xl pe-10 gap-3">
                            <WavesLadder class="w-14 h-14 text-muesli-400" />
                            <h1 class="font-bold text-xl">Phòng và Suite</h1>
                            <h1 class="text-sm text-gray-500">Các loại phòng đa dạng, từ tiêu chuẩn đến phòng sang
                                trọng, được trang bị những tiện nghi cần thiết như giường.</h1>
                        </div>
                    </div>
                    <div
                        class="lg:absolute lg:top-38 lg:right-30 lg:h-135 h-135 lg:w-140 bg-[url('@/assets/images/about3.png')] bg-cover">
                    </div>
                </div>
            </div>
            <div>
                <CoreTeam />
            </div>
            
        </div>
    </section>

    <!-- <section>
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
    </section> -->
</template>
<script setup lang="ts">
import { MoveRight, MoveLeft, BedDouble, ShieldCheck, WavesLadder, Monitor, Star, Users } from "lucide-vue-next";
import { useKeenSlider } from 'keen-slider/vue'
import CoreTeam from "../../../pages/user/home/CoreTeam.vue";

// Slider reviews
const [reviews] = useKeenSlider({
    loop: true,
    slides: {
        perView: 1,
        spacing: 15,
    },
})

const [users] = useKeenSlider({
    loop: true,
    slides: {
        perView: 6,
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
</script>