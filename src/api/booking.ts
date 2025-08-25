import axios from "axios";
import { defineStore } from "pinia";
import { toast } from "vue-sonner";
import { ref, onMounted } from "vue";
import { formatDateWitCheckInCheckOutAvailable } from "@/utils";
import {
  Booking,
  BookingResponse,
  BookingStatus,
  BlacklistStatus,
  BookingTicketResponse,
} from "@/interface/booking.interface";
import {
  CreateBookingRequest,
  RoomAvailabilityResponse,
  GuestBookingRequest,
} from "@/types";
import { format } from "date-fns";
import { ro } from "date-fns/locale";
import { useAuthStore } from "@/stores/auth/login";
import { useRouter } from "vue-router";
import { myAxios } from "./axios";
const router = useRouter();
const baseUrl = import.meta.env.VITE_API_BASE_URL;

export const Bookings = defineStore("booking", () => {
  const isloading = ref(false);
  const bookings = ref<Booking[]>([]);
  const authStore = useAuthStore();
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
      const response = await axios.get<BookingResponse>(
        `${baseUrl}/office/booking/list`,
        { withCredentials: true }
      );
      bookings.value = response.data.data;
      return response.data;
    } catch (error: any) {
      toast.error("Lỗi khi tải danh sách booking");
      throw error;
    }
  };

  const createBooking = async (booking: CreateBookingRequest) => {
    try {
      isloading.value = true;
      const response = await axios.post(
        `${baseUrl}/booking/order`,
        booking,
        { withCredentials: true }
      );
      toast.success("Tạo booking thành công!");
      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        toast.error("Lỗi khi tạo booking");
      }
    } finally {
      isloading.value = false;
    }
  };

  const createBookingUser = async (booking: CreateBookingRequest) => {
    try {
      isloading.value = true;
      const response = await axios.post(
        `${baseUrl}/user/booking`,
        booking,
        { withCredentials: true }
      );
      toast.success("Tạo booking thành công!");
      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        toast.error("Lỗi khi tạo booking");
      }
    } finally {
      isloading.value = false;
    }
  };

  interface AvalableResponse {
    code: number;
    message: string;
    data: RoomAvailabilityResponse[];
  }
  const listRoomsAvailable = ref<RoomAvailabilityResponse[]>([]);
  const roomTypeId = ref<number>(0);
  const numberOfPeople = ref<number>(0);
  const checkin = ref<Date>(new Date());
  const checkout = ref<Date>(new Date());
  const finalSelectedRooms = ref<any>({});
  const finalNumberOfNights = ref(0);
  const selectedFacilities = ref<any[]>([]);

  const getAvailableRooms = async (
    checkinDateF: Date,
    checkoutDateF: Date,
    numberofpeople: number
  ): Promise<AvalableResponse> => {
    try {
      const checkinDate = formatDateWitCheckInCheckOutAvailable(
        checkinDateF,
        14,
        0,
        0
      );
      const checkoutDate = formatDateWitCheckInCheckOutAvailable(
        checkoutDateF,
        12,
        0,
        0
      );
      checkin.value = checkinDateF;
      checkout.value = checkoutDateF;
      numberOfPeople.value = numberofpeople;
      // console.log("checkinDateF: ", checkinDate, "checkoutDateF: ", checkoutDate);
      const response = await axios.get<AvalableResponse>(
        `${baseUrl}/availableRoomsTypeAndDateV2?fromDate=${checkinDate}&toDate=${checkoutDate}`,
        {
          withCredentials: true,
        }
      );
      listRoomsAvailable.value = response.data.data;
      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        toast.error("Lỗi khi tải danh sách phòng trống");
        throw error;
      }
      throw error;
    }
  };

  const getAvailableRoomsByDate = async (
    checkinDateF: Date,
    checkoutDateF: Date
  ): Promise<AvalableResponse> => {
    try {
      const checkinDate = formatDateWitCheckInCheckOutAvailable(
        checkinDateF,
        14,
        0,
        0
      );
      const checkoutDate = formatDateWitCheckInCheckOutAvailable(
        checkoutDateF,
        12,
        0,
        0
      );
      // console.log("checkinDateF: ", checkinDate, "checkoutDateF: ", checkoutDate, "roomtypeid: ");
      const response = await axios.get<AvalableResponse>(
        `${baseUrl}/availableRoomsTypeAndDateV2?fromDate=${checkinDate}&toDate=${checkoutDate}`,
        {
          withCredentials: true,
        }
      );
      listRoomsAvailable.value = response.data.data;
      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        toast.error("Lỗi khi tải danh sách phòng trống");
        throw error;
      }
      throw error;
    }
  };

  const bookingTicket = ref<Booking>();
  const getBookingbyId = async (id: number): Promise<BookingTicketResponse> => {
    isloading.value = true;
    try {
      const response = await axios.get<BookingTicketResponse>(
        `${baseUrl}/booking/${id}`,
        { withCredentials: true }
      );
      bookingTicket.value = response.data.data;
      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        toast.error("Lỗi khi tải thông tin booking");
        throw error;
      }
      throw error;
    } finally {
      isloading.value = false;
    }
  };

  const updatePriceForBooking = async (bookingId: number) => {
    isloading.value = true;
    try {
      const response = await axios.put(
        `${baseUrl}/afterUBD/${bookingId}`,
        {},
        { withCredentials: true }
      );
      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        toast.error("Lỗi khi cập nhật giá booking");
        throw error;
      }
      throw error;
    } finally {
      isloading.value = false;
    }
  };
  const updatePriceForBookingFirstNight = async (bookingId: number) => {
    isloading.value = true;
    try {
      const response = await axios.put(
        `${baseUrl}/afterUBD2/${bookingId}`,
        {},
        { withCredentials: true }
      );
      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        toast.error("Lỗi khi cập nhật giá booking");
        throw error;
      }
      throw error;
    } finally {
      isloading.value = false;
    }
  };

  const processAndConfirmBooking = async (guestInfo: GuestBookingRequest) => {
    const checkinDate = ref(checkin.value);
    const checkoutDate = ref(checkout.value);
    const numGuest = numberOfPeople.value;
    const selectedRoomsData = finalSelectedRooms.value;
    const numberOfNights = finalNumberOfNights.value;
    const selectedFacilitiesData = selectedFacilities.value;

    let userIdForBooking: number;
    let guestDataForBooking: GuestBookingRequest | null;

    if (authStore.user && authStore.user.id) {
      userIdForBooking = authStore.user.id;
      guestDataForBooking = null;
    } else {
      userIdForBooking = 0;
      guestDataForBooking = guestInfo;
    }

    const bookingDetailRequest = Object.values(selectedRoomsData).map(
      (entry: any) => ({
        roomTypeId: entry.roomData.roomTypeId,
        quantity: entry.quantity,
      })
    );

    const bookingFacilityRequest = selectedFacilitiesData.map((facility) => ({
      facilityId: facility.id,
      quantity: 1,
    }));

    const bookingPayload: CreateBookingRequest = {
      guestBookingRequest: guestDataForBooking,
      bookingRequest: {
        checkInDate: format(checkinDate.value, "yyyy-MM-dd'T'14:00'"),
        checkOutDate: format(checkoutDate.value, "yyyy-MM-dd'T'12:00'"),
        isDeposit: false,
        bookingStatus: "NOTPAID",
        numGuest: numGuest,
        userId: userIdForBooking,
        numberOfNights: numberOfNights,
      },
      bookingDetailRequest: bookingDetailRequest,
      bookingFacilityRequest: bookingFacilityRequest,
      stayRequest: [],
    };
    // console.log("Checkout", checkoutDate.value);
    // console.log("Dữ liệu gửi về BE để tạo booking:", JSON.stringify(bookingPayload, null, 2));
    const result = await createBooking(bookingPayload);
    if (result) {
      toast.success("Booking đã được xác nhận thành công!");
    } else {
      toast.error("Xác nhận booking thất bại, vui lòng thử lại sau.");
    }
    return result;
  };

  const bookinghistory = ref<Booking[]>([]);
  const bookingHistory = async () => {
    try {
      const response = await axios.get<BookingResponse>(
        `${baseUrl}/user/booking-history`,
        { withCredentials: true }
      );
      bookinghistory.value = response.data.data;
      return response.data;
    } catch (error: any) {
      toast.error("Lỗi khi tải lịch sử booking");
      throw error;
    }
  };

  const checkoutBooking = async (bookingId: number) => {
    try {
      const response = await axios.put(
        `${baseUrl}/checkout/${bookingId}`,
        {},
        { withCredentials: true }
      );
      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        toast.error("Lỗi khi checkout booking");
        throw error;
      }
      throw error;
    }
  };

  const statusCheckout = async (bookingId: number) => {
    try {
      const response = await axios.put(
        `${baseUrl}/status-checkout/${bookingId}`,
        {},
        { withCredentials: true }
      );
      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        toast.error("Lỗi khi checkout booking");
        throw error;
      }
      throw error;
    }
  };

  const updatePriceBookingStay = async (bookingId: number) => {
    try {
      const response = await axios.put(
        `${baseUrl}/update-booking/${bookingId}`,
        {},
        { withCredentials: true }
      );
      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        toast.error("Lỗi khi cập nhật giá booking");
        throw error;
      }
      throw error;
    }
  };

  return {
    checkin,
    checkout,
    bookings,
    booking,
    numberOfPeople,
    checkoutBooking,
    statusCheckout,
    getBookings,
    getAvailableRooms,
    createBooking,
    getAvailableRoomsByDate,
    getBookingbyId,
    updatePriceForBooking,
    updatePriceBookingStay,
    updatePriceForBookingFirstNight,
    bookingTicket,
    listRoomsAvailable,
    isloading,
    processAndConfirmBooking,
    finalSelectedRooms,
    finalNumberOfNights,
    selectedFacilities,
    bookinghistory,
    bookingHistory,
  };
});
//  NEW API
const getBookingsList = async () => {
  return myAxios.get("/office/booking/list");
};

const putCancelBooking = async (bookingId: number) => {
  return myAxios.put(`/cancel/${bookingId}`);
};

export { putCancelBooking, getBookingsList };
