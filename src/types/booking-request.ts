export interface CreateBookingRequest {
    guestBookingRequest: GuestBookingRequest
    bookingRequest: BookingRequest
    bookingDetailRequest: BookingDetailRequest[]
    bookingFacilityRequest: BookingFacilityRequest[]
    stayRequest: StayRequest[]
}

export interface GuestBookingRequest {
    fullname: string
    phone: string
    email: string
    cccd: string
}

export interface BookingRequest {
    checkInDate: string
    checkOutDate: string
    isDeposit: boolean
    bookingStatus: string
    numGuest: number
    userId: number
    numberOfNights: number
}

export interface BookingDetailRequest {
    roomTypeId: number
    quantity: number
}

export interface BookingFacilityRequest {
    facilityId: number
    quantity: number
}

export interface StayRequest {
    roomId: number
    roomNumber: string
    actualCheckIn: string
    actualCheckOut: string
    stayStatus: string
    note: string
    infoGuests: InfoGuestRequest[]
}

export interface InfoGuestRequest {
    cccd: string
    occupantType: string
    name: string
    phone: string
}
