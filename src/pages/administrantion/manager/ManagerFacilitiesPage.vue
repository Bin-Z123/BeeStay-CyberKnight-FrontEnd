<template>
  <div class="px-4 flex justify-center flex-col md:flex-row">
    <div class="md:w-1/3 me-4 mb-4 rounded-lg p-4">
      <form action="" class="flex flex-col gap-3">
        <div>
          <label class="text-muesli-400">Dịch Vụ</label><br />
          <input
            type="text"
            v-model="facilities.facility.facilityName"
            class="w-full h-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-muesli-200 shadow-sm shadow-muesli-300 px-5 text-center"
            placeholder="Nhập dịch vụ"
          />
        </div>
        <div>
          <label class="text-muesli-400">Mô Tả</label><br />
          <input
            type="text"
            v-model="facilities.facility.description"
            class="w-full h-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-muesli-200 shadow-sm shadow-muesli-300 px-5 text-center"
            placeholder="Nhập mô tả"
          />
        </div>
        <div>
          <label class="text-muesli-400">Giá</label><br />
          <input
            type="number"
            v-model="facilities.facility.price"
            class="w-full h-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-muesli-200 shadow-sm shadow-muesli-300 px-5 text-center"
            placeholder="Nhập giá"
          />
        </div>
        <div class="flex justify-center gap-2">
          <button
            type="button"
            @click.prevent="handleCreateFacility"
            class="bg-muesli-400 hover:bg-muesli-600 text-white px-3 py-2 rounded-sm w-[80px]"
          >
            Tạo
          </button>
          <button
            type="button"
            @click.prevent="handleUpdateFacility"
            class="bg-muesli-400 hover:bg-muesli-600 text-white px-3 py-2 rounded-sm"
          >
            Cập Nhật
          </button>
          <button
            type="button"
            @click.prevent="handleDeleteFacility"
            class="bg-muesli-400 hover:bg-muesli-600 text-white px-3 py-2 rounded-sm w-[80px]"
          >
            Xóa
          </button>
          <button
            @click="resetFacility"
            type="button"
            class="bg-muesli-400 hover:bg-muesli-600 text-white px-3 py-2 rounded-sm"
          >
            Làm Mới
          </button>
        </div>
      </form>
    </div>
    <div class="md:w-2/3 my-3">
      <table class="w-full border border-gray-300 text-sm text-center bg-white">
        <thead
          class="bg-gradient-to-r from-muesli-200 to-muesli-400 text-white"
        >
          <tr>
            <th class="px-4 py-2 border truncate max-w-[120px]">Tiêu Đề</th>
            <th class="px-4 py-2 border truncate max-w-[100px]">Mã Giảm Giá</th>
            <th class="px-4 py-2 border truncate max-w-[80px]">Loại Giảm</th>
            <th class="px-4 py-2 border truncate max-w-[120px]">Tùy Chọn</th>
          </tr>
        </thead>
        <tbody class="text-gray-700">
          <tr
            class="hover:bg-muesli-100 transition odd:bg-white even:bg-gray-100"
            v-for="facilitie in facilities.facilities"
            :key="facilitie.id"
          >
            <td class="py-2">{{ facilitie.facilityName }}</td>
            <td class="py-2">{{ facilitie.description }}</td>
            <td class="py-2">{{ facilitie.price }}</td>
            <td
              class="py-2 flex justify-center items-center gap-2 h-full m-1.5"
            >
              <button
                @click.prevent="getFacilitiesById(facilitie.id)"
                class="text-blue-400 hover:text-blue-700"
              >
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
  ChevronDown,
  SquarePen,
  LockKeyhole,
  ChevronLeft,
  ChevronRight,
} from "lucide-vue-next";
import { ref, onMounted, computed } from "vue";
import { Facilities } from "@/api/facilities";
const facilities = Facilities();

const handleCreateFacility = async () => {
  await facilities.createFacility(facilities.facility);
  await facilities.getAllFacilities();
  resetFacility();
};

const getFacilitiesById = async (id: number) => {
  const selectedFacility = facilities.facilities.find(
    (facility) => facility.id === id
  );
  if (selectedFacility) facilities.facility = { ...selectedFacility };
};

const handleUpdateFacility = async () => {
  await facilities.updateFacility(facilities.facility);
  await facilities.getAllFacilities();
  resetFacility();
};

const handleDeleteFacility = async () => {
  await facilities.deleteFacility(facilities.facility.id);
  await facilities.getAllFacilities();
  resetFacility();
};

const resetFacility = () => {
  facilities.facility = {
    id: 0,
    facilityName: "",
    description: "",
    price: 0,
  };
};

onMounted(async () => {
  await facilities.getAllFacilities();
});
</script>
