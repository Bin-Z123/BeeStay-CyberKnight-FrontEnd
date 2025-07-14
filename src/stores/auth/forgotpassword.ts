import { defineStore } from "pinia";
import { ref } from "vue";
import axios from "axios";
import { toast } from 'vue-sonner'

const baseUrl = import.meta.env.VITE_API_BASE_URL;

export const useForgotPasswordStore = defineStore("forgotpassword", () => {
    const isLoading = ref(false);
    const getOTP = async (email : string) => {
        try {
            const response = await axios.post(`${baseUrl}/forgot-password/send-otp`, {
                email: email,
            });
            toast.success("Tạo OTP thành công, vui lòng kiểm tra email!");
            return response.data;
        } catch (error) {
            console.error(error);
            toast.error("Tạo OTP thất bại, email chưa đăng ký tài khoản!");
            return false;
        }
    }
    const forgotPassword = async (email : string, otp : string, password : string) => {
        isLoading.value = true;
        try {
            const response = await axios.post(`${baseUrl}/forgot-password/reset-password`, {
                email: email,
                otp: otp,
                newPassword: password
            }, { withCredentials: true });
            toast.success("Đổi mật khẩu thành công!");
            return response.data;
        } catch (error) {
            console.error(error);
            toast.error("Đổi mật khẩu thất bại!");
            return false;
        } finally {
            isLoading.value = false;
        }
    }

    return { getOTP, forgotPassword, isLoading };
});