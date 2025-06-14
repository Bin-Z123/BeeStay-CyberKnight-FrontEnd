import axios from "axios";
import { ref } from "vue";
import { toast } from 'vue-sonner'

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
  eblacklist: 'FIRST' | 'SECOND' | 'THIRD' | 'NONE';
}

const isLoading = ref(false);

export const User = () => {
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
            id: 0,
            roleName: '',
            users: []
        },
        eblacklist: 'NONE'
    });

    const getUsersById = async (id: number) => {
        try {
            isLoading.value = true;
            const response = await axios.get(`${baseUrl}/users/${id}`);
            user.value = response.data;
            isLoading.value = false;
        } catch (error: any) {
            toast.error(error.response.data.message);
        }
    }

    return { users, user, getUsersById, isLoading };
}
