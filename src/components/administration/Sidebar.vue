<template>
  <section>
    <Sidebar>
      <SidebarContent class="bg-muesli-400 text-white">
        <div>
          <RouterLink to="/user/home"
            ><img
              class="w-85 pt-6"
              src="/src/assets/images/LogoBeeStay.svg"
              cusorhover="pointer"
              alt=""
            />
          </RouterLink>
        </div>
        <div>
          <div class="flex items-center mx-5 pt-5">
            <RouterLink
              to="/administration/dashboard"
              class="w-full px-4 py-2 rounded-md transition-all duration-300 ease-in-out hover:text-muesli-800 hover:bg-muesli-50 font-bold"
              exact-active-class="text-muesli-800 bg-muesli-100"
            >
              <LayoutDashboard class="inline-block h-5 w-5" /> Bảng Điều Khiển
            </RouterLink>
          </div>
          <div class="mx-5 pt-1">
            <button
              @click="isManagerOpen = !isManagerOpen"
              class="w-full px-4 py-2 rounded-md transition-all duration-300 ease-in-out hover:text-muesli-800 hover:bg-muesli-50 font-bold flex items-center gap-2"
              :class="
                [
                  '/administration/roomtypes',
                  '/administration/rooms',
                  '/administration/users',
                  '/administration/bookingmanager',
                  '/administration/statistics',
                  '/administration/receptionist',
                  '/administration/promotions',
                  '/administration/notification',
                  '/administration/facilities',
                ].some((link) => route.path.startsWith(link))
                  ? 'text-muesli-800 bg-muesli-100'
                  : ''
              "
            >
              <FolderKanban class="h-5 w-5" />
              Quản Lý
              <span class="ml-auto">
                <ChevronUp v-if="isManagerOpen" class="w-4 h-4" />
                <ChevronDown v-else class="w-4 h-4" />
              </span>
            </button>

            <div v-if="isManagerOpen" class="mt-2 px-4 space-y-1">
              <RouterLink
                to="/administration/roomtypes"
                class="block text-sm px-3 py-1 rounded hover:bg-muesli-50 hover:text-muesli-800"
                exact-active-class="text-muesli-800 font-semibold bg-muesli-100"
              >
                <LayoutGrid class="inline-block h-4 w-4" /> Quản Lý Loại Phòng
              </RouterLink>
              <RouterLink
                to="/administration/rooms"
                class="block text-sm px-3 py-1 rounded hover:bg-muesli-50 hover:text-muesli-800"
                exact-active-class="text-muesli-800 font-semibold bg-muesli-100"
              >
                <BedDouble class="inline-block h-4 w-4" /> Quản Lý Phòng
              </RouterLink>
              <RouterLink
                to="/administration/facilities"
                class="block text-sm px-3 py-1 rounded hover:bg-muesli-50 hover:text-muesli-800"
                exact-active-class="text-muesli-800 font-semibold bg-muesli-100"
              >
                <ClipboardList class="inline-block h-4 w-4" /> Quản Lý Dịch Vụ
              </RouterLink>
              <RouterLink
                to="/administration/bookingmanager"
                class="block text-sm px-3 py-1 rounded hover:bg-muesli-50 hover:text-muesli-800"
                exact-active-class="text-muesli-800 font-semibold bg-muesli-100"
              >
                <ClipboardList class="inline-block h-4 w-4" /> Đơn Đặt Phòng
              </RouterLink>
              <RouterLink
                to="/administration/statistics"
                class="block text-sm px-3 py-1 rounded hover:bg-muesli-50 hover:text-muesli-800"
                exact-active-class="text-muesli-800 font-semibold bg-muesli-100"
              >
                <FileChartColumn class="inline-block h-4 w-4" /> Thống Kê
              </RouterLink>
              <RouterLink
                to="/administration/users"
                class="block text-sm px-3 py-1 rounded hover:bg-muesli-50 hover:text-muesli-800"
                exact-active-class="text-muesli-800 font-semibold bg-muesli-100"
              >
                <SquareUserRound class="inline-block h-4 w-4" /> Quản Lý Khách
                Hàng
              </RouterLink>
              <RouterLink
                to="/administration/receptionist"
                class="block text-sm px-3 py-1 rounded hover:bg-muesli-50 hover:text-muesli-800"
                exact-active-class="text-muesli-800 font-semibold bg-muesli-100"
              >
                <ContactRound class="inline-block h-4 w-4" /> Quảng Lý Nhân Viên
              </RouterLink>
              <RouterLink
                to="/administration/promotions"
                class="block text-sm px-3 py-1 rounded hover:bg-muesli-50 hover:text-muesli-800"
                exact-active-class="text-muesli-800 font-semibold bg-muesli-100"
              >
                <TicketPercent class="inline-block h-4 w-4" /> Khuyến Mãi
              </RouterLink>
              <RouterLink
                to="/administration/notification"
                class="block text-sm px-3 py-1 rounded hover:bg-muesli-50 hover:text-muesli-800"
                exact-active-class="text-muesli-800 font-semibold bg-muesli-100"
              >
                <BellRing class="inline-block h-4 w-4" /> Thông Báo/Tin Tức
              </RouterLink>
            </div>
          </div>
          <div class="mx-5 pt-1">
            <button
              @click="isReceptionistOpen = !isReceptionistOpen"
              class="w-full px-4 py-2 rounded-md transition-all duration-300 ease-in-out hover:text-muesli-800 hover:bg-muesli-50 font-bold flex items-center gap-2"
              :class="
                [
                  '/administration/bookings',
                  '/administration/listbooking',
                ].some((link) => route.path.startsWith(link))
                  ? 'text-muesli-800 bg-muesli-100'
                  : ''
              "
            >
              <FolderKanban class="h-5 w-5" />
              Lễ Tân
              <span class="ml-auto">
                <ChevronUp v-if="isReceptionistOpen" class="w-4 h-4" />
                <ChevronDown v-else class="w-4 h-4" />
              </span>
            </button>

            <div v-if="isReceptionistOpen" class="px-4 mt-2 space-y-1">
              <RouterLink
                to="/administration/bookings"
                class="block text-sm px-3 py-1 rounded hover:bg-muesli-50 hover:text-muesli-800"
                exact-active-class="text-muesli-800 font-semibold bg-muesli-100"
              >
                <LayoutGrid class="inline-block h-4 w-4" /> Đặt Phòng
              </RouterLink>
              <RouterLink
                to="/administration/dashboard"
                class="block text-sm px-3 py-1 rounded hover:bg-muesli-50 hover:text-muesli-800"
                exact-active-class="text-muesli-800 font-semibold bg-muesli-100"
              >
                <BedDouble class="inline-block h-4 w-4" /> Danh Sách Phòng
              </RouterLink>
              <RouterLink
                to="/administration/listbooking"
                class="block text-sm px-3 py-1 rounded hover:bg-muesli-50 hover:text-muesli-800"
                exact-active-class="text-muesli-800 font-semibold bg-muesli-100"
              >
                <ClipboardList class="inline-block h-4 w-4" /> Các Đơn Đặt Phòng 
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

// if (route.path.startsWith('/administration')) {
//   isOpen.value = true
</script>
