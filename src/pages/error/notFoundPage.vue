<template>
    <main class="text-gray-800 min-h-screen flex flex-col items-center justify-center p-4 text-center">

        <!-- Hiệu ứng con ma -->
        <div class="ghost-container">
            <div class="ghost">
                <div class="face">
                    <div class="eye"></div>
                    <div class="eye-right"></div>
                    <div class="mouth"></div>
                </div>
                <div class="wave"></div>
                <div class="wave"></div>
            </div>
            <div class="shadow"></div>
        </div>

        <!-- Nội dung thông báo (đã cập nhật màu) -->
        <div class="relative z-10">
            <h1 class="text-6xl md:text-9xl font-black" style="color: var(--color-muesli-700);">404</h1>
            <p class="text-2xl md:text-3xl font-bold mt-2" style="color: var(--color-muesli-900);">Ối! Trang không tồn
                tại</p>
            <p class="mt-4 max-w-md mx-auto" style="color: var(--color-muesli-700);">
                Có vẻ như bạn đã đi lạc vào một chiều không gian khác. Đừng lo, chúng tôi sẽ giúp bạn quay lại đúng
                đường.
            </p>
            <router-link to="/user/home"
                class="mt-8 inline-block text-white font-semibold py-3 px-8 rounded-lg shadow-lg transition-colors duration-300 transform hover:scale-105"
                style="background-color: var(--color-muesli-600);"
                onmouseover="this.style.backgroundColor='var(--color-muesli-700)'"
                onmouseout="this.style.backgroundColor='var(--color-muesli-600)'">
                Quay về Trang Chủ
            </router-link>
        </div>
    </main>
</template>
<style scoped>
.ghost-container {
    width: 150px;
    height: 200px;
    position: relative;
    margin: 0 auto 2rem;
}

.ghost {
    width: 100px;
    height: 130px;
    background: var(--color-muesli-100);
    /* Màu thân ma */
    position: absolute;
    bottom: 50px;
    left: 50%;
    transform: translateX(-50%);
    border-top-left-radius: 50px;
    border-top-right-radius: 50px;
    animation: float 2s ease-in-out infinite;
}

.ghost::before,
.ghost::after,
.ghost>.wave {
    content: '';
    position: absolute;
    background: var(--color-muesli-100);
    /* Màu chân ma */
    width: 25px;
    height: 25px;
    border-radius: 50%;
    bottom: -12px;
}

.ghost::before {
    left: 0;
}

.ghost::after {
    left: 25px;
}

.ghost>.wave {
    left: 50px;
}

.ghost>.wave:nth-child(2) {
    left: 75px;
}

.face {
    position: absolute;
    top: 35px;
    left: 50%;
    transform: translateX(-50%);
    width: 60px;
}

.eye,
.eye-right {
    width: 12px;
    height: 12px;
    background: var(--color-muesli-900);
    /* Màu mắt */
    border-radius: 50%;
    position: absolute;
}

.eye-right {
    right: 0;
}

.mouth {
    width: 20px;
    height: 8px;
    background: var(--color-muesli-900);
    /* Màu miệng */
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
    position: absolute;
    top: 25px;
    left: 50%;
    transform: translateX(-50%);
}

.shadow {
    width: 100px;
    height: 20px;
    background: rgba(134, 98, 72, 0.2);
    /* Màu bóng đổ (từ màu muesli-600) */
    border-radius: 50%;
    position: absolute;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    animation: shadow-scale 2s ease-in-out infinite;
}

/* --- Keyframes cho animation --- */
@keyframes float {

    0%,
    100% {
        transform: translateX(-50%) translateY(0);
    }

    50% {
        transform: translateX(-50%) translateY(-20px);
    }
}

@keyframes shadow-scale {

    0%,
    100% {
        transform: translateX(-50%) scale(1);
    }

    50% {
        transform: translateX(-50%) scale(0.85);
    }
}
</style>