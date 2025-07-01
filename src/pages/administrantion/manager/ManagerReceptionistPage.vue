<template>
    <section>
        <div class="flex">
            <div class="w-2/3">
                <input type="text" v-model="searchText"
                    class="mx-4 my-3 h-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-muesli-200 shadow-sm shadow-muesli-300 px-5 text-center"
                    placeholder="Tìm kiếm nhân viên ...">
            </div>
            <div class="w-1/3 flex justify-end">
                <Button @click="openCreateUserDialog = true"
                    class="bg-white text-muesli-400 border border-muesli-400 hover:bg-muesli-400 hover:text-white mx-4 my-3">
                    Thêm
                </Button>
            </div>
        </div>
        <div class="px-4">
            <table class="w-full border border-gray-300 text-sm text-center bg-white">
                <thead class="bg-gradient-to-r from-muesli-200 to-muesli-400 text-white">
                    <tr>
                        <th class="px-4 py-2 border">Nhân Viên</th>
                        <th class="px-4 py-2 border">Giới Tính</th>
                        <th class="px-4 py-2 border">Ngày Sinh</th>
                        <th class="px-4 py-2 border">Email</th>
                        <th class="px-4 py-2 border">Ngày Tạo</th>
                        <th class="px-4 py-2 border">Tùy Chọn</th>
                    </tr>
                </thead>
                <tbody class="text-gray-700">
                    <tr class="hover:bg-muesli-100 transition odd:bg-white even:bg-gray-100"
                        v-for="user in paginatedUsers" :key="user.id">
                        <td class="py-2">{{ user.fullname }}</td>
                        <td class="py-2">{{ user.gender == true ? 'Nam' : 'Nữ' }}</td>
                        <td class="py-2">{{ user.birthday }}</td>
                        <td class="py-2">{{ user.email }}</td>
                        <td class="py-2">{{ user.joinDate.split('T')[0] }}</td>
                        <td class="py-2 flex justify-center items-center gap-2 h-full">
                            <button @click="handleUpdateBlock(user)" v-if="user.eblacklist === 0"
                                class=" hover:text-green-700 m-1.5"
                                :class="user.eblacklist === 0 ? ' text-green-500 ' : ''">
                                <LockKeyholeOpen class="w-5.5 h-5.5" />
                            </button>
                            <button @click="handleUpdateBlock(user)" v-else class="hover:text-red-700 m-1.5"
                                :class="user.eblacklist === 2 ? ' text-red-500' : ''">
                                <LockKeyhole class="w-5.5 h-5.5" />
                            </button>
                            <button @click="openUpdateReceptionist(user)" class="text-blue-400 hover:text-blue-700">
                                <SquarePen class="w-5.5 h-5.5" />
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
    </section>
    <CreateReceptionistDialog v-model:open="openCreateUserDialog"></CreateReceptionistDialog>
    <UpdateReceptionistDialog v-model:open="openUpdateUserDialog" :user="selectedReceptionist">
    </UpdateReceptionistDialog>
</template>
<script setup lang="ts">
import {
    ChevronDown,
    SquarePen,
    LockKeyhole,
    ChevronLeft,
    ChevronRight,
    LockKeyholeOpen,
} from "lucide-vue-next";
import { Button } from "@/components/ui/button";
import { ref, onMounted, computed } from "vue";
import CreateReceptionistDialog from '@/components/administration/UserDialog/CreateReceptionistDialog.vue';
import UpdateReceptionistDialog from "@/components/administration/UserDialog/UpdateReceptionistDialog.vue";
import { User } from "@/api/user";

const Users = User();
const openCreateUserDialog = ref(false);
const openUpdateUserDialog = ref(false);

// Tìm kiếm
const searchText = ref('');

const filteredUsers = computed(() => {
  return Users.users.filter(user => {
    const matchRole = user.role?.id === 1;
    const matchSearch =
      user.fullname?.toLowerCase().includes(searchText.value.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchText.value.toLowerCase());
    return matchRole && matchSearch;
  });
});

const selectedReceptionist = ref(null);
const openUpdateReceptionist = async (user: any) => {
    selectedReceptionist.value = { ...user };
    openUpdateUserDialog.value = true;
}

const handleUpdateBlock = async (user: any) => {
    const block = ref(0);
    if (user.eblacklist === 0) {
        block.value = 2;
    } else if (user.eblacklist === 2) {
        block.value = 0;
    }
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
        eblacklist: block.value,
        roleId: user.role.id,
        rankId: user.rank.id
    };
    console.log(JSON.stringify(payLoad, null, 2));
    await Users.updataReceptionist(payLoad);
    openUpdateUserDialog.value = false;
    await Users.getAllUser();
};

const currentPage = ref(1);
const pageSize = ref(10);
const totalPages = computed(() => {
  return Math.ceil(filteredUsers.value.length / pageSize.value);
});
const paginatedUsers = computed(() => {
  const startIndex = (currentPage.value - 1) * pageSize.value;
  const endIndex = startIndex + pageSize.value;
  return filteredUsers.value.slice(startIndex, endIndex);
});


onMounted(async () => {
    await Users.getAllUser();
});
</script>