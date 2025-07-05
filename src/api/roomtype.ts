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
    description: string
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
        peopleAbout: 1,
        description: ''
    });
    const getAllRoomType = async (): Promise<RoomTypeResponse> => {
        try {
            const response = await axios.get<RoomTypeResponse>(`${baseUrl}/admin/roomTypes`);
            roomtypes.value = response.data.data;
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    const createRoomType = async (roomtype: RoomType): Promise<RoomType> => {
        isLoading.value = true;
        try {
            const response = await axios.post<RoomType>(`${baseUrl}/admin/roomTypes`, roomtype);
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
            const response = await axios.put<RoomType>(`${baseUrl}/admin/roomTypes/${roomtype.id}`, roomtype);
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

    const deleteRoomType = async (roomtypeId: number): Promise<void> => {
        isLoading.value = true;
        try {
            await axios.delete(`${baseUrl}/admin/roomTypes/${roomtypeId}`);
            toast.success("Thông báo", {
                description: "Xóa loại phòng thành công!",
                action: { label: "Thoát" }
            });
        } catch (error: any) {
            toast.error("Thông báo", {
                description: "Lỗi xóa loại phòng: " + (error.response?.data?.message || error.message)
            });
            throw error;
        } finally {
            isLoading.value = false;
        }
    }

    const getRoomTypeById = async (roomtypeId: number): Promise<RoomType> => {
        try {
            const response = await axios.get<{code: number, data: RoomType}>(`${baseUrl}/admin/roomTypes/${roomtypeId}`);
            roomtype.value = response.data.data;
            return response.data.data;
        } catch (error) {
            throw error;
        }
    }

    return { roomtype, roomtypes, getAllRoomType, createRoomType, updateRoomType, deleteRoomType, getRoomTypeById, isLoading };
});