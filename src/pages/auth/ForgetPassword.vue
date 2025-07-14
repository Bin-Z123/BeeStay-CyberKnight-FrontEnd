<template>
    <section>
        <div class="flex flex-col xl:flex-row">
            <div class="w-1/2"></div>
            <div class="xl:w-1/2 flex items-center h-screen mx-3 justify-center xl:justify-start">
                <div class="bg-white w-120 rounded-2xl p-10">
                    <h1 class="text-muesli-400 font-bold text-2xl flex justify-center">
                        Quên Mật Khẩu
                    </h1>
                    <form action="">
                        <div>
                            <label class="text-muesli-400">Email</label>
                            <input v-model="form.email" type="email" placeholder="Nhập email"
                                :class="['w-full h-12 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-muesli-200 mb-3 shadow-sm shadow-muesli-300', errors.email ? 'border-red-300 focus:ring-red-200 shadow-red-300 text-red-600' : '']" />
                        </div>
                        <div>
                            <label class="text-muesli-400">Mã OTP</label>
                            <input v-model="form.otp" type="text" placeholder="Nhập OTP"
                                :class="['w-full h-12 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-muesli-200 mb-3 shadow-sm shadow-muesli-300', errors.otp ? 'border-red-300 focus:ring-red-200 shadow-red-300 text-red-600' : '']" />
                        </div>
                        <div>
                            <label class="text-muesli-400">Mật Khẩu Mới</label>
                            <input v-model="form.password" type="password" placeholder="Nhập mật khẩu mới"
                                :class="['w-full h-12 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-muesli-200 mb-3 shadow-sm shadow-muesli-300', errors.password ? 'border-red-300 focus:ring-red-200 shadow-red-300 text-red-600' : '']" />
                        </div>
                        <div class="flex mb-4">
                            <div class="w-1/2 flex items-center">
                                <div class="text-sm flex justify-center items-center gap-1">
                                    <span class="text-gray-500">Nhấn vào đây để <ArrowRight class="inline-block w-3 h-3"/></span>
                                    <button class="hover:underline text-muesli-400 disabled:opacity-50" :disabled="timeOut"
                                        @click.prevent="getOTP">
                                        Lấy OTP?
                                    </button>
                                </div>
                            </div>
                            <div class="w-1/2 text-right">
                                
                            </div>
                        </div>
                        <div>
                            <button :disabled="useForgetPassword.isLoading" @click.prevent="handleForgetPassword()"
                                class="bg-muesli-400 flex items-center justify-center hover:bg-white hover:text-muesli-400 border border-muesli-400 text-white font-bold py-2 px-4 w-full rounded duration-300 disabled:opacity-50 disabled:cursor-pointer disabled:hover:bg-muesli-400 disabled:hover:text-white">
                                <span v-if="useForgetPassword.isLoading">
                                    <LoaderCircle class="animate-spin" />
                                </span>
                                <span v-else>Xác Nhận</span>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </section>
</template>
<script setup lang="ts">
import { LoaderCircle, ArrowRight } from "lucide-vue-next";
import { useForgotPasswordStore } from "@/stores/auth/forgotpassword";
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { toast } from "vue-sonner";

const timeOut = ref(false);

const router = useRouter();
const useForgetPassword = useForgotPasswordStore();

const form = ref({
    email: "",
    otp: "",
    password: "",
});

const errors = ref({
    email: false,
    otp: false,
    password: false
})
const handleTimeOut = () => {
    timeOut.value = true;
    setTimeout(() => {
        timeOut.value = false;
    }, 30000);
}
const getOTP = async () => {
    errors.value.email = !form.value.email.trim();
    if (errors.value.email) {
        toast.error("Vui lòng nhập email để lấy OTP!");
        return;
    }
    handleTimeOut();
    await useForgetPassword.getOTP(form.value.email);
    
}

const handleForgetPassword = async () => {
    errors.value.email = !form.value.email.trim();
    errors.value.otp = !form.value.otp.trim();
    errors.value.password = !form.value.password.trim();

    if (errors.value.email || errors.value.otp || errors.value.password) {
        toast.error("Vui lòng nhập đầy đủ thống tin!");
        return;
    }

    await useForgetPassword.forgotPassword(form.value.email, form.value.otp, form.value.password);
    router.push("/auth/login");
}
</script>
