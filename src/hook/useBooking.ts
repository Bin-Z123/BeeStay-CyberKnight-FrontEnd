import { putCancelBooking, getBookingsList } from "@/api/booking";
import { useMutation, useQuery, useQueryClient } from "@tanstack/vue-query";
import { QUERY_KEY_BOOKING } from "@/constants/query-keys";
import { get } from "lodash";
import { toast } from "vue-sonner";


const useBookingsList = () => {
    return useQuery({
        queryKey: [QUERY_KEY_BOOKING.BOOKING_LIST],
        queryFn: async () => {
            const response = await getBookingsList();
            // console.log(JSON.stringify(response, null, 2))
            return await response.data.data
        },
        refetchOnWindowFocus: false
    })
}

const useCancelBooking = () => {
    const queryClient = useQueryClient();
    const { isPending, mutateAsync } = useMutation({
        mutationFn: async (bookingId: number) => {
            return await putCancelBooking(bookingId)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEY_BOOKING.BOOKING_LIST]
            })
        }
    })
    return { isPending, mutateAsync }
}


export { useCancelBooking, useBookingsList }