import axios from "axios"
import { ref } from "vue";
import { toast } from 'vue-sonner'
const baseUrl = import.meta.env.VITE_API_BASE_URL;
interface LoginResponse {
    accessToken: string
}
export const Auth = () =>{

const isLoading = ref(false)
const login = async (username: string, password: string): Promise<LoginResponse> => {
    isLoading.value = true 
    try{
        const response = await axios.post<LoginResponse>(`${baseUrl}/login`,{
            username, 
            password
        })
        console.log("status: "+response.status)
        if(response.status === 200){
            const token = response.data.accessToken
            localStorage.setItem("acccessToken", token)
            toast.success('Thông báo',{
                description: 'Đăng nhập thành công' +response.status,
                action: {
                    label: 'Thoát',

                },
            })
            setTimeout(() => {
                window.location.href = '/administration';
            },1000);
            return response.data
        }else {
            toast('Thông báo',{
                description: 'Đăng nhập thất bại '+ response.status,
                action: {
                    label: 'Thoát',
                    onClick: () => {}
                },
            })
            return response.data
        }
    }catch(error){
        toast.error('Thông báo',{
                description: 'Lỗi không xác định ' + error,
            })
        // Return a default value or rethrow, here we throw to ensure type safety
        throw error
    }finally{
        setTimeout(() => {
            isLoading.value = false
        },1000);
    }
}
return {
    login,
    isLoading
};
}