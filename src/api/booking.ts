import axios from "axios";
import { defineStore } from "pinia";
import { toast } from "vue-sonner";
import { ref } from "vue";
import { CreateBookingRequest, RoomAvailabilityResponse } from "@/types";
import { format } from "date-fns";

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
  guestBooking: GuestBooking;
  bookingDetails: BookingDetail[];
  bookingFacilities: BookingFacility[];
  stay: Stay[];
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
  role: Role;
  rank: Rank;
  eblacklist: BlacklistStatus;
}

export interface Role {
  id: number;
  roleName: string;
  users: string[];
}

export interface Rank {
  id: number;
  nameRank: string;
  minPointRequired: number;
  discount_percent: number;
  User: string[];
  user: string[];
}

export interface GuestBooking {
  id: number;
  fullname: string;
  phone: string;
  email: string;
  cccd: string;
  createAt: string;
  bookings: string[];
}

export interface BookingDetail {
  id: number;
  booking: string;
  roomType: RoomType;
  quantity: number;
}

export interface RoomType {
  id: number;
  name: string;
  size: number;
  price: number;
  peopleAbout: number;
  rooms: Room[];
  discounts: Discount[];
  bookingDetails: string[];
}

export interface Room {
  id: number;
  roomNumber: string;
  roomStatus: string;
  floor: number;
  roomType: string;
  stays: Stay[];
  roomImages: RoomImage[];
}

export interface RoomImage {
  id: number;
  room: string;
  url: string;
  altext: string;
  isThum: boolean;
}

export interface Discount {
  id: number;
  title: string;
  description: string;
  discountCode: string;
  discountType: string;
  discountValue: string;
  startDate: string;
  endDate: string;
  status: string;
  roomTypes: string[];
}

export interface BookingFacility {
  id: number;
  booking: string;
  facility: Facility;
  quantity: number;
}

export interface Facility {
  id: number;
  facilityName: string;
  description: string;
  price: number;
  bookingFacilities: string[];
}

export interface Stay {
  id: number;
  room: string;
  booking: string;
  actualCheckIn: string;
  actualCheckOut: string;
  stayStatus: string;
  createdAt: string;
  note: string;
  infoGuests: InfoGuest[];
}

export interface InfoGuest {
  id: number;
  cccd: string;
  occupantType: string;
  name: string;
  phone: string;
}

export type BookingStatus = "CONFIRMED" | "CANCEL" | string;
export type BlacklistStatus = "NORM" | "BLACKLISTED" | string;

export const Booking = defineStore("booking", () => {
  const isloading = ref(false);
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

  const createBooking = async (booking: CreateBookingRequest) => {
    try {
      isloading.value = true
      const response = await axios.post(`${baseUrl}/booking/order`, booking)
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
  const getAvailableRooms = async (checkinDateF: Date, checkoutDateF: Date): Promise<AvalableResponse> => {
    try {
      const checkinDate = format(checkinDateF, "dd/MM/yyyy")
      const checkoutDate = format(checkoutDateF, "dd/MM/yyyy")
      console.log("checkinDateF: ", checkinDate, "checkoutDateF: ", checkoutDate);
      const response = await axios.get<AvalableResponse>(`${baseUrl}/booking/availableRoomsTypeAndDateV2?fromDate=${checkinDate}&toDate=${checkoutDate}`);
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
    bookings,
    booking,
    getBookings,
    getAvailableRooms,
    createBooking,
    listRoomsAvailable,
    isloading,
  };
});
