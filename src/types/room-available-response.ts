export interface RoomAvailabilityResponse {
    roomTypeId: number;
    nameRoomType: string;
    price: number;
    totalRooms: number;
    fixRooms: number;
    usedRooms: number;
    availableRooms: number;
    availableRoomDTO: AvailableRoomDTO[];
}

export interface AvailableRoomDTO {
    nameRoomType: string;
    id: number;
    roomNumber: string;
    roomTypeId: number;
    roomStatus: string;
    floor: number;
}