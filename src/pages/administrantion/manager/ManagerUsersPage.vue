<template>
    <section>
        <Tabs default-value="user" class="">
            <div class="flex">
                <div class="w-1/2">
                    <TabsList class="grid grid-cols-3 mx-4 mt-2 bg-muesli-300 rounded-b-none shadow-sm">
                        <TabsTrigger value="user"
                            class="rounded-b-none my-[2px] text-white data-[state=active]:bg-white data-[state=active]:text-muesli-600 font-semibold">
                            Khách Hàng
                        </TabsTrigger>
                        <TabsTrigger value="guest"
                            class="rounded-b-none my-[2px] text-white data-[state=active]:bg-white data-[state=active]:text-muesli-600 font-semibold">
                            Khách
                        </TabsTrigger>
                        <TabsTrigger value="blacklist"
                            class="rounded-b-none my-[2px] text-white data-[state=active]:bg-white data-[state=active]:text-muesli-600 font-semibold">
                            Danh Sách Đen
                        </TabsTrigger>
                    </TabsList>
                </div>
                <div class="w-1/2 flex justify-end px-4 mt-2">
                    <input type="text" placeholder="Tìm kiếm"
                        class="h-9 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-muesli-200 shadow-sm shadow-muesli-300 px-5 text-center">
                </div>
            </div>


            <TabsContent value="user">
                <div class="px-4">
                    <table class="w-full border border-gray-300 text-sm text-center bg-white">
                        <thead class="bg-gradient-to-r from-muesli-200 to-muesli-400 text-white">
                            <tr>
                                <th class="px-4 py-2 border">Khách Hàng</th>
                                <th class="px-4 py-2 border">Giới Tính</th>
                                <th class="px-4 py-2 border">Ngày Sinh</th>
                                <th class="px-4 py-2 border">Email</th>
                                <th class="px-4 py-2 border">Trạng Thái</th>
                                <th class="px-4 py-2 border">Xếp Hạng</th>
                                <th class="px-4 py-2 border">Tích Điểm</th>
                                <th class="px-4 py-2 border">Tùy Chọn</th>
                            </tr>
                        </thead>
                        <tbody class="text-gray-700">
                            <tr class="hover:bg-muesli-100 transition odd:bg-white even:bg-gray-100"
                                v-for="user in filteredUsers" :key="user.id">
                                <td class="py-2">{{ user.fullname }}</td>
                                <td class="py-2">{{ user.gender == true ? 'Nam' : 'Nữ' }}</td>
                                <td class="py-2">{{ user.birthday }}</td>
                                <td class="py-2">{{ user.email }}</td>
                                <td class="py-2" :class="getBlacklistClass(user.eBlacklist)">{{ user.eBlacklist }}</td>
                                <td class="py-2">Đồng</td>
                                <td class="py-2">{{ user.point }}</td>
                                <td class="py-2 flex justify-center items-center gap-5 h-full">
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
            </TabsContent>
            <TabsContent value="guest">
                <div class="px-4">
                    <table class="w-full border border-gray-300 text-sm text-center bg-white">
                        <thead class="bg-gradient-to-r from-muesli-200 to-muesli-400 text-white">
                            <tr>
                                <th class="px-4 py-2 border">Khách Hàng</th>
                                <th class="px-4 py-2 border">Giới Tính</th>
                                <th class="px-4 py-2 border">Ngày Sinh</th>
                                <th class="px-4 py-2 border">Email</th>
                                <th class="px-4 py-2 border">Trạng Thái</th>
                                <th class="px-4 py-2 border">Xếp Hạng</th>
                                <th class="px-4 py-2 border">Tích Điểm</th>
                                <th class="px-4 py-2 border">Tùy Chọn</th>
                            </tr>
                        </thead>
                        <tbody class="text-gray-700">
                            <tr class="hover:bg-muesli-100 transition odd:bg-white even:bg-gray-100" v-for="i in 10"
                                :key="i">
                                <td class="py-2">Thịnh</td>
                                <td class="py-2">Nam</td>
                                <td class="py-2">01-01-2001</td>
                                <td class="py-2">Thinh@gmail.com</td>
                                <td class="py-2">...</td>
                                <td class="py-2">Bạc</td>
                                <td class="py-2">{{ i }}</td>
                                <td class="py-2 flex justify-center items-center gap-5 h-full">
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
            </TabsContent>
            <TabsContent value="blacklist">
                <div class="px-4">
                    <table class="w-full border border-gray-300 text-sm text-center bg-white">
                        <thead class="bg-gradient-to-r from-muesli-200 to-muesli-400 text-white">
                            <tr>
                                <th class="px-4 py-2 border">Khách Hàng</th>
                                <th class="px-4 py-2 border">Giới Tính</th>
                                <th class="px-4 py-2 border">Ngày Sinh</th>
                                <th class="px-4 py-2 border">Email</th>
                                <th class="px-4 py-2 border">Trạng Thái</th>
                                <th class="px-4 py-2 border">Xếp Hạng</th>
                                <th class="px-4 py-2 border">Tích Điểm</th>
                                <th class="px-4 py-2 border">Tùy Chọn</th>
                            </tr>
                        </thead>
                        <tbody class="text-gray-700">
                            <tr class="hover:bg-muesli-100 transition odd:bg-white even:bg-gray-100"
                                v-for="blacklist in filteredBlackList" :key="blacklist.id">
                                <td class="py-2">{{ blacklist.fullname }}</td>
                                <td class="py-2">{{ blacklist.gender }}</td>
                                <td class="py-2">{{ blacklist.birthday }}</td>
                                <td class="py-2">{{ blacklist.email }}</td>
                                <td class="py-2" :class="getBlacklistClass(blacklist.eBlacklist)">{{
                                    blacklist.eBlacklist }}</td>
                                <td class="py-2">Gỗ</td>
                                <td class="py-2">{{ blacklist.point }}</td>
                                <td class="py-2 flex justify-center items-center gap-5 h-full">
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
import { User } from "@/api/user";
const Users = User();

const filteredUsers = computed(() =>
    Users.users.filter(user => user.role?.id === 2 && user.eBlacklist !== 'BLOCKED')
);

const filteredBlackList = computed(() =>
    Users.users.filter(user => user.eBlacklist == 'BLOCKED' && user.role?.id === 1)
);

const getBlacklistClass = (blacklist: string) => {
    switch (blacklist) {
        case 'NONE':
            return 'text-green-400';
        case 'SECOND':
            return 'text-red-500';
        case 'FIRST':
            return 'text-yellow-500';
        default:
            return '';
    }
};

onMounted(async () => {
    await Users.getAllUser();
});
</script>