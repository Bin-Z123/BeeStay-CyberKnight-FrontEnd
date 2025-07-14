import axios from "axios";
import { ref } from "vue";
import { toast } from "vue-sonner";
import { useAuthStore } from "@/stores/auth/login";
import { useRouter } from "vue-router";
import { defineStore } from "pinia";

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
      const response = await axios.get<{data: User}>(`${baseUrl}/me`, {
        withCredentials: true,
      });
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
      },{
        withCredentials: true
      });
      //Lấy thông tin sau khi login
      const user = await getUserInfoByToken();
      authStore.user = user;
      authStore.isAuthenticated = true;

      toast.success("Thông báo", {
        description: "Đăng nhập thành công!",
        action: { label: "Thoát" },
      });

      const role = user.role.roleName.toUpperCase();
      console.log("role: "+role);
      if (role === "ADMIN") {
      router.push("/administration/dashboard");
    } else {
      router.push("/user/home");
    }

      return response.data;
    } catch (error: any) {
      console.error("Đăng Nhập Thất Bại!", error);
      toast.error("Thông báo", {
        description: "Lỗi: " + (error?.response?.data?.message || error.message),
      });
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
