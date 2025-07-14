<template>
  <Dialog :open="open" @update:open="emit('update:open', $event)">
    <DialogContent class="sm:max-w-[600px]" @pointer-down-outside.prevent @escape-key-down.prevent>
      <form action="" class="flex flex-col gap-3">
        <DialogHeader>
          <DialogTitle class="font-bold text-muesli-400">Thêm Nhân Viên Mới</DialogTitle>
          <hr class="text-muesli-400 bg-muesli-400 h-[2px]" />
        </DialogHeader>
        <div class="flex gap-5">
          <div class="w-1/2 flex flex-col gap-2">
            <div>
              <label class="text-muesli-400">Họ Tên</label><br />
              <input type="text" v-model="users.user.fullname" :class="[
                'w-full h-10 rounded-lg focus:outline-none px-5 text-center shadow-sm',
                errorsUser.fullname
                  ? 'border-red-500 ring-2 ring-red-300 shadow-red-200 text-red-600'
                  : 'border-gray-300 focus:ring-2 focus:ring-muesli-200 shadow-muesli-300'
              ]" placeholder="Nhập họ tên" />
              <p v-if="errorsUser.fullname" class="text-red-500 text-sm mt-1">{{ errorsUser.fullname }}</p>
            </div>
            <div>
              <label class="text-muesli-400">Ngày Sinh</label><br />
              <input type="date" v-model="users.user.birthday" :class="[
                'w-full h-10 rounded-lg focus:outline-none px-5 text-center shadow-sm',
                errorsUser.birthday
                  ? 'border-red-500 ring-2 ring-red-300 shadow-red-200 text-red-600'
                  : 'border-gray-300 focus:ring-2 focus:ring-muesli-200 shadow-muesli-300'
              ]" />
              <p v-if="errorsUser.birthday" class="text-red-500 text-sm mt-1">{{ errorsUser.birthday }}</p>
            </div>
            <div>
              <label class="text-muesli-400">Mật Khẩu</label><br />
              <input type="password" v-model="users.user.password" :class="[
                'w-full h-10 rounded-lg focus:outline-none px-5 text-center shadow-sm',
                errorsUser.password
                  ? 'border-red-500 ring-2 ring-red-300 shadow-red-200 text-red-600'
                  : 'border-gray-300 focus:ring-2 focus:ring-muesli-200 shadow-muesli-300'
              ]" placeholder="Nhập mật khẩu" />
              <p v-if="errorsUser.password" class="text-red-500 text-sm mt-1">{{ errorsUser.password }}</p>
            </div>
            <div>
              <label class="text-muesli-400 block mb-2">Giới Tính</label>
              <div class="flex gap-5">
                <label class="flex items-center gap-2">
                  <input type="radio" :value="true" v-model="users.user.gender" />
                  Nam
                </label>
                <label class="flex items-center gap-2">
                  <input type="radio" :value="false" v-model="users.user.gender" />
                  Nữ
                </label>
              </div>
            </div>
          </div>
          <div class="w-1/2 flex flex-col gap-2">
            <div>
              <label class="text-muesli-400">Email</label><br />
              <input type="email" v-model="users.user.email" :class="[
                'w-full h-10 rounded-lg focus:outline-none px-5 text-center shadow-sm',
                errorsUser.email
                  ? 'border-red-500 ring-2 ring-red-300 shadow-red-200 text-red-600'
                  : 'border-gray-300 focus:ring-2 focus:ring-muesli-200 shadow-muesli-300'
              ]" placeholder="Nhập email" />
              <p v-if="errorsUser.email" class="text-red-500 text-sm mt-1">{{ errorsUser.email }}</p>
            </div>
            <div>
              <label class="text-muesli-400">Số Điện Thoại</label><br />
              <input type="text" v-model="users.user.phone" :class="[
                'w-full h-10 rounded-lg focus:outline-none px-5 text-center shadow-sm',
                errorsUser.phone
                  ? 'border-red-500 ring-2 ring-red-300 shadow-red-200 text-red-600'
                  : 'border-gray-300 focus:ring-2 focus:ring-muesli-200 shadow-muesli-300'
              ]" placeholder="Nhập số điện thoại" />
              <p v-if="errorsUser.phone" class="text-red-500 text-sm mt-1">{{ errorsUser.phone }}</p>
            </div>
            <div>
              <label class="text-muesli-400">CCCD</label><br />
              <input type="text" v-model="users.user.cccd" :class="[
                'w-full h-10 rounded-lg focus:outline-none px-5 text-center shadow-sm',
                errorsUser.cccd
                  ? 'border-red-500 ring-2 ring-red-300 shadow-red-200 text-red-600'
                  : 'border-gray-300 focus:ring-2 focus:ring-muesli-200 shadow-muesli-300'
              ]" placeholder="Nhập cccd" />
              <p v-if="errorsUser.cccd" class="text-red-500 text-sm mt-1">{{ errorsUser.cccd }}</p>
            </div>
            <div>
              <label class="text-muesli-400 block mb-2">Quyền</label>
              <select v-model="users.user.role.id"
                class="w-full h-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-muesli-200 shadow-sm shadow-muesli-300 px-5">
                <option v-for="role in roles" :key="role.id" :value="role.id">
                  {{ role.roleName }}
                </option>
              </select>
            </div>
          </div>
        </div>
        <DialogFooter>
          <button @click="handleCreateReceptionist" type="button"
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
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
const emit = defineEmits<{
  (e: "update:open", value: boolean): void;
}>();
defineProps<{
  open: boolean;
}>();
import { User } from "@/api/user";
import { Role } from "@/api/role";
import { ref, onMounted } from "vue";
const users = User();
const { roles, getAllRoles } = Role();

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

  const u = users.user;

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


const handleCreateReceptionist = async () => {
  if (!validateForm()) return;
  const payLoad = {
    phone: String(users.user.phone),
    email: users.user.email,
    password: users.user.password,
    gender: users.user.gender,
    birthday: users.user.birthday,
    fullname: users.user.fullname,
    cccd: String(users.user.cccd),
    point: 0,
    eblacklist: 1,
    roleId: users.user.role.id,
    rankId: 1
  };
  console.log("Id Role Nè" + users.user.role.id);

  console.log(JSON.stringify(payLoad, null, 2));
  await users.createReceptionist(payLoad);
  await users.getAllUser();
  resetForm();
  emit("update:open", false);
}

const resetForm = () => {
  users.user = {
    id: 0,
    phone: "",
    email: "",
    password: "",
    gender: true,
    birthday: "",
    joinDate: "",
    fullname: "",
    cccd: "",
    point: 0,
    role: {
      id: 1,
      roleName: "ADMIN",
    },
    rank: {
      id: 0,
      nameRank: "",
      minPointRequired: 0,
      discount_percent: 0,
    },
    eblacklist: 0,
  };
};

onMounted(async () => {
  await getAllRoles();
  console.log(roles.value);
});
</script>
