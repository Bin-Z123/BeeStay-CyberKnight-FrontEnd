import axios from "axios";
import { ref } from "vue";
import { toast } from "vue-sonner";

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

export const Auth = () => {
  const isLoading = ref(false);

  const getUserInfoByToken = async (): Promise<User> => {
    try {
      const response = await axios.get<User>(`${baseUrl}/me`, {
        withCredentials: true,
      });
      return response.data;
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
      });
      const token = response.data.accessToken;

      // Gửi token qua cookie vì BE đọc từ cookie "jwt"
      document.cookie = `jwt=${token}; path=/`;
      //Lấy thông tin sau khi login
      const user = await getUserInfoByToken();
      localStorage.setItem("userInfo", JSON.stringify(user));
      toast.success("Thông báo", {
        description: "Đăng nhập thành công!",
        action: { label: "Thoát" },
      });

      setTimeout(() => {
        window.location.href = "/administration/dashboard";
      }, 1000);

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

  return {
    login,
    isLoading,
  };
};
