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
                                <td class="py-2" :class="getBlacklistClass(user.eblacklist)">{{ user.eblacklist == 1 ? 'Normal' : 'Blacklist' }}</td>
                                <td class="py-2">{{ user.rank && user.rank.nameRank ? user.rank.nameRank : 'Không có' }}</td>
                                <td class="py-2">{{ user.point }}</td>
                                <td class="py-2 flex justify-center items-center gap-5 h-full">
                                    <button @click.prevent="handleUpdateEblacklist(user)"
                                        class="text-green-500 hover:text-green-700 m-1.5">
                                        <LockKeyholeOpen class="w-5.5 h-5.5" />
                                    </button>
                                    <button @click="openUpdateUser(user)"
                                        class="text-blue-400 hover:text-blue-700">
                                        <SquarePen class="w-5.5 h-5.5"/>
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
                                <td class="py-2">{{ blacklist.gender == true ? 'Nam' : 'Nữ' }}</td>
                                <td class="py-2">{{ blacklist.birthday }}</td>
                                <td class="py-2">{{ blacklist.email }}</td>
                                <td class="py-2" :class="getBlacklistClass(blacklist.eblacklist)">{{ blacklist.eblacklist == 1 ? 'Normal' : 'Blacklist' }}</td>
                                <td class="py-2">{{ blacklist.rank && blacklist.rank.nameRank ? blacklist.rank.nameRank : 'Không có' }}</td>
                                <td class="py-2">{{ blacklist.point }}</td>
                                <td class="py-2 flex justify-center items-center gap-5 h-full">
                                    <button @click.prevent="handleUpdateEblacklistAgain(blacklist)"
                                        class="hover:text-red-700 m-1.5 text-red-500">
                                        <LockKeyhole class="w-5.5 h-5.5" />
                                    </button>
                                    <button @click.prevent="openUpdateUser(blacklist)"
                                        class="text-blue-400 hover:text-blue-700">
                                        <SquarePen class="w-5.5 h-5.5"/>
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
            </TabsContent>
        </Tabs>
    </section>
    <UpdateCustomerDialog v-model:open="openUpdateUserDialog" :user="selectedUser"></UpdateCustomerDialog>
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
    LockKeyholeOpen,
    SquarePen,
    LockKeyhole,
    ChevronLeft,
    ChevronRight,
} from "lucide-vue-next";
import UpdateCustomerDialog from "@/components/administration/UserDialog/UpdateCustomerDialog.vue";
import { Button } from "@/components/ui/button";
import { ref, onMounted, computed } from "vue";
import { User } from "@/api/user";
const Users = User();
const openUpdateUserDialog = ref(false);

const filteredUsers = computed(() =>
    Users.users.filter(user => user.role?.id === 2 && user.eblacklist !== 3)
);

const filteredBlackList = computed(() =>
    Users.users.filter(user => user.eblacklist == 3 && user.role?.id === 2)
);

const getBlacklistClass = (blacklist: number) => {
    switch (blacklist) {
        case 1:
            return 'text-green-400';
        case 3:
            return 'text-red-500';
        case 2:
            return 'text-yellow-500';
        default:
            return '';
    }
};

const selectedUser = ref(null);
const openUpdateUser = (user: any) => {
    selectedUser.value = { ...user };
    openUpdateUserDialog.value = true;
};

const handleUpdateEblacklist = async (user: any) => {
    const payLoad = {
        id: user.id,
        phone: String(user.phone),
        email: user.email,
        password: user.password,
        gender: user.gender,
        birthday: user.birthday,
        updateDate: new Date().toISOString(),
        fullname: user.fullname,
        cccd: String(user.cccd),
        point: user.point,
        eblacklist: 3,
        roleId: 2,
        rankId: user.rank.id
    };
    console.log(JSON.stringify(payLoad, null, 2));
    await Users.updataReceptionist(payLoad);
    openUpdateUserDialog.value = false;
    await Users.getAllUser();
};

const handleUpdateEblacklistAgain = async (blacklist: any) => {
    const payLoad = {
        id: blacklist.id,
        phone: String(blacklist.phone),
        email: blacklist.email,
        password: blacklist.password,
        gender: blacklist.gender,
        birthday: blacklist.birthday,
        updateDate: new Date().toISOString(),
        fullname: blacklist.fullname,
        cccd: String(blacklist.cccd),
        point: blacklist.point,
        eblacklist: 1,
        roleId: 2,
        rankId: blacklist.rank.id
    };
    console.log(JSON.stringify(payLoad, null, 2));
    await Users.updataReceptionist(payLoad);
    openUpdateUserDialog.value = false;
    await Users.getAllUser();
};

onMounted(async () => {
    await Users.getAllUser();
});
</script>