import axios from "axios";
import { ref } from "vue";
import { toast } from 'vue-sonner';

const baseUrl = import.meta.env.VITE_API_BASE_URL;
const isLoading = ref(false);

interface DiscountData {
  id: number;
  title: string;
  description: string;
  discountCode: string;
  discountType: string;
  discountValue: number;
  startDate: string;
  endDate: string;
  status: string;
  roomTypes: [];
  roomTypeIds?: number[];
}

interface DiscountResponse {
  code: number;
  message: string;
  data: DiscountData[];
}

export const Discount = () => {
  const discounts = ref<DiscountData[]>([]);
  const discount = ref<DiscountData>({
    id: 0,
    title: '',
    description: '',
    discountCode: '',
    discountType: 'Normal',
    discountValue: 0,
    startDate: '',
    endDate: '',
    status: 'ACTIVE',
    roomTypes: []
  });

  const getAllDiscount = async (): Promise<DiscountResponse> => {
    try {
      const response = await axios.get<DiscountResponse>(`${baseUrl}/admin/discount/list`);
      discounts.value = response.data.data;
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  const createDiscount = async (discount: DiscountData): Promise<DiscountResponse> => {
    isLoading.value = true;
    try {
      const payload = {
        ...discount,
        discountValue: Number(discount.discountValue),
        startDate: new Date(discount.startDate).toISOString(),
        endDate: new Date(discount.endDate).toISOString(),
        roomTypeIds: discount.roomTypes.map((rt) => rt.id)
      };
      const response = await axios.post<DiscountResponse>(`${baseUrl}/admin/discount/create`, payload);
      toast.success("Thông báo", {
        description: "Tạo discount thành công!",
        action: { label: "Thoát" }
      });
      return response.data;
    } catch (error: any) {
      toast.error("Thông báo", {
        description: "Lỗi tạo discount: " + (error.response?.data?.message || error.message)
      });
      throw error;
    } finally {
      isLoading.value = false;
    }
  };

  const updateDiscount = async (discount: DiscountData): Promise<DiscountResponse> => {
    isLoading.value = true;
    try {
      const payload = {
        ...discount,
        discountValue: Number(discount.discountValue),
        startDate: new Date(discount.startDate).toISOString(),
        endDate: new Date(discount.endDate).toISOString(),
        roomTypeIds: discount.roomTypes.map((rt) => rt.id)
      };
      const response = await axios.put<DiscountResponse>(`${baseUrl}/admin/discount/${discount.id}`, payload);
      toast.success("Thông báo", {
        description: "Cập nhật discount thành công!",
        action: { label: "Thoát" }
      });
      return response.data;
    } catch (error: any) {
      toast.error("Thông báo", {
        description: "Lỗi cập nhật discount: " + (error.response?.data?.message || error.message)
      });
      throw error;
    } finally {
      isLoading.value = false;
    }
  }
  
  const deleteDiscount = async (id: number): Promise<DiscountResponse> => {
    isLoading.value = true;
    try {
      const response = await axios.delete<DiscountResponse>(`${baseUrl}/admin/discount/${id}`);
      if(response.status === 200) {
        toast.success("Thông báo", {
          description: "Xóa discount thành công!",
          action: { label: "Thoát" }
        });
      }else{
        toast.warning("Thông báo", {
          description: "Xóa discount thất bại: " + response.status,
          action: { label: "Thoát" }
        })
      }
      return response.data;
    } catch (error: any) {
      toast.error("Thông báo", {
        description: "Lỗi xóa discount: " + (error.response?.data?.message || error.message)
      });
      throw error;
    } finally {
      isLoading.value = false;
    }
  };

  return { discount, discounts, getAllDiscount, createDiscount, updateDiscount, deleteDiscount, isLoading };
};
