import axios from "axios";
import { defineStore } from "pinia";
import { toast } from "vue-sonner";
import { ref } from "vue";

const baseUrl = import.meta.env.VITE_API_BASE_URL;

export interface BookingResponse {
  code: number;
  data: Booking[];
}

export interface Booking {
  id: number;
  checkInDate: string;
  checkOutDate: string;
  totalAmount: number;
  isDeposit: boolean;
  bookingStatus: BookingStatus;
  bookingDate: string;
  numGuest: number;
  user: User;
}

export interface User {
  id: number;
  phone: string;
  email: string;
  password: string;
  gender: boolean;
  birthday: string;
  joinDate: string;
  updateDate: string;
  fullname: string;
  cccd: string;
  point: number;
  eblacklist: BlacklistStatus;
}

export type BookingStatus = "CONFIRMED" | "CANCEL";
export type BlacklistStatus = "NORM" | "BLACKLISTED" | string;

export const Booking = defineStore("booking", () => {
    const bookings = ref<Booking[]>([]);
    const booking =  ref<Booking>({
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
            eblacklist: "NORM",
        },
    });

    const getBookings = async () => {
        try {
            const response = await axios.get<BookingResponse>(`${baseUrl}/booking/list`);
            bookings.value = response.data.data;
            return response.data;
        } catch (error) {
            throw error;
        }
    };

    return {
        bookings,
        booking,
        getBookings
    };    
});
