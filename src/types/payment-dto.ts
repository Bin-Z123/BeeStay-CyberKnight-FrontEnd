/**
 * CreatePaymentLinkRequest interface
 */
export interface CreatePaymentLinkRequest {
    bookingId: number;
    returnUrl: string;
    cancelUrl: string;
}

/**
 * PaymentResponse interface
 */
export interface PaymentPayOsResponse {
    error: number;
    message: string;
    data: {};
}