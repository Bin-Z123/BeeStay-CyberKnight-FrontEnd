<template>
  <section>
    <div class="flex">
      <div class="w-1/2">
        <div class="flex gap-2 items-center">
          <VueDatePicker :format-locale="vi" v-model="dateS" :format="'dd-MM-yyyy'" :select-text="'Chọn'" range
            multi-calendars :min-date="new Date()" :cancel-text="'Hủy'"
            class="w-2/6 h-10  border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-muesli-200 mb-3  my-3 ms-4 text-center" />
          <!-- <label class="text-muesli-400 mx-4 font-medium">Đến</label>
          <VueDatePicker :format-locale="vi" v-model="dateE" :format="'dd-MM-yyyy'" :select-text="'Chọn'"
            :cancel-text="'Hủy'"
            class="w-2/6 h-10  border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-muesli-200 mb-3  my-3 ms-4 text-center" /> -->
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

      <div class="w-1/2">
        <div class="h-15 mb-4 flex items-center justify-end gap-2 px-5">
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

    <div class="flex justify-center gap-2" v-for="(rooms, floor) in groupedByFloor" :key="floor">
      <div
        class="w-35 h-40 bg-muesli-200 [clip-path:polygon(0%_25%,50%_0%,100%_25%,100%_75%,50%_100%,0%_75%)] flex items-center justify-center">
        <h1 class="text-muesli-800 font-bold text-2xl">Tầng {{ floor }}</h1>
      </div>

      <div class="grid grid-cols-7 gap-2 max-w-[1050px] justify-center relative">
        <div v-for="(room, index) in rooms.slice(0, 14)" :key="room.id" class="w-[140px]"
          :class="{ '-ml-[74px] -mt-10': index >= 7 }">
          <div @contextmenu.prevent="openContextMenu($event, room)" :data-id="room.id" tabindex="0"
            :class="[`status-${room.roomStatus.toLowerCase()}`, `${room.roomStatus == 'FIX' ? 'cursor-not-allowed' : ''}`]"
            class="h-40 bg-white hover:brightness-90  hover:bg-gray-200  flex justify-center items-center [clip-path:polygon(0%_25%,50%_0%,100%_25%,100%_75%,50%_100%,0%_75%)]">
            <div class="flex flex-col items-center p-4">
              <h1 class=" font-bold text-lg">{{ room.roomNumber }}</h1>
              <!-- <h1>{{ room.roomType.name }}</h1>
              <h1>{{ room.roomType.peopleAbout }} Người</h1> -->
            </div>
          </div>
        </div>

      </div>
    </div>
    <div v-if="menu.isOpen" class="absolute bg-white border rounded-xs shadow-md z-50 w-48 "
      :style="{ top: menu.y + 'px', left: menu.x + 'px' }">
      <p class="bg-muesli-100/50 px-4 py-2 font-bold text-muesli-400">Phòng {{ menu.data.roomNumber }}
      </p>
      <button class="w-full text-left px-4 py-2 hover:bg-gray-100" @click="openNewBookingDialog()">
        Đặt phòng mới
      </button>
      <button class="w-full text-left px-4 py-2 hover:bg-gray-100">Xác nhận đặt phòng</button>
      <button class="w-full text-left px-4 py-2 hover:bg-gray-100">Trả phòng</button>
      <button class="w-full text-left px-4 py-2 hover:bg-gray-100">Gia hạn phòng</button>


      <hr>
      <button class="w-full  text-left px-4 py-2 hover:bg-gray-100">
        Hủy phòng
      </button>
    </div>
    <NewBookingDialog v-model:open="isOpenBooking" :bookingRoom="menu.data" />
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
import { computed, onMounted, reactive, ref, watch } from "vue";
import NewBookingDialog from "@/components/administration/BookingDialog/NewBookingDialog.vue";
import { Button } from "@/components/ui/button";
import { useMockRooms } from "./mockRoom";
import { vi } from "date-fns/locale";
import { format } from "path";
import { RoomAPI } from "@/api/room";

const roomStore = RoomAPI();
const mockRoomData = useMockRooms();

const isOpen = ref(false);
const isOpenBooking = ref(false);
const menu = reactive({
  x: 0,
  y: 0,
  isOpen: false,
  data: {} as Room,
});

const openContextMenu = (e: MouseEvent, i: Room) => {
  const pageRect = document.body.getBoundingClientRect();
  menu.x = e.clientX - pageRect.left;
  menu.y = e.clientY - pageRect.top;
  e.preventDefault();
  menu.isOpen = true;
  menu.data = i;
};
window.addEventListener("click", () => {
  menu.isOpen = false;
});

interface Room {
  id: number;
  roomNumber: string;
  roomStatus: string;
  floor: number;
  roomType: {
    id: number;
    name: string;
    size: number;
    price: number;
    peopleAbout: number;
  };
  roomImages: {
    id: number;
    url: string;
    altext: string;
    isThum: boolean;
  }[];
}
onMounted(async () => {
  await roomStore.getAllRooms();
  console.log("getAllRooms: ", roomStore.listRooms);

  const startDate = new Date();
  const endDate = new Date(new Date().setDate(startDate.getDate() + 1));
  dateS.value = [startDate, endDate];
  console.log("dateS: ", dateS.value[0]);
})

const rawRoomData = computed(() => roomStore.listRooms)
const groupedByFloor = computed(() => {
  const grouped: Record<number, Room[]> = {};

  rawRoomData.value.forEach((room) => {
    if (!grouped[room.floor]) {
      grouped[room.floor] = [];
    }
    grouped[room.floor].push(room);
  })
  return grouped;
})

const dateS = ref([] as Date[]);

onMounted(() => {

})

// const dateE = computed(() => {
//   const newDate = new Date(dateS.value);
//   newDate.setDate(newDate.getDate() + 1);
//   return newDate;
// })
// Mở new Booking Dialog
const openNewBookingDialog = () => {
  isOpenBooking.value = true;
  console.log("openNewBookingDialog: ", menu.data);
}


</script>