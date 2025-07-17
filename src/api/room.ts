import { Rooms } from "@/components/administration/RoomDialog/Room";
import axios from "axios";
import { ref } from "vue";
import { toast } from "vue-sonner";
import { defineStore } from "pinia";
import { Room } from "@/interface/booking.interface";

const baseUrl = import.meta.env.VITE_API_BASE_URL;
const isLoading = ref(false);

interface RoomResponse {
    id: number;
    roomNumber: string;
    roomStatus: string;
    floor: number;
    roomType: {
        id: number;
        name: string;
        size: number;
        price: number;
        peopleAbout: number;
    };
    roomImages:
    {
        id: number;
        url: string;
        altext: string;
        isThum: boolean;
    }[];
}
interface RoomCreateRequest {
    roomNumber: string;
    roomStatus: string;
    floor: number;
    roomTypeId: number;
    roomImages: {
        url: string;
        altext: string;
        isThum: boolean;
    }[];
}
interface RoomUpdateRequest {
    id: number;
    roomNumber: string;
    roomStatus: string;
    floor: number;
    roomType: {
        id: number;
        name: string;
        size: number;
        price: number;
        peopleAbout: number;
    };
    roomImages: {
        id: number;
        url: string;
        altext: string;
        isThum: boolean;
    }[];
    deletedRoomImageIds?: string[]; // Mảng chứa ID của các ảnh đã xóa
}
interface ResponseRoom {
    code: number;
    message: string;
    data: RoomResponse[];
}
export const RoomAPI = defineStore('room', () => {
    const listRooms = ref<RoomResponse[]>([]);
    //GET ALL ROOMS
    const getAllRooms = async (): Promise<ResponseRoom> => {

        isLoading.value = true;
        try {
            const response = await axios.get<ResponseRoom>(`${baseUrl}/admin/rooms`, { withCredentials: true });
            listRooms.value = response.data.data;
            console.log("Danh sach phong: ", listRooms.value);
            return response.data;
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                toast.error("Lỗi khi lấy danh sách phòng", {
                    description: error.message,
                });
            }
            return {
                code: -1,
                message: axios.isAxiosError(error) ? error.message : "Unknown error",
                data: [],
            };
        } finally {
            isLoading.value = false;
        }
    };
    // CREATE ROOM
    const createRoom = async (room: RoomCreateRequest, files: File[]): Promise<RoomResponse> => {
        isLoading.value = true;
        try {
            console.log("Room:", room);
            console.log("Files:", files);
            const formData = new FormData();
            const roomBlob = new Blob([JSON.stringify(room)], { type: "application/json" });
            formData.append("rooms", roomBlob);

            files.forEach((file) => {
                formData.append("file", file);
            })
            console.log("Form Data:", formData.getAll("rooms"));
            const response = await axios.post<RoomResponse>(`${baseUrl}/admin/rooms`, formData, { withCredentials: true });
            toast.success("Thông báo", {
                description: "Tạo phòng " + response.data.roomNumber + " thành công!",
            });
            return response.data
        } catch (error) {
            if (axios.isAxiosError(error)) {
                toast.error("Thông báo", {
                    description: "Lỗi tạo phòng: " + error.message,
                });
            }
            throw error;
        } finally {
            isLoading.value = false;
        }
    }

    const updateRoom = async (room: RoomUpdateRequest, files: File[]): Promise<RoomResponse> => {
        isLoading.value = true;
        try {
            console.log("Room to update:", room);
            console.log("Files to upload:", files);
            const formData = new FormData();
            const roomBlob = new Blob([JSON.stringify(room)], { type: "application/json" });
            formData.append("rooms", roomBlob);

            files.forEach((file) => {
                formData.append("file", file);
            });

            const response = await axios.put<RoomResponse>(`${baseUrl}/admin/rooms/${room.id}`, formData, { withCredentials: true });
            toast.success("Thông báo", {
                description: "Cập nhật phòng " + response.data.roomNumber + " thành công!",
            });
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                toast.error("Thông báo", {
                    description: "Lỗi cập nhật phòng: " + error.message,
                });
            }
            throw error;
        } finally {
            isLoading.value = false;
        }
    }

    const room = ref<RoomResponse[]>();
    const getRoomById = async (id: number): Promise<ResponseRoom> => {
        isLoading.value = true;
        try {
            const response = await axios.get<ResponseRoom>(`${baseUrl}/admin/rooms/${id}`, { withCredentials: true });
            room.value = response.data.data;
            console.log("Room details:", room.value);
            return response.data;
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                toast.error("Lỗi khi lấy thông tin phòng bằng ID", {
                    description: error.message,
                });
            }
            throw error;
        } finally {
            isLoading.value = false;
        }
    }

    return {
        getAllRooms,
        createRoom,
        updateRoom,
        getRoomById,
        room,
        listRooms,
        isLoading,
    };
});
