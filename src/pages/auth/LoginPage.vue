<template>
  <section>
    <div class="flex flex-col xl:flex-row">
      <div class="w-1/2"></div>
      <div class="xl:w-1/2 flex items-center h-screen mx-3 justify-center xl:justify-start">
        <div class="bg-white w-120 rounded-2xl p-10">
          <h1 class="text-muesli-400 font-bold text-2xl flex justify-center">
            Đăng Nhập
          </h1>
          <form action="">
            <div>
              <label class="text-muesli-400">Tài khoản</label>
              <input v-model="form.username" type="text" placeholder="Nhập email/sđt"
                :class="['w-full h-12 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-muesli-200 mb-3 shadow-sm shadow-muesli-300', errors.username ? 'border-red-300 focus:ring-red-200 shadow-red-300 text-red-600' : '']" />
            </div>
            <div>
              <label class="text-muesli-400">Mật khẩu</label>
              <input v-model="form.password" type="password" placeholder="Nhập mật khẩu"
                :class="['w-full h-12 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-muesli-200 mb-3 shadow-sm shadow-muesli-300', errors.password ? 'border-red-300 focus:ring-red-200 shadow-red-300 text-red-600' : '']" />
            </div>
            <div class="flex mb-4">
              <div class="w-1/2 flex items-center">
                <!-- <input type="checkbox" name="remember" id="remember" class="h-4 w-4 rounded" />
                <label for="remember" class="ml-2 text-sm text-gray-500 select-none">Nhớ mật khẩu</label> -->
              </div>
              <div class="w-1/2 text-right">
                <div class="text-sm text-muesli-400 hover:underline">
                  <RouterLink to="/auth/forgot-password">Quên mật khẩu?</RouterLink>
                </div>
              </div>
            </div>
            <div>
              <button :disabled="isLoading" @click.prevent="handleLogin()"
                class="bg-muesli-400 flex items-center justify-center hover:bg-white hover:text-muesli-400 border border-muesli-400 text-white font-bold py-2 px-4 w-full rounded duration-300 disabled:opacity-50 disabled:cursor-pointer disabled:hover:bg-muesli-400 disabled:hover:text-white">
                <span v-if="isLoading">
                  <LoaderCircle class="animate-spin" />
                </span>
                <span v-else>Đăng Nhập</span>
              </button>
            </div>
            <div>
              <p class="text-center text-gray-500 mt-4">
                Bạn chưa có tài khoản?
                <RouterLink to="/auth/register" class="text-muesli-400 hover:underline">Đăng ký</RouterLink>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>
<script setup lang="ts">
import { LoaderCircle } from "lucide-vue-next";
import { Auth } from "@/api/auth";
import { ref } from "vue";
import { toast } from "vue-sonner";
const { login, isLoading } = Auth();

const form = ref({
  username: "",
  password: "",
});

const errors = ref({
  username: false,
  password: false,
});

const handleLogin = () => {
  errors.value.username = !form.value.username.trim();
  errors.value.password = !form.value.password.trim();

  if (errors.value.username || errors.value.password) {
    toast.error("Vui lòng nhập đầy đủ tài khoản và mật khẩu!");
    return;
  }
  login(form.value.username, form.value.password);
  console.log(form.value);
};
</script>