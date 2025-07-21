import axios from "axios";
import { ref } from "vue";
import { toast } from 'vue-sonner'
import { defineStore } from "pinia";

const baseUrl = import.meta.env.VITE_API_BASE_URL;

interface Facility {
    id: number;
    facilityName: string;
    description: string;
    price: number;
    publicId: string;
}

interface FacilityResponse {
    code: number;
    message: string;
    data: Facility[];
}

export const Facilities = defineStore('facilities', () => {
    const isLoading = ref(false);
    const isLoadingUpdate = ref(false);
    const facilities = ref<Facility[]>([]);
    const facility = ref<Facility>({
        id: 0,
        facilityName: '',
        description: '',
        price: 0,
        publicId: ''
    });
    const getAllFacilities = async (): Promise<FacilityResponse> => {
        try {
            const response = await axios.get<FacilityResponse>(`${baseUrl}/admin/facility/list`, {
                withCredentials: true
            });
            facilities.value = response.data.data;
            return response.data;
        } catch (error) {
            toast.error("Lỗi khi lấy danh sách dịch vụ");
            throw error;
        }
    };

    const createFacility = async (facility: Facility, file: File): Promise<Facility> => {
        isLoading.value = true;
        try {
            const formData = new FormData()
            const faciBlob = new Blob([JSON.stringify(facility)], { type: "application/json" });
            formData.append('facility', faciBlob);
            formData.append('file', file);
            const response = await axios.post<Facility>(`${baseUrl}/admin/facility/create`, formData, {
                withCredentials: true
            });
            toast.success("Tạo dịch vụ thành công!");
            return response.data;
        } catch (error) {
            toast.error("Lỗi khi tạo dịch vụ");
            throw error;
        } finally {
            isLoading.value = false
        }
    };

    const updateFacility = async (facility: Facility, file: File): Promise<Facility> => {
        isLoadingUpdate.value = true;
        try {
            const formData = new FormData()
            const faciBlob = new Blob([JSON.stringify(facility)], { type: "application/json" });
            formData.append('facility', faciBlob);
            formData.append('file', file);
            const response = await axios.put<Facility>(`${baseUrl}/admin/facility/${facility.id}`, formData, {
                withCredentials: true
            });
            toast.success("Cập nhật dịch vụ thành công!");
            return response.data;
        } catch (error) {

            toast.error("Lỗi khi cập nhật dịch vụ");
            throw error;
        } finally {
            isLoadingUpdate.value = false
        }
    };

    const deleteFacility = async (facilityId: number): Promise<void> => {
        isLoading.value = true;
        try {
            await axios.delete(`${baseUrl}/admin/facility/${facilityId}`, {
                withCredentials: true
            });
            toast.success("Xóa dịch vụ thành công!");
        } catch (error) {
            toast.error("Lỗi khi xóa dịch");
            throw error;
        } finally {
            isLoading.value = false
        }
    };

    return { facilities, facility, isLoading, isLoadingUpdate, getAllFacilities, createFacility, updateFacility, deleteFacility };
});