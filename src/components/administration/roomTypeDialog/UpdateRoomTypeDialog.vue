<template>
  <!-- <div v-if="isFetchingRoomTypeInfo">Loading....</div> -->
  <Dialog :open="open" @update:open="emit('update:open', $event)">
    <DialogContent class="sm:max-w-[425px]">
      <form action="" class="flex flex-col gap-3">
        <DialogDescription>
        </DialogDescription>
        <DialogHeader>
          <DialogTitle class="font-bold text-muesli-400">Cập Nhật Loại Phòng</DialogTitle>
          <hr class="text-muesli-400 bg-muesli-400 h-[2px]" />
        </DialogHeader>
        <div v-if="isFetchingRoomTypeInfo" class="h-96 flex justify-center items-center space-x-1">
          <div class="loader"></div>
          <div>Đang tải dữ liệu...</div>
        </div>
        <div v-else>
          <div>{{ roomTypeInfo.name }}</div>
          <div>
            <label class="text-muesli-400">Loại Phòng</label>
            <input type="text" v-model="localRoomType.name" :class="[
              'w-full h-10 rounded-lg focus:outline-none px-5 text-center shadow-sm',
              errors.name
                ? 'border-red-500 ring-2 ring-red-300 shadow-red-200'
                : 'border-gray-300 focus:ring-2 focus:ring-muesli-200 shadow-muesli-300'
            ]" placeholder="Nhập loại phòng" />
            <p v-if="errors.name" class="text-red-500 text-sm mt-1">{{ errors.name }}</p>
          </div>
          <div>
            <label class="text-muesli-400">Mô Tả</label>
            <textarea type="text" v-model="localRoomType.description" :class="[
              'w-full h-20 py-2 rounded-lg focus:outline-none px-5 text-center shadow-sm',
              errors.description
                ? 'border-red-500 ring-2 ring-red-300 shadow-red-200'
                : 'border-gray-300 focus:ring-2 focus:ring-muesli-200 shadow-muesli-300'
            ]" placeholder="Mô tả về loại phòng"></textarea>
            <p v-if="errors.description" class="text-red-500 text-sm mt-1">{{ errors.description }}</p>
          </div>
          <div>
            <label class="text-muesli-400">Diện Tích(m2)</label>
            <input type="text" v-model="localRoomType.size" :class="[
              'w-full h-10 rounded-lg focus:outline-none px-5 text-center shadow-sm',
              errors.size
                ? 'border-red-500 ring-2 ring-red-300 shadow-red-200'
                : 'border-gray-300 focus:ring-2 focus:ring-muesli-200 shadow-muesli-300']" />
            <p v-if="errors.size" class="text-red-500 text-sm mt-1">{{ errors.size }}</p>
          </div>
          <div>
            <label class="text-muesli-400">Giá</label>
            <input type="text" v-model="localRoomType.price" :class="[
              'w-full h-10 rounded-lg focus:outline-none px-5 text-center shadow-sm',
              errors.price
                ? 'border-red-500 ring-2 ring-red-300 shadow-red-200'
                : 'border-gray-300 focus:ring-2 focus:ring-muesli-200 shadow-muesli-300']" />
            <p v-if="errors.price" class="text-red-500 text-sm mt-1">{{ errors.price }}</p>
          </div>
          <div>
            <label class="text-muesli-400">Số Lượng Người Ở</label>
            <input type="text" v-model="localRoomType.peopleAbout" :class="[
              'w-full h-10 rounded-lg focus:outline-none px-5 text-center shadow-sm',
              errors.peopleAbout
                ? 'border-red-500 ring-2 ring-red-300 shadow-red-200'
                : 'border-gray-300 focus:ring-2 focus:ring-muesli-200 shadow-muesli-300']" />
            <p v-if="errors.peopleAbout" class="text-red-500 text-sm mt-1">{{ errors.peopleAbout }}</p>
          </div>
        </div>
        <DialogFooter>
          <button @click="handleUpdateRoomType" type="button"
            class="bg-muesli-400 hover:bg-muesli-600 text-white px-3 py-2 rounded-sm">
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
import { useGetRoomTypeInfo } from "@/hook/useRoomType";

const emit = defineEmits<{
  (e: "update:open", value: boolean): void;
}>();
const props = defineProps<{
  open: boolean;
  roomtype: any;
}>();
import { RoomType } from "@/api/roomtype";
const roomTypes = RoomType();

import { computed, onMounted, ref, toRef, watch } from "vue";
const localRoomType = ref({ ...props.roomtype });

watch(() => props.roomtype, (newVal) => {
  if (newVal) {
    localRoomType.value = { ...newVal }
  };
}, { immediate: true });
const reactiveRoomTypeId = computed(() => localRoomType.value.id);
const isOpen = toRef(props, "open");
const { data: roomTypeInfo, isFetching: isFetchingRoomTypeInfo } = useGetRoomTypeInfo(reactiveRoomTypeId, isOpen);
onMounted(() => {
  // console.log(roomTypeInfo.value);
  // console.log("RoomType Info")
  // console.log(props.roomtype)

})



const errors = ref({
  name: "",
  size: "",
  price: "",
  peopleAbout: "",
  description: "",
});

const validateForm = () => {
  let isValid = true;
  errors.value = {
    name: "",
    size: "",
    price: "",
    peopleAbout: "",
    description: "",
  };
  const r = localRoomType.value;
  if (!r.name || r.name.trim() === "") {
    errors.value.name = "Vui lòng nhập loại phòng";
    isValid = false;
  }
  if (r.size == null || r.size < 1) {
    errors.value.size = "Vui lòng nhập lại diện tích hợp lệ";
    isValid = false;
  }
  if (r.price == null || r.price < 0) {
    errors.value.price = "Vui lòng nhập lại giá hợp lệ";
    isValid = false;
  }
  if (r.peopleAbout == null || r.peopleAbout < 1) {
    errors.value.peopleAbout = "Vui lòng nhập số lượng người ở hợp lệ";
    isValid = false;
  }
  if (!r.description || r.description.trim() === "") {
    errors.value.description = "Vui nhập mô tả hợp lệ";
    isValid = false;
  }
  return isValid;
};

const handleUpdateRoomType = async () => {
  if (!validateForm()) return;
  await roomTypes.updateRoomType(localRoomType.value);
  await roomTypes.getAllRoomType();
  emit("update:open", false);
}
</script>
