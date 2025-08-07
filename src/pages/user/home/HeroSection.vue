<template>
    <div class="w-screen ">
        <section ref="container" class="keen-slider relative group">

            <div v-for="(slide, index) in slides" :key="index"
                class="keen-slider__slide relative  lg:h-[900px] md:h-[700px] h-96 overflow-hidden">

                <div class="absolute inset-0 brightness-50 z-0 bg-cover bg-center"
                    :style="{ backgroundImage: `url(${slide.image})` }">
                </div>

                <div class="relative z-10 flex flex-col items-center justify-center h-full text-white text-center">
                    <p class="text-2xl font-bold">{{ slide.title }}</p>
                    <p class="text-5xl lg:text-6xl lg:w-[800px] md:w-[600px] w-[400px]">
                        {{ slide.description }}
                    </p>
                </div>
            </div>

            <template v-if="sliderInstance">
                <div class="absolute z-10 w-full top-1/2 -translate-y-1/2 flex justify-between items-center px-6">
                    <button @click="sliderInstance.prev()" type="button" aria-label="Previous slide"
                        class="py-2 px-4 bg-muesli-400/10 text-white rounded-lg hidden md:group-hover:block transition-opacity duration-300 opacity-70 hover:opacity-100">
                        <MoveLeft class="size-[48px]" />
                    </button>
                    <button @click="sliderInstance.next()" type="button" aria-label="Next slide"
                        class="py-2 px-4 bg-muesli-400/10 text-white rounded-lg hidden md:group-hover:block transition-opacity duration-300 opacity-70 hover:opacity-100">
                        <MoveRight class="size-[48px]" />
                    </button>
                </div>
            </template>

        </section>
    </div>

</template>

<script setup>
import { ref } from 'vue';
import { useKeenSlider } from "keen-slider/vue.es";
import { MoveRight, MoveLeft } from "lucide-vue-next";

// 1. Dữ liệu cho các slide
const slides = ref([
    {
        image: '/src/assets/images/home-1.1.png',
        title: 'Chào mừng đến với BeeStay',
        description: 'Khám phá những địa điểm tốt nhất để nghỉ ngơi, từ khách sạn đến cho thuê kỳ nghỉ.'
    },
    {
        image: '/src/assets/images/header__bg.webp',
        title: 'Trải nghiệm độc đáo',
        description: 'Tận hưởng những kỳ nghỉ đáng nhớ với dịch vụ hàng đầu của chúng tôi.'
    },
    {
        image: '/src/assets/images/room3.png',
        title: 'Không gian lý tưởng',
        description: 'Tìm kiếm không gian hoàn hảo cho chuyến đi của bạn, dù là công tác hay du lịch.'
    }
]);

// 2. Ref để giữ instance của slider, giúp gọi các hàm .next(), .prev()
const sliderInstance = ref(null);

// 3. Plugin Autoplay
const AutoplayPlugin = (slider) => {
    let timeout;
    let mouseOver = false;

    function clearNextTimeout() {
        clearTimeout(timeout);
    }

    function nextTimeout() {
        clearTimeout(timeout);
        if (mouseOver) return;
        timeout = setTimeout(() => {
            slider.next();
        }, 3000); // Thời gian chuyển slide: 3 giây
    }

    slider.on("created", () => {
        // Lưu lại instance để dùng trong template
        sliderInstance.value = slider;

        slider.container.addEventListener("mouseover", () => {
            mouseOver = true;
            clearNextTimeout();
        });
        slider.container.addEventListener("mouseout", () => {
            mouseOver = false;
            nextTimeout();
        });
        nextTimeout();
    });

    slider.on("dragStarted", clearNextTimeout);
    slider.on("animationEnded", nextTimeout);
    slider.on("updated", nextTimeout);

    // Thêm hàm dọn dẹp khi component bị hủy
    slider.on("destroyed", () => {
        clearNextTimeout();
        // Không cần remove event listener vì Keen Slider tự làm việc này
    });
};

// 4. Khởi tạo Keen Slider
const [container] = useKeenSlider(
    {
        loop: true,
        slides: {
            perView: 1,
        },
    },
    // Danh sách các plugin sẽ dùng
    [AutoplayPlugin]
);
</script>

<style>
/* Bạn có thể thêm các style tùy chỉnh cho slider ở đây nếu cần */
</style>