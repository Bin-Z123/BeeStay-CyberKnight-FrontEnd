import axios from "axios";
import { defineStore } from "pinia";
import { toast } from "vue-sonner";
import { ref } from "vue";

import { BookingDetailRequestUpdate } from "@/types";
import {
  BookingResponse,
  BookingTicketResponse,
  Booking,
} from "@/interface/booking.interface";

const baseUrl = import.meta.env.VITE_API_BASE_URL;

export const BookingDetails = defineStore("bookingDetail", () => {
  const isLoading = ref(false);
  const bookingDetails = ref<BookingDetailRequestUpdate[]>([]);
  const bookingDetail = ref<BookingDetailRequestUpdate>({
    id: 0,
    roomTypeId: 0,
    quantity: 0,
  });

  const updateBookingDetail = async (
    bookingDetailData: BookingDetailRequestUpdate[],
    bookingId: number
  ) => {
    isLoading.value = true;
    console.log(
      "BookingDetailData: ",
      JSON.stringify(bookingDetailData),
      "BookingId: ",
      bookingId
    );
    try {
      const response = await axios.put<BookingDetailRequestUpdate>(
        `${baseUrl}/rep/bookingDetail/${bookingId}`,
        bookingDetailData
      );
      const updatedDetail = response.data;
      const index = bookingDetails.value.findIndex(
        (detail) => detail.id === updatedDetail.id
      );
      if (index !== -1) {
        bookingDetails.value[index] = updatedDetail;
      }
      toast.success("Cập nhật số lượng phòng thành công!");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status == 400) {
          toast.error("Cập nhật thất bại: Số lượng phòng không hợp lệ.");
        }
        // toast.error(`Cập nhật thất bại: ${error.response?.data.message || error.message} ${error.response?.status}`);
      }
    } finally {
      isLoading.value = false;
    }
  };

  const bookingdetails = ref<BookingResponse[]>([]);
  const fetchBookingDetails = async (bookingId: number) => {
    isLoading.value = true;
    try {
      const response = await axios.get<BookingResponse[]>(
        `${baseUrl}/user/booking/${bookingId}`,
        { withCredentials: true }
      );
      bookingdetails.value = response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(
          `Lấy thông tin chi tiết đặt phòng thất bại: ${
            error.response?.data.message || error.message
          }`
        );
      }
    } finally {
      isLoading.value = false;
    }
  };

  return {
    isLoading,
    bookingDetails,
    bookingDetail,
    bookingdetails,
    updateBookingDetail,
    fetchBookingDetails,
  };
});
