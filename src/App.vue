<script setup>
import { MoveRight, MoveLeft } from "lucide-vue-next";
import { ref, onMounted, watch, computed } from "vue";
import { vi } from "date-fns/locale";
import { addDays, format } from "date-fns";
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
</script>

<template>
  <!-- Header top -->
  <div class="border-b-[0.2px] py-2 hidden lg:block w-full">
    <div class="@container justify-between px-[17rem] flex w-full">
      <div class="flex gap-x-4">
        <div>012345678</div>
        <div>thanhbin@gmail.com</div>
      </div>
      <div class="me-3">280 Hoc Mon Ba Diem</div>
    </div>
  </div>
  <!-- Header bottom -->
  <div
    class="sticky top-0 transition-all duration-300 ease-in-out bg-white z-50 shadow-sm"
  >
    <div class="header p-4">
      <div class="@container w-full">
        <div class="flex justify-between lg:justify-around w-full">
          <!-- NAVS LINK -->
          <div class="justify-end lg:flex hidden items-center">
            <ul class="space-x-4 font-semibold text-xl lg:flex">
              <li>Home</li>
              <li>About</li>
              <li>Contact</li>
            </ul>
          </div>
          <!-- END NAVS LINKS -->

          <!-- LOGO -->
          <div class="flex lg:justify-center justify-start my-auto">
            <img class="size-12" src="./assets/logo.svg" alt="" />
          </div>
          <!-- END LOGO -->

          <!-- ACTIONS -->
          <div class="flex shrink-0 justify-end space-x-3 my-auto">
            <button
              type="button"
              class="py-2 px-3 border border-muesli-400 rounded-xl"
            >
              Sign In
            </button>
            <button
              type="button"
              class="py-2 px-3 border border-muesli-400 rounded-xl"
            >
              Sign Up
            </button>
            <button
              type="button"
              class="py-2 px-3 border border-muesli-400 bg-muesli-400 rounded-xl"
            >
              Book Now
            </button>
            <button></button>
          </div>
          <!-- END ACTIONS -->
        </div>
      </div>
    </div>
  </div>
  <!-- Section hero -->
  <section class="">
    <div
      class="relative w-full lg:h-[900px] md:h-[700px] h-96 overflow-hidden group"
    >
      <div
        class="absolute inset-0 bg-[url('/src/assets/img/home-1.png')] brightness-30 blur-[2px] z-0 bg-fixed bg-cover bg-center flex items-center"
      ></div>
      <div
        class="relative z-10 flex flex-col items-center justify-center h-full text-white"
      >
        <p class="text-2xl font-bold">Wellcome to BeeStay</p>
        <p
          class="text-5xl lg:text-6xl lg:w-[800px] md:w-[600px] text-center w-[400px]"
        >
          Discover the best places to stay, from hotels to vacation rentals.
        </p>
        <div
          class="absolute z-10 w-full flex justify-between items-center px-6"
        >
          <button
            type="button"
            class="py-2 px-4 bg-muesli-400/10 text-white rounded-lg top-1/2 hidden md:group-hover:block"
          >
            <MoveLeft class="size-[48px]" />
          </button>
          <button
            type="button"
            class="py-2 px-4 bg-muesli-400/10 text-white top-1/2 rounded-lg md:group-hover:block hidden"
          >
            <MoveRight class="size-[48px]" />
          </button>
        </div>
      </div>
    </div>
  </section>
  <!-- SEARCH BOX -->
  <div class="relative z-10">
    <div class="px-4 mx-auto xl:container">
      <form
        action=""
        class="bg-white rounded-lg px-[22px] py-[20px] shadow-xl lg:mt-[-50px] text-[20px]"
      >
        <div
          class="lg:flex justify-between text-start items-center md:grid md:grid-cols-3 sm:grid sm:grid-cols-2 gap-4 grid grid-cols-1"
        >
          <div
            class="space-y-2 flex flex-col sm:border-l-[0.1px] pl-6 border-gray-400"
          >
            <label>Check In</label>
            <VueDatePicker
              v-model="checkin"
              :format-locale="vi"
              :format="'dd/MM/yyyy'"
              :min-date="new Date()"
              multi-calendars
            />
          </div>
          <div
            class="relative space-y-2 flex flex-col sm:border-l-[0.1px] pl-6 border-gray-400"
          >
            <label>Check Out</label
            ><select
              class="block w-full rounded-md border border-gray-300 bg-white px-3 py-1 pr-10 text-base text-gray-900 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed transition"
              name=""
              id=""
              :disabled="!checkin"
              v-model="numberOfNights"
            >
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
          <div
            class="space-y-2 flex flex-col sm:border-l-[0.1px] pl-6 border-gray-400"
          >
            <label>Adult</label> <input type="date" />
          </div>
          <div
            class="space-y-2 flex flex-col sm:border-l-[0.1px] pl-6 border-gray-400"
          >
            <label>Child</label><input type="date" />
          </div>
          <div
            class="space-y-2 flex flex-col md:border-l-[0.1px] md:pl-6 border-gray-400"
          >
            <button class="px-4 py-2 bg-muesli-400 text-white rounded-xl">
              Book Now
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
  <!-- END SEARCHBOX -->
  <!-- Section About -->
  <section class="relative w-full bg-white lg:p-[120px] p-[180px]">
    <div
      class="lg:grid lg:grid-cols-2 gap-[30px] items-center mx-auto container"
    >
      <!-- Image -->
      <div class="grid relative items-center justify-items-center">
        <div
          class="relative rounded-lg h-[580px] w-[485px] inset-0 bg-[url('/src/assets/img/about-1.png')] bg-cover bg-center z-1"
        >
          <div
            class="absolute w-78 h-54 -top-4 -right-10 ring-8 bg-[url('/src/assets/img/about-1.png')] bg-cover bg-center rounded-2xl z-20 flex flex-col justify-center p-10 ring-white"
          >
            <h2 class="text-3xl font-bold">50+</h2>
            <p>Experience Staff</p>
          </div>
          <div
            class="absolute w-48 h-24 bottom-5 -left-14 bg-white shadow-2xl rounded-2xl z-20 flex flex-col justify-center p-10 ring-1 ring-gray-300"
          >
            <h2 class="text-3xl font-bold">50+</h2>
            <p>Experience Staff</p>
          </div>
        </div>
      </div>
      <!-- Content -->
      <div class="w-full">
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
</template>

<style scoped></style>
