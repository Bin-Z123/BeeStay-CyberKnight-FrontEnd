import axios from "axios";
import { ref } from "vue";
import { toast } from "vue-sonner";
import { useAuthStore } from "@/stores/auth/login";
import { useRouter } from "vue-router";
import { defineStore } from "pinia";
import { log } from "console";
import { a } from "@tanstack/vue-query/build/legacy/queryClient-CAHOJcvF";

const baseUrl = import.meta.env.VITE_API_BASE_URL;

interface LoginResponse {
  accessToken: string;
}

export interface User {
  id: number;
  phone: string | null;
  email: string;
  password: string | null;
  gender: boolean | null;
  birthday: string | null;
  joinDate: string;
  fullname: string;
  cccd: string | null;
  point: number;
  role: Role;
  rank: Rank;
  eblacklist: number;
}

export interface Role {
  id: number;
  roleName: string;
}

export interface Rank {
  id: number;
  nameRank: string;
  minPointRequired: number;
  discount_percent: number;
}

interface RegisterRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface RegisterResponse {
  message: string;
}

export const Auth = () => {
  const authStore = useAuthStore();
  const router = useRouter();
  const isLoading = ref(false);

  const getUserInfoByToken = async (): Promise<User> => {
    try {
       const response = await axios.get<{ data: User }>(`${baseUrl}/me`, {
        withCredentials: true,
      });
      console.log("Thông tin người dùng", JSON.stringify(response.data.data, null, 2));

      if (response.data.data.eblacklist == 2) {
        toast.error("Tài khoản của bạn đã bị khoá, vui lòng liên hệ với quản trị viên.");
        authStore.logout();
      }
      return response.data.data;
    } catch (error) {
      console.error("Lỗi lấy thông tin người dùng", error);
      throw error;
    }
  };

  const login = async (username: string, password: string): Promise<LoginResponse> => {
    isLoading.value = true;

    try {
      const response = await axios.post<LoginResponse>(`${baseUrl}/login`, {
        username,
        password,
      }, {
        withCredentials: true
      });

      const user = await getUserInfoByToken();

      if (user.eblacklist === 2) {
        toast.error("Tài khoản của bạn đã bị khoá, vui lòng liên hệ với quản trị viên.");
        await authStore.logout();
        throw new Error("User is banned");
      } else {
        authStore.user = user;
        authStore.isAuthenticated = true;

        toast.success("Thông báo", {
          description: "Đăng nhập thành công!",
        });

        const role = user.role.roleName.toUpperCase();
        if (role === "ADMIN") {
          router.push("/administration/dashboard");
        } else {
          router.push("/user/home");
        }
      }
      return response.data;

    } catch (error: any) {
      if (error.message !== "User is banned") {
        toast.error("Thông báo", {
          description: "Lỗi: " + (error?.response?.data?.message || error.message),
        });
      }

      throw error;

    } finally {
      setTimeout(() => {
        isLoading.value = false;
      }, 1000);
    }
  };

  const register = async (user: RegisterRequest): Promise<RegisterResponse> => {
    isLoading.value = true;

    try {
      const response = await axios.post(`${baseUrl}/register/send-otp`, user);
      if (response.data.code === 400) {
        toast.error(response.data.message || "Email đã được sử dụng");
        throw new Error("Đăng ký thất bại");
      }
      toast.success("OTP đã được gửi!", {
        description: "Vui lòng kiểm tra email.",
      });
      return response.data;
    } catch (error) {
      throw error;
    } finally {
      isLoading.value = false;
    }
  };

  const verifyOTP = async (email: string, otp: string): Promise<RegisterResponse> => {
    isLoading.value = true;

    try {
      const response = await axios.post(`${baseUrl}/register/verify-otp`, { email, otp });
      return response.data;
    } catch (error) {
      throw error;
    } finally {
      isLoading.value = false;
    }
  };

  return {
    login,
    isLoading,
    register,
    verifyOTP
  };
};
