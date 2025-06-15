import axios from "axios";
import { ref } from "vue";
import { toast } from 'vue-sonner'
import { defineStore } from "pinia";

const baseUrl = import.meta.env.VITE_API_BASE_URL;

interface Role {
  id: number;
  roleName: string;
  users: string[];
}

interface User {
  id: number;
  phone: string;
  email: string;
  password: string;
  gender: boolean;
  birthday: string;
  joinDate: string;
  updateDate: string;
  fullname: string;
  cccd: string;
  point: number;
  role: Role;
  eBlacklist: 'FIRST' | 'SECOND' | 'BLOCKED' | 'NONE';
}

const isLoading = ref(false);

export const User = defineStore('user', () => {
    const users = ref<User[]>([]);
    const user = ref<User>({
        id: 0,
        phone: '',
        email: '',
        password: '',
        gender: false,
        birthday: '',
        joinDate: '',
        updateDate: '',
        fullname: '',
        cccd: '',
        point: 0,
        role: {
            id: 1,
            roleName: 'ADMIN',
            users: []
        },
        eBlacklist: 'NONE'
    });

    const getAllUser = async (): Promise<User[]> => {
        try {
            const response = await axios.get(`${baseUrl}/users`);
            if (Array.isArray(response.data)) {
            users.value = response.data;
            } else if (Array.isArray(response.data.data)) {
            users.value = response.data.data;
            } else {
            users.value = [];
            console.warn("Unexpected API format", response.data);
            }

            return users.value;
        } catch (error) {
            toast.error("Lỗi khi tải danh sách người dùng");
            throw error;
        }
    };

    const createReceptionist = async (user: User): Promise<User> => {
        try {
            const response = await axios.post(`${baseUrl}/users`, user);
            toast.success("Tạo người dùng thành công!");
            return response.data;
        } catch (error) {
            toast.error("Lỗi khi tạo người dùng");
            throw error;
        }
    };

    const updateUser = async (user: User): Promise<User> => {
        try {
            const response = await axios.put(`${baseUrl}/users/${user.id}`, user);
            toast.success("Cập nhật người dùng thành công!");
            return response.data;
        } catch (error) {
            toast.error("Lỗi khi cập nhật người dùng");
            throw error;
        }
    };

    return { users, user, getAllUser, createReceptionist, isLoading };
});
