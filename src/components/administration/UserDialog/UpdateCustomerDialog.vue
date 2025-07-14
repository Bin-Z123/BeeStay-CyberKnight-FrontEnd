<template>
    <Dialog :open="open" @update:open="emit('update:open', $event)">
        <DialogContent class="sm:max-w-[600px]" @pointer-down-outside.prevent @escape-key-down.prevent>
            <form action="" class="flex flex-col gap-3">
                <DialogHeader>
                    <DialogTitle class="font-bold text-muesli-400">Cập Nhật Thông Tin Khách Hàng</DialogTitle>
                    <hr class="text-muesli-400 bg-muesli-400 h-[2px]" />
                </DialogHeader>
                <div class="flex gap-5">
                    <div class="w-1/2 flex flex-col gap-2">
                        <div>
                            <label class="text-muesli-400">Họ Tên</label><br />
                            <input type="text" v-model="localReceptionist.fullname" :class="[
                                'w-full h-10 rounded-lg focus:outline-none px-5 text-center shadow-sm',
                                errorsUser.fullname
                                    ? 'border-red-500 ring-2 ring-red-300 shadow-red-200 text-red-600'
                                    : 'border-gray-300 focus:ring-2 focus:ring-muesli-200 shadow-muesli-300'
                            ]" placeholder="Nhập họ tên" />
                            <p v-if="errorsUser.fullname" class="text-red-500 text-sm mt-1">{{ errorsUser.fullname }}
                            </p>
                        </div>
                        <div>
                            <label class="text-muesli-400">Ngày Sinh</label><br />
                            <input type="date" v-model="localReceptionist.birthday" :class="[
                                'w-full h-10 rounded-lg focus:outline-none px-5 text-center shadow-sm',
                                errorsUser.birthday
                                    ? 'border-red-500 ring-2 ring-red-300 shadow-red-200 text-red-600'
                                    : 'border-gray-300 focus:ring-2 focus:ring-muesli-200 shadow-muesli-300'
                            ]" />
                            <p v-if="errorsUser.birthday" class="text-red-500 text-sm mt-1">{{ errorsUser.birthday }}
                            </p>
                        </div>
                        <div>
                            <label class="text-muesli-400">Mật Khẩu</label><br />
                            <input type="password" v-model="localReceptionist.password" :class="[
                                'w-full h-10 rounded-lg focus:outline-none px-5 text-center shadow-sm',
                                errorsUser.password
                                    ? 'border-red-500 ring-2 ring-red-300 shadow-red-200 text-red-600'
                                    : 'border-gray-300 focus:ring-2 focus:ring-muesli-200 shadow-muesli-300'
                            ]" placeholder="Nhập mật khẩu" />
                            <p v-if="errorsUser.password" class="text-red-500 text-sm mt-1">{{ errorsUser.password }}
                            </p>
                        </div>
                        <div>
                            <label class="text-muesli-400 block mb-2">Giới Tính</label>
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
                    </div>
                    <div class="w-1/2 flex flex-col gap-2">
                        <div>
                            <label class="text-muesli-400">Email</label><br />
                            <input type="email" v-model="localReceptionist.email" :class="[
                                'w-full h-10 rounded-lg focus:outline-none px-5 text-center shadow-sm',
                                errorsUser.email
                                    ? 'border-red-500 ring-2 ring-red-300 shadow-red-200 text-red-600'
                                    : 'border-gray-300 focus:ring-2 focus:ring-muesli-200 shadow-muesli-300'
                            ]" placeholder="Nhập email" />
                            <p v-if="errorsUser.email" class="text-red-500 text-sm mt-1">{{ errorsUser.email }}</p>
                        </div>
                        <div>
                            <label class="text-muesli-400">Số Điện Thoại</label><br />
                            <input type="text" v-model="localReceptionist.phone" :class="[
                                'w-full h-10 rounded-lg focus:outline-none px-5 text-center shadow-sm',
                                errorsUser.phone
                                    ? 'border-red-500 ring-2 ring-red-300 shadow-red-200 text-red-600'
                                    : 'border-gray-300 focus:ring-2 focus:ring-muesli-200 shadow-muesli-300'
                            ]" placeholder="Nhập số điện thoại" />
                            <p v-if="errorsUser.phone" class="text-red-500 text-sm mt-1">{{ errorsUser.phone }}</p>
                        </div>
                        <div>
                            <label class="text-muesli-400">CCCD</label><br />
                            <input type="text" v-model="localReceptionist.cccd" :class="[
                                'w-full h-10 rounded-lg focus:outline-none px-5 text-center shadow-sm',
                                errorsUser.cccd
                                    ? 'border-red-500 ring-2 ring-red-300 shadow-red-200 text-red-600'
                                    : 'border-gray-300 focus:ring-2 focus:ring-muesli-200 shadow-muesli-300'
                            ]" placeholder="Nhập cccd" />
                            <p v-if="errorsUser.cccd" class="text-red-500 text-sm mt-1">{{ errorsUser.cccd }}</p>
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
                    </div>
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

const errorsUser = ref({
    fullname: "",
    birthday: "",
    password: "",
    email: "",
    phone: "",
    cccd: "",
    roleId: ""
});

const validateForm = () => {
    let isValid = true;
    errorsUser.value = {
        fullname: "",
        birthday: "",
        password: "",
        email: "",
        phone: "",
        cccd: "",
        roleId: ""
    };

    const u = localReceptionist.value;

    const fullname = (u.fullname ?? '').toString().trim();
    const birthday = (u.birthday ?? '').toString().trim();
    const password = (u.password ?? '').toString().trim();
    const email = (u.email ?? '').toString().trim();
    const phone = (u.phone ?? '').toString().trim();
    const cccd = (u.cccd ?? '').toString().trim();

    if (!fullname) {
        errorsUser.value.fullname = "Vui lòng nhập họ tên hợp lệ";
        isValid = false;
    }
    if (!birthday) {
        errorsUser.value.birthday = "Vui lòng nhập ngày sinh hợp lệ";
        isValid = false;
    }
    if (!password) {
        errorsUser.value.password = "Vui lòng nhập mật khẩu hợp lệ";
        isValid = false;
    }
    if (!email) {
        errorsUser.value.email = "Vui lòng nhập email hợp lệ";
        isValid = false;
    }
    if (!phone) {
        errorsUser.value.phone = "Vui lòng nhập số điện thoại hợp lệ";
        isValid = false;
    }
    if (!cccd) {
        errorsUser.value.cccd = "Vui lòng nhập số CCCD hợp lệ";
        isValid = false;
    }
    if (!u.role.id) {
        errorsUser.value.roleId = "Vui lòng chọn quyền hợp lệ";
        isValid = false;
    }

    return isValid;
}

const handleUpdateReceptionist = async () => {
    if (!validateForm()) return;
    const payLoad = {
        id: localReceptionist.value.id,
        phone: String(localReceptionist.value.phone),
        email: localReceptionist.value.email,
        password: localReceptionist.value.password,
        gender: localReceptionist.value.gender,
        birthday: localReceptionist.value.birthday,
        updateDate: new Date().toISOString(),
        fullname: localReceptionist.value.fullname,
        cccd: String(localReceptionist.value.cccd),
        point: 0,
        eblacklist: localReceptionist.value.eblacklist,
        roleId: localReceptionist.value.role.id,
        rankId: localReceptionist.value.rank.id
    };
    console.log(JSON.stringify(payLoad, null, 2));
    await users.updataReceptionist(payLoad);
    await users.getAllUser();
    emit("update:open", false);
}

onMounted(async () => {
    await getAllRoles();
    console.log(roles.value);
});
</script>
