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
                                <input type="text" v-model="voucher.code" :class="[
                                    'w-full h-10 rounded-lg focus:outline-none px-5 text-center shadow-sm',
                                    errorVoucher.code
                                        ? 'border-red-500 ring-2 ring-red-300 shadow-red-200 text-red-600'
                                        : 'border-gray-300 focus:ring-2 focus:ring-muesli-200 shadow-muesli-300'
                                ]" placeholder="Nhập mã giảm giá" />
                                <p v-if="errorVoucher.code" class="text-red-500 text-sm mt-1">{{ errorVoucher.code }}
                                </p>
                            </div>
                            <div>
                                <label class="text-muesli-400">Giá Trị</label><br />
                                <input type="text" v-model="voucher.discountValue" :class="[
                                    'w-full h-10 rounded-lg focus:outline-none px-5 text-center shadow-sm',
                                    errorVoucher.discountValue
                                        ? 'border-red-500 ring-2 ring-red-300 shadow-red-200 text-red-600'
                                        : 'border-gray-300 focus:ring-2 focus:ring-muesli-200 shadow-muesli-300'
                                ]" placeholder="Nhập giá trị" />
                                <p v-if="errorVoucher.discountValue" class="text-red-500 text-sm mt-1">{{
                                    errorVoucher.discountValue }}</p>
                            </div>
                            <div>
                                <label class="text-muesli-400">Trạng Thái</label><br />
                                <div class="relative">
                                    <select v-model="voucher.estatus" :class="[
                                        'appearance-none w-full h-10 rounded-lg focus:outline-none px-5 text-center shadow-sm',
                                        errorVoucher.estatus
                                            ? 'border-red-500 ring-2 ring-red-300 shadow-red-200 text-red-600'
                                            : 'border-gray-300 focus:ring-2 focus:ring-muesli-200 shadow-muesli-300'
                                    ]">
                                        <option value="ACTIVE">Active</option>
                                        <option value="INACTIVE">Inactive</option>
                                    </select>
                                    <div class="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                                        <ChevronDown class="w-5 h-5 text-gray-400" />
                                    </div>
                                </div>
                                <p v-if="errorVoucher.estatus" class="text-red-500 text-sm mt-1">{{ errorVoucher.estatus
                                }}</p>
                            </div>
                            <div class="flex justify-center gap-2">
                                <button type="button" @click.prevent="handleCreateVoucher"
                                    class="bg-muesli-400 hover:bg-muesli-600 text-white px-3 py-2 rounded-sm w-23">
                                    Tạo
                                </button>
                                <button type="submit" @click.prevent="handleUpdateVoucher"
                                    class="bg-muesli-400 hover:bg-muesli-600 text-white px-3 py-2 rounded-sm w-23">
                                    Cập Nhật
                                </button>
                                <button @click.prevent="resetVoucher"
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
                                    <th class="px-4 py-2 border">Mã Giảm Giá</th>
                                    <th class="px-4 py-2 border">Giá Trị</th>
                                    <th class="px-4 py-2 border">Trạng Thái</th>
                                    <th class="px-4 py-2 border">Tùy Chọn</th>
                                </tr>
                            </thead>
                            <tbody class="text-gray-700">
                                <tr class="hover:bg-muesli-100 transition odd:bg-white even:bg-gray-100"
                                    v-for="voucher in vouchers" :key="voucher.id">
                                    <td class="py-2">{{ voucher.code }}</td>
                                    <td class="py-2">{{ voucher.discountValue }}</td>
                                    <td class="py-2"
                                        :class="voucher.estatus == 'INACTIVE' ? 'text-red-500' : 'text-green-500'">{{
                                            voucher.estatus }}</td>
                                    <td class="py-2 flex justify-center items-center gap-2 h-full">
                                        <button @click="updateVoucherStatus(voucher)"
                                            v-if="voucher.estatus === 'ACTIVE'" class=" hover:text-green-700 m-1.5"
                                            :class="voucher.estatus === 'ACTIVE' ? ' text-green-500 ' : ''">
                                            <LockKeyholeOpen class="w-5.5 h-5.5" />
                                        </button>
                                        <button @click="updateVoucherStatus(voucher)" v-else
                                            class="hover:text-red-700 m-1.5"
                                            :class="voucher.estatus === 'INACTIVE' ? ' text-red-500' : ''">
                                            <LockKeyhole class="w-5.5 h-5.5" />
                                        </button>
                                        <button @click="getVoucherById(voucher.id)"
                                            class="text-blue-400 hover:text-blue-700">
                                            <SquarePen />
                                        </button>
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
                                <input type="text" v-model="rank.nameRank" :class="[
                                    'w-full h-10 rounded-lg focus:outline-none px-5 text-center shadow-sm',
                                    errorRank.nameRank
                                        ? 'border-red-500 ring-2 ring-red-300 shadow-red-200 text-red-600'
                                        : 'border-gray-300 focus:ring-2 focus:ring-muesli-200 shadow-muesli-300'
                                ]" placeholder="Nhập tên hạng" />
                                <p v-if="errorRank.nameRank" class="text-red-500 text-sm mt-1">{{ errorRank.nameRank }}
                                </p>
                            </div>
                            <div>
                                <label class="text-muesli-400">Điểm Hạng</label><br />
                                <input type="number" v-model="rank.minPointRequired" :class="[
                                    'w-full h-10 rounded-lg focus:outline-none px-5 text-center shadow-sm',
                                    errorRank.minPointRequired
                                        ? 'border-red-500 ring-2 ring-red-300 shadow-red-200 text-red-600'
                                        : 'border-gray-300 focus:ring-2 focus:ring-muesli-200 shadow-muesli-300'
                                ]" placeholder="Nhập điểm hạng" />
                                <p v-if="errorRank.minPointRequired" class="text-red-500 text-sm mt-1">
                                    {{ errorRank.minPointRequired }}</p>
                            </div>
                            <div>
                                <label class="text-muesli-400">Giá Trị Giảm</label><br />
                                <input type="number" v-model="rank.discount_percent" :class="[
                                    'w-full h-10 rounded-lg focus:outline-none px-5 text-center shadow-sm',
                                    errorRank.discount_percent
                                        ? 'border-red-500 ring-2 ring-red-300 shadow-red-200 text-red-600'
                                        : 'border-gray-300 focus:ring-2 focus:ring-muesli-200 shadow-muesli-300'
                                ]" placeholder="Nhập giá trị giảm" />
                                <p v-if="errorRank.discount_percent" class="text-red-500 text-sm mt-1">
                                    {{ errorRank.discount_percent }}</p>
                            </div>
                            <div class="flex justify-center gap-2">
                                <button type="button"
                                    class="bg-muesli-400 hover:bg-muesli-600 text-white px-3 py-2 rounded-sm w-[85px]"
                                    @click.prevent="handleCreateRank">
                                    Tạo
                                </button>
                                <button type="button"
                                    class="bg-muesli-400 hover:bg-muesli-600 text-white px-3 py-2 rounded-sm"
                                    @click.prevent="handleUpdateRank">
                                    Cập Nhật
                                </button>
                                <button type="button"
                                    class="bg-muesli-400 hover:bg-muesli-600 text-white px-3 py-2 rounded-sm w-[85px]"
                                    @click.prevent="handleDeleteRank">
                                    Xoá
                                </button>
                                <button @click.prevent="resetRank"
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
                                <tr class="hover:bg-muesli-100 transition odd:bg-white even:bg-gray-100"
                                    v-for="rank in filterRank" :key="rank.id">
                                    <td class="py-2">{{ rank.nameRank }}</td>
                                    <td class="py-2">{{ rank.minPointRequired }}</td>
                                    <td class="py-2">{{ rank.discount_percent }}%</td>
                                    <td class="py-2 flex justify-center items-center gap-2 h-full">
                                        <!-- <button
                                            class="bg-white text-muesli-400 border border-muesli-400 hover:bg-muesli-400 hover:text-white py-[9px] px-3 rounded-lg">
                                            <LockKeyhole class="w-4 h-4" />
                                        </button> -->
                                        <button @click="getRankById(rank.id)" class="text-blue-400 hover:text-blue-700">
                                            <SquarePen />
                                        </button>
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
                                <input type="text" v-model="discount.title" :class="[
                                    'w-full h-10 rounded-lg focus:outline-none px-5 text-center shadow-sm',
                                    errorDiscount.title
                                        ? 'border-red-500 ring-2 ring-red-300 shadow-red-200 text-red-600'
                                        : 'border-gray-300 focus:ring-2 focus:ring-muesli-200 shadow-muesli-300'
                                ]" placeholder="Nhập tiêu đề" />
                                <p v-if="errorDiscount.title" class="text-red-500 text-sm mt-1">{{ errorDiscount.title
                                }}
                                </p>
                            </div>
                            <div>
                                <label class="text-muesli-400">Mô Tả</label><br />
                                <textarea type="text" v-model="discount.description" :class="[
                                    'w-full h-20 p-3 rounded-lg focus:outline-none px-5 text-center shadow-sm',
                                    errorDiscount.description
                                        ? 'border-red-500 ring-2 ring-red-300 shadow-red-200 text-red-600'
                                        : 'border-gray-300 focus:ring-2 focus:ring-muesli-200 shadow-muesli-300'
                                ]" placeholder="Nhập mô tả"></textarea>
                                <p v-if="errorDiscount.description" class="text-red-500 text-sm mt-1">{{
                                    errorDiscount.description }}</p>
                            </div>
                            <div>
                                <label class="text-muesli-400">Mã Giảm Giá</label><br />
                                <input type="text" v-model="discount.discountCode" :class="[
                                    'w-full h-10 rounded-lg focus:outline-none px-5 text-center shadow-sm',
                                    errorDiscount.discountCode
                                        ? 'border-red-500 ring-2 ring-red-300 shadow-red-200 text-red-600'
                                        : 'border-gray-300 focus:ring-2 focus:ring-muesli-200 shadow-muesli-300'
                                ]" placeholder="Nhập mã giảm giá" />
                                <p v-if="errorDiscount.discountCode" class="text-red-500 text-sm mt-1">{{
                                    errorDiscount.discountCode }}</p>
                            </div>
                            <div>
                                <label class="text-muesli-400">Loại Giảm Giá</label><br />
                                <select v-model="discount.discountType" :class="[
                                    'w-full h-10 rounded-lg focus:outline-none px-5 text-center shadow-sm',
                                    errorDiscount.discountType
                                        ? 'border-red-500 ring-2 ring-red-300 shadow-red-200 text-red-600'
                                        : 'border-gray-300 focus:ring-2 focus:ring-muesli-200 shadow-muesli-300'
                                ]">
                                    <option value="Normal">Giảm theo phần trăm</option>
                                </select>
                                <p v-if="errorDiscount.discountType" class="text-red-500 text-sm mt-1">{{
                                    errorDiscount.discountType }}</p>
                            </div>
                            <div>
                                <label class="text-muesli-400">Giá Trị</label><br />
                                <input type="number" v-model="discount.discountValue" :class="[
                                    'w-full h-10 rounded-lg focus:outline-none px-5 text-center shadow-sm',
                                    errorDiscount.discountValue
                                        ? 'border-red-500 ring-2 ring-red-300 shadow-red-200 text-red-600'
                                        : 'border-gray-300 focus:ring-2 focus:ring-muesli-200 shadow-muesli-300'
                                ]" placeholder="Nhập mã giảm giá" />
                                <p v-if="errorDiscount.discountValue" class="text-red-500 text-sm mt-1">{{
                                    errorDiscount.discountValue }}</p>
                            </div>
                            <div>
                                <label class="text-muesli-400">Ngày Bắt Đầu</label><br />
                                <input type="datetime-local" v-model="discount.startDate" :class="[
                                    'w-full h-10 rounded-lg focus:outline-none px-5 text-center shadow-sm',
                                    errorDiscount.startDate
                                        ? 'border-red-500 ring-2 ring-red-300 shadow-red-200 text-red-600'
                                        : 'border-gray-300 focus:ring-2 focus:ring-muesli-200 shadow-muesli-300'
                                ]" placeholder="Nhập mã giảm giá" />
                                <p v-if="errorDiscount.startDate" class="text-red-500 text-sm mt-1">{{
                                    errorDiscount.startDate }}</p>
                            </div>
                            <div>
                                <label class="text-muesli-400">Ngày Kết Thúc</label><br />
                                <input type="datetime-local" v-model="discount.endDate" :class="[
                                    'w-full h-10 rounded-lg focus:outline-none px-5 text-center shadow-sm',
                                    errorDiscount.startDate
                                        ? 'border-red-500 ring-2 ring-red-300 shadow-red-200 text-red-600'
                                        : 'border-gray-300 focus:ring-2 focus:ring-muesli-200 shadow-muesli-300'
                                ]" placeholder="Nhập giá trị" />
                                <p v-if="errorDiscount.endDate" class="text-red-500 text-sm mt-1">{{
                                    errorDiscount.endDate }}</p>
                            </div>
                            <div>
                                <label class="text-muesli-400">Trạng Thái</label><br />
                                <div class="relative">
                                    <select v-model="discount.status" :class="[
                                        'appearance-none w-full h-10 rounded-lg focus:outline-none px-5 text-center shadow-sm',
                                        errorDiscount.status
                                            ? 'border-red-500 ring-2 ring-red-300 shadow-red-200 text-red-600'
                                            : 'border-gray-300 focus:ring-2 focus:ring-muesli-200 shadow-muesli-300'
                                    ]">
                                        <option value="ACTIVE">Active</option>
                                        <option value="INACTIVE">Inactive</option>
                                    </select>
                                    <div class="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                                        <ChevronDown class="w-5 h-5 text-gray-400" />
                                    </div>
                                </div>
                                <p v-if="errorDiscount.status" class="text-red-500 text-sm mt-1">{{
                                    errorDiscount.status }}</p>
                            </div>
                            <div class="flex justify-center gap-2">
                                <button type="button" @click.prevent="handleCreateDiscount"
                                    class="bg-muesli-400 hover:bg-muesli-600 text-white px-3 py-2 rounded-sm w-[80px]">
                                    Tạo
                                </button>
                                <button type="button" @click.prevent="handleUpdateDiscount"
                                    class="bg-muesli-400 hover:bg-muesli-600 text-white px-3 py-2 rounded-sm">
                                    Cập Nhật
                                </button>
                                <button type="button" @click.prevent="handleDeleteDiscount"
                                    class="bg-muesli-400 hover:bg-muesli-600 text-white px-3 py-2 rounded-sm w-[80px]">
                                    Xóa
                                </button>
                                <button @click.prevent="resetDiscount"
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
                                <tr class="hover:bg-muesli-100 transition odd:bg-white even:bg-gray-100"
                                    v-for="discount in paginatedDiscounts" :key="discount.id">
                                    <td class="py-2">{{ discount.title }}</td>
                                    <td class="py-2">{{ discount.discountCode }}</td>
                                    <td class="py-2">{{ discount.discountType }}</td>
                                    <td class="py-2">{{ discount.discountValue }}%</td>
                                    <td class="py-2">{{ discount.startDate.slice(0, 10) }}</td>
                                    <td class="py-2">{{ discount.endDate.slice(0, 10) }}</td>
                                    <td class="py-2"
                                        :class="discount.status == 'INACTIVE' ? 'text-red-500' : 'text-green-500'">{{
                                            discount.status }}</td>
                                    <td class="py-2 flex justify-center items-center gap-2 h-full m-1.5">
                                        <button @click="updateDiscountStatus(discount)"
                                            v-if="discount.status === 'ACTIVE'" class=" hover:text-green-700 m-1.5"
                                            :class="discount.status === 'ACTIVE' ? ' text-green-500 ' : ''">
                                            <LockKeyholeOpen />
                                        </button>
                                        <button @click="updateDiscountStatus(discount)" v-else
                                            class="hover:text-red-700 m-1.5"
                                            :class="discount.status === 'INACTIVE' ? ' text-red-500' : ''">
                                            <LockKeyhole />
                                        </button>
                                        <button @click="getDiscountById(discount.id)"
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
                            <button @click="currentPage--" :disabled="currentPage == 1"
                                class="hover:bg-muesli-100 w-10 h-10 flex items-center justify-center rounded-4xl">
                                <ChevronLeft />
                            </button>
                            <button @click="currentPage++" :disabled="currentPage == totalPages"
                                class="hover:bg-muesli-100 w-10 h-10 flex items-center justify-center rounded-4xl">
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
    LockKeyholeOpen,
    LockKeyhole,
    ChevronLeft,
    ChevronRight,
} from "lucide-vue-next";
import { Button } from "@/components/ui/button";
import { ref, onMounted, computed } from "vue";
import { toast } from 'vue-sonner'

import { Rank } from '@/api/rank';
const { rank, ranks, getAllRank, createRank, updateRank, deleteRank, isLoading } = Rank();
import { Discount } from '@/api/discount';
import { error } from 'console';
const { discount, discounts, getAllDiscount, createDiscount, updateDiscount, deleteDiscount } = Discount();
import { Vouchers } from '@/api/voucher';
const { vouchers, voucher, getAllVouchers, createVoucher, updateVoucher, deleteVoucher } = Vouchers();

const currentPage = ref(1);
const pageSize = ref(10);
// Rank
const errorRank = ref({
    nameRank: '',
    minPointRequired: '',
    discount_percent: ''
})

const validateRankForm = () => {
    let isValid = true;
    errorRank.value = {
        nameRank: '',
        minPointRequired: '',
        discount_percent: ''
    };
    if (!rank.value.nameRank || rank.value.nameRank.trim() === '') {
        errorRank.value.nameRank = 'Vui lòng nhập tên hạng hợp lệ';
        isValid = false;
    }
    if (rank.value.minPointRequired == null || rank.value.minPointRequired < 1) {
        errorRank.value.minPointRequired = 'Vui lòng nhập điểm hạng hợp lệ';
        isValid = false;
    }
    if (rank.value.discount_percent == null || rank.value.discount_percent < 0) {
        errorRank.value.discount_percent = 'Vui lòng nhập giá trị giảm hợp lệ';
        isValid = false;
    }
    return isValid;
}
const getRankById = async (id: number) => {
    const selectRank = ranks.value.find((rank) => rank.id === id);
    if (selectRank) rank.value = { ...selectRank };
}

const handleCreateRank = async () => {
    if (!validateRankForm()) return;
    await createRank(rank.value);
    await getAllRank();
    resetRank();
}

const handleUpdateRank = async () => {
    // if (!validateRankForm()) return;
    if (rank.value.id === 0) {
        toast.error('Vui lòng chọn hạng để cập nhật');
        return;
    }
    await updateRank(rank.value);
    await getAllRank();
    resetRank();
}

const handleDeleteRank = async () => {
    if (rank.value.id === 0) {
        toast.error('Vui lòng chọn hạng để xoá');
        return;
    }
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
    errorRank.value = {
        nameRank: '',
        minPointRequired: '',
        discount_percent: ''
    };
}

// Discount
const errorDiscount = ref({
    title: '',
    description: '',
    discountCode: '',
    discountType: '',
    discountValue: '',
    startDate: '',
    endDate: '',
    status: ''
});

const validateDiscountForm = () => {
    let isValid = true;
    errorDiscount.value = {
        title: '',
        description: '',
        discountCode: '',
        discountType: '',
        discountValue: '',
        startDate: '',
        endDate: '',
        status: ''
    };
    if (!discount.value.title || discount.value.title.trim() === '') {
        errorDiscount.value.title = 'Vui lòng nhập tiêu đề hợp lệ';
        isValid = false;
    }
    if (!discount.value.description || discount.value.description.trim() === '') {
        errorDiscount.value.description = 'Vui lòng nhập mô tả hợp lệ';
        isValid = false;
    }
    if (!discount.value.discountCode || discount.value.discountCode.trim() === '') {
        errorDiscount.value.discountCode = 'Vui lòng nhập mã giảm giá hợp lệ';
        isValid = false;
    }
    if (discount.value.discountType === '') {
        errorDiscount.value.discountType = 'Vui lòng chọn loại giảm giá';
        isValid = false;
    }
    if (discount.value.discountValue <= 0) {
        errorDiscount.value.discountValue = 'Vui lòng nhập giá trị giảm hợp lệ';
        isValid = false;
    }
    if (!discount.value.startDate) {
        errorDiscount.value.startDate = 'Vui lòng chọn ngày bắt đầu';
        isValid = false;
    }
    if (!discount.value.endDate) {
        errorDiscount.value.endDate = 'Vui lòng chọn ngày kết thúc';
        isValid = false;
    }
    if (discount.value.startDate && discount.value.endDate && new Date(discount.value.startDate) >= new Date(discount.value.endDate)) {
        errorDiscount.value.endDate = 'Ngày kết thúc phải sau ngày bắt đầu';
        isValid = false;
    }
    if (!discount.value.status) {
        errorDiscount.value.status = 'Vui lòng chọn trạng thái';
        isValid = false;
    }
    return isValid;
}

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
    if (!validateDiscountForm()) return;
    await createDiscount(discount.value);
    await getAllDiscount();
    resetDiscount();
}

const handleUpdateDiscount = async () => {
    if (discount.value.id === 0) {
        toast.error('Vui lòng chọn mã giảm giá để cập nhật');
        return;
    }
    await updateDiscount(discount.value);
    await getAllDiscount();
    resetDiscount();
}

const handleDeleteDiscount = async () => {
    if (discount.value.id === 0) {
        toast.error('Vui lòng chọn mã giảm giá để xoá');
        return;
    }
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
    errorDiscount.value = {
        title: '',
        description: '',
        discountCode: '',
        discountType: '',
        discountValue: '',
        startDate: '',
        endDate: '',
        status: ''
    };
}

const updateDiscountStatus = async (discount: any) => {
    discount.status = discount.status === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE';
    await updateDiscount(discount);
}

const paginatedDiscounts = computed(() => {
    const startIndex = (currentPage.value - 1) * pageSize.value;
    const endIndex = startIndex + pageSize.value;
    return discounts.value.slice(startIndex, endIndex);
});

// Vouchers
const errorVoucher = ref({
    code: '',
    discountValue: '',
    estatus: ''
});
const validateVoucherForm = () => {
    let isValid = true;
    errorVoucher.value = {
        code: '',
        discountValue: '',
        estatus: ''
    };
    if (!voucher.value.code || voucher.value.code.trim() === '') {
        errorVoucher.value.code = 'Vui lòng nhập mã giảm giá hợp lệ';
        isValid = false;
    }
    if (voucher.value.discountValue <= 0) {
        errorVoucher.value.discountValue = 'Vui lòng nhập giá trị giảm hợp lệ';
        isValid = false;
    }
    if (!voucher.value.estatus) {
        errorVoucher.value.estatus = 'Vui lòng chọn trạng thái';
        isValid = false;
    }
    return isValid;
}

const getVoucherById = (id: number) => {
    const selected = vouchers.value.find(item => item.id === id);
    if (selected) {
        voucher.value = {
            ...selected,
            estatus: selected.estatus || 'ACTIVE'
        };
    }
};
const handleCreateVoucher = async () => {
    if (!validateVoucherForm()) return;
    console.log('Voucher:', voucher.value);
    await createVoucher(voucher.value);
    await getAllVouchers();
    resetVoucher();
}
const handleUpdateVoucher = async () => {
    if (voucher.value.id === 0) {
        toast.error('Vui lòng chọn mã giảm giá để cập nhật');
        return;
    }
    voucher.value.estatus === 'ACTIVE' ? false : true ;
    console.log('Voucher:', voucher.value);
    console.log("Thông tin đây nè",JSON.stringify(voucher.value));
    await updateVoucher(voucher.value);
    await getAllVouchers();
    resetVoucher();
}
// const handleDeleteVoucher = async () => {
//     if (voucher.value.id === 0) {
//         toast.error('Vui lòng chọn má giảm giá để xoá');
//         return;
//     }
//     await deleteVoucher(voucher.value.id);
//     await getAllVouchers();
//     resetVoucher();
// }
const resetVoucher = () => {
    voucher.value = {
        id: 0,
        code: '',
        discountValue: 0,
        estatus: 'ACTIVE'
    };
    errorVoucher.value = {
        code: '',
        discountValue: '',
        estatus: ''
    };
}

const updateVoucherStatus = async (voucher: any) => {
    voucher.estatus = voucher.estatus === 'ACTIVE' ? false : true ;
    console.log("Thông tin đây nè",JSON.stringify(voucher));
    await updateVoucher(voucher);
}

onMounted(async () => {
    await getAllRank();
    await getAllDiscount();
    await getAllVouchers();
    console.log('Vouchers:', vouchers.value);
})
</script>