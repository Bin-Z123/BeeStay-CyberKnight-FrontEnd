<template>
    <div class="px-4 flex justify-center flex-col md:flex-row">
        <div class="md:w-1/3 me-4  mb-4 rounded-lg p-4">
            <form action="" class="flex flex-col gap-3">
                <div>
                    <label class="text-muesli-400">Ảnh dịch vụ</label>
                    <label for="image-upload"
                        class="rounded-sm w-60 h-60 flex flex-col items-center justify-self-center justify-center outline-2 outline-dashed outline-muesli-400 hover:bg-gray-100"
                        tabindex="0">
                        <ImageUp class="size-10 stroke-2" v-if="!imagePreview"></ImageUp>
                        <p class="truncate w-58 text-center" v-if="!imagePreview">Tải ảnh lên</p>
                        <input class="hidden" type="file" name="" id="image-upload" accept="image/*"
                            @change="onFileChange" />
                        <div class=" w-55 h-55 overflow-hidden rounded-sm flex justify-center" v-if="imagePreview">
                            <img :src="imagePreview" v-if="imagePreview"
                                class="object-center rounded-sm  object-cover hover:scale-105 transition-all duration-300">
                        </div>
                    </label>

                </div>
                <div>
                    <label class="text-muesli-400">Dịch Vụ</label><br />
                    <input type="text" v-model="facilities.facility.facilityName" :class="[
                        'w-full h-10 rounded-lg focus:outline-none px-5 text-center shadow-sm',
                        errors.facilityName
                            ? 'border-red-500 ring-2 ring-red-300 shadow-red-200 text-red-600'
                            : 'border-gray-300 focus:ring-2 focus:ring-muesli-200 shadow-muesli-300'
                    ]" placeholder="Nhập dịch vụ" />
                    <p v-if="errors.facilityName" class="text-red-500 text-sm mt-1">{{ errors.facilityName }}</p>
                </div>
                <div>
                    <label class="text-muesli-400">Mô Tả</label><br />
                    <textarea type="text" v-model="facilities.facility.description" :class="[
                        'w-full h-25 rounded-lg focus:outline-none px-5 text-center shadow-sm p-3',
                        errors.description
                            ? 'border-red-500 ring-2 ring-red-300 shadow-red-200 text-red-600'
                            : 'border-gray-300 focus:ring-2 focus:ring-muesli-200 shadow-muesli-300'
                    ]" placeholder="Nhập mô tả"></textarea>
                    <p v-if="errors.description" class="text-red-500 text-sm mt-1">{{ errors.description }}</p>
                </div>
                <div>
                    <label class="text-muesli-400">Giá</label><br />
                    <input type="number" v-model="facilities.facility.price" :class="[
                        'w-full h-10 rounded-lg focus:outline-none px-5 text-center shadow-sm',
                        errors.price
                            ? 'border-red-500 ring-2 ring-red-300 shadow-red-200 text-red-600'
                            : 'border-gray-300 focus:ring-2 focus:ring-muesli-200 shadow-muesli-300'
                    ]" placeholder="Nhập giá" />
                    <p v-if="errors.price" class="text-red-500 text-sm mt-1">{{ errors.price }}</p>
                </div>
                <div class="flex justify-center gap-2">
                    <button type="button" @click.prevent="handleCreateFacility"
                        class="bg-muesli-400 hover:bg-muesli-600 text-white px-3 py-2 rounded-sm w-[80px]">
                        <span v-if="!facilities.isLoading">Tạo</span>
                        <span v-else class="animate-spin">
                            <LoaderCircle></LoaderCircle>
                        </span>
                    </button>
                    <button type="button" @click.prevent="handleUpdateFacility"
                        class="bg-muesli-400 hover:bg-muesli-600 text-white px-3 py-2 rounded-sm">
                        <span v-if="!facilities.isLoadingUpdate">Cập nhật</span>
                        <span v-else class="animate-spin">
                            <LoaderCircle></LoaderCircle>
                        </span>
                    </button>
                    <button type="button" @click.prevent="handleDeleteFacility"
                        class="bg-muesli-400 hover:bg-muesli-600 text-white px-3 py-2 rounded-sm w-[80px]">
                        Xóa
                    </button>
                    <button @click.prevent="resetFacility"
                        class="bg-muesli-400 hover:bg-muesli-600 text-white px-3 py-2 rounded-sm">
                        Làm Mới
                    </button>
                </div>
            </form>
        </div>
        <div class="md:w-2/3 my-3">
            <table class="w-full border border-gray-300 text-sm text-center bg-white">
                <thead class="bg-gradient-to-r from-muesli-200 to-muesli-400 text-white">
                    <tr>
                        <th class="px-4 py-2 border truncate max-w-[120px]">Ảnh</th>
                        <th class="px-4 py-2 border truncate max-w-[120px]">Tiêu Đề</th>
                        <th class="px-4 py-2 border truncate max-w-[100px]">Mô tả</th>
                        <th class="px-4 py-2 border truncate max-w-[80px]">Giá/ ngày</th>
                        <th class="px-4 py-2 border truncate max-w-[120px]">Tùy Chọn</th>
                    </tr>
                </thead>
                <tbody class="text-gray-700">
                    <tr class="hover:bg-muesli-100 transition odd:bg-white even:bg-gray-100"
                        v-for="facilitie in facilities.facilities" :key="facilitie.id">
                        <td class="py-2 flex justify-center  gap-2 h-full "><img class="size-10"
                                :src="imageUrl + facilitie.publicId"></td>
                        <td class="py-2">{{ facilitie.facilityName }}</td>
                        <td class="py-2">{{ facilitie.description }}</td>
                        <td class="py-2">{{ facilitie.price }}</td>
                        <td class="py-2 flex justify-center items-center gap-2 h-full m-auto">
                            <button @click.prevent="getFacilitiesById(facilitie.id)"
                                class="text-blue-400 hover:text-blue-700">
                                <SquarePen />
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
            <!-- <div class="bg-white h-15 mb-4 shadow-lg flex items-center justify-end gap-2 px-5">
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
            </div> -->
        </div>
    </div>
</template>
<script setup lang="ts">
import {
    SquarePen, ImageUp, LoaderCircle
} from "lucide-vue-next";
import { ref, onMounted, computed } from 'vue';
import { Facilities } from '@/api/facilities';
const facilities = Facilities();
const imageUrl = import.meta.env.VITE_CLOUDINARY_IMG_URL;
const handleCreateFacility = async () => {
    if (!validateForm()) return;
    await facilities.createFacility(facilities.facility, selectFiles.value[0]);
    await facilities.getAllFacilities();
    resetFacility();
}

const getFacilitiesById = async (id: number) => {
    const selectedFacility = facilities.facilities.find(facility => facility.id === id);
    imagePreview.value = imageUrl + selectedFacility?.publicId
    if (selectedFacility) facilities.facility = { ...selectedFacility };
}

const handleUpdateFacility = async () => {
    if (!validateForm()) return;
    await facilities.updateFacility(facilities.facility, selectFiles.value[0]);
    await facilities.getAllFacilities();
    resetFacility();
}

const handleDeleteFacility = async () => {
    await facilities.deleteFacility(facilities.facility.id);
    await facilities.getAllFacilities();
    resetFacility();
}

const resetFacility = () => {
    facilities.facility = {
        id: 0,
        facilityName: '',
        description: '',
        price: 0,
        publicId: '',
    };
    errors.value = {
        facilityName: '',
        description: '',
        price: '',
    };
    selectFiles.value = [];
}

const errors = ref({
    facilityName: '',
    description: '',
    price: '',
});
const validateForm = () => {
    let isValid = true;
    errors.value = {
        facilityName: '',
        description: '',
        price: '',
    };
    const f = facilities.facility;
    if (!f.facilityName || f.facilityName.trim() === '') {
        errors.value.facilityName = 'Vui lòng nhập tên dịch vụ hợp lệ';
        isValid = false;
    }
    if (!f.description || f.description.trim() === '') {
        errors.value.description = 'Vui lòng nhập mô tả hợp lệ';
        isValid = false;
    }
    if (f.price == null || f.price < 0) {
        errors.value.price = 'Vui lòng nhập giá hợp lệ';
        isValid = false;
    }
    return isValid;
}

onMounted(async () => {
    await facilities.getAllFacilities();
});

// Upload ảnh
const imagePreview = ref()
const selectFiles = ref<File[]>([]);
const onFileChange = (e: Event) => {
    selectFiles.value = [];
    const file = (e.target as HTMLInputElement).files?.[0];
    console.log("file: ", file)
    if (file) {
        selectFiles.value.push(file)
        const reader = new FileReader()
        reader.onload = (e) => {
            const imageUrl = e.target?.result as String
            imagePreview.value = imageUrl
        }
        reader.readAsDataURL(file)
    }
    console.log("selectFiles.value: ", selectFiles.value)
}
</script>