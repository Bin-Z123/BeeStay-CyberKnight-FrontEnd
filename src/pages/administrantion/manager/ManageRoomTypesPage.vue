<template>
  <section>
    <div>
      <div class="flex relative">
        <div class="w-1/2">
          <div class="flex gap-2 items-center">
            <!-- <input type="text"
              class="w-2/6 h-10 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-muesli-200 mb-3 shadow-sm shadow-muesli-300 my-3 ms-4 text-center"
              placeholder="Tìm kiếm" /> -->
            <div class="relative w-2/6 mx-4">
              <select v-model="searchQuery"
                class="appearance-none w-full h-10 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-muesli-200 mb-3 shadow-sm shadow-muesli-300 my-3 text-center">
                <option value="">Tất cả</option>
                <option :value="roomtype.name" v-for="roomtype in roomTypes.roomtypes" :key="roomtype.id">{{ roomtype.name }}</option>
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
      <div class="px-4 pb-4 h-[622px]">
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
            <tr class="hover:bg-muesli-100 transition odd:bg-white even:bg-gray-100"
              v-for="roomtype in paginatedRoomTypes" :key="roomtype.id">
              <td class="py-2">{{ roomtype.name }}</td>
              <td class="py-2">{{ roomtype.size }}m²</td>
              <td class="py-2">{{ roomtype.price }}</td>
              <td class="py-2">{{ roomtype.peopleAbout }}</td>
              <td class="py-2 flex justify-center items-center gap-5 h-full">
                <button @click.prevent="handleDeleteRoomType(roomtype)"
                  class="hover:text-red-700 m-1.5 text-red-500">
                  <Trash2 />
                </button>
                <button @click="openUpdateRoomType(roomtype)"
                  class="text-blue-400 hover:text-blue-700">
                  <SquarePen />
                </button>
              </td>
            </tr>
          </tbody>
        </table>
        <div class="bg-white h-15 mb-4 shadow-lg flex items-center justify-end gap-2 px-5">
          <input type="text" class="w-12 h-8 border border-gray-300 rounded-sm text-center" disabled
            :value="currentPage" /><span>of {{ totalPages }}</span>
          <button @click="currentPage--" :disabled="currentPage == 1"
            class="hover:bg-muesli-100 w-10 h-10 flex items-center justify-center rounded-4xl">
            <ChevronLeft />
          </button>
          <button @click="currentPage++" :disabled="currentPage == totalPages"
            class="hover:bg-muesli-100 w-10 h-10 flex items-center justify-center rounded-4xl">
            <ChevronRight />
          </button>
        </div>
      </div>
    </div>
  </section>
  <DialogUpdateRoomType v-model:open="isOpenUpdate" :roomtype="selectedRoomType"></DialogUpdateRoomType>
</template>
<script setup lang="ts">
import {
  ChevronDown,
  SquarePen,
  Trash2 ,
  ChevronLeft,
  ChevronRight,
} from "lucide-vue-next";
import { ref, onMounted, computed, watchEffect } from "vue";
import { Button } from "@/components/ui/button";
import DialogCreateRoomType from "@/components/administration/roomTypeDialog/CreateRoomTypeDialog.vue";
import DialogUpdateRoomType from "@/components/administration/roomTypeDialog/UpdateRoomTypeDialog.vue";
import { RoomType } from "@/api/roomtype";

const isOpen = ref(false);
const isOpenUpdate = ref(false);
const roomTypes = RoomType();

// Search
const searchQuery = ref("");
const filteredRoomTypes = computed(() => {
  if (!searchQuery.value) {
    return roomTypes.roomtypes;
  }
  return roomTypes.roomtypes.filter((roomtype) =>
    roomtype.name.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

const currentPage = ref(1);
const pageSize = ref(10);
const totalPages = computed(() => {
  return Math.ceil(filteredRoomTypes.value.length / pageSize.value);
});
const paginatedRoomTypes = computed(() => {
  const startIndex = (currentPage.value - 1) * pageSize.value;
  const endIndex = startIndex + pageSize.value;
  return filteredRoomTypes.value.slice(startIndex, endIndex);
});

const selectedRoomType = ref(null);
const openUpdateRoomType = async (roomtype: any) => {
  selectedRoomType.value = {...roomtype};
  isOpenUpdate.value = true;
}

const handleDeleteRoomType = async (roomtype: any) => {
  await roomTypes.deleteRoomType(roomtype.id);
  await roomTypes.getAllRoomType();
}

onMounted(async () => {
  await roomTypes.getAllRoomType();
});
</script>
