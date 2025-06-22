import axios from "axios";
import { defineStore } from "pinia";
import { toast } from "vue-sonner";
import { ref } from "vue";
import { 
  Booking,
  BookingResponse,
  BookingStatus,
  BlacklistStatus
} from "@/interface/booking.interface";

const baseUrl = import.meta.env.VITE_API_BASE_URL;

export const Bookings = defineStore("booking", () => {
  const bookings = ref<Booking[]>([]);

  const booking = ref<Booking>({
    id: 0,
    checkInDate: "",
    checkOutDate: "",
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
      const response = await axios.get<BookingResponse>(`${baseUrl}/booking/list`);
      bookings.value = response.data.data;
      return response.data;
    } catch (error: any) {
      toast.error("Lỗi khi tải danh sách booking");
      throw error;
    }
  };

  return {
    bookings,
    booking,
    getBookings,
  };
});
