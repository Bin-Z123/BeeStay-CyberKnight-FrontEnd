<template>
  <div v-if="isFetchingRooms" class="flex justify-center items-center h-200 w-full space-x-1">
    <div class="loader"></div>
    <div>Đang tải dữ liệu...</div>
  </div>
  <section v-else>
    <div>
      <div class="flex relative">
        <div class="w-1/2">
          <div class="flex gap-2 items-center">
            <input type="text" v-model="selectedRoomByNumber"
              class="w-2/6 h-10 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-muesli-200 mb-3 shadow-sm shadow-muesli-300 my-3 ms-4 text-center"
              placeholder="Tìm kiếm" />
            <div class="relative w-2/6">
              <select v-model="selectedRoom"
                class="appearance-none w-full h-10 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-muesli-200 mb-3 shadow-sm shadow-muesli-300 my-3 text-center">
                <option value="">Tất Cả</option>
                <option :value="roomtype.name" v-for="roomtype in roomTypeStore.roomtypes" :key="roomtype.id">{{
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
          <DialogCreateRoom v-model:open="isOpen" :roomTypes="roomTypeStore.roomtypes"></DialogCreateRoom>
        </div>
      </div>
      <div class="shadow-lg px-4 pb-4 h-[622px]">
        <table class="w-full border border-gray-300 text-sm text-center bg-white">
          <thead class="bg-gradient-to-r from-muesli-200 to-muesli-400 text-white">
            <tr>
              <th class="px-4 py-2 border">Số Phòng</th>
              <th class="px-4 py-2 border">Loại Phòng</th>
              <th class="px-4 py-2 border">Tầng</th>
              <th class="px-4 py-2 border">Trạng Thái</th>
              <th class="px-4 py-2 border">Tùy Chọn</th>
            </tr>
          </thead>
          <tbody class="text-gray-700">
            <tr class="hover:bg-muesli-100 transition odd:bg-white even:bg-gray-100" v-for="room in paginatedRooms"
              :key="room.id">
              <td class="py-2">{{ room.roomNumber }} ({{ room.roomImages.length ?? 0 }})</td>
              <td class="py-2">{{ room.roomType.name }}</td>
              <td class="py-2">{{ room.floor }}</td>
              <td class="py-2" :class="getStatus(room.roomStatus)">{{ getNameStatus(room.roomStatus) }}
              </td>
              <td class="py-2 flex justify-center items-center gap-5 h-full">
                <button
                  class="bg-white text-muesli-400 border border-muesli-400 hover:bg-muesli-400 hover:text-white py-[9px] px-3 rounded-lg">
                  <LockKeyhole class="w-4 h-4" />
                </button>
                <Button class="bg-white text-muesli-400 border border-muesli-400 hover:bg-muesli-400 hover:text-white"
                  @click="openDialog(room)">
                  <SquarePen />
                </Button>
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
    <DialogUpdateRoom v-model:open="isUpdateRoom" :room="selectForm" :roomTypes="roomTypeStore.roomtypes">
    </DialogUpdateRoom>
  </section>
</template>
<script setup lang="ts">
import {
  ChevronDown,
  SquarePen,
  LockKeyhole,
  ChevronLeft,
  ChevronRight,
} from "lucide-vue-next";
import { onMounted, ref, computed } from "vue";
import { Button } from "@/components/ui/button";
import DialogCreateRoom from "@/components/administration/RoomDialog/CreateRoomDialog.vue";
import DialogUpdateRoom from "@/components/administration/RoomDialog/UpdateRoomDialog.vue";
import { Rooms } from "@/components/administration/RoomDialog/Room";
import { RoomAPI } from "@/api/room";
import { RoomType } from "@/api/roomtype";
import { useGetRoomList } from "@/hook/useRoom";

const { data: roomsList, isFetching: isFetchingRooms, isPending: isPendingRooms } = useGetRoomList();
const { rooms } = Rooms();
const roomStore = RoomAPI();
const roomTypeStore = RoomType();
// import { Input } from '@/components/ui/input'
// import { Label } from '@/components/ui/label'
const isOpen = ref(false);
const isUpdateRoom = ref(false);
const selectForm = ref({
  id: 0,
  roomNumber: "",
  roomStatus: "",
  floor: 0,
  roomType: {
    id: 0,
    name: "",
    size: 0,
    price: 0,
    peopleAbout: 0,
  },
  roomImages: [],
  deletedRoomImageIds: [],
});
const openDialog = async (room: any) => {
  isUpdateRoom.value = true;
  selectForm.value = room;
};

// Search
const selectedRoom = ref('');
const selectedRoomByNumber = ref('');
const listRooms = computed(() => roomStore.listRooms || []);

const filteredRooms = computed(() => {
  return listRooms.value.filter((room) => {
    const matchType = selectedRoom.value === '' || room.roomType.name.toLowerCase().includes(selectedRoom.value.toLowerCase());
    const matchNumber = selectedRoomByNumber.value === '' || room.roomNumber.toLowerCase().includes(selectedRoomByNumber.value.toLowerCase());
    return matchType && matchNumber;
  });
})

const currentPage = ref(1);
const pageSize = ref(10);
const totalPages = computed(() => {
  return Math.ceil(filteredRooms.value.length / pageSize.value);
});
const paginatedRooms = computed(() => {
  const startIndex = (currentPage.value - 1) * pageSize.value;
  const endIndex = startIndex + pageSize.value;
  return filteredRooms.value.slice(startIndex, endIndex);
});

const getStatus = (status: String) => {
  switch (status) {
    case 'ACTIVE':
      return "text-red-500";
    case 'INACTIVE':
      return "text-green-400";
    case 'FIX':
      return "text-yellow-500";
    default:
      return "";
  }
};

const getNameStatus = (status: String) => {
  switch (status) {
    case 'ACTIVE':
      return "Đang sử dụng";
    case 'INACTIVE':
      return "Trống";
    case 'FIX':
      return "Đang sửa chữa";
    default:
      return "";
  }
};

// Lấy danh sách phòng
onMounted(async () => {
  await roomStore.getAllRooms();
  await roomTypeStore.getAllRoomType();
  console.log("Danh sách loại phòng:", roomTypeStore.roomtypes);
});
</script>
