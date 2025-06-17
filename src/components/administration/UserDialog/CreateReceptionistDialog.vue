<template>
  <Dialog :open="open" @update:open="emit('update:open', $event)">
    <DialogContent class="sm:max-w-[425px]" @pointer-down-outside.prevent @escape-key-down.prevent>
      <form action="" class="flex flex-col gap-3">
        <DialogHeader>
          <DialogTitle class="font-bold text-muesli-400">Thêm Nhân Viên Mới</DialogTitle>
          <hr class="text-muesli-400 bg-muesli-400 h-[2px]" />
        </DialogHeader>
        <div>
          <label class="text-muesli-400">Họ Tên</label><br />
          <input type="text" v-model="users.user.fullname"
            class="w-full h-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-muesli-200 shadow-sm shadow-muesli-300 px-5 text-center"
            placeholder="Nhập họ tên" />
        </div>
        <div>
          <label class="text-muesli-400">Email</label><br />
          <input type="email" v-model="users.user.email"
            class="w-full h-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-muesli-200 shadow-sm shadow-muesli-300 px-5 text-center"
            placeholder="Nhập email" />
        </div>
        <div>
          <label class="text-muesli-400">Số Điện Thoại</label><br />
          <input type="number" v-model="users.user.phone"
            class="w-full h-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-muesli-200 shadow-sm shadow-muesli-300 px-5 text-center"
            placeholder="Nhập số điện thoại" />
        </div>
        <div>
          <label class="text-muesli-400">Mật Khẩu</label><br />
          <input type="password" v-model="users.user.password"
            class="w-full h-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-muesli-200 shadow-sm shadow-muesli-300 px-5 text-center"
            placeholder="Nhập mật khẩu" />
        </div>
        <div>
          <label class="text-muesli-400 block mb-2">Giới tính</label>
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
        <div>
          <label class="text-muesli-400">Ngày Sinh</label><br />
          <input type="date" v-model="users.user.birthday"
            class="w-full h-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-muesli-200 shadow-sm shadow-muesli-300 px-5 text-center" />
        </div>
        <div>
          <label class="text-muesli-400">CCCD</label><br />
          <input type="number" v-model="users.user.cccd"
            class="w-full h-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-muesli-200 shadow-sm shadow-muesli-300 px-5 text-center"
            placeholder="Nhập cccd" />
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
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
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

const handleCreateReceptionist = async () => {
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
    rankId: 5
  };
  console.log("Id Role Nè" + users.user.role.id);
  
  console.log(JSON.stringify(payLoad, null, 2));
  await users.createReceptionist(payLoad);
  await users.getAllUser();
  emit("update:open", false);
}

onMounted(async () => {
  await getAllRoles();
  console.log(roles.value);
});
</script>
