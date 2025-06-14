import axios from "axios";
import { ref } from "vue";
import { toast } from 'vue-sonner'

const baseUrl = import.meta.env.VITE_API_BASE_URL;
const isLoading = ref(false);

interface RoomTypeResponse {
    id: number,
    name: string,
    size: number,
    price: number,
    peopleAbout: number
}

export const RoomType = () => {
    const roomtypes = ref<RoomTypeResponse[]>([]);
    const roomtype = ref<RoomTypeResponse>({
        id: 0,
        name: '',
        size: 0,
        price: 0,
        peopleAbout: 0
    });
    const getAllRoomType = async (): Promise<RoomTypeResponse[]> => {
        try {
            const response = await axios.get<RoomTypeResponse[]>(`${baseUrl}/roomTypes`);
            roomtypes.value = response.data;
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    return { roomtype, roomtypes, getAllRoomType,isLoading };
}