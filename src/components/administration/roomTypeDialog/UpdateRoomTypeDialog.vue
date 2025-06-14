<template>
  <Dialog :open="open" @update:open="emit('update:open', $event)">
    <DialogContent class="sm:max-w-[425px]" @pointer-down-outside.prevent @escape-key-down.prevent>
      <form action="" class="flex flex-col gap-3">
        <DialogHeader>
          <DialogTitle class="font-bold text-muesli-400">Cập Nhật Loại Phòng</DialogTitle>
          <hr class="text-muesli-400 bg-muesli-400 h-[2px]" />
        </DialogHeader>
        <div>
          <label class="text-muesli-400">Loại Phòng</label><br />
          <input type="text" v-model="localRoomType.name"
            class="w-full h-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-muesli-200 shadow-sm shadow-muesli-300 px-5 text-center"
            placeholder="Nhập loại phòng" />
        </div>
        <div>
          <label class="text-muesli-400">Diện Tích</label><br />
          <input type="text" v-model="localRoomType.size"
            class="w-full h-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-muesli-200 shadow-sm shadow-muesli-300 px-5 text-center"
            placeholder="Nhập diện tích" />
        </div>
        <div>
          <label class="text-muesli-400">Giá</label><br />
          <input type="text" v-model="localRoomType.price"
            class="w-full h-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-muesli-200 shadow-sm shadow-muesli-300 px-5 text-center"
            placeholder="Nhập giá" />
        </div>
        <div>
          <label class="text-muesli-400">Số Lượng Người Ở</label><br />
          <input type="text" v-model="localRoomType.peopleAbout"
            class="w-full h-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-muesli-200 shadow-sm shadow-muesli-300 px-5 text-center"
            placeholder="Nhập số lượng người ở" />
        </div>
        <DialogFooter>
          <button @click="handleUpdateRoomType" type="button" class="bg-muesli-400 hover:bg-muesli-600 text-white px-3 py-2 rounded-sm">
            Lưu
          </button>
        </DialogFooter>
      </form>
    </DialogContent>
  </Dialog>
</template>
<script setup lang="ts">
import {
  ChevronDown,
  SquarePen,
  LockKeyhole,
  ChevronLeft,
  ChevronRight,
} from "lucide-vue-next";
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
const props = defineProps<{
  open: boolean;
  roomtype: any;
}>();
import { RoomType } from "@/api/roomtype";
const roomTypes = RoomType();

import { ref, watch } from "vue";
const localRoomType = ref({ ...props.roomtype });

watch(() => props.roomtype, (newVal) => {
  if (newVal) localRoomType.value = { ...newVal };
}, { immediate: true });

const handleUpdateRoomType = async () => {
  await roomTypes.updateRoomType(localRoomType.value);
  await roomTypes.getAllRoomType();
  emit("update:open", false);
}
</script>
