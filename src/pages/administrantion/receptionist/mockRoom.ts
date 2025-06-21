import { defineStore } from "pinia";
interface Room {
    id: number;
    roomNumber: string;
    roomStatus: string;
    floor: number;
    roomType: {
        id: number;
        name: string;
        size: number;
        price: number;
        peopleAbout: number;
    };
    roomImages: {
        id: number;
        url: string;
        altext: string;
        isThum: boolean;
    }[];
}
export const useMockRooms = defineStore("mockRooms", () => {
    const mockRooms: Room[] = [
        // --- Floor 1 ---
        {
            id: 1,
            roomNumber: "101",
            roomStatus: "AVAILABLE",
            floor: 1,
            roomType: {
                id: 1,
                name: "Standard",
                size: 25,
                price: 500000,
                peopleAbout: 2,
            },
            roomImages: [
                {
                    id: 101,
                    url: "https://example.com/room101.jpg",
                    altext: "Phòng 101",
                    isThum: true,
                },
            ],
        },
        ...Array.from({ length: 13 }, (_, i) => {
            const roomId = i + 8; // bắt đầu từ id = 8
            const roomNumber = `10${i + 2}`; // Từ 102 đến 114
            return {
                id: roomId,
                roomNumber: roomNumber,
                roomStatus: "STAYING",
                floor: 1,
                roomType: {
                    id: 1,
                    name: "Standard",
                    size: 25,
                    price: 500000,
                    peopleAbout: 2,
                },
                roomImages: [
                    {
                        id: 100 + (i + 2),
                        url: `https://example.com/room${roomNumber}.jpg`,
                        altext: `Phòng ${roomNumber}`,
                        isThum: true,
                    },
                ],
            };
        }),
        {
            id: 2,
            roomNumber: "102",
            roomStatus: "BOOKED",
            floor: 1,
            roomType: {
                id: 2,
                name: "Deluxe",
                size: 30,
                price: 600000,
                peopleAbout: 2,
            },
            roomImages: [
                {
                    id: 102,
                    url: "https://example.com/room102.jpg",
                    altext: "Phòng 102",
                    isThum: true,
                },
            ],
        },

        // --- Floor 2 ---
        {
            id: 3,
            roomNumber: "201",
            roomStatus: "STAYING",
            floor: 2,
            roomType: {
                id: 1,
                name: "Standard",
                size: 25,
                price: 500000,
                peopleAbout: 2,
            },
            roomImages: [
                {
                    id: 201,
                    url: "https://example.com/room201.jpg",
                    altext: "Phòng 201",
                    isThum: true,
                },
            ],
        },
        {
            id: 4,
            roomNumber: "202",
            roomStatus: "STAYING",
            floor: 2,
            roomType: {
                id: 3,
                name: "VIP",
                size: 40,
                price: 1000000,
                peopleAbout: 4,
            },
            roomImages: [
                {
                    id: 202,
                    url: "https://example.com/room202.jpg",
                    altext: "Phòng 202",
                    isThum: true,
                },
            ],
        },
        {
            id: 5,
            roomNumber: "203",
            roomStatus: "MAINTENANCE",
            floor: 2,
            roomType: {
                id: 2,
                name: "Deluxe",
                size: 30,
                price: 600000,
                peopleAbout: 3,
            },
            roomImages: [
                {
                    id: 203,
                    url: "https://example.com/room203.jpg",
                    altext: "Phòng 203",
                    isThum: true,
                },
            ],
        },

        // --- Floor 3 ---
        {
            id: 6,
            roomNumber: "301",
            roomStatus: "LATE",
            floor: 3,
            roomType: {
                id: 1,
                name: "Standard",
                size: 25,
                price: 500000,
                peopleAbout: 2,
            },
            roomImages: [
                {
                    id: 301,
                    url: "https://example.com/room301.jpg",
                    altext: "Phòng 301",
                    isThum: true,
                },
            ],
        },
        {
            id: 7,
            roomNumber: "302",
            roomStatus: "BOOKED",
            floor: 3,
            roomType: {
                id: 3,
                name: "VIP",
                size: 40,
                price: 1000000,
                peopleAbout: 4,
            },
            roomImages: [
                {
                    id: 302,
                    url: "https://example.com/room302.jpg",
                    altext: "Phòng 302",
                    isThum: true,
                },
            ],
        },
    ]
    return {
        mockRooms
    }
})