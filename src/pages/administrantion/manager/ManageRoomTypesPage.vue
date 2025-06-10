<template>
  <section>
    <div class="bg-white">
      <div class="flex relative">
        <div class="w-1/2">
          <div class="flex gap-2 items-center">
            <input
              type="text"
              class="w-2/6 h-10 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-muesli-200 mb-3 shadow-sm shadow-muesli-300 my-3 ms-4 text-center"
              placeholder="Tìm kiếm" />
            <div class="relative w-2/6">
              <select
                name=""
                id=""
                class="appearance-none w-full h-10 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-muesli-200 mb-3 shadow-sm shadow-muesli-300 my-3 text-center"
              >
                <option value="">VIP</option>
                <option value="">Thường</option>
              </select>
              <div
                class="absolute inset-y-0 right-3 flex items-center pointer-events-none"
              >
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
          <DialogCreateRoomType v-model:open="isOpen"></DialogCreateRoomType>
        </div>
      </div>
      <div class="shadow-lg px-4 pb-4 h-[622px]">
        <table class="w-full border border-gray-300 text-sm text-center bg-white">
          <thead class="bg-gradient-to-r from-muesli-200 to-muesli-400 text-white">
            <tr>
              <th class="px-4 py-2 border">ID</th>
              <th class="px-4 py-2 border">Loại Phòng</th>
              <th class="px-4 py-2 border">Diện Tích</th>
              <th class="px-4 py-2 border">Giá</th>
              <th class="px-4 py-2 border">Lượng Người Ở</th>
              <th class="px-4 py-2 border">Khuyến Mãi</th>
              <th class="px-4 py-2 border">Tùy Chọn</th>
            </tr>
          </thead>
          <tbody class="text-gray-700">
            <tr
              class="hover:bg-muesli-100 transition odd:bg-white even:bg-gray-100"
            >
              <td class="py-2">P01</td>
              <td class="py-2">Thường</td>
              <td class="py-2">50m²</td>
              <td class="py-2">3000000</td>
              <td class="py-2">3</td>
              <td class="py-2">30%</td>
              <td class="py-2 flex justify-center items-center gap-8 h-full">
                <button
                  class="bg-white text-muesli-400 border border-muesli-400 hover:bg-muesli-400 hover:text-white py-[9px] px-3 rounded-lg"
                >
                  <LockKeyhole class="w-4 h-4" />
                </button>
                <Dialog>
                  <DialogTrigger as-child>
                    <Button
                      class="bg-white text-muesli-400 border border-muesli-400 hover:bg-muesli-400 hover:text-white"
                    >
                      <SquarePen />
                    </Button>
                  </DialogTrigger>
                  <DialogContent class="sm:max-w-[425px]">
                    <form action="" class="flex flex-col gap-3">
                      <DialogHeader>
                        <DialogTitle class="font-bold text-muesli-400">Cập Nhật Loại Phòng Mới</DialogTitle>
                        <hr class="text-muesli-400 bg-muesli-400 h-[2px]" />
                      </DialogHeader>
                      <div>
                        <label class="text-muesli-400">Loại Phòng</label><br />
                        <input type="text"
                          class="w-full h-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-muesli-200 shadow-sm shadow-muesli-300 px-5 text-center"
                          placeholder="Nhập loại phòng" />
                      </div>
                      <div>
                        <label class="text-muesli-400">Diện Tích</label><br />
                        <input
                          type="text"
                          class="w-full h-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-muesli-200 shadow-sm shadow-muesli-300 px-5 text-center"
                          placeholder="Nhập diện tích" />
                      </div>
                      <div>
                        <label class="text-muesli-400">Giá</label><br />
                        <input type="text"
                          class="w-full h-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-muesli-200 shadow-sm shadow-muesli-300 px-5 text-center"
                          placeholder="Nhập giá" />
                      </div>
                      <div>
                        <label class="text-muesli-400">Số Lượng Người Ở</label><br />
                        <input type="text"
                          class="w-full h-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-muesli-200 shadow-sm shadow-muesli-300 px-5 text-center"
                          placeholder="Nhập số lượng người ở" />
                      </div>
                      <div>
                        <label class="text-muesli-400">Khuyến mãi</label><br />
                        <input type="text"
                          class="w-full h-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-muesli-200 shadow-sm shadow-muesli-300 px-5 text-center"
                          placeholder="Nhập giá" />
                      </div>
                      <DialogFooter>
                        <Button
                          type="submit"
                          class="bg-muesli-400 hover:bg-muesli-600 text-white"
                        >
                          Lưu
                        </Button>
                      </DialogFooter>
                    </form>
                  </DialogContent>
                </Dialog>
              </td>
            </tr>
          </tbody>
        </table>
        <div class="bg-white h-15 mb-4 shadow-lg flex items-center justify-end gap-2 px-5">
          <input type="text" class="w-12 h-8 border border-gray-300 rounded-sm text-center" disabled
            value="1" /><span>of 16</span>
          <button class="hover:bg-muesli-100 w-10 h-10 flex items-center justify-center rounded-4xl">
            <ChevronLeft />
          </button>
          <button
            class="hover:bg-muesli-100 w-10 h-10 flex items-center justify-center rounded-4xl"
          >
            <ChevronRight />
          </button>
        </div>
      </div>
    </div>
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
import { ref } from "vue";
import { Button } from "@/components/ui/button";
import DialogCreateRoomType from "@/components/administration/roomTypeDialog/CreateRoomTypeDialog.vue";
// import { Input } from '@/components/ui/input'
// import { Label } from '@/components/ui/label'
const isOpen = ref(false);
const isAddRoomTypes = ref(false);
</script>
