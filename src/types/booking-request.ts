// CreateBookingRequest
export interface CreateBookingRequest {
    guestBookingRequest: GuestBookingRequest
    bookingRequest: BookingRequest
    bookingDetailRequest: BookingDetailRequest[]
    bookingFacilityRequest: BookingFacilityRequest[]
    stayRequest: StayRequest[]
}
// UpdateRequest
export interface UpdateBookingRequest {
    guestBookingRequest: GuestBookingRequest
    bookingRequest: BookingRequest
    bookingDetailRequest: BookingDetailRequest[]
    bookingFacilityRequest: BookingFacilityRequest[]
    stayRequest: StayRequest[]
}

export interface GuestBookingRequest {
    id?: number
    fullname: string
    phone: string
    email: string
    cccd: string
}

export interface BookingRequest {
    id?: number
    checkInDate: string
    checkOutDate: string
    isDeposit: boolean
    bookingStatus: string
    numGuest: number
    userId: number
    numberOfNights?: number
}

export interface BookingDetailRequest {
    id?: number
    roomTypeId: number
    quantity: number
}

export interface BookingFacilityRequest {
    id?: number
    facilityId: number
    quantity: number
}

export interface StayRequest {
    id?: number
    roomId: number
    roomNumber: string
    actualCheckIn: string
    actualCheckOut: string
    stayStatus: string
    note: string
    infoGuests: InfoGuestRequest[]
}

export interface InfoGuestRequest {
    id?: number
    cccd: string
    occupantType: string
    name: string
    phone: string
}

