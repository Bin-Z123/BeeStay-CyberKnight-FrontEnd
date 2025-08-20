import axios from "axios";
import { ref } from "vue";
import { toast } from 'vue-sonner'
import { defineStore } from "pinia";

const baseUrl = import.meta.env.VITE_API_BASE_URL;
const isLoading = ref(false);

export interface Guest {
    id: number;
    fullname: string;
    phone: string;
    email: string;
    cccd: string;
    createAt: string;
}

export const Guest = defineStore("guest", () => {
    const isLoading = ref(false);
    const guest = ref<Guest | null>(null);

    const fetchGuest = async () => {
        isLoading.value = true;
        try {
            const response = await axios.get<{data: Guest}>(`${baseUrl}/admin/guest/list`, { withCredentials: true });
            guest.value = response.data.data;
            isLoading.value = false;
        } catch (error) {
            console.error("Error fetching guest:", error);
            isLoading.value = false;
        }
    };

    return { guest, isLoading, fetchGuest };
});