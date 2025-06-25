<template>
  <div class="">
    <div class="container mx-auto flex justify-center items-center text-gray-500">
      <div class="w-5/12 lg:flex hidden items-center gap-5">
        <!-- <RouterLink to="" class="flex items-center gap-0.5">Trang Chủ
          <ChevronDown class="w-4 h-4"/>
        </RouterLink>
        <RouterLink to="" class="flex items-center gap-0.5">Phòng
          <ChevronDown class="w-4 h-4"/>
        </RouterLink>
        <RouterLink to="" class="flex items-center gap-0.5">Trang
          <ChevronDown class="w-4 h-4"/>
        </RouterLink>
        <RouterLink to="" class="flex items-center gap-0.5">Blog
          <ChevronDown class="w-4 h-4"/>
        </RouterLink>
        <RouterLink to="" class="flex items-center gap-0.5">Kết Nối
          <ChevronDown class="w-4 h-4"/>
        </RouterLink> -->
        <div class="relative group">
          <div class="flex items-center gap-1 text-base font-semibold cursor-pointer group-hover:text-muesli-500">
            Trang Chủ
            <ChevronDown class="w-4 h-4" />
          </div>
          <div
            class="absolute top-full left-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
            <RouterLink to="/user/home" class="block px-4 py-2 text-sm text-gray-700 hover:bg-muesli-100 hover:text-muesli-400 hover:rounded-t-lg">
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
            <RouterLink to="/user/roomdetail" class="block px-4 py-2 text-sm text-gray-700 hover:bg-muesli-100 hover:text-muesli-400 hover:rounded-t-lg">
              Chi tiết phòng
            </RouterLink>
            <RouterLink to="/gioi-thieu"
              class="block px-4 py-2 text-sm text-gray-700 hover:bg-muesli-100 hover:text-muesli-400 hover:rounded-b-lg">
              Giới thiệu
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
            <RouterLink to="/user/about" class="block px-4 py-2 text-sm text-gray-700 hover:bg-muesli-100 hover:text-muesli-400 hover:rounded-t-lg">
              Thông Tin Về Chúng Tôi
            </RouterLink>
            <RouterLink to="/gioi-thieu"
              class="block px-4 py-2 text-sm text-gray-700 hover:bg-muesli-100 hover:text-muesli-400 hover:rounded-b-lg">
              Giới thiệu
            </RouterLink>
          </div>
        </div>
        <div class="relative group">
          <div class="flex items-center gap-1 text-base font-semibold cursor-pointer group-hover:text-muesli-500">
            Blog
            <ChevronDown class="w-4 h-4" />
          </div>
          <div
            class="absolute top-full left-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
            <RouterLink to="/" class="block px-4 py-2 text-sm text-gray-700 hover:bg-muesli-100 hover:text-muesli-400 hover:rounded-t-lg">
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
            Kết Nối
            <ChevronDown class="w-4 h-4" />
          </div>
          <div
            class="absolute top-full left-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
            <RouterLink to="/" class="block px-4 py-2 text-sm text-gray-700 hover:bg-muesli-100 hover:text-muesli-400 hover:rounded-t-lg">
              Trang chủ chính
            </RouterLink>
            <RouterLink to="/gioi-thieu"
              class="block px-4 py-2 text-sm text-gray-700 hover:bg-muesli-100 hover:text-muesli-400 hover:rounded-b-lg">
              Giới thiệu
            </RouterLink>
          </div>
        </div>
      </div>
      <div class="md:w-2/12 w-2/3 md:flex justify-center py-1"><img src="../../assets/images/BeeStay.png" alt=""
          class="w-40"></div>
      <div class="md:w-5/12 2-1/3 flex justify-end gap-3 items-center">
        <button
          class="lg:block hidden py-2 px-4 hover:bg-muesli-400/10 text-gray-400 hover:text-muesli-400 rounded-lg border hover:border-muesli-400 transition-all duration-300 hover:scale-105 hover:shadow-md">
          Đăng Nhập
        </button>
        <button
          class="lg:block hidden py-2 px-4 hover:bg-muesli-400/10 text-gray-400 hover:text-muesli-400 rounded-lg border hover:border-muesli-400 transition-all duration-300 hover:scale-105 hover:shadow-md">
          Đăng Ký
        </button>
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
import { ChevronDown } from 'lucide-vue-next';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
</script>