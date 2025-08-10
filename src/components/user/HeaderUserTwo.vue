<template>
  <div class="">
    <div class="container mx-auto flex justify-center items-center text-gray-500">
      <div class="w-5/12 lg:flex hidden items-center gap-5">
        <div class="relative group">
          <div class="flex items-center gap-1 text-base font-semibold cursor-pointer group-hover:text-muesli-500">
            Trang Chủ
            <ChevronDown class="w-4 h-4" />
          </div>
          <div
            class="absolute top-full left-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
            <RouterLink to="/user/home"
              class="block px-4 py-2 text-sm text-gray-700 hover:bg-muesli-100 hover:text-muesli-400 hover:rounded-t-lg">
              Trang chủ
            </RouterLink>
            <RouterLink to="/gioi-thieu"
              class="block px-4 py-2 text-sm text-gray-700 hover:bg-muesli-100 hover:text-muesli-400 hover:rounded-b-lg">
              Giới thiệu
            </RouterLink>
          </div>
        </div>
        <div class="relative group">
          <div class="flex items-center gap-1 text-base font-semibold cursor-pointer group-hover:text-muesli-500">
            Phòng
            <ChevronDown class="w-4 h-4" />
          </div>
          <div
            class="absolute top-full left-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
            <RouterLink to="/user/roomdetail"
              class="block px-4 py-2 text-sm text-gray-700 hover:bg-muesli-100 hover:text-muesli-400 hover:rounded-t-lg">
              Chi tiết phòng
            </RouterLink>
            <RouterLink to="/user/roomtype"
              class="block px-4 py-2 text-sm text-gray-700 hover:bg-muesli-100 hover:text-muesli-400 hover:rounded-b-lg">
              Loại Phòng
            </RouterLink>
          </div>
        </div>
        <div class="relative group">
          <div class="flex items-center gap-1 text-base font-semibold cursor-pointer group-hover:text-muesli-500">
            Trang
            <ChevronDown class="w-4 h-4" />
          </div>
          <div
            class="absolute top-full left-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
            <RouterLink to="/user/about"
              class="block px-4 py-2 text-sm text-gray-700 hover:bg-muesli-100 hover:text-muesli-400 hover:rounded-t-lg">
              Thông Tin Về Chúng Tôi
            </RouterLink>
            <RouterLink to="/gioi-thieu"
              class="block px-4 py-2 text-sm text-gray-700 hover:bg-muesli-100 hover:text-muesli-400 hover:rounded-b-lg">
              Giới thiệu
            </RouterLink>
          </div>
        </div>
        <div class="relative group">
          <!-- <div class="flex items-center gap-1 text-base font-semibold cursor-pointer group-hover:text-muesli-500">
            Blog
            <ChevronDown class="w-4 h-4" />
          </div> -->
          <div
            class="absolute top-full left-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
            <RouterLink to="/"
              class="block px-4 py-2 text-sm text-gray-700 hover:bg-muesli-100 hover:text-muesli-400 hover:rounded-t-lg">
              Trang chủ chính
            </RouterLink>
            <RouterLink to="/gioi-thieu"
              class="block px-4 py-2 text-sm text-gray-700 hover:bg-muesli-100 hover:text-muesli-400 hover:rounded-b-lg">
              Giới thiệu
            </RouterLink>
          </div>
        </div>
        <div class="relative group">
          <div class="flex items-center gap-1 text-base font-semibold cursor-pointer group-hover:text-muesli-500">
            <RouterLink to="/user/contact">Kết Nối</RouterLink>
          </div>
        </div>
      </div>
      <div class="md:w-2/12 w-2/3 md:flex justify-center py-1">
        <RouterLink to="/user/home"><img src="../../assets/images/BeeStay.png" alt="" class="w-40"></RouterLink>
      </div>
      <div class="md:w-5/12 2-1/3 flex justify-end gap-3 items-center">
        <div class="lg:flex hidden gap-3" v-if="!authStore.user">
          <RouterLink to="/login"
            class="py-2 px-4 hover:bg-muesli-400/10 text-gray-400 hover:text-muesli-400 rounded-lg border hover:border-muesli-400 transition-all duration-300 hover:scale-105 hover:shadow-md">
            Đăng Nhập
          </RouterLink>
          <RouterLink to="/auth/register"
            class="py-2 px-4 hover:bg-muesli-400/10 text-gray-400 hover:text-muesli-400 rounded-lg border hover:border-muesli-400 transition-all duration-300 hover:scale-105 hover:shadow-md">
            Đăng Ký
          </RouterLink>
        </div>

        <div class="relative group lg:block hidden" v-if="authStore.user">
          <div
            class="flex items-center gap-1 text-base font-semibold cursor-pointer group-hover:text-muesli-500 border-2 border-gray-500 hover:border-muesli-400 py-2 px-4 rounded-lg">
            <RouterLink to="">{{ authStore.user.fullname }} | {{ authStore.user.point }} Điểm
              <ChevronDown class="w-4 h-4 inline-block" />
            </RouterLink>
          </div>
          <div
            class="absolute top-full left-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
            <div class="bg-muesli-400 py-2 px-4 rounded-t-lg min-w-[165px]">
              <p class="text-lg text-white font-bold rounded-t-lg">{{ authStore.user.fullname }}</p>
              <p class="text-sm text-white flex gap-2" v-if="authStore.user.point !== 0">Bạn là thành viên <span
                  class="font-bold">Đồng</span>
                <ChevronRight class="ml-auto" />
              </p>
            </div>
            <hr>
            <!-- <RouterLink to="/user/setting/point"
              class="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-muesli-100 hover:text-muesli-400">
              <CircleDollarSign class="w-4 h-4 inline-block" /> {{ authStore.user.point }} Điểm
            </RouterLink> -->
            <RouterLink to="/user/setting/profile"
              class="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-muesli-100 hover:text-muesli-400">
              <User class="w-4 h-4 inline-block" />Chỉnh sửa hồ sơ
            </RouterLink>
            <!-- <RouterLink to="/user/setting/refund/NaN"
              class="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-muesli-100 hover:text-muesli-400">
              <Wallet class="w-4 h-4 inline-block" />Hoàn tiền
            </RouterLink> -->
            <!-- <RouterLink to=""
              class="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-muesli-100 hover:text-muesli-400">
              <TicketPercent class="w-4 h-4 inline-block" />Khuyến mãi
            </RouterLink> -->
            <button to="" @click.prevent="handleLogout"
              class="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-muesli-100 hover:text-muesli-400 hover:rounded-b-lg w-full">
              <LogOut class="w-4 h-4 inline-block" />Đăng xuất
            </button>
          </div>
        </div>

        <RouterLink to=""
          class="py-2 px-4 bg-muesli-400 hover:bg-muesli-400/10 text-white hover:text-muesli-400 rounded-lg border hover:border-muesli-400 transition-all duration-300 hover:scale-105 hover:shadow-md">
          Đặt Ngay</RouterLink>
        <SidebarTrigger asChild class="block lg:hidden"></SidebarTrigger>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { SidebarTrigger } from '@/components/ui/sidebar'
import { ChevronDown, Router, User, CircleDollarSign, Wallet, TicketPercent, LogOut, ChevronRight } from 'lucide-vue-next';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { RouterLink } from 'vue-router';
import { onMounted } from 'vue';
import { useAuthStore } from '@/stores/auth/login';
const authStore = useAuthStore();

const handleLogout = () => {
  authStore.logout();
}

onMounted(async () => {
  await authStore.fetchUser();
})
</script>