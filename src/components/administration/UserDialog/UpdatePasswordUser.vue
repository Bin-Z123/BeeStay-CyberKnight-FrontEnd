<template>
  <Dialog :open="open" @update:open="emit('update:open', $event)">
    <DialogContent>
      <h1 class="font-bold text-muesli-400 text-2xl">
        Đổi mật khẩu {{ localReceptionist.fullname }}
      </h1>
      <hr class="bg-muesli-200 h-1" />
      <div>
        <form>
          <div class="flex flex-col gap-3">
            <div>
              <label
                for="password"
                :class="[
                  'text-muesli-400',
                  errors.password ? 'text-red-500' : '',
                ]"
                >Nhập Mật Khẩu Mới</label
              >
              <input
                type="text"
                v-model="password"
                :class="[
                  'w-full h-10 rounded-lg focus:outline-none px-5 text-center shadow-sm border-gray-300 focus:ring-2 focus:ring-muesli-200 shadow-muesli-300',
                  errors.password
                    ? 'border-red-500 ring-2 ring-red-300 shadow-red-200 text-red-600'
                    : '',
                ]"
                placeholder="Nhập mật khẩu"
              />
            </div>
            <div>
              <label
                for="passwordcheck"
                :class="[
                  'text-muesli-400',
                  errors.passwordCheck ? 'text-red-500' : '',
                ]"
                >Xác Nhận Mật Khẩu Mới</label
              >
              <input
                type="text"
                v-model="passwordCheck"
                :class="[
                  'w-full h-10 rounded-lg focus:outline-none px-5 text-center shadow-sm border-gray-300 focus:ring-2 focus:ring-muesli-200 shadow-muesli-300',
                  errors.passwordCheck
                    ? 'border-red-500 ring-2 ring-red-300 shadow-red-200 text-red-600'
                    : '',
                ]"
                placeholder="Nhập mật khẩu"
              />
            </div>
          </div>
          <div class="flex justify-end mt-4 gap-4">
            <button
              @click.prevent="handleUpdate"
              class="px-4 py-2 bg-muesli-400 rounded-lg text-white border border-muesli-400 hover:bg-white hover:text-muesli-400 transition-all duration-300 hover:scale-105"
            >
              Lưu
            </button>
          </div>
        </form>
      </div>
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
import { ref, computed, onMounted, watch } from "vue";
import { User } from "@/api/user";
import { toast } from "vue-sonner";

const users = User();
const password = ref("");
const passwordCheck = ref("");

const emit = defineEmits<{
  (e: "update:open", value: boolean): void;
}>();

const props = defineProps<{
  open: boolean;
  user: any;
}>();

const localReceptionist = ref({ ...props.user });

watch(
  () => props.user,
  (newVal) => {
    if (newVal) {
      localReceptionist.value = { ...newVal };
    }
  },
  { immediate: true }
);

const errors = ref({
  password: "",
  passwordCheck: "",
});

const validateForm = () => {
  errors.value.password = password.value ? "" : "Mật khẩu không được để trống.";
  errors.value.passwordCheck = passwordCheck.value
    ? ""
    : "Xác nhận mật khẩu không được để trống.";
  if (
    password.value &&
    passwordCheck.value &&
    password.value !== passwordCheck.value
  ) {
    errors.value.passwordCheck = "Mật khẩu và xác nhận mật khẩu không khớp.";
  }
  return !Object.values(errors.value).some((error) => error);
};

const resetForm = () => {
  password.value = "";
  passwordCheck.value = "";
};

const handleUpdate = async () => {
  if (!validateForm()) {
    toast.error("Vui lòng kiểm tra lại thông tin mật khẩu.");
    return;
  }
  try {
    if (password.value !== passwordCheck.value) {
      toast.error("Mật khẩu không khớp, vui lòng kiểm tra lại.");
      return;
    } else {
      await users.updatePassword(localReceptionist.value.id, password.value);
      emit("update:open", false);
      resetForm();
    }
  } catch (error) {
    console.error("Cập nhật mật khẩu thất bại!", error);
  }
};
</script>
