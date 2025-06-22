import axios from "axios";
import { ref } from "vue";
import { toast } from 'vue-sonner'
const baseUrl = import.meta.env.VITE_API_BASE_URL;

const isLoading = ref(false)
interface Rank {
    id: number,
    nameRank: string,
    minPointRequired: number,
    discount_percent: number
}
interface RankResponse {
    code: number,
    message: string,
    data: Rank[]
}

export const Rank = () =>{
    const ranks = ref<Rank[]>([])
    const rank = ref<Rank>({
        id: 0,
        nameRank: '',
        minPointRequired: 0,
        discount_percent: 0
    });
    const getAllRank = async (): Promise<RankResponse> => {
        try{
            const response = await axios.get<RankResponse>(`${baseUrl}/rank/list`);
            console.log("status: "+response.status)
            ranks.value = response.data.data;
            return response.data
        }catch(error){
            throw error
        }
    }

    const createRank = async (rank: Rank): Promise<RankResponse> => {
        isLoading.value = true;
        try {
            const response = await axios.post<RankResponse>(`${baseUrl}/rank/create`, rank);
            
            if (response.status === 200) {
                toast.success('Thông báo', {
                    description: 'Tạo rank thành công!',
                    action: { label: 'Thoát' },
                });
            } else {
                toast.warning('Thông báo', {
                    description: 'Tạo rank thất bại: ' + response.status,
                    action: { label: 'Thoát' },
                });
            }
            return response.data;
        } catch(error){
            toast.error('Thông báo',{
                description: 'Lỗi không xác định ' + error,
            })
            throw error
        } finally {
            isLoading.value = false;
        }
    };

    const updateRank = async (rank: Rank): Promise<RankResponse> => {
        isLoading.value = true;
        try {
            const response = await axios.put<RankResponse>(`${baseUrl}/rank/${rank.id}`, rank);
            if (response.status === 200) {
                toast.success('Thông báo', {
                    description: 'Cập nhật rank thành công!',
                    action: { label: 'Thoát' },
                });
            }else{
                toast.warning(' thông báo', {
                    description: 'Cập nhật rank thất bại: ' + response.status,
                    action: { label: 'Thoát' },
                });
            }
            return response.data;
        } catch (error) {
            toast.error(' thông báo',{
                description: 'Lỗi không xác định ' + error,
            })
            throw error;
        } finally {
            isLoading.value = false;
        }
    };

    const deleteRank = async (id: number): Promise<RankResponse> => {
        isLoading.value = true;
        try {
            const response = await axios.delete<RankResponse>(`${baseUrl}/rank/${id}`);
            if(response.status === 200){
                toast.success('Thông báo', {
                    description: 'Xóa rank thành công!',
                    action: { label: 'Thoát' },
                });
            }else{
                toast.warning(' thông báo', {
                    description: 'Xóa rank thất bại: ' + response.status,
                    action: { label: 'Thoát' },
                })
            }
            return response.data;
        } catch (error) {
            toast.error(' thông báo',{
                description: 'Lỗi không xác định ' + error,
            })
            throw error;
        } finally {
            isLoading.value = false;
        }
    };

    return { rank, ranks, getAllRank, createRank, updateRank, deleteRank, isLoading}
}