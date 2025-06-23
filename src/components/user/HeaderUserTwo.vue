<template>
    <div class="">
    <div class="container mx-auto flex justify-center items-center text-gray-500">
      <div class="w-5/12 md:flex hidden items-center gap-5">
        <RouterLink to="" class="flex items-center gap-0.5">Trang Chủ
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
        </RouterLink>
      </div>
      <div class="md:w-2/12 w-2/3 md:flex justify-center py-1"><img src="../../assets/images/BeeStay.png" alt="" class="w-40"></div>
      <div class="md:w-5/12 2-1/3 flex justify-end gap-3">
        <button class="lg:block hidden py-2 px-4 hover:bg-muesli-400/10 text-gray-400 hover:text-muesli-400 rounded-lg border hover:border-muesli-400 transition-all duration-300 hover:scale-105 hover:shadow-md">
          Đăng Nhập
        </button>
        <button class="lg:block hidden py-2 px-4 hover:bg-muesli-400/10 text-gray-400 hover:text-muesli-400 rounded-lg border hover:border-muesli-400 transition-all duration-300 hover:scale-105 hover:shadow-md">
          Đăng Ký
        </button>
        <RouterLink to="" class="py-2 px-4 bg-muesli-400 hover:bg-muesli-400/10 text-white hover:text-muesli-400 rounded-lg border hover:border-muesli-400 transition-all duration-300 hover:scale-105 hover:shadow-md">Đặt Ngay</RouterLink>
        <SidebarTrigger asChild class="block lg:hidden"></SidebarTrigger>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { SidebarTrigger } from '@/components/ui/sidebar'
import { ChevronDown } from 'lucide-vue-next';
</script>