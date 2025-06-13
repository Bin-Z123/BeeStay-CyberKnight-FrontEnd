<template>
  <section>
    <div>
      <div class="flex relative">
        <div class="w-1/2">
          <div class="flex gap-2 items-center">
            <input type="text"
              class="w-2/6 h-10 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-muesli-200 mb-3 shadow-sm shadow-muesli-300 my-3 ms-4 text-center"
              placeholder="Tìm kiếm" />
            <div class="relative w-2/6">
              <select name="" id=""
                class="appearance-none w-full h-10 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-muesli-200 mb-3 shadow-sm shadow-muesli-300 my-3 text-center">
                <option value="">VIP</option>
                <option value="">Thường</option>
              </select>
              <div class="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                <ChevronDown class="w-5 h-5 text-gray-400" />
              </div>
            </div>
          </div>
        </div>

        <div class="w-1/2 flex justify-end px-4">
          <!-- Btn bật dialog -->
          <Button @click="isOpen = true"
            class="bg-white text-muesli-400 border border-muesli-400 hover:bg-muesli-400 hover:text-white px-4 my-3">
            Thêm
          </Button>
          <!-- Dialog Create Room Type -->
          <DialogCreateRoomType v-model:open="isOpen"></DialogCreateRoomType>
        </div>
      </div>
      <div class="shadow-lg px-4 pb-4 h-[622px]">
        <table class="w-full border border-gray-300 text-sm text-center bg-white">
          <thead class="bg-gradient-to-r from-muesli-200 to-muesli-400 text-white">
            <tr>
              <th class="px-4 py-2 border">Loại Phòng</th>
              <th class="px-4 py-2 border">Diện Tích</th>
              <th class="px-4 py-2 border">Giá</th>
              <th class="px-4 py-2 border">Lượng Người Ở</th>
              <th class="px-4 py-2 border">Tùy Chọn</th>
            </tr>
          </thead>
          <tbody class="text-gray-700">
            <tr class="hover:bg-muesli-100 transition odd:bg-white even:bg-gray-100" v-for="roomtype in roomtypes" :key="roomtype.id">
              <td class="py-2">{{ roomtype.name }}</td>
              <td class="py-2">{{ roomtype.size }}m²</td>
              <td class="py-2">{{ roomtype.price }}</td>
              <td class="py-2">{{ roomtype.peopleAbout }}</td>
              <td class="py-2 flex justify-center items-center gap-5 h-full">
                <button
                  class="bg-white text-muesli-400 border border-muesli-400 hover:bg-muesli-400 hover:text-white py-[9px] px-3 rounded-lg">
                  <LockKeyhole class="w-4 h-4" />
                </button>
                <Button @click="isOpenUpdate = true" class="bg-white text-muesli-400 border border-muesli-400 hover:bg-muesli-400 hover:text-white">
                  <SquarePen />
                </Button>
              </td>
            </tr>
          </tbody>
        </table>
        <div class="bg-white h-15 mb-4 shadow-lg flex items-center justify-end gap-2 px-5">
          <input type="text" class="w-12 h-8 border border-gray-300 rounded-sm text-center" disabled
            value="1" /><span>of 16</span>
          <button class="hover:bg-muesli-100 w-10 h-10 flex items-center justify-center rounded-4xl">
            <ChevronLeft />
          </button>
          <button class="hover:bg-muesli-100 w-10 h-10 flex items-center justify-center rounded-4xl">
            <ChevronRight />
          </button>
        </div>
      </div>
    </div>
  </section>
  <DialogUpdateRoomType v-model:open="isOpenUpdate"></DialogUpdateRoomType>
</template>
<script setup lang="ts">
import {
  ChevronDown,
  SquarePen,
  LockKeyhole,
  ChevronLeft,
  ChevronRight,
} from "lucide-vue-next";
import { ref, onMounted } from "vue";
import { Button } from "@/components/ui/button";
import DialogCreateRoomType from "@/components/administration/roomTypeDialog/CreateRoomTypeDialog.vue";
import DialogUpdateRoomType from "@/components/administration/roomTypeDialog/UpdateRoomTypeDialog.vue";
// import { Input } from '@/components/ui/input'
// import { Label } from '@/components/ui/label'
import { RoomType } from "@/api/roomtype";

const isOpen = ref(false);
const isAddRoomTypes = ref(false);
const isOpenUpdate = ref(false);
const { roomtype, roomtypes, getAllRoomType, isLoading } = RoomType();

onMounted( async () => {
  await getAllRoomType();
});
</script>
