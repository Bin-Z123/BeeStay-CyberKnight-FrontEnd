<template>
  <Dialog :open="open" @update:open="emit('update:open', $event)">
    <DialogContent class="sm:max-w-[1400px]" @pointer-down-outside.prevent>
      <div
        v-if="isFetchingRoom"
        class="h-96 flex justify-center items-center space-x-1"
      >
        <div class="loader"></div>
        <div>Đang tải dữ liệu...</div>
      </div>
      <div v-else class="grid grid-cols-4 gap-4">
        <form action="" class="flex flex-col gap-3">
          <DialogHeader>
            <DialogTitle class="font-bold text-muesli-400"
              >Cập Nhật Phòng {{ roomProfile.roomNumber }}
            </DialogTitle>
            <hr class="text-muesli-400 bg-muesli-400 h-[2px]" />
          </DialogHeader>

          <div>
            <div>
              <label class="text-muesli-400">Số Phòng</label><br />
              <input
                type="text"
                class="w-full h-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-muesli-200 shadow-sm disabled:bg-gray-100 disabled:shadow-gray-300 shadow-muesli-300 px-5 text-center"
                placeholder="Nhập số phòng"
                v-model="roomData.roomNumber"
              />
            </div>
            <div>
              <label class="text-muesli-400">Tầng</label><br />
              <input
                type="number"
                class="w-full h-10 border border-gray-300 rounded-lg disabled:bg-gray-100 disabled:shadow-gray-300 focus:outline-none focus:ring-2 focus:ring-muesli-200 shadow-sm shadow-muesli-300 px-5 text-center"
                v-model="roomData.floor"
                disabled
              />
            </div>
            <div>
              <label class="text-muesli-400">Loại Phòng</label><br />
              <div class="relative">
                <select
                  v-model="roomData.roomType.id"
                  @change="selectRoomType"
                  name=""
                  id=""
                  class="appearance-none w-full h-10 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-muesli-200 shadow-sm shadow-muesli-300 text-center"
                >
                  <option
                    v-for="roomType in roomTypesData"
                    :key="roomType.id"
                    :value="roomType.id"
                  >
                    {{ roomType.name }}
                  </option>
                </select>
                <div
                  class="absolute inset-y-0 right-3 flex items-center pointer-events-none"
                >
                  <ChevronDown class="w-5 h-5 text-gray-400" />
                </div>
              </div>
            </div>
            <div>
              <label class="text-muesli-400">Trạng Thái</label><br />
              <div class="relative">
                <select
                  v-model="roomData.roomStatus"
                  name=""
                  id=""
                  class="appearance-none w-full h-10 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-muesli-200 shadow-sm shadow-muesli-300 text-center"
                >
                  <option value="INACTIVE" selected>Đang sử dụng</option>
                  <option value="FIX">Đang bảo trì</option>
                </select>
                <div
                  class="absolute inset-y-0 right-3 flex items-center pointer-events-none"
                >
                  <ChevronDown class="w-5 h-5 text-gray-400" />
                </div>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button
              :disabled="isLoading"
              @click.prevent="onSubmitUpdateRoom"
              type="submit"
              class="bg-muesli-400 flex items-center justify-center hover:bg-muesli-600 text-white px-3 py-2 rounded-sm disabled:opacity-100 disabled:cursor-not-allowed disabled:hover:bg-muesli-400"
            >
              <span v-if="isLoading" class="items-center justify-center flex">
                <LoaderCircle class="animate-spin" /><span>Đang lưu</span>
              </span>
              <span v-else>Lưu</span>
            </Button>
            <!-- <img :src="imageUrl + '/home-1.1_x5mdyb.jpg'" alt="ảnh 1" /> -->
          </DialogFooter>
        </form>
        <div
          class="col-span-3 w-full h-[500px] rounded-sm shadow-muesli-200 m-2 shadow-sm overflow-scroll scrollbar-hidden p-2 grid grid-cols-4 gap-2"
        >
          <!-- Upload ảnh -->
          <label
            for="image-upload"
            class="rounded-sm w-60 h-60 flex flex-col items-center justify-center outline-2 outline-dashed outline-muesli-400 hover:bg-gray-100"
            tabindex="0"
            :class="{ 'bg-gray-100': isDraging }"
            @drop.prevent="onDrop"
            @dragover.prevent="onDragover"
            @dragenter="isDraging = true"
            @dragleave="isDraging = false"
          >
            <ImageUp class="size-10 stroke-2"></ImageUp>
            <p class="truncate w-58 text-center">Tải ảnh lên</p>
            <input
              class="hidden"
              type="file"
              name=""
              id="image-upload"
              accept="image/*"
              multiple
              @change="onFileChange"
            />
          </label>
          <div
            v-for="(fileImg, index) in imagePreview"
            :key="index"
            class="rounded-sm w-60 h-60 flex flex-col items-center justify-center focus:bg-muesli-200 group shadow-sm"
            tabindex="0"
          >
            <div class="relative overflow-hidden w-56 h-56 rounded-sm group">
              <img
                :src="fileImg.src"
                alt=""
                class="object-center object-cover h-full w-full rounded-sm hover:scale-110 transition-all duration-300"
              />
              <button
                @click="onDeleteImage(index)"
                class="absolute top-2 right-3 bg-gray-100 rounded-sm px-1 py-1 hidden group-hover:block group-focus:block"
              >
                <Trash2 class="w-5 h-5 text-red-500" />
              </button>
            </div>

            <p class="truncate w-58 text-center">{{ fileImg.name }}</p>
          </div>
          <div
            v-for="(image, index) in roomData.roomImages"
            :key="index"
            class="rounded-sm w-60 h-60 flex flex-col items-center justify-center focus:bg-muesli-200 group shadow-sm"
            tabindex="0"
          >
            <div class="relative overflow-hidden w-56 h-56 rounded-sm group">
              <img
                :src="imageUrl + image.url"
                :alt="image.altext"
                class="object-center object-cover h-full w-full rounded-sm hover:scale-110 transition-all duration-300"
              />
              <button
                @click="onDeleteImage2(index)"
                class="absolute top-2 right-3 bg-gray-100 rounded-sm px-1 py-1 hidden group-hover:block group-focus:block"
              >
                <Trash2 class="w-5 h-5 text-red-500" />
              </button>
            </div>

            <!-- <p class="truncate w-58 text-center">{{ image.url }}</p> -->
          </div>
        </div>
      </div>
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
  Trash2,
  ImageUp,
  LoaderCircle,
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
import { computed, onMounted, ref, toRef, watch } from "vue";
import { toast } from "vue-sonner";
import { RoomAPI } from "@/api/room";
import { identity } from "@vueuse/core";
import { useGetRoomProfile } from "@/hook/useRoom";

const { updateRoom, isLoading } = RoomAPI();
const emit = defineEmits<{
  (e: "update:open", value: boolean): void;
}>();
const props = defineProps<{
  open: boolean;
  room: {
    id: number;
    roomNumber: string;
    roomStatus: string;
    floor: number;
    roomTypeId: number;
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
    deletedRoomImageIds?: string[];
  };
  roomTypes: {
    id?: number;
    name: string;
    size: number;
    price: number;
    peopleAbout: number;
  }[];
}>();
const imageUrl = import.meta.env.VITE_CLOUDINARY_IMG_URL;

const roomID = computed(() => {
  return props.room.id;
});
const isOpen = toRef(props, "open");
const {
  data: roomProfile,
  isFetching: isFetchingRoom,
  isPending: isPendingRoom,
} = useGetRoomProfile(roomID, isOpen);

const roomData = ref({ ...props.room });
watch(
  () => props.room,
  (newRoom) => {
    roomData.value = { ...newRoom };
  }
);

// Thả ảnh vào vùng này
const isDraging = ref(false);
const onDragover = (e: DragEvent) => {};
const onDrop = (e: DragEvent) => {
  const files = e.dataTransfer?.files;
  if (files && files.length > 0) {
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
    }
  }
};
//Xử lý nhiều file
const selectFiles = ref<File[]>([]);
interface ImagePreview {
  file: File;
  src: string;
  name: string;
  altText: string;
  isThum: boolean;
}
const imagePreview = ref<ImagePreview[]>([]);
const onFileChange = (e: Event) => {
  const files = (e.target as HTMLInputElement).files;
  if (files && files.length > 0) {
    const fileList = [];
    selectFiles.value = Array.from(files);
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const reader = new FileReader();
      fileList.push(file);
      reader.onload = (event) => {
        const imageUrl = event.target?.result as string;
        imagePreview.value.push({
          file,
          src: imageUrl,
          name: file.name,
          altText: file.name,
          isThum: imagePreview.value.length === 0,
        });
      };
      reader.readAsDataURL(file);
    }
    toast.success("Đã thêm " + files.length + " ảnh thành công", {
      description: fileList.map((file) => file.name).join(", "),
    });
  }
};
// Xử lý nhiều loại phòng
const roomTypesData = ref({ ...props.roomTypes });
watch(
  () => props.roomTypes,
  (newRoomTypes) => {
    roomTypesData.value = [...newRoomTypes];
  }
);

// Xử lý xóa ảnh
const onDeleteImage = (index: number) => {
  selectFiles.value.splice(index, 1);
  imagePreview.value.splice(index, 1);
  toast.warning("Đã xóa ảnh " + imagePreview.value[index].name);
};
const listDeletedRoomImageIds = ref<string[]>([]);
const onDeleteImage2 = (index: number) => {
  if (roomData.value.roomImages && roomData.value.roomImages[index]) {
    listDeletedRoomImageIds.value.push(roomData.value.roomImages[index].url);
    const removedImage = roomData.value.roomImages.splice(index, 1)[0];
    toast.warning("Đã xóa ảnh " + (removedImage?.altext ?? ""));
  }
};
// Xử lý update phòng
const selectRoomType = () => {
  console.log("Selected room type ID:", roomData.value.roomType.id);
};
const onSubmitUpdateRoom = async () => {
  roomData.value.deletedRoomImageIds = listDeletedRoomImageIds.value;
  const keptOldImages = roomData.value.roomImages.filter((img) => {
    return !listDeletedRoomImageIds.value.includes(img.url);
  });
  const newImages = imagePreview.value.map((img) => ({
    id: 0,
    url: "",
    altext: img.altText || "bin",
    isThum: img.isThum,
  }));
  roomData.value.roomImages = [...keptOldImages, ...newImages];
  roomData.value.roomTypeId = roomData.value.roomType.id;
  try {
    console.log("Room data: ", roomData.value);
    await updateRoom(roomData.value, selectFiles.value);
    imagePreview.value = [];
  } catch (error) {
    throw error;
  }
};
</script>
