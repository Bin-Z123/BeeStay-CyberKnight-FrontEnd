<template>
  <nav class="bg-[url('@/assets/img/top.png')] bg-cover bg-top dark:bg-[url('@/assets/img/top.png')] h-126">
    <div class="container mx-auto px-4">
      <div class="flex py-2">
        <div class="w-1/6 text-white">Logo Ne</div>
        <div class="w-5/6 flex items-center space-x-2 justify-end">
          <RouterLink to="/" class="me-4 text-white">Khach San</RouterLink>
          <RouterLink to="/" class="me-4 text-white">Khach San</RouterLink>
          <RouterLink to="/" class="border-1 px-3 py-1 rounded-sm text-white"><svg xmlns="http://www.w3.org/2000/svg"
              width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
              stroke-linecap="round" stroke-linejoin="round"
              class="lucide lucide-circle-user-icon lucide-circle-user inline-block">
              <circle cx="12" cy="12" r="10" />
              <circle cx="12" cy="10" r="3" />
              <path d="M7 20.662V19a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v1.662" />
            </svg> Đăng Nhập</RouterLink>
          <RouterLink to="/"
            class="px-3 py-1 bg-dodger-600 border-1 border-dodger-600 rounded-sm text-white hover:bg-dodger-700 hover:border-dodger-700">
            Đăng Ký</RouterLink>
          <button
            class="text-white py-1 px-1 bg-dodger-600 rounded-sm border-1 border-dodger-600 hover:bg-dodger-700 hover:border-dodger-700"
            @click="toggleDarkMode()">
            <svg v-if="!darkMode" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
              fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
              class="lucide lucide-sun-moon-icon lucide-sun-moon text-white">
              <path d="M12 8a2.83 2.83 0 0 0 4 4 4 4 0 1 1-4-4" />
              <path d="M12 2v2" />
              <path d="M12 20v2" />
              <path d="m4.9 4.9 1.4 1.4" />
              <path d="m17.7 17.7 1.4 1.4" />
              <path d="M2 12h2" />
              <path d="M20 12h2" />
              <path d="m6.3 17.7-1.4 1.4" />
              <path d="m19.1 4.9-1.4 1.4" />
            </svg>
            <svg v-else xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
              class="lucide lucide-sun-icon lucide-sun">
              <circle cx="12" cy="12" r="4" />
              <path d="M12 2v2" />
              <path d="M12 20v2" />
              <path d="m4.93 4.93 1.41 1.41" />
              <path d="m17.66 17.66 1.41 1.41" />
              <path d="M2 12h2" />
              <path d="M20 12h2" />
              <path d="m6.34 17.66-1.41 1.41" />
              <path d="m19.07 4.93-1.41 1.41" />
            </svg>
          </button>
        </div>
      </div>

      <hr class="text-white/30">

      <div class="py-2 text-white">
        <RouterLink to="/" class="me-6">Khach San</RouterLink>
        <RouterLink to="/" class="me-6">Khach San</RouterLink>
        <RouterLink to="/" class="me-6">Khach San</RouterLink>
        <RouterLink to="/" class="me-6">Khach San</RouterLink>
        <RouterLink to="/" class="me-6">Khach San</RouterLink>
        <RouterLink to="/" class="me-6">Khach San</RouterLink>
      </div>

      <hr class="text-white/30">

      <div class="mt-8 mb-3">
        <RouterLink to="/" class="bg-white py-2 rounded-3xl px-4 me-2 dark:text-black"><svg
            xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
            class="lucide lucide-building2-icon lucide-building-2 inline-block">
            <path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z" />
            <path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2" />
            <path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2" />
            <path d="M10 6h4" />
            <path d="M10 10h4" />
            <path d="M10 14h4" />
            <path d="M10 18h4" />
          </svg> Khach San</RouterLink>
        <RouterLink to="/" class="text-white py-2 rounded-3xl px-4 me-2 border border-transparent hover:border-white">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
            class="lucide lucide-building2-icon lucide-building-2 inline-block">
            <path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z" />
            <path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2" />
            <path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2" />
            <path d="M10 6h4" />
            <path d="M10 10h4" />
            <path d="M10 14h4" />
            <path d="M10 18h4" />
          </svg> Khach San
        </RouterLink>
        <RouterLink to="/" class="text-white py-2 rounded-3xl px-4 me-2 border border-transparent hover:border-white">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
            class="lucide lucide-building2-icon lucide-building-2 inline-block">
            <path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z" />
            <path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2" />
            <path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2" />
            <path d="M10 6h4" />
            <path d="M10 10h4" />
            <path d="M10 14h4" />
            <path d="M10 18h4" />
          </svg> Khach San
        </RouterLink>
        <RouterLink to="/" class="text-white py-2 rounded-3xl px-4 me-2 border border-transparent hover:border-white">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
            class="lucide lucide-building2-icon lucide-building-2 inline-block">
            <path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z" />
            <path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2" />
            <path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2" />
            <path d="M10 6h4" />
            <path d="M10 10h4" />
            <path d="M10 14h4" />
            <path d="M10 18h4" />
          </svg> Khach San
        </RouterLink>
        <RouterLink to="/" class="text-white py-2 rounded-3xl px-4 me-2 border border-transparent hover:border-white">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
            class="lucide lucide-building2-icon lucide-building-2 inline-block">
            <path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z" />
            <path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2" />
            <path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2" />
            <path d="M10 6h4" />
            <path d="M10 10h4" />
            <path d="M10 14h4" />
            <path d="M10 18h4" />
          </svg> Khach San
        </RouterLink>
      </div>

      <hr class="text-white">

      <div class="mt-8 mb-3">
        <RouterLink to="/" class="bg-dodger-700 py-2 rounded-3xl px-3 ms-3 text-xs text-white"><svg
            xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
            class="lucide lucide-building2-icon lucide-building-2 inline-block">
            <path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z" />
            <path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2" />
            <path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2" />
            <path d="M10 6h4" />
            <path d="M10 10h4" />
            <path d="M10 14h4" />
            <path d="M10 18h4" />
          </svg> Khach San</RouterLink>
        <RouterLink to="/" class="bg-gray-800 py-2 rounded-3xl px-3 ms-3 text-xs text-white"><svg
            xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
            class="lucide lucide-building2-icon lucide-building-2 inline-block">
            <path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z" />
            <path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2" />
            <path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2" />
            <path d="M10 6h4" />
            <path d="M10 10h4" />
            <path d="M10 14h4" />
            <path d="M10 18h4" />
          </svg> Khach San</RouterLink>
        <RouterLink to="/" class="bg-gray-800 py-2 rounded-3xl px-3 ms-3 text-xs text-white"><svg
            xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
            class="lucide lucide-building2-icon lucide-building-2 inline-block">
            <path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z" />
            <path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2" />
            <path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2" />
            <path d="M10 6h4" />
            <path d="M10 10h4" />
            <path d="M10 14h4" />
            <path d="M10 18h4" />
          </svg> Khach San</RouterLink>
      </div>

      <div class="flex text-white mt-5">
        <div class="w-1/3 relative">
          <h3>Thành phố, địa điểm hoặc tên khách sạn:</h3>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
            class="lucide lucide-map-pin-icon lucide-map-pin absolute left-4 text-gray-400 top-10">
            <path
              d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" />
            <circle cx="12" cy="10" r="3" />
          </svg>
          <input type="text"
            class="w-full h-14 pl-12 border-3 border-gray-400 bg-white rounded-tl-2xl rounded-bl-2xl text-gray-400"
            placeholder="Thành phố, địa điểm hoặc tên khách sạn">
        </div>
        <div class="w-1/3 relative">
          <h3>Ngày nhận phòng và trả phòng</h3>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
            class="lucide lucide-calendar-days-icon lucide-calendar-days absolute left-4 text-gray-400 top-10">
            <path d="M8 2v4" />
            <path d="M16 2v4" />
            <rect width="18" height="18" x="3" y="4" rx="2" />
            <path d="M3 10h18" />
            <path d="M8 14h.01" />
            <path d="M12 14h.01" />
            <path d="M16 14h.01" />
            <path d="M8 18h.01" />
            <path d="M12 18h.01" />
            <path d="M16 18h.01" />
          </svg>
          <input type="text" class="w-full h-14 pl-12 border-3 border-gray-400 bg-white text-black"
            placeholder="29 thg 5 2025 - 30 thg 5 2025">
        </div>
        <div class="w-1/3 relative">
          <h3>Khách và Phòng</h3>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
            class="lucide lucide-contact-round-icon lucide-contact-round absolute left-4 text-gray-400 top-10">
            <path d="M16 2v2" />
            <path d="M17.915 22a6 6 0 0 0-12 0" />
            <path d="M8 2v2" />
            <circle cx="12" cy="12" r="4" />
            <rect x="3" y="4" width="18" height="18" rx="2" />
          </svg>
          <input type="text"
            class="w-full h-14 pl-12 border-3 border-gray-400 bg-white rounded-tr-2xl rounded-br-2xl text-black"
            placeholder="2 người lớn, 0 Trẻ em, 1 phòng">
          <button class="absolute bg-dodger-600 p-[13.5px] rounded-tr-[13px] rounded-br-[13px] right-0.5 top-1/3 hover:bg-dodger-700"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
              fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
              class="lucide lucide-search-icon lucide-search">
              <path d="m21 21-4.34-4.34" />
              <circle cx="11" cy="11" r="8" />
            </svg></button>
        </div>
      </div>
    </div>
  </nav>
</template>
<script setup>
import { ref, onMounted } from 'vue';

const darkMode = ref(false);
const toggleDarkMode = () => {
  darkMode.value = !darkMode.value;
  const htmlElement = document.documentElement;
  htmlElement.classList.toggle("dark");
  localStorage.setItem("darkMode", darkMode.value ? "enabled" : "disabled");
};
onMounted(() => {
  const darkModeSetting = localStorage.getItem("darkMode");
  if (darkModeSetting === "enabled") {
    darkMode.value = true;
    document.documentElement.classList.add("dark");
  }
});
</script>
