export interface RoomImage {
    id: number;
    url: string;
    altext: string;
    isThum: boolean;
}

export interface RoomResponse {
    id: number;
    roomNumber: string;
    roomStatus: string;
    floor: number;
    roomType: string;
    roomImages: RoomImage[];
}

export interface RoomTypeResponse2 {
    id: number;
    name: string;
    size: number;
    price: number;
    peopleAbout: number;
    rooms: RoomResponse[];
}
