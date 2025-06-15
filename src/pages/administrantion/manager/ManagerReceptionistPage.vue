<template>
    <section>
        <div class="flex">
            <div class="w-2/3">
                <input type="text"
                    class="mx-4 my-3 h-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-muesli-200 shadow-sm shadow-muesli-300 px-5 text-center"
                    placeholder="Tìm kiếm">
            </div>
            <div class="w-1/3 flex justify-end">
                <Button @click="openCreateUserDialog = true"
                        class="bg-white text-muesli-400 border border-muesli-400 hover:bg-muesli-400 hover:text-white mx-4 my-3">
                        Thêm
                    </Button>
                <CreateReceptionistDialog v-model:open="openCreateUserDialog"></CreateReceptionistDialog>
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
            <div class="bg-white h-15 shadow-lg flex items-center justify-end gap-2 px-5">
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
import { Button } from "@/components/ui/button";
import { ref, onMounted, computed } from "vue";
import CreateReceptionistDialog from '@/components/administration/UserDialog/CreateReceptionistDialog.vue';
import { User } from "@/api/user";

const Users = User();
const openCreateUserDialog = ref(false);

const filteredUsers = computed(() =>
    Users.users.filter(user => user.role?.id === 1)
);

onMounted(async () => {
    await Users.getAllUser();
});
</script>