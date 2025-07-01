import axios from "axios";
import { ref } from "vue";
import { toast } from 'vue-sonner'
import { defineStore } from "pinia";

const baseUrl = import.meta.env.VITE_API_BASE_URL;

export interface UserResponse {
  code: number;
  message: string;
  data: User[];
}

export interface User {
  id: number;
  phone: string;
  email: string;
  password: string;
  gender: boolean;
  birthday: string;
  joinDate: string;
  fullname: string;
  cccd: string;
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

export interface CreateUserRequest {
  phone: string;
  email: string;
  password: string;
  gender: boolean;
  birthday: string;
  fullname: string;
  cccd: string;
  point: number;
  eblacklist: number;
  roleId: number;
  rankId: number;
}

interface UpdateUserRequest {
    id: number;
    phone: string;
    email: string;
    password: string;
    gender: boolean;
    birthday: string;
    updateDate: string;
    fullname: string;
    cccd: string;
    point: number;
    eblacklist: number;
    roleId: number;
    rankId: number;
}

const isLoading = ref(false);

export const User = defineStore('user', () => {
    const users = ref<User[]>([]);
    const user = ref<User>({
        id: 0,
        phone: "",
        email: "",
        password: "",
        gender: true,
        birthday: "",
        joinDate: "",
        fullname: "",
        cccd: "",
        point: 0,
        role: {
            id: 1,
            roleName: "ADMIN",
        },
        rank: {
            id: 0,
            nameRank: "",
            minPointRequired: 0,
            discount_percent: 0,
        },
        eblacklist: 0,
    });

    const getAllUser = async (): Promise<User[]> => {
        try {
            const response = await axios.get(`${baseUrl}/admin/users`);
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

    const createReceptionist = async (user: CreateUserRequest): Promise<User> => {
        try {
            const response = await axios.post(`${baseUrl}/admin/users`, user, {
                headers: {
                    "Content-Type": "application/json",
                },
            });
            toast.success("Tạo người dùng thành công!");
            return response.data;
        } catch (error) {
            toast.error("Lỗi khi tạo người dùng");
            throw error;
        }
    };

    const updataReceptionist = async (user: UpdateUserRequest): Promise<User> => {
        try {
            const response = await axios.put(`${baseUrl}/admin/updateUser/${user.id}`, user);
            toast.success("Cập nhật người dùng thành công!");
            return response.data;
        } catch (error) {
            toast.error("Lỗi khi cập nhật người dùng");
            throw error;
        }
    };

    return { users, user, getAllUser, createReceptionist, updataReceptionist, isLoading };
});
