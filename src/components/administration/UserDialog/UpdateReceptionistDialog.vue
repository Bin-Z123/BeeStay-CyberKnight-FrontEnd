<template>
    <Dialog :open="open" @update:open="emit('update:open', $event)">
        <DialogContent class="sm:max-w-[425px]" @pointer-down-outside.prevent @escape-key-down.prevent>
            <form action="" class="flex flex-col gap-3">
                <DialogHeader>
                    <DialogTitle class="font-bold text-muesli-400">Cập Nhật Thông Tin Nhân Viên</DialogTitle>
                    <hr class="text-muesli-400 bg-muesli-400 h-[2px]" />
                </DialogHeader>
                <div>
                    <label class="text-muesli-400">Họ Tên</label><br />
                    <input type="text" v-model="localReceptionist.fullname"
                        class="w-full h-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-muesli-200 shadow-sm shadow-muesli-300 px-5 text-center"
                        placeholder="Nhập họ tên" />
                </div>
                <div>
                    <label class="text-muesli-400">Email</label><br />
                    <input type="email" v-model="localReceptionist.email"
                        class="w-full h-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-muesli-200 shadow-sm shadow-muesli-300 px-5 text-center"
                        placeholder="Nhập email" />
                </div>
                <div>
                    <label class="text-muesli-400">Số Điện Thoại</label><br />
                    <input type="number" v-model="localReceptionist.phone"
                        class="w-full h-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-muesli-200 shadow-sm shadow-muesli-300 px-5 text-center"
                        placeholder="Nhập số điện thoại" />
                </div>
                <div>
                    <label class="text-muesli-400">Mật Khẩu</label><br />
                    <input type="password" v-model="localReceptionist.password"
                        class="w-full h-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-muesli-200 shadow-sm shadow-muesli-300 px-5 text-center"
                        placeholder="Nhập mật khẩu" />
                </div>
                <div>
                    <label class="text-muesli-400 block mb-2">Giới tính</label>
                    <div class="flex gap-5">
                        <label class="flex items-center gap-2">
                            <input type="radio" :value="true" v-model="localReceptionist.gender" />
                            Nam
                        </label>
                        <label class="flex items-center gap-2">
                            <input type="radio" :value="false" v-model="localReceptionist.gender" />
                            Nữ
                        </label>
                    </div>
                </div>
                <div>
                    <label class="text-muesli-400">Ngày Sinh</label><br />
                    <input type="date" v-model="localReceptionist.birthday"
                        class="w-full h-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-muesli-200 shadow-sm shadow-muesli-300 px-5 text-center" />
                </div>
                <div>
                    <label class="text-muesli-400">CCCD</label><br />
                    <input type="number" v-model="localReceptionist.cccd"
                        class="w-full h-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-muesli-200 shadow-sm shadow-muesli-300 px-5 text-center"
                        placeholder="Nhập cccd" />
                </div>
                <div>
                    <label class="text-muesli-400 block mb-2">Quyền</label>
                    <select v-model="localReceptionist.role.id"
                        class="w-full h-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-muesli-200 shadow-sm shadow-muesli-300 px-5">
                        <option v-for="role in roles" :key="role.id" :value="role.id">
                            {{ role.roleName }}
                        </option>
                    </select>
                </div>
                <DialogFooter>
                    <button @click="handleUpdateReceptionist" type="button"
                        class="bg-muesli-400 hover:bg-muesli-600 text-white px-3 py-2 rounded-sm">
                        Lưu
                    </button>
                </DialogFooter>
            </form>
        </DialogContent>
    </Dialog>
</template>
<script setup lang="ts">
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
const emit = defineEmits<{
    (e: "update:open", value: boolean): void;
}>();
const props = defineProps<{
    open: boolean;
    user: any;
}>();
import { User } from "@/api/user";
import { Role } from "@/api/role";
import { ref, onMounted, watch } from "vue";
const users = User();
const { roles, getAllRoles } = Role();

const localReceptionist = ref({ ...props.user });

watch(() => props.user, (newVal) => {
    if (newVal) {
        localReceptionist.value = { ...newVal };
    }
}, { immediate: true });


const handleUpdateReceptionist = async () => {
    await users.updataReceptionist(localReceptionist.value.user);
    await users.getAllUser();
    emit("update:open", false);
}

onMounted(async () => {
    await getAllRoles();
    console.log(roles.value);
});
</script>
