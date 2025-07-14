import axios from "axios";
import { defineStore } from "pinia";
import { toast } from "vue-sonner";
import { ref } from "vue";
import { formatDateWitCheckInCheckOutAvailable, } from "@/utils";
import {
  Booking,
  BookingResponse,
  BookingStatus,
  BlacklistStatus
} from "@/interface/booking.interface";
import { CreateBookingRequest, RoomAvailabilityResponse } from "@/types";
import { format } from "date-fns";
import { ro } from "date-fns/locale";

const baseUrl = import.meta.env.VITE_API_BASE_URL;

export const Bookings = defineStore("booking", () => {
  const isloading = ref(false);
  const bookings = ref<Booking[]>([]);

  const booking = ref<Booking>({
    id: 0,
    checkInDate: new Date(),
    checkOutDate: new Date(),
    totalAmount: 0,
    isDeposit: false,
    bookingStatus: "CONFIRMED",
    bookingDate: "",
    numGuest: 0,
    user: {
      id: 0,
      phone: "",
      email: "",
      password: "",
      gender: true,
      birthday: "",
      joinDate: "",
      updateDate: "",
      fullname: "",
      cccd: "",
      point: 0,
      role: {
        id: 0,
        roleName: "",
        users: [],
      },
      rank: {
        id: 0,
        nameRank: "",
        minPointRequired: 0,
        discount_percent: 0,
        User: [],
        user: [],
      },
      eblacklist: "NORM",
    },
    guestBooking: {
      id: 0,
      fullname: "",
      phone: "",
      email: "",
      cccd: "",
      createAt: "",
      bookings: [],
    },
    bookingDetails: [],
    bookingFacilities: [],
    stay: [],
  });

  const getBookings = async () => {
    try {
      const response = await axios.get<BookingResponse>(`${baseUrl}/admin/booking/list`, { withCredentials: true });
      bookings.value = response.data.data;
      return response.data;
    } catch (error: any) {
      toast.error("Lỗi khi tải danh sách booking");
      throw error;
    }
  };

  const createBooking = async (booking: CreateBookingRequest) => {
    try {
      isloading.value = true
      const response = await axios.post(`${baseUrl}/admin/booking/order`, booking, { withCredentials: true });
      toast.success("Tạo booking thành công!");
      return response.data
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        toast.error("Lỗi khi tạo booking");
      }
    } finally {
      isloading.value = false
    }
  }

  interface AvalableResponse {
    code: number
    message: string
    data: RoomAvailabilityResponse[]
  }
  const listRoomsAvailable = ref<RoomAvailabilityResponse[]>([]);
  const roomTypeId = ref<number>(0);
  const numberOfPeople = ref<number>(0);
  const checkin = ref<Date>(new Date());
  const checkout = ref<Date>(new Date());
  const getAvailableRooms = async (checkinDateF: Date, checkoutDateF: Date, numberofpeople: number): Promise<AvalableResponse> => {
    try {
      const checkinDate = formatDateWitCheckInCheckOutAvailable(checkinDateF, 14, 0, 0)
      const checkoutDate = formatDateWitCheckInCheckOutAvailable(checkoutDateF, 12, 0, 0)
      checkin.value = checkinDateF;
      checkout.value = checkoutDateF;
      numberOfPeople.value = numberofpeople;
      console.log("checkinDateF: ", checkinDate, "checkoutDateF: ", checkoutDate);
      const response = await axios.get<AvalableResponse>(`${baseUrl}/availableRoomsTypeAndDateV2?fromDate=${checkinDate}&toDate=${checkoutDate}`, {
        withCredentials: true
      });
      listRoomsAvailable.value = response.data.data;
      return response.data
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        toast.error("Lỗi khi tải danh sách phòng trống")
        throw error
      }
      throw error
    }
  }

  const getAvailableRoomsByDate = async (checkinDateF: Date, checkoutDateF: Date): Promise<AvalableResponse> => {
    try {
      const checkinDate = formatDateWitCheckInCheckOutAvailable(checkinDateF, 14, 0, 0)
      const checkoutDate = formatDateWitCheckInCheckOutAvailable(checkoutDateF, 12, 0, 0)
      console.log("checkinDateF: ", checkinDate, "checkoutDateF: ", checkoutDate, "roomtypeid: ");
      const response = await axios.get<AvalableResponse>(`${baseUrl}/availableRoomsTypeAndDateV2?fromDate=${checkinDate}&toDate=${checkoutDate}`, {
        withCredentials: true
      });
      listRoomsAvailable.value = response.data.data;
      return response.data
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        toast.error("Lỗi khi tải danh sách phòng trống")
        throw error
      }
      throw error
    }
  }

  return {
    checkin,
    checkout,
    bookings,
    booking,
    numberOfPeople,
    getBookings,
    getAvailableRooms,
    createBooking,
    getAvailableRoomsByDate,
    listRoomsAvailable,
    isloading,
  };
});
