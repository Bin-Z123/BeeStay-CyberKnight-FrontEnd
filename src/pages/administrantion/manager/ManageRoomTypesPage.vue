<template>
  <div v-if="isFetchingRoomTypes" class="flex justify-center items-center h-200 w-full space-x-1">
    <div class="loader"></div>
    <div>Đang tải dữ liệu...</div>
  </div>
  <div v-if="isPendingRoomTypes" class="flex justify-center items-center h-200 w-full space-x-1">
    <div class="loader"></div>
    <div>Đang chờ dữ liệu...</div>
  </div>
  <section v-if="!isFetchingRoomTypes && !isPendingRoomTypes">
    <div>
      <div class="flex relative">
        <div class="w-1/2">
          <div class="flex gap-2 items-center">
            <!-- <input type="text"
              class="w-2/6 h-10 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-muesli-200 mb-3 shadow-sm shadow-muesli-300 my-3 ms-4 text-center"
              placeholder="Tìm kiếm" /> -->
            <div class="relative w-2/6 mx-4" v-if="roomTypesStore.roomtypes">
              <select v-model="searchQuery"
                class="appearance-none w-full h-10 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-muesli-200 mb-3 shadow-sm shadow-muesli-300 my-3 text-center">
                <option value="">Tất cả</option>
                <option :value="roomtype.name" v-for="(roomtype, index) in roomTypesStore.roomtypes" :key="index">{{
                  roomtype.name }}</option>
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
              <th class="px-4 py-2 border">Mô Tả</th>
              <th class="px-4 py-2 border">Diện Tích</th>
              <th class="px-4 py-2 border">Giá</th>
              <th class="px-4 py-2 border">Lượng Người Ở</th>
              <th class="px-4 py-2 border">Số lượng phòng</th>
              <th class="px-4 py-2 border">Tùy Chọn</th>
            </tr>
          </thead>
          <tbody class="text-gray-700">
            <tr v-if="roomTypesStore.roomtypes" class="hover:bg-muesli-100 transition odd:bg-white even:bg-gray-100"
              v-for="(roomtype, index) in paginatedRoomTypes" :key="index">
              <td class="py-2">{{ roomtype?.name }}</td>
              <td class="py-2">{{ roomtype?.description == null ? "Không Có Mô Tả Nào" : roomtype?.description }}</td>
              <td class="py-2">{{ roomtype?.size }}m²</td>
              <td class="py-2">{{ roomtype?.price }}</td>
              <td class="py-2">{{ roomtype?.peopleAbout }}</td>
              <td class="py-2">{{ roomtype?.rooms?.length ?? 0 }}</td>
              <td class="py-2 flex justify-center items-center gap-5 h-full">
                <button v-if="roomtype" @click.prevent="handleDeleteRoomType(roomtype)"
                  class="hover:text-red-700 m-1.5 text-red-500">
                  <Trash2 />
                </button>
                <button v-if="roomtype" @click="openUpdateRoomType(roomtype)" class="text-blue-400 hover:text-blue-700">
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
  <div v-if="isFetchingRoomTypes"></div>
  <AsyncDialogUpdateRoomType v-else-if="selectedRoomType" v-model:open="isOpenUpdate" :roomtype="selectedRoomType">
  </AsyncDialogUpdateRoomType>
</template>
<script setup lang="ts">
import {
  ChevronDown,
  SquarePen,
  Trash2,
  ChevronLeft,
  ChevronRight,
} from "lucide-vue-next";
import { ref, onMounted, computed, watchEffect, toRaw, defineAsyncComponent } from "vue";
import { Button } from "@/components/ui/button";
import DialogCreateRoomType from "@/components/administration/roomTypeDialog/CreateRoomTypeDialog.vue";
import DialogUpdateRoomType from "@/components/administration/roomTypeDialog/UpdateRoomTypeDialog.vue";
import { RoomType } from "@/api/roomtype";
import {
  useGetRoomTypeList
} from "@/hook/useRoomType";

const isOpen = ref(false);
const isOpenUpdate = ref(false);
const roomTypesStore = RoomType();
const { isFetching: isFetchingRoomTypes, isPending: isPendingRoomTypes } = useGetRoomTypeList();

const AsyncDialogUpdateRoomType = defineAsyncComponent(() => import("@/components/administration/roomTypeDialog/UpdateRoomTypeDialog.vue"));


// Search
const searchQuery = ref("");
const filteredRoomTypes = computed(() => {
  if (!searchQuery.value) {
    // console.log('LOG: ')
    // console.log(roomTypes.value?.data?.data)
    return roomTypesStore.roomtypes;
  }
  return roomTypesStore.roomtypes.filter((roomtype: any) =>
    roomtype.name.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

const currentPage = ref(1);
const pageSize = ref(10);
const totalPages = computed(() => {
  if (filteredRoomTypes.value == null) return 0
  return Math.ceil(filteredRoomTypes.value.length / pageSize.value);
});

// const paginatedRoomTypes = computed(() => {
//   //   const startIndex = (currentPage.value) * pageSize.value;
//   //   const endIndex = startIndex + pageSize.value;
//   if (filteredRoomTypes.value) {
//     const data = toRaw(JSON.parse(JSON.stringify([...filteredRoomTypes.value])))
//     console.log(data)
//     return data;
//   }
//   else return []
// });


const paginatedRoomTypes = computed(() => {
  if (filteredRoomTypes.value) {
    const startIndex = (currentPage.value - 1) * pageSize.value;
    const endIndex = startIndex + pageSize.value;
    return filteredRoomTypes.value.slice(startIndex, endIndex);
  }
  return [];
});


const selectedRoomType = ref(null);
const openUpdateRoomType = async (roomtype: any) => {
  if (!roomtype) return
  selectedRoomType.value = { ...roomtype };
  isOpenUpdate.value = true;
}

const handleDeleteRoomType = async (roomtype: any) => {
  await roomTypesStore.deleteRoomType(roomtype.id);
  await roomTypesStore.getAllRoomType();
}

onMounted(async () => {
  await roomTypesStore.getAllRoomType();
  console.log(roomTypesStore.roomtypes)
  console.log('Computed:', paginatedRoomTypes.value)
});
watchEffect(() => {
  if (currentPage.value > totalPages.value) {
    currentPage.value = totalPages.value || 1;
  }
});

</script>
