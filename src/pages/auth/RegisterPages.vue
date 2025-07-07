<template>
  <section>
    <div class="flex flex-col xl:flex-row">
      <div class="w-1/2"></div>
      <div class="xl:w-1/2 flex items-center h-screen mx-3 justify-center xl:justify-start">
        <div class="bg-white w-120 rounded-2xl p-10">
          <h1 class="text-muesli-400 font-bold text-2xl flex justify-center">
            Đăng Ký
          </h1>
          <form @submit.prevent="handleRegister">
            <div>
              <label class="text-muesli-400">Họ</label>
              <input type="text" placeholder="Nhập họ" v-model="form.firstName"
                class="w-full h-12 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-muesli-200 mb-3 shadow-sm shadow-muesli-300" />
            </div>
            <div>
              <label class="text-muesli-400">Tên</label>
              <input type="text" placeholder="Nhập tên" v-model="form.lastName"
                class="w-full h-12 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-muesli-200 mb-3 shadow-sm shadow-muesli-300" />
            </div>
            <div>
              <label class="text-muesli-400">Email</label>
              <input type="email" placeholder="Nhập email" v-model="form.email"
                class="w-full h-12 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-muesli-200 mb-3 shadow-sm shadow-muesli-300" />
            </div>
            <div>
              <label class="text-muesli-400">Mật khẩu</label>
              <input type="password" placeholder="Nhập mật khẩu" v-model="form.password"
                class="w-full h-12 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-muesli-200 mb-3 shadow-sm shadow-muesli-300" />
            </div>
            <div>
              <label class="text-muesli-400">Nhập lại mật khẩu</label>
              <input type="password" placeholder="Nhập lại mật khẩu" v-model="form.confirmPassword"
                class="w-full h-12 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-muesli-200 mb-3 shadow-sm shadow-muesli-300" />
            </div>
            <div class="flex mb-4">
              <div class="w-1/2 flex items-center">
                <input type="checkbox" name="remember" id="remember" class="h-4 w-4 rounded" />
                <label for="remember" class="ml-2 text-sm text-gray-500 select-none">Nhớ mật khẩu</label>
              </div>
              <div class="w-1/2 text-right">
                <div class="text-sm text-muesli-400 hover:underline">
                  <RouterLink to="">Quên mật khẩu?</RouterLink>
                </div>
              </div>
            </div>
            <div>
              <button
                type="submit"
                class="bg-muesli-400 hover:bg-white hover:text-muesli-400 border border-muesli-400 text-white font-bold py-2 px-4 w-full rounded duration-300">
                Đăng Ký
              </button>
            </div>
            <div>
              <p class="text-center text-gray-500 mt-4">
                Tôi đã có tài khoản?
                <RouterLink to="/auth/login" class="text-muesli-400 hover:underline">Đăng nhập</RouterLink>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { Auth } from '@/api/auth';
import { toast } from 'vue-sonner';

const auth = Auth();
const router = useRouter();

const form = ref({
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
})

const handleRegister = async () => {
  if (form.value.password !== form.value.confirmPassword) {
    toast.error("Thông báo", {
      description: "Mật khẩu xác nhận không khớp!",
    });
    return;
  }
  try {
    await auth.register({
      firstName: form.value.firstName,
      lastName: form.value.lastName,
      email: form.value.email,
      password: form.value.password,
      confirmPassword: form.value.confirmPassword,
    });

    toast.success("Thành công", {
      description: "Đăng ký thành công!",
    });

    router.push('/auth/login');
  } catch (error) {
    toast.error("Đăng ký thất bại!");
  }
};
</script>
