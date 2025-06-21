<template>
  <Dialog :open="open" @update:open="emit('update:open', $event)">
    <DialogContent class="sm:max-w-[425px]" @pointer-down-outside.prevent @escape-key-down.prevent>
      <form action="" class="flex flex-col gap-3">
        <DialogHeader>
          <DialogTitle class="font-bold text-muesli-400">Thêm Loại Phòng Mới</DialogTitle>
          <hr class="text-muesli-400 bg-muesli-400 h-[2px]" />
        </DialogHeader>
        <div>
          <label class="text-muesli-400">Loại Phòng</label>
          <input type="text" v-model="roomTypes.roomtype.name" :class="[
            'w-full h-10 rounded-lg focus:outline-none px-5 text-center shadow-sm',
            errors.name
              ? 'border-red-500 ring-2 ring-red-300 shadow-red-200 text-red-600'
              : 'border-gray-300 focus:ring-2 focus:ring-muesli-200 shadow-muesli-300'
          ]" placeholder="Nhập loại phòng" />
          <p v-if="errors.name" class="text-red-500 text-sm mt-1">{{ errors.name }}</p>
        </div>
        <div>
          <label class="text-muesli-400">Diện Tích(m2)</label>
          <input type="text" v-model="roomTypes.roomtype.size" :class="[
            'w-full h-10 rounded-lg focus:outline-none px-5 text-center shadow-sm',
            errors.size
              ? 'border-red-500 ring-2 ring-red-300 shadow-red-200 text-red-600'
              : 'border-gray-300 focus:ring-2 focus:ring-muesli-200 shadow-muesli-300'
          ]" placeholder="Nhập loại phòng" />
          <p v-if="errors.size" class="text-red-500 text-sm mt-1">{{ errors.size }}</p>
        </div>
        <div>
          <label class="text-muesli-400">Giá</label>
          <input type="text" v-model="roomTypes.roomtype.price" :class="[
            'w-full h-10 rounded-lg focus:outline-none px-5 text-center shadow-sm',
            errors.price
              ? 'border-red-500 ring-2 ring-red-300 shadow-red-200 text-red-600'
              : 'border-gray-300 focus:ring-2 focus:ring-muesli-200 shadow-muesli-300'
          ]" placeholder="Nhập loại phòng" />
          <p v-if="errors.price" class="text-red-500 text-sm mt-1">{{ errors.price }}</p>
        </div>
        <div>
          <label class="text-muesli-400">Số Lượng Người Ở</label>
          <input type="text" v-model="roomTypes.roomtype.peopleAbout" :class="[
            'w-full h-10 rounded-lg focus:outline-none px-5 text-center shadow-sm',
            errors.peopleAbout
              ? 'border-red-500 ring-2 ring-red-300 shadow-red-200 text-red-600'
              : 'border-gray-300 focus:ring-2 focus:ring-muesli-200 shadow-muesli-300'
          ]" placeholder="Nhập loại phòng" />
          <p v-if="errors.peopleAbout" class="text-red-500 text-sm mt-1">{{ errors.peopleAbout }}</p>
        </div>
        <DialogFooter>
          <button @click="handleCreateRoomType" type="button"
            class="bg-muesli-400 hover:bg-muesli-600 text-white px-3 py-2 rounded-sm">
            Tạo
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
import { ref } from "vue";
import { RoomType } from "@/api/roomtype";
const roomTypes = RoomType();

const errors = ref({
  name: "",
  size: "",
  price: "",
  peopleAbout: "",
});

const validateForm = () => {
  let isValid = true;
  errors.value = {
    name: "",
    size: "",
    price: "",
    peopleAbout: "",
  };
  const r = roomTypes.roomtype;
  if (!r.name || r.name.trim() === "") {
    errors.value.name = "Vui lòng nhập loại phòng hợp lệ";
    isValid = false;
  }
  if (r.size == null || r.size < 1) {
    errors.value.size = "Vui lòng nhập diện tích hợp lệ";
    isValid = false;
  }
  if (r.price == null || r.price < 0) {
    errors.value.price = "Vui lòng nhập giá hợp lệ";
    isValid = false;
  }
  if (r.peopleAbout == null || r.peopleAbout < 1) {
    errors.value.peopleAbout = "Vui lòng nhập số lượng người ở hợp lệ";
    isValid = false;
  }
  return isValid;
};
const handleCreateRoomType = async () => {
  if (!validateForm()) return;
  await roomTypes.createRoomType(roomTypes.roomtype);
  await roomTypes.getAllRoomType();
  emit("update:open", false);
};

</script>
