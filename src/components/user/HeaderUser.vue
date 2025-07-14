<template>
  <div class="container mx-auto md:flex py-3 hidden text-gray-500">
    <div class="w-1/2 flex flex-row gap-4 items-center">
      <span class="text-sm flex items-center gap-2">
        <Phone class="w-4 h-4 inline-block" />0123456789
      </span>
      <span class="text-sm flex items-center gap-2">
        <Mail class="w-4 h-4 inline-block" />email@gmail.com
      </span>
    </div>
    <div class="w-1/2 flex justify-end">
      <span class="text-sm flex items-center gap-2">
        <MapPin class="w-4 h-4 inline-block" />1F 16, Bà Điểm, Hóc Môn, Hồ Chí Minh
      </span>
    </div>
  </div>
  <hr class="w-full">
</template>
<script setup lang="ts">
import { Phone, Mail, MapPin } from 'lucide-vue-next';
</script>