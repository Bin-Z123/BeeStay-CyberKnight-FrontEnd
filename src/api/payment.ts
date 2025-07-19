import axios from "axios";
import { defineStore } from "pinia";
import { toast } from "vue-sonner";
import { ref } from "vue";
import { CreatePaymentLinkRequest, PaymentPayOsResponse, PaymentCashRequest } from "@/types/payment-dto";

const baseUrl = import.meta.env.VITE_API_BASE_URL;

export const PaymentAPI = defineStore('payment', () => {
    const isLoading = ref(false);
    // const PaymentPayOsResponse = ref<PaymentPayOsResponse>({
    //     error: 0,
    //     message: '',
    //     data: {}
    // })
    const paymentOsData = ref<PaymentPayOsResponse['data']>({})
    const createPaymentPayOsLink = async (request: CreatePaymentLinkRequest): Promise<PaymentPayOsResponse> => {
        isLoading.value = true;
        try {
            console.log("Creating Payment Link with Request: ", JSON.stringify(request, null, 2));
            const response = await axios.post<PaymentPayOsResponse>(`${baseUrl}/orderPayOS/create`, request, {
                withCredentials: true,
            });
            paymentOsData.value = response.data.data;
            console.log("Payment Link Data: ", JSON.stringify(paymentOsData.value, null, 2));
            return response.data;
        } catch (error) {

            toast.error("Failed to create payment link");
            throw error;
        } finally {
            isLoading.value = false;
        }
    }

    const getPaymentOsData = async (bookingId: number): Promise<PaymentPayOsResponse> => {
        isLoading.value = true;
        try {
            const response = await axios.get<PaymentPayOsResponse>(`${baseUrl}/orderPayOS/${bookingId}`, {
                withCredentials: true
            });
            paymentOsData.value = response.data.data;
            console.log("Fetched Payment Data: ", JSON.stringify(paymentOsData.value, null, 2));
            return response.data;
        } catch (error: unknown) {
            toast.error("Failed to fetch payment data");
            throw error;
        } finally {

        }
    }

    // Payment Cash 
    const createPaymentByCash = async (request: PaymentCashRequest) => {
        isLoading.value = true;
        try {
            const response = await axios.post(`${baseUrl}/admin/payment/pay`, request)

            toast.success("Tạo thanh toán thành công", {
                action: {
                    label: "Thoát"
                }
            });
            return response.data;
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                toast.error(error.response?.data.message || "Failed to create cash payment", {
                    action: {
                        label: "Thoát"
                    }
                });
            }
        }
    }
    return {
        isLoading,
        paymentOsData,
        createPaymentByCash,
        createPaymentPayOsLink,
        getPaymentOsData,
    }
})
