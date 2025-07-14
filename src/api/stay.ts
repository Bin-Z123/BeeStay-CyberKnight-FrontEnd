import axios from "axios";
import { defineStore } from "pinia";
import { toast } from "vue-sonner";
import { ref } from "vue";
import { StayCreateRequest } from "@/types";

const baseUrl = import.meta.env.VITE_API_BASE_URL;



export const Stay = defineStore("stay", () => {
    const isLoading = ref(false);
    const stays = ref<StayCreateRequest[]>([]);

    const createStay = async (stay: StayCreateRequest[]) => {
        isLoading.value = true;
        console.log("Stay Data: ", JSON.stringify(stay));
        try {
            const response = await axios.post(`${baseUrl}/admin/stay/create`, stay);
            stays.value.push(response.data);
            toast.success("Xếp phòng thành công thành công!");
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.error("Error creating stay:", error);
                toast.error(`Lỗi xếp phòng ${error.response?.data.message}`);
            }
        } finally {
            isLoading.value = false;
        }
    }
    return {
        createStay,
        isLoading,
        stays
    }
})