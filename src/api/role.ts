import axios from "axios";
import { ref } from "vue";
import { toast } from 'vue-sonner'
const baseUrl = import.meta.env.VITE_API_BASE_URL;
const isLoading = ref(false);

interface Role {
    id: number;
    roleName: string;
}

export const Role = () => {
    const roles = ref<Role[]>([]);
    const getAllRoles = async (): Promise<Role[]> => {
        try {
            const response = await axios.get(`${baseUrl}/role/list`);
            roles.value = response.data.data;
            return roles.value;
        } catch (error) {
            console.error(error);
            return [];
        } finally {
            isLoading.value = false;
        }
    };

    return { roles, getAllRoles };
}