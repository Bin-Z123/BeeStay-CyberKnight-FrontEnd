import axios from "axios";
import { ref } from "vue";
import { toast } from 'vue-sonner'
import { defineStore } from "pinia";
import { RoomTypeResponse2 } from "@/types";

const baseUrl = import.meta.env.VITE_API_BASE_URL;
const isLoading = ref(false);

interface RoomType {
    id: number,
    name: string,
    size: number,
    price: number,
    peopleAbout: number,
}

interface RoomTypeResponse {
    code: number,
    message: string,
    data: RoomTypeResponse2[]
}

export const RoomType = defineStore('roomtype', () => {
    const roomtypes = ref<RoomTypeResponse2[]>([]);
    const roomtype = ref<RoomType>({
        id: 0,
        name: '',
        size: 1,
        price: 0,
        peopleAbout: 1
    });
    const getAllRoomType = async (): Promise<RoomTypeResponse> => {
        try {
            const response = await axios.get<RoomTypeResponse>(`${baseUrl}/roomTypes`);
            roomtypes.value = response.data.data;

            return response.data;
        } catch (error) {
            throw error;
        }
    }

    const createRoomType = async (roomtype: RoomType): Promise<RoomType> => {
        isLoading.value = true;
        try {
            const response = await axios.post<RoomType>(`${baseUrl}/roomTypes`, roomtype);
            toast.success("Thông báo", {
                description: "Tạo loại phòng thành công!",
                action: { label: "Thoát" }
            });
            return response.data;
        } catch (error: any) {
            toast.error("Thông báo", {
                description: "Lỗi tạo loại phòng: " + (error.response?.data?.message || error.message)
            });
            throw error;
        } finally {
            isLoading.value = false;
        }
    }

    const updateRoomType = async (roomtype: RoomType): Promise<RoomType> => {
        isLoading.value = true;
        try {
            const response = await axios.put<RoomType>(`${baseUrl}/roomTypes/${roomtype.id}`, roomtype);
            toast.success("Thông báo", {
                description: "Cập nhật loại phòng thành công!",
                action: { label: "Thoát" }
            });
            return response.data;
        } catch (error: any) {
            toast.error("Thông báo", {
                description: "Lỗi cập nhật loại phòng: " + (error.response?.data?.message || error.message)
            });
            throw error;
        } finally {
            isLoading.value = false;
        }
    }

    return { roomtype, roomtypes, getAllRoomType, createRoomType, updateRoomType, isLoading };
});