import {
    getRoomTypesList,
    getRoomTypeById
} from "../api/roomtype"

import { QUERY_KEY_ROOMTYPE } from "@/constants/query-keys"
import { useQuery, useMutation } from "@tanstack/vue-query"

const useGetRoomTypeList = () => {
    const { data, isLoading, isError, isPending } = useQuery({
        queryKey: [QUERY_KEY_ROOMTYPE.LIST_ROOMTYPE],
        queryFn: async () => {
            const response = await getRoomTypesList();
            console.log("response roomType: ", JSON.stringify(response, null, 2));
            return response.data.data;
        },

    })
    return { data, isLoading, isError, isPending }
}

export {
    useGetRoomTypeList
}