<template>
    <section>
        <Tabs default-value="rank" class="">
            <div>
                <TabsList class="grid grid-cols-3 mx-4 mt-2 bg-muesli-300 rounded-b-none shadow-sm">
                    <TabsTrigger value="rank"
                        class="rounded-b-none my-[2px] text-white data-[state=active]:bg-white data-[state=active]:text-muesli-600 font-semibold">
                        Xếp Hạng
                    </TabsTrigger>
                    <TabsTrigger value="voucher"
                        class="rounded-b-none my-[2px] text-white data-[state=active]:bg-white data-[state=active]:text-muesli-600 font-semibold">
                        Voucher
                    </TabsTrigger>
                    <TabsTrigger value="discount"
                        class="rounded-b-none my-[2px] text-white data-[state=active]:bg-white data-[state=active]:text-muesli-600 font-semibold">
                        Discount
                    </TabsTrigger>
                </TabsList>
            </div>

            <TabsContent value="voucher">
                <div class="px-4 flex justify-center flex-col md:flex-row">
                    <div class="md:w-1/3 me-4  mb-4 rounded-lg p-4">
                        <form action="" class="flex flex-col gap-3">
                            <div>
                                <label class="text-muesli-400">Mã Giảm Giá</label><br />
                                <input type="text"
                                    class="w-full h-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-muesli-200 shadow-sm shadow-muesli-300 px-5 text-center"
                                    placeholder="Nhập mã giảm giá" />
                            </div>
                            <div>
                                <label class="text-muesli-400">Giá Trị</label><br />
                                <input type="text"
                                    class="w-full h-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-muesli-200 shadow-sm shadow-muesli-300 px-5 text-center"
                                    placeholder="Nhập giá trị" />
                            </div>
                            <div>
                                <label class="text-muesli-400">Trạng Thái</label><br />
                                <div class="relative">
                                    <select name="" id=""
                                        class="appearance-none w-full h-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-muesli-200 shadow-sm shadow-muesli-300 px-5 text-center">
                                        <option value="">1</option>
                                        <option value="">2</option>
                                        <option value="">3</option>
                                    </select>
                                    <div class="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                                        <ChevronDown class="w-5 h-5 text-gray-400" />
                                    </div>
                                </div>
                            </div>
                            <div class="flex justify-center gap-2">
                                <button type="submit"
                                    class="bg-muesli-400 hover:bg-muesli-600 text-white px-3 py-2 rounded-sm w-23">
                                    Tạo
                                </button>
                                <button type="submit"
                                    class="bg-muesli-400 hover:bg-muesli-600 text-white px-3 py-2 rounded-sm w-23">
                                    Cập Nhật
                                </button>
                                <button type="submit"
                                    class="bg-muesli-400 hover:bg-muesli-600 text-white px-3 py-2 rounded-sm w-23">
                                    Làm Mới
                                </button>
                            </div>
                        </form>
                    </div>
                    <div class="md:w-2/3">
                        <table class="w-full border border-gray-300 text-sm text-center bg-white">
                            <thead class="bg-gradient-to-r from-muesli-200 to-muesli-400 text-white">
                                <tr>
                                    <th class="px-4 py-2 border">ID</th>
                                    <th class="px-4 py-2 border">Mã Giảm Giá</th>
                                    <th class="px-4 py-2 border">Giá Trị</th>
                                    <th class="px-4 py-2 border">Trạng Thái</th>
                                    <th class="px-4 py-2 border">Tùy Chọn</th>
                                </tr>
                            </thead>
                            <tbody class="text-gray-700">
                                <tr class="hover:bg-muesli-100 transition odd:bg-white even:bg-gray-100" v-for="i in 10"
                                    :key="i">
                                    <td class="py-2">1100</td>
                                    <td class="py-2">GIAMGIANE</td>
                                    <td class="py-2">10%</td>
                                    <td class="py-2">Chưa sử dụng</td>
                                    <td class="py-2 flex justify-center items-center gap-2 h-full">
                                        <button
                                            class="bg-white text-muesli-400 border border-muesli-400 hover:bg-muesli-400 hover:text-white py-[9px] px-3 rounded-lg">
                                            <LockKeyhole class="w-4 h-4" />
                                        </button>
                                        <Button
                                            class="bg-white text-muesli-400 border border-muesli-400 hover:bg-muesli-400 hover:text-white">
                                            <SquarePen />
                                        </Button>
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
                            <button class="hover:bg-muesli-100 w-10 h-10 flex items-center justify-center rounded-4xl">
                                <ChevronRight />
                            </button>
                        </div>
                    </div>
                </div>
            </TabsContent>
            <TabsContent value="rank">
                <div class="px-4 flex justify-center flex-col md:flex-row">
                    <div class="md:w-1/3 me-4  mb-4 rounded-lg p-4">
                        <form action="" class="flex flex-col gap-3">
                            <div>
                                <label class="text-muesli-400">Hạng</label><br />
                                <input type="text"
                                    v-model="rank.nameRank"
                                    class="w-full h-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-muesli-200 shadow-sm shadow-muesli-300 px-5 text-center"
                                    placeholder="Nhập tên hạng" />
                            </div>
                            <div>
                                <label class="text-muesli-400">Điểm Hạng</label><br />
                                <input type="number"
                                    v-model="rank.minPointRequired"
                                    class="w-full h-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-muesli-200 shadow-sm shadow-muesli-300 px-5 text-center"
                                    placeholder="Nhập điểm hạng" />
                            </div>
                            <div>
                                <label class="text-muesli-400">Giá Trị Giảm</label><br />
                                <input type="number"
                                    v-model="rank.discount_percent"
                                    class="w-full h-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-muesli-200 shadow-sm shadow-muesli-300 px-5 text-center"
                                    placeholder="Nhập giá trị giảm" />
                            </div>
                            <div class="flex justify-center gap-2">
                                <button type="button"
                                    class="bg-muesli-400 hover:bg-muesli-600 text-white px-3 py-2 rounded-sm w-[85px]" @click.prevent="handleCreateRank">
                                    Tạo
                                </button>
                                <button type="button"
                                    class="bg-muesli-400 hover:bg-muesli-600 text-white px-3 py-2 rounded-sm" @click.prevent="handleUpdateRank">
                                    Cập Nhật
                                </button>
                                <button type="button"
                                    class="bg-muesli-400 hover:bg-muesli-600 text-white px-3 py-2 rounded-sm w-[85px]" @click.prevent="handleDeleteRank">
                                    Xoá
                                </button>
                                <button type="reset"
                                    class="bg-muesli-400 hover:bg-muesli-600 text-white px-3 py-2 rounded-sm">
                                    Làm Mới
                                </button>
                            </div>
                        </form>
                    </div>
                    <div class="md:w-2/3">
                        <table class="w-full border border-gray-300 text-sm text-center">
                            <thead class="bg-gradient-to-r from-muesli-200 to-muesli-400 text-white">
                                <tr>
                                    <th class="px-4 py-2 border truncate max-w-[120px]">Hạng</th>
                                    <th class="px-4 py-2 border truncate max-w-[100px]">Điểm Hạng</th>
                                    <th class="px-4 py-2 border truncate max-w-[80px]">Giá Trị Giảm</th>
                                    <th class="px-4 py-2 border truncate max-w-[120px]">Tùy Chọn</th>
                                </tr>
                            </thead>
                            <tbody class="text-gray-700">
                                <tr class="hover:bg-muesli-100 transition odd:bg-white even:bg-gray-100" v-for="rank in filterRank"
                                    :key="rank.id">
                                    <td class="py-2">{{ rank.nameRank }}</td>
                                    <td class="py-2">{{ rank.minPointRequired }}</td>
                                    <td class="py-2">{{ rank.discount_percent }}%</td>
                                    <td class="py-2 flex justify-center items-center gap-2 h-full">
                                        <button
                                            class="bg-white text-muesli-400 border border-muesli-400 hover:bg-muesli-400 hover:text-white py-[9px] px-3 rounded-lg">
                                            <LockKeyhole class="w-4 h-4" />
                                        </button>
                                        <Button @click="getRankById(rank.id)"
                                            class="bg-white text-muesli-400 border border-muesli-400 hover:bg-muesli-400 hover:text-white">
                                            <SquarePen />
                                        </Button>
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
                            <button class="hover:bg-muesli-100 w-10 h-10 flex items-center justify-center rounded-4xl">
                                <ChevronRight />
                            </button>
                        </div>
                    </div>
                </div>
            </TabsContent>
            <TabsContent value="discount">
                <div class="px-4 flex justify-center flex-col md:flex-row">
                    <div class="md:w-1/3 me-4  mb-4 rounded-lg p-4">
                        <form action="" class="flex flex-col gap-3 overflow-scroll h-[580px] scrollbar-hidden px-1">
                            <div>
                                <label class="text-muesli-400">Tiêu Đề</label><br />
                                <input type="text"
                                    v-model="discount.title"
                                    class="w-full h-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-muesli-200 shadow-sm shadow-muesli-300 px-5 text-center"
                                    placeholder="Nhập tiêu đề" />
                            </div>
                            <div>
                                <label class="text-muesli-400">Mô Tả</label><br />
                                <input type="text"
                                    v-model="discount.description"
                                    class="w-full h-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-muesli-200 shadow-sm shadow-muesli-300 px-5 text-center"
                                    placeholder="Nhập mô tả" />
                            </div>
                            <div>
                                <label class="text-muesli-400">Mã Giảm Giá</label><br />
                                <input type="text"
                                    v-model="discount.discountCode"
                                    class="w-full h-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-muesli-200 shadow-sm shadow-muesli-300 px-5 text-center"
                                    placeholder="Nhập mã giảm giá" />
                            </div>
                            <div>
                                <label class="text-muesli-400">Loại Giảm Giá</label><br />
                                <select
                                    v-model="discount.discountType"
                                    class="w-full h-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-muesli-200 shadow-sm shadow-muesli-300 px-5 text-center">
                                    <option value="Normal">Giảm theo phần trăm</option>
                                </select>
                            </div>
                            <div>
                                <label class="text-muesli-400">Giá Trị</label><br />
                                <input type="number"
                                    v-model="discount.discountValue"
                                    class="w-full h-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-muesli-200 shadow-sm shadow-muesli-300 px-5 text-center"
                                    placeholder="Nhập mã giảm giá" />
                            </div>
                            <div>
                                <label class="text-muesli-400">Ngày Bắt Đầu</label><br />
                                <input type="datetime-local"
                                    v-model="discount.startDate"
                                    class="w-full h-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-muesli-200 shadow-sm shadow-muesli-300 px-5 text-center"
                                    placeholder="Nhập mã giảm giá" />
                            </div>
                            <div>
                                <label class="text-muesli-400">Ngày Kết Thúc</label><br />
                                <input type="datetime-local"
                                    v-model="discount.endDate"
                                    class="w-full h-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-muesli-200 shadow-sm shadow-muesli-300 px-5 text-center"
                                    placeholder="Nhập giá trị" />
                            </div>
                            <div>
                                <label class="text-muesli-400">Trạng Thái</label><br />
                                <div class="relative">
                                    <select
                                        v-model="discount.status"
                                        class="appearance-none w-full h-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-muesli-200 shadow-sm shadow-muesli-300 px-5 text-center">
                                        <option value="ACTIVE">Active</option>
                                        <option value="INACTIVE">Inactive</option>
                                    </select>
                                    <div class="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                                        <ChevronDown class="w-5 h-5 text-gray-400" />
                                    </div>
                                </div>
                            </div>
                            <div class="flex justify-center gap-2">
                                <button type="button"
                                    @click.prevent="handleCreateDiscount"
                                    class="bg-muesli-400 hover:bg-muesli-600 text-white px-3 py-2 rounded-sm w-[80px]">
                                    Tạo
                                </button>
                                <button type="button"
                                    @click.prevent="handleUpdateDiscount"
                                    class="bg-muesli-400 hover:bg-muesli-600 text-white px-3 py-2 rounded-sm">
                                    Cập Nhật
                                </button>
                                <button type="button"
                                    @click.prevent="handleDeleteDiscount"
                                    class="bg-muesli-400 hover:bg-muesli-600 text-white px-3 py-2 rounded-sm w-[80px]">
                                    Xóa
                                </button>
                                <button type="reset"
                                    class="bg-muesli-400 hover:bg-muesli-600 text-white px-3 py-2 rounded-sm">
                                    Làm Mới
                                </button>
                            </div>
                        </form>
                    </div>
                    <div class="md:w-2/3">
                        <table class="w-full border border-gray-300 text-sm text-center bg-white">
                            <thead class="bg-gradient-to-r from-muesli-200 to-muesli-400 text-white">
                                <tr>
                                    <th class="px-4 py-2 border truncate max-w-[120px]">Tiêu Đề</th>
                                    <th class="px-4 py-2 border truncate max-w-[100px]">Mã Giảm Giá</th>
                                    <th class="px-4 py-2 border truncate max-w-[80px]">Loại Giảm</th>
                                    <th class="px-4 py-2 border truncate max-w-[80px]">Giá Trị Giảm</th>
                                    <th class="px-4 py-2 border truncate max-w-[100px]">Ngày Bắt Đầu</th>
                                    <th class="px-4 py-2 border truncate max-w-[100px]">Ngày Kết Thúc</th>
                                    <th class="px-4 py-2 border truncate max-w-[60px]">Trạng Thái</th>
                                    <th class="px-4 py-2 border truncate max-w-[120px]">Tùy Chọn</th>
                                </tr>
                            </thead>
                            <tbody class="text-gray-700">
                                <tr class="hover:bg-muesli-100 transition odd:bg-white even:bg-gray-100" v-for="discount in paginatedDiscounts"
                                    :key="discount.id">
                                    <td class="py-2">{{ discount.title }}</td>
                                    <td class="py-2">{{ discount.discountCode }}</td>
                                    <td class="py-2">{{ discount.discountType }}</td>
                                    <td class="py-2">{{ discount.discountValue }}%</td>
                                    <td class="py-2">{{ discount.startDate.slice(0, 10) }}</td>
                                    <td class="py-2">{{ discount.endDate.slice(0, 10) }}</td>
                                    <td class="py-2" :class="discount.status == 'INACTIVE' ? 'text-red-500' : 'text-green-500'">{{ discount.status }}</td>
                                    <td class="py-2 flex justify-center items-center gap-2 h-full m-1.5">
                                        <button
                                            class="text-muesli-400">
                                            <LockKeyhole/>
                                        </button>
                                        <button
                                            @click="getDiscountById(discount.id)"
                                            class="text-blue-400 hover:text-blue-700">
                                            <SquarePen />
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <div class="bg-white h-15 mb-4 shadow-lg flex items-center justify-end gap-2 px-5">
                            <input type="text" class="w-12 h-8 border border-gray-300 rounded-sm text-center" disabled
                                :value="currentPage" /><span>of {{ totalPages }}</span>
                            <button @click="currentPage--" :disabled="currentPage == 1" class="hover:bg-muesli-100 w-10 h-10 flex items-center justify-center rounded-4xl">
                                <ChevronLeft />
                            </button>
                            <button @click="currentPage++" :disabled="currentPage == totalPages" class="hover:bg-muesli-100 w-10 h-10 flex items-center justify-center rounded-4xl">
                                <ChevronRight />
                            </button>
                        </div>
                    </div>
                </div>
            </TabsContent>
        </Tabs>
    </section>
</template>
<script setup lang="ts">
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from '@/components/ui/tabs'
import {
    ChevronDown,
    SquarePen,
    LockKeyhole,
    ChevronLeft,
    ChevronRight,
} from "lucide-vue-next";
import { Button } from "@/components/ui/button";
import { ref, onMounted, computed } from "vue";

import { Rank } from '@/api/rank';
const { rank, ranks, getAllRank, createRank, updateRank, deleteRank, isLoading } = Rank();
import { Discount } from '@/api/discount';
const { discount, discounts, getAllDiscount, createDiscount, updateDiscount, deleteDiscount } = Discount();

const currentPage = ref(1);
const pageSize = ref(10);
// Rank
const getRankById = async (id: number) => {
    const selectRank = ranks.value.find((rank) => rank.id === id);
    if(selectRank) rank.value = {...selectRank};
}

const handleCreateRank = async () => {
    await createRank(rank.value);
    await getAllRank();
    resetRank();
}

const handleUpdateRank = async () => {
    await updateRank(rank.value);
    await getAllRank();
    resetRank();
}

const handleDeleteRank = async () => {
    await deleteRank(rank.value.id);
    await getAllRank();
    resetRank();
}

const filterRank = computed(() =>
    ranks.value.filter(rank => rank.id !== 7)
);

const resetRank = () => {
    rank.value = {
        id: 0,
        nameRank: '',
        minPointRequired: 0,
        discount_percent: 0
    }
}

// Discount
const totalPages = computed(() => {
    return Math.ceil(discounts.value.length / pageSize.value);
});

const getDiscountById = (id: number) => {
  const selected = discounts.value.find(item => item.id === id);
  if (selected) {
    discount.value = {
      ...selected,
      status: selected.status || 'ACTIVE',
      discountType: selected.discountType || 'Normal'
    };
  }
};


const handleCreateDiscount = async () => {
    await createDiscount(discount.value);
    await getAllDiscount();
    resetDiscount();
}

const handleUpdateDiscount = async () => {
    await updateDiscount(discount.value);
    await getAllDiscount();
    resetDiscount();
}

const handleDeleteDiscount = async () => {
    await deleteDiscount(discount.value.id);
    await getAllDiscount();
    resetDiscount();
}

const resetDiscount = () => {
    discount.value = {
        id: 0,
        title: '',
        description: '',
        discountCode: '',
        discountType: 'Normal',
        discountValue: 0,
        startDate: '',
        endDate: '',
        status: 'ACTIVE',
        roomTypes: []
    };
}

const paginatedDiscounts = computed(() => {
    const startIndex = (currentPage.value - 1) * pageSize.value;
    const endIndex = startIndex + pageSize.value;
    return discounts.value.slice(startIndex, endIndex);
});

onMounted( async () => {
    await getAllRank();
    await getAllDiscount();
})
</script>