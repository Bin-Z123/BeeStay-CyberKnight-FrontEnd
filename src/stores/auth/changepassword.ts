import axios from "axios";
import { defineStore } from "pinia";
import { ref } from "vue";
import { toast } from "vue-sonner";

const baseUrl = import.meta.env.VITE_API_BASE_URL;

export const useChangePasswordStore = defineStore("changepassword", () => {
    const isLoading = ref(false);

    const changePassword = async (oldPassword: string, newPassword: string, confirmPassword: string): Promise<any> => {
        isLoading.value = true;
        try {
            const response = await axios.post(`${baseUrl}/change_password`, { 
                oldPassword: oldPassword, 
                newPassword: newPassword, 
                confirmPassword: confirmPassword 
            }, { withCredentials: true });
            isLoading.value = false;
            toast.success("Đổi mật khẩu thành công!");
            return response.data;
        } catch (error) {
            isLoading.value = false;
            toast.error("Đổi mật khẩu thất bại!");
            throw error;
        }
    };

    return { changePassword, isLoading };
});