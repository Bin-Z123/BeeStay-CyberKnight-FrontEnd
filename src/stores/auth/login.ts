import { defineStore } from "pinia";
import { ref } from "vue";
import axios from "axios";

const baseUrl = import.meta.env.VITE_API_BASE_URL;
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

export const useAuthStore = defineStore("auth", () => {
  const user = ref<User | null>(null);
  const isAuthenticated = ref(false);

  const fetchUser = async () => {
    try {
      const response = await axios.get<User>(`${baseUrl}/me`, {
        withCredentials: true,
      });
      user.value = response.data;
      isAuthenticated.value = true;
    } catch (error) {
      console.error(error);
      user.value = null;
      isAuthenticated.value = false;
    }
  };

const logout = async () => {
  try {
    await axios.post(`${baseUrl}/logout`, {}, { withCredentials: true });
  } catch (e) {
    console.warn("Lỗi khi logout, nhưng vẫn tiếp tục xoá user local.");
  } finally {
    user.value = null;
    isAuthenticated.value = false;
  }
};

  return { user, isAuthenticated, fetchUser, logout };
})