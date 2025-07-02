<template>
  <section>
    <Sidebar>
      <SidebarContent class="bg-muesli-400 text-white">
        <div>
          <RouterLink to="/auth/login"><img class="w-85 pt-6" src="/src/assets/images/LogoBeeStay.svg"
              cusorhover="pointer" alt="" />
          </RouterLink>
        </div>
        <div>
          <div class="flex items-center mx-5 pt-5">
            <RouterLink to="/administration/dashboard"
              class="w-full px-4 py-2 rounded-md transition-all duration-300 ease-in-out hover:text-muesli-800 hover:bg-muesli-50 font-bold"
              exact-active-class="text-muesli-800 bg-muesli-100">
              <LayoutDashboard class="inline-block h-5 w-5" /> Về Chúng Tôi
            </RouterLink>
          </div>
          <div class="mx-5 pt-1">
            <button @click="isManagerOpen = !isManagerOpen"
              class="w-full px-4 py-2 rounded-md transition-all duration-300 ease-in-out hover:text-muesli-800 hover:bg-muesli-50 font-bold flex items-center gap-2"
              :class="[
                '/administration/roomtypes',
                '/administration/rooms',
                '/administration/users',
              ].some((link) => route.path.startsWith(link))
                ? 'text-muesli-800 bg-muesli-100'
                : ''
                ">
              <FolderKanban class="h-5 w-5" />
              Trang Chủ
              <span class="ml-auto">
                <ChevronUp v-if="isManagerOpen" class="w-4 h-4" />
                <ChevronDown v-else class="w-4 h-4" />
              </span>
            </button>

            <div v-if="isManagerOpen" class="mt-2 px-4 space-y-1">
              <RouterLink to="/administration/roomtypes"
                class="block text-sm px-3 py-1 rounded hover:bg-muesli-50 hover:text-muesli-800"
                exact-active-class="text-muesli-800 font-semibold bg-muesli-100">
                <LayoutGrid class="inline-block h-4 w-4" /> Quản Lý Loại Phòng
              </RouterLink>
            </div>
          </div>
          <div class="mx-5 pt-1">
            <button @click="isReceptionistOpen = !isReceptionistOpen"
              class="w-full px-4 py-2 rounded-md transition-all duration-300 ease-in-out hover:text-muesli-800 hover:bg-muesli-50 font-bold flex items-center gap-2"
              :class="[
                '/administration/bookings',
                '/administration/listbooking',
              ].some((link) => route.path.startsWith(link))
                ? 'text-muesli-800 bg-muesli-100'
                : ''
                ">
              <FolderKanban class="h-5 w-5" />
              Phòng
              <span class="ml-auto">
                <ChevronUp v-if="isReceptionistOpen" class="w-4 h-4" />
                <ChevronDown v-else class="w-4 h-4" />
              </span>
            </button>

            <div v-if="isReceptionistOpen" class="px-4 mt-2 space-y-1">
              <RouterLink to="/administration/bookings"
                class="block text-sm px-3 py-1 rounded hover:bg-muesli-50 hover:text-muesli-800"
                exact-active-class="text-muesli-800 font-semibold bg-muesli-100">
                <LayoutGrid class="inline-block h-4 w-4" /> Đặt Phòng
              </RouterLink>
            </div>
          </div>
          <div class="mx-5 pt-1">
            <button @click="isReceptionistOpen = !isReceptionistOpen"
              class="w-full px-4 py-2 rounded-md transition-all duration-300 ease-in-out hover:text-muesli-800 hover:bg-muesli-50 font-bold flex items-center gap-2"
              :class="[
                '/administration/bookings',
                '/administration/listbooking',
              ].some((link) => route.path.startsWith(link))
                ? 'text-muesli-800 bg-muesli-100'
                : ''
                ">
              <FolderKanban class="h-5 w-5" />
              Trang
              <span class="ml-auto">
                <ChevronUp v-if="isReceptionistOpen" class="w-4 h-4" />
                <ChevronDown v-else class="w-4 h-4" />
              </span>
            </button>

            <div v-if="isReceptionistOpen" class="px-4 mt-2 space-y-1">
              <RouterLink to="/administration/bookings"
                class="block text-sm px-3 py-1 rounded hover:bg-muesli-50 hover:text-muesli-800"
                exact-active-class="text-muesli-800 font-semibold bg-muesli-100">
                <LayoutGrid class="inline-block h-4 w-4" /> Đặt Phòng
              </RouterLink>
            </div>
          </div>
          <div class="mx-5 pt-1">
            <button @click="isReceptionistOpen = !isReceptionistOpen"
              class="w-full px-4 py-2 rounded-md transition-all duration-300 ease-in-out hover:text-muesli-800 hover:bg-muesli-50 font-bold flex items-center gap-2"
              :class="[
                '/administration/bookings',
                '/administration/listbooking',
              ].some((link) => route.path.startsWith(link))
                ? 'text-muesli-800 bg-muesli-100'
                : ''
                ">
              <FolderKanban class="h-5 w-5" />
              Blog
              <span class="ml-auto">
                <ChevronUp v-if="isReceptionistOpen" class="w-4 h-4" />
                <ChevronDown v-else class="w-4 h-4" />
              </span>
            </button>

            <div v-if="isReceptionistOpen" class="px-4 mt-2 space-y-1">
              <RouterLink to="/administration/bookings"
                class="block text-sm px-3 py-1 rounded hover:bg-muesli-50 hover:text-muesli-800"
                exact-active-class="text-muesli-800 font-semibold bg-muesli-100">
                <LayoutGrid class="inline-block h-4 w-4" /> Đặt Phòng
              </RouterLink>
            </div>
          </div>
          <div class="flex items-center mx-5">
            <RouterLink to="/administration/dashboard"
              class="w-full px-4 py-2 rounded-md transition-all duration-300 ease-in-out hover:text-muesli-800 hover:bg-muesli-50 font-bold"
              exact-active-class="text-muesli-800 bg-muesli-100">
              <LayoutDashboard class="inline-block h-5 w-5" /> Kết Nối
            </RouterLink>
          </div>
          <div class="mx-5 pt-1">
            <button @click="isUserInfoOpen = !isUserInfoOpen"
              class="w-full px-4 py-2 rounded-md transition-all duration-300 ease-in-out hover:text-muesli-800 hover:bg-muesli-50 font-bold flex items-center gap-2"
              :class="[
                '/user/setting/profile',
                '/user/setting/point',
              ].some((link) => route.path.startsWith(link))
                ? 'text-muesli-800 bg-muesli-100'
                : ''
                ">
              <img src="@/assets/images/bin.png" alt="" class="w-6 h-6 rounded-full">
              Võ Thanh Bin
              <span class="ml-auto">
                <ChevronUp v-if="isUserInfoOpen" class="w-4 h-4" />
                <ChevronDown v-else class="w-4 h-4" />
              </span>
            </button>

            <div v-if="isUserInfoOpen" class="px-4 mt-2 space-y-1">
              <RouterLink to="/user/setting/profile"
                class="flex items-center gap-1 text-sm px-3 py-1 rounded hover:bg-muesli-50 hover:text-muesli-800"
                exact-active-class="text-muesli-800 font-semibold bg-muesli-100">
                <LayoutGrid class="inline-block h-4 w-4" /> Chỉnh Sửa Hồ Sơ
              </RouterLink>
              <RouterLink to="/user/setting/point"
                class="flex items-center gap-1 text-sm px-3 py-1 rounded hover:bg-muesli-50 hover:text-muesli-800"
                exact-active-class="text-muesli-800 font-semibold bg-muesli-100">
                <CircleDollarSign class="w-4 h-4 inline-block"/> 0 Điểm
              </RouterLink>
            </div>
          </div>
        </div>
      </SidebarContent>
    </Sidebar>
  </section>
</template>
<script setup lang="ts">
import { Sidebar, SidebarContent } from "@/components/ui/sidebar";

import {
  LayoutGrid,
  LayoutDashboard,
  FolderKanban,
  CircleDollarSign,
  BedDouble,
  ClipboardList,
  FileChartColumn,
  SquareUserRound,
  ContactRound,
  TicketPercent,
  BellRing,
  ChevronDown,
  ChevronUp,
} from "lucide-vue-next";
import { ref } from "vue";
import { useRoute } from "vue-router";

const isManagerOpen = ref(false);
const isReceptionistOpen = ref(false);
const route = useRoute();
const isUserInfoOpen = ref(false);

// if (route.path.startsWith('/administration')) {
//   isOpen.value = true
</script>
