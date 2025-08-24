import axios from "axios";
import { defineStore } from "pinia";
import { ref } from "vue";
import { toast } from 'vue-sonner'

const baseUrl = import.meta.env.VITE_API_BASE_URL;
const isLoading = ref(false);

export interface ApiResponse {
  code: number;
  message: string;
  data: LogData[];
}

export interface LogData {
  id: number;
  actionType: string;
  logAt: string; // ISO Date
  ip: string;
  amount: number;
  user: User;
}

export interface User {
  id: number;
  phone: string;
  email: string;
  password: string;
  gender: boolean;
  birthday: string; // yyyy-MM-dd
  joinDate: string; // ISO Date
  updateDate: string; // ISO Date
  fullname: string;
  cccd: string;
  point: number;
  role: Role;
  rank: Rank;
  booking: Booking[];
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
  user: string[];
}

export interface Booking {
  id: number;
  checkInDate: string;
  checkOutDate: string;
  totalAmount: number;
  isDeposit: boolean;
  bookingStatus: string;
  bookingDate: string;
  numGuest: number;
  user: string;
  guestBooking: GuestBooking;
  bookingDetails: BookingDetail[];
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
  description: string;
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
  discountValue: number;
  startDate: string;
  endDate: string;
  status: string;
  roomTypes: string[];
}


export const useLogs = defineStore("logs", () => {
  const logs = ref<LogData[]>([]);
  const isLoading = ref(false);

  const fetchLogs = async () => {
    isLoading.value = true;
    try {
      const response = await axios.get<ApiResponse>(`${baseUrl}/admin/log/list`, { withCredentials: true });
      logs.value = response.data.data;
      isLoading.value = false;
    } catch (error) {
      console.error("Error fetching logs:", error);
      toast.error('Error fetching logs');
      isLoading.value = false;
    }
  };

  return { logs, isLoading, fetchLogs };
});