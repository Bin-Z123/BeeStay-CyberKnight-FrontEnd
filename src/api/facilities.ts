import axios from "axios";
import { ref } from "vue";
import { toast } from 'vue-sonner'
import { defineStore } from "pinia";

const baseUrl = import.meta.env.VITE_API_BASE_URL;
const isLoading = ref(false);

interface Facility {
    id: number;
    facilityName: string;
    description: string;
    price: number;
}

interface FacilityResponse {
    code: number;
    message: string;
    data: Facility[];
}

export const Facilities = defineStore('facilities', () => {
    const facilities = ref<Facility[]>([]);
    const facility = ref<Facility>({
        id: 0,
        facilityName: '',
        description: '',
        price: 0,
    });
    const getAllFacilities = async (): Promise<FacilityResponse> => {
        try {
            const response = await axios.get<FacilityResponse>(`${baseUrl}/admin/facility/list`);
            facilities.value = response.data.data;
            return response.data;
        } catch (error) {
            toast.error("Lỗi khi lấy danh sách diện tích");
            throw error;
        }
    };

    const createFacility = async (facility: Facility): Promise<Facility> => {
        try {
            const response = await axios.post<Facility>(`${baseUrl}/admin/facility/create`, facility);
            toast.success("Tạo diện tích thành công!");
            return response.data;
        } catch (error) {
            toast.error("Lỗi khi tạo diện tích");
            throw error;
        }
    };

    const updateFacility = async (facility: Facility): Promise<Facility> => {
        try {
            const response = await axios.put<Facility>(`${baseUrl}/admin/facility/${facility.id}`, facility);
            toast.success("Cập nhật diện tích thành công!");
            return response.data;
        } catch (error) {
            toast.error("Lỗi khi cập nhật diện tích");
            throw error;
        }
    };

    const deleteFacility = async (facilityId: number): Promise<void> => {
        try {
            await axios.delete(`${baseUrl}/admin/facility/${facilityId}`);
            toast.success("Xóa diện tích thành công!");
        } catch (error) {
            toast.error("Lỗi khi xóa diện tích");
            throw error;
        }
    };

    return { facilities, facility, getAllFacilities, createFacility, updateFacility, deleteFacility };
});