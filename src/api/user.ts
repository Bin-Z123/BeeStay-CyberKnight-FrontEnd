// import axios from "axios";
// import { ref } from "vue";
// import { toast } from 'vue-sonner'

// const baseUrl = import.meta.env.VITE_API_BASE_URL;

// interface Role {
//   id: number;
//   roleName: string;
//   users: string[];
// }

// interface User {
//   id: number;
//   phone: string;
//   email: string;
//   password: string;
//   gender: boolean;
//   birthday: string;
//   joinDate: string;
//   updateDate: string;
//   fullname: string;
//   cccd: string;
//   point: number;
//   role: Role;
//   eblacklist: 'FIRST' | 'SECOND' | 'THIRD' | 'NONE';
// }

// const isLoading = ref(false);

// export const User = () => {
//     const users = ref<User[]>([]);
//     const user = ref<User>({
//         id: 0,
//         phone: '',
//         email: '',
//         password: '',
//         gender: false,
//         birthday: '',
//         joinDate: '',
//         updateDate: '',
//         fullname: '',
//         cccd: '',
//         point: 0,
//         role: {
//             id: 0,
//             roleName: '',
//             users: []
//         },
//         eblacklist: 'NONE'
//     });

//     const getAllUsers = async () => {
//         isLoading.value = true;
//         try {
//             const response = await axios.get(`${baseUrl}/users`);
//             users.value = response.data;
//         } catch (error) {
//             toast.error("Lỗi khi lấy danh sách người dùng");
//         } finally {
//             isLoading.value = false;
//         }
//     };

//     return { users, user, getAllUsers };
// }
