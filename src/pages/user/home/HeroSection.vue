<template>
    <section class="keen-slider" ref="container">
        <!-- SLIDER 1 -->
        <div
            class="relative w-full lg:h-[900px] md:h-[700px] h-96 overflow-hidden group keen-slider__slide number-slide1">
            <div
                class="absolute inset-0 bg-[url('/src/assets/images/home-1.1.png')] brightness-50 z-0 bg-fixed bg-cover bg-center flex items-center">
            </div>
            <div class="relative z-10 flex flex-col items-center justify-center h-full text-white">
                <p class="text-2xl font-bold">Chào mừng đến với BeeStay</p>
                <p class="text-5xl lg:text-6xl lg:w-[800px] md:w-[600px] text-center w-[400px]">
                    Khám phá những địa điểm tốt nhất để nghỉ ngơi, từ khách sạn đến cho thuê kỳ nghỉ.
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
        <!-- SLIDER 2 -->
        <div
            class="relative w-full lg:h-[900px] md:h-[700px] h-96 overflow-hidden group keen-slider__slide number-slide2">
            <div
                class="absolute inset-0 bg-[url('/src/assets/images/header__bg.webp')] brightness-50 z-0 bg-fixed bg-cover bg-center flex items-center">
            </div>
            <div class="relative z-10 flex flex-col items-center justify-center h-full text-white">
                <p class="text-2xl font-bold">Chào mừng đến với BeeStay</p>
                <p class="text-5xl lg:text-6xl lg:w-[800px] md:w-[600px] text-center w-[400px]">
                    Khám phá những địa điểm tốt nhất để nghỉ ngơi, từ khách sạn đến cho thuê kỳ nghỉ.
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
        <!-- SLIDER 3 -->
        <div
            class="relative w-full lg:h-[900px] md:h-[700px] h-96 overflow-hidden group keen-slider__slide number-slide3">
            <div
                class="absolute inset-0 bg-[url('/src/assets/images/room3.png')] brightness-50 z-0 bg-fixed bg-cover bg-center flex items-center">
            </div>
            <div class="relative z-10 flex flex-col items-center justify-center h-full text-white">
                <p class="text-2xl font-bold">Chào mừng đến với BeeStay</p>
                <p class="text-5xl lg:text-6xl lg:w-[800px] md:w-[600px] text-center w-[400px]">
                    Khám phá những địa điểm tốt nhất để nghỉ ngơi, từ khách sạn đến cho thuê kỳ nghỉ.
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
</template>

<script>
import { useKeenSlider } from "keen-slider/vue.es"
import "keen-slider/keen-slider.min.css"

export default {
    setup() {
        const [container] = useKeenSlider(
            {
                loop: true,
            },
            [
                (slider) => {
                    let timeout
                    let mouseOver = false
                    function clearNextTimeout() {
                        clearTimeout(timeout)
                    }
                    function nextTimeout() {
                        clearTimeout(timeout)
                        if (mouseOver) return
                        timeout = setTimeout(() => {
                            slider.next()
                        }, 3000)
                    }
                    slider.on("created", () => {
                        slider.container.addEventListener("mouseover", () => {
                            mouseOver = true
                            clearNextTimeout()
                        })
                        slider.container.addEventListener("mouseout", () => {
                            mouseOver = false
                            nextTimeout()
                        })
                        nextTimeout()
                    })
                    slider.on("dragStarted", clearNextTimeout)
                    slider.on("animationEnded", nextTimeout)
                    slider.on("updated", nextTimeout)
                },
            ]
        )
        return { container }
    },
}
</script>
<style>
/* [class^="number-slide"],
[class*=" number-slide"] {
    background: grey;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 50px;
    color: #fff;
    font-weight: 500;
    height: 300px;
    max-height: 100vh;
} */
</style>