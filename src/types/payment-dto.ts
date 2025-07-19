/**
 * CreatePaymentLinkRequest interface
 */
export interface CreatePaymentLinkRequest {
    bookingId: number;
    returnUrl: string;
    cancelUrl: string;
}
/**
 * PaymentCashRequest interface
 */
export interface PaymentCashRequest {
    bookingId: number;
    amount: number;
}

/**
 * PaymentResponse interface
 */
export interface PaymentPayOsResponse {
    error: number;
    message: string;
    data: {};
}