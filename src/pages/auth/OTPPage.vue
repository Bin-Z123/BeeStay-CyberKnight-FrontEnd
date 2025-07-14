<template>
    <section>
        <div class="flex flex-col xl:flex-row">
            <div class="w-1/2"></div>
            <div class="xl:w-1/2 flex items-center h-screen mx-3 justify-center xl:justify-start">
                <div class="bg-white w-120 rounded-2xl p-10 flex flex-col justify-center items-center gap-5">
                    <h1 class="text-muesli-400 font-bold text-2xl flex justify-center">
                        Nhập Mã Xác Thực
                    </h1>
                    <p class="text-gray-500 text-center">Mã OTP đã được gửi đến email của bạn.</p>
                    <div class="flex justify-center gap-3">
                        <input type="tel" v-for="(digit, index) in otpLength" :key="index"
                            :ref="(el) => (inputs[index] = el)" v-model="otp[index]" maxlength="1" pattern="0-9"
                            class="h-16 w-12 rounded-md border border-gray-300 bg-white text-center text-3xl font-bold text-gray-900 shadow-sm transition-all focus:border-muesli-400 focus:ring-2 focus:ring-muesli-400 focus:outline-none"
                            @input="handleInput($event, index)" @keydown="handleKeyDown($event, index)"
                            @paste="handlePaste">
                    </div>
                    <div class="text-center">
                        <p class="text-gray-500">Mã hoàn chỉnh:</p>
                        <p class="text-2xl font-mono tracking-widest text-gray-700 h-8">{{ fullOtp || '----' }}</p>
                    </div>
                    <button @click="submitOtp" :disabled="!isOtpComplete"
                        :class="['w-full rounded-md px-4 py-3 text-lg font-semibold shadow-sm transition-all duration-300', isOtpComplete ? 'bg-muesli-400 text-white border border-muesli-400 hover:bg-muesli-500 hover:scale-105 hover:shadow-md' : 'bg-gray-400 text-white border-none cursor-not-allowed']">
                        Xác nhận
                    </button>
                </div>
            </div>
        </div>
    </section>
</template>
<script setup>
import { ref, onMounted, compile, computed } from 'vue';
import { toast } from 'vue-sonner';
import { Auth } from '@/api/auth';
import { useRegisterStore } from '@/stores/auth/registerStore';
import { useRouter } from 'vue-router';

const router = useRouter();
const auth = Auth();
const registerStore = useRegisterStore();

const otpLength = 6;
const otp = ref(new Array(otpLength).fill(''));
const inputs = ref([]);

const handleInput = (e, index) => {
    const value = e.target.value;
    if (!/^[0-9]$/.test(value)) {
        otp.value[index] = '';
        return;
    }
    if (value && index < otpLength - 1) {
        inputs.value[index + 1].focus();
    }
};

const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && !otp.value[index] && index > 0) {
        inputs.value[index - 1].focus();
    }
}

const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').slice(0, otpLength);
    for (let i = 0; i < pastedData.length; i++) {
        if (/^[0-9]$/.test(pastedData[i])) {
            otp.value[i] = pastedData[i];
        }
    }
    const lastEmptyIndex = Math.min(pastedData.length, otpLength) - 1;
    if (lastEmptyIndex >= 0) {
        inputs.value[lastEmptyIndex].focus();
    }
}

const fullOtp = computed(() => {
    return otp.value.join('');
})

const isOtpComplete = computed(() => {
    return fullOtp.value.length === otpLength;
})

const submitOtp = async () => {
    if (isOtpComplete.value) {
        try {
            console.log('OTP:', fullOtp.value,"Email", registerStore.email);
            await auth.verifyOTP(registerStore.email, fullOtp.value);
            toast.success('Xác nhận OTP, đăng ký thành công!');
            router.push('/auth/login');
        } catch (error) {
            toast.error('Đăng ký thất bại!');
        }
    } else {
        alert('Vui lòng nhập đủ mã OTP!');
    }
};


onMounted(() => {
    inputs.value[0]?.focus();
});
</script>
