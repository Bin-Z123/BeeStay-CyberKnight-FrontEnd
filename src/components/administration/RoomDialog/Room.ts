interface Rooms {
    id: number;
    roomNumber: string;
    roomStatus: string;
    floor: number;
    roomType: string;
    roomImage: {
        id: number;
        imagePublicID: string;
        altText: string;
    }[];
}

export const Rooms = () => {
    const rooms: Rooms[] = [
        {
    id: 1,
    roomNumber: "A101",
    roomStatus: "AVAILABLE",
    floor: 1,
    roomType: "Deluxe",
    roomImage: [
      { id: 1, imagePublicID: "home-1.1_x5mdyb.jpg", altText: "Ảnh phòng A101 - 1" },
      { id: 2, imagePublicID: "home-1.1_x5mdyb.jpg", altText: "Ảnh phòng A101 - 2" },
      { id: 3, imagePublicID: "home-1.1_x5mdyb.jpg", altText: "Ảnh phòng A101 - 3" }
    ]
  },
  {
    id: 2,
    roomNumber: "B202",
    roomStatus: "OCCUPIED",
    floor: 2,
    roomType: "Standard",
    roomImage: [
      { id: 4, imagePublicID: "home-1.1_x5mdyb.jpg", altText: "Ảnh phòng B202 - 1" },
      { id: 5, imagePublicID: "home-1.1_x5mdyb.jpg", altText: "Ảnh phòng B202 - 2" },
      { id: 6, imagePublicID: "home-1.1_x5mdyb.jpg", altText: "Ảnh phòng B202 - 3" },
      { id: 7, imagePublicID: "home-1.1_x5mdyb.jpg", altText: "Ảnh phòng B202 - 4" }
    ]
  },
  {
    id: 3,
    roomNumber: "C303",
    roomStatus: "MAINTENANCE",
    floor: 3,
    roomType: "Suite",
    roomImage: [
      { id: 8, imagePublicID: "home-1.1_x5mdyb.jpg", altText: "Ảnh phòng C303 - 1" },
      { id: 9, imagePublicID: "home-1.1_x5mdyb.jpg", altText: "Ảnh phòng C303 - 2" },
      { id: 10, imagePublicID: "home-1.1_x5mdyb.jpg", altText: "Ảnh phòng C303 - 3" },
      { id: 11, imagePublicID: "home-1.1_x5mdyb.jpg", altText: "Ảnh phòng C303 - 4" },
      { id: 12, imagePublicID: "home-1.1_x5mdyb.jpg", altText: "Ảnh phòng C303 - 5" }
    ]
  },
  {
    id: 4,
    roomNumber: "D404",
    roomStatus: "AVAILABLE",
    floor: 4,
    roomType: "Superior",
    roomImage: [
      { id: 13, imagePublicID: "home-1.1_x5mdyb.jpg", altText: "Ảnh phòng D404 - 1" },
      { id: 14, imagePublicID: "home-1.1_x5mdyb.jpg", altText: "Ảnh phòng D404 - 2" },
      { id: 15, imagePublicID: "home-1.1_x5mdyb.jpg", altText: "Ảnh phòng D404 - 3" }
    ]
  },
  {
    id: 5,
    roomNumber: "E505",
    roomStatus: "OCCUPIED",
    floor: 5,
    roomType: "Executive",
    roomImage: [
      { id: 16, imagePublicID: "home-1.1_x5mdyb.jpg", altText: "Ảnh phòng E505 - 1" },
      { id: 17, imagePublicID: "home-1.1_x5mdyb.jpg", altText: "Ảnh phòng E505 - 2" },
      { id: 18, imagePublicID: "home-1.1_x5mdyb.jpg", altText: "Ảnh phòng E505 - 3" },
      { id: 19, imagePublicID: "home-1.1_x5mdyb.jpg", altText: "Ảnh phòng E505 - 4" }
    ]
  }
    ]
    return {
        rooms
    }
}