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
    roomType: roomType;
    roomImages: RoomImage[];
}

export interface RoomTypeResponse2 {
    id: number;
    name: string;
    size: number;
    price: number;
    peopleAbout: number;
    description: string;
    rooms: RoomResponse[];
}
interface roomType {
    id: number;
    name: string;
    size: number;
    price: number;
    peopleAbout: number;
}
