import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import { useDebounce } from "@vueuse/core";
import { toast } from "vue-sonner";
import { config } from "process";
import { useAuthStore } from "../stores/auth/login";

const baseUrl = import.meta.env.VITE_API_BASE_URL;
// Hủy request khi người dung dùng thao tác 
const aborter = new AbortController();

const myAxios: AxiosInstance = axios.create({
    baseURL: baseUrl,
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        common: ['Access-Control-Allow-Origin', '*']
    },
    withCredentials: true,
    signal: aborter.signal
})


myAxios.interceptors.request.use(
    (config: AxiosRequestConfig): any => {
        if (!config.headers) {
            config.headers = {}; // Init header if they undefield
        }
        if (config.data instanceof FormData) {
            config.headers["Content-Type"] = "multipart/form-data"; //Init header with multipart
        } else {
            config.headers["Content-Type"] = "application/json"; // Init header with json
        }
        return config

    }, (error) => {
        return Promise.reject(error)
    }
)

myAxios.interceptors.response.use(
    function (response: any): any {
        // console.log("Log Response: ");
        // console.log(response.data.message);
        if (response.data.code || response.data.data) {
            if (response.data.message && response.data.message.length > 0) {
                toast.success(response.data.message, {
                    action: {
                        label: "Thoát"
                    }
                });
            }
            // toast.success(response.message);
            return response;
        }
        if (response.data.message && response.data.message.length > 0) {
            toast.error(response.data.message);
        }
        return response;
    }, function (error): any {
        toast.error(error.message)
        if (error.response) {
            switch (error.response.status) {
                case 500:
                    break;
                case 401:
                    useAuthStore().logout();
                    break;
            }
        }
        return error.response
    }
);

export { myAxios };