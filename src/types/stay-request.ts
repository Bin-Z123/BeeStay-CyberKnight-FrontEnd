export interface StayCreateRequest {
    roomId: number;
    bookingId: number;
    actualCheckIn: string;
    actualCheckOut: string;
    note: string;
    infoGuests: InfoGuests[];
}[]

export interface InfoGuests {
    cccd: string;
    name: string;
    occupantType: string;
    phone: string;
}