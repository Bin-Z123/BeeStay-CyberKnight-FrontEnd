export interface BookingResponse {
  code: number;
  data: Booking[];
}

export interface Booking {
  id: number;
  checkInDate: Date;
  checkOutDate: Date;
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