import axios from "axios";
import { ref } from "vue";
import { toast } from "vue-sonner";

const baseUrl = import.meta.env.VITE_API_BASE_URL;
const isLoading = ref(false);

export interface VouchersResponse {
  code: number;
  message: string;
  data: Vouchers[];
}
export interface Vouchers {
  id: number;
  code: string;
  discountValue: number;
  estatus: "ACTIVE" | "INACTIVE";
}

export const Vouchers = () => {
  const vouchers = ref<Vouchers[]>([]);
  const voucher = ref<Vouchers>({
    id: 0,
    code: "",
    discountValue: 0,
    estatus: "ACTIVE",
  });
  const getAllVouchers = async (): Promise<Vouchers[]> => {
    try {
      const response = await axios.get<VouchersResponse>(
        `${baseUrl}/voucher/list`,
        { withCredentials: true }
      );
      vouchers.value = response.data.data;
      return response.data.data;
    } catch (error) {
      throw error;
    }
  };
  const createVoucher = async (voucher: Vouchers): Promise<Vouchers> => {
    isLoading.value = true;
    try {
      const response = await axios.post<Vouchers>(
        `${baseUrl}/mana/voucher/create`,
        voucher,
        { withCredentials: true }
      );
      isLoading.value = false;
      toast.success("Tạo voucher thành công");
      return response.data;
    } catch (error) {
      isLoading.value = false;
      toast.error("Tạo voucher thất bại");
      throw error;
    }
  };
  const updateVoucher = async (voucher: Vouchers): Promise<Vouchers> => {
    isLoading.value = true;
    try {
      const response = await axios.put<Vouchers>(
        `${baseUrl}/mana/voucher/${voucher.id}`,
        voucher,
        { withCredentials: true }
      );
      isLoading.value = false;
      toast.success("Cập nhật voucher thành công");
      return response.data;
    } catch (error) {
      isLoading.value = false;
      toast.error("Cập nhật voucher thất bại");
      throw error;
    }
  };
  const deleteVoucher = async (id: number): Promise<void> => {
    isLoading.value = true;
    try {
      await axios.delete(`${baseUrl}/mana/voucher/${id}`, {
        withCredentials: true,
      });
      isLoading.value = false;
      toast.success("Xóa voucher thành công");
    } catch (error) {
      isLoading.value = false;
      toast.error("Xóa voucher thất bại");
      throw error;
    }
  };
  return {
    vouchers,
    voucher,
    getAllVouchers,
    createVoucher,
    updateVoucher,
    deleteVoucher,
  };
};
