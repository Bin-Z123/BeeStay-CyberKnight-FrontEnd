<template>
  <Dialog :open="open" @update:open="emit('update:open', $event)">
    <DialogContent class="sm:max-w-[425px]" @pointer-down-outside.prevent @escape-key-down.prevent>
      <form action="" class="flex flex-col gap-3">
        <DialogHeader>
          <DialogTitle class="font-bold text-muesli-400">Thêm Loại Phòng Mới</DialogTitle>
          <hr class="text-muesli-400 bg-muesli-400 h-[2px]" />
        </DialogHeader>
        <div>
          <label class="text-muesli-400">Loại Phòng</label><br />
          <input type="text" v-model="roomTypes.roomtype.name"
            class="w-full h-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-muesli-200 shadow-sm shadow-muesli-300 px-5 text-center"
            placeholder="Nhập loại phòng" />
        </div>
        <div>
          <label class="text-muesli-400">Diện Tích</label><br />
          <input type="text" v-model="roomTypes.roomtype.size"
            class="w-full h-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-muesli-200 shadow-sm shadow-muesli-300 px-5 text-center"
            placeholder="Nhập diện tích" />
        </div>
        <div>
          <label class="text-muesli-400">Giá</label><br />
          <input type="text" v-model="roomTypes.roomtype.price"
            class="w-full h-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-muesli-200 shadow-sm shadow-muesli-300 px-5 text-center"
            placeholder="Nhập giá" />
        </div>
        <div>
          <label class="text-muesli-400">Số Lượng Người Ở</label><br />
          <input type="text" v-model="roomTypes.roomtype.peopleAbout"
            class="w-full h-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-muesli-200 shadow-sm shadow-muesli-300 px-5 text-center"
            placeholder="Nhập số lượng người ở" />
        </div>
        <DialogFooter>
          <button @click="handleCreateRoomType" type="button" class="bg-muesli-400 hover:bg-muesli-600 text-white px-3 py-2 rounded-sm">
            Lưu
          </button>
        </DialogFooter>
      </form>
    </DialogContent>
  </Dialog>
</template>
<script setup lang="ts">
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
const emit = defineEmits<{
  (e: "update:open", value: boolean): void;
}>();
defineProps<{
  open: boolean;
}>();
import { RoomType } from "@/api/roomtype";
const roomTypes = RoomType();

const handleCreateRoomType = async () => {
  await roomTypes.createRoomType(roomTypes.roomtype);
  await roomTypes.getAllRoomType();
  emit("update:open", false);
}
</script>
