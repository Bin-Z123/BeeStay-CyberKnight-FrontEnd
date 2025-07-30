import {
    getRoomTypesList,
    getRoomTypeById
} from "../api/roomtype"

import { QUERY_KEY_ROOMTYPE } from "@/constants/query-keys"
import { useQuery, useMutation } from "@tanstack/vue-query"
import { MaybeRef, MaybeRefOrGetter } from "@tanstack/vue-query/build/legacy/types"
import { computed, Ref } from "vue"

const useGetRoomTypeList = () => {
    return useQuery({
        queryKey: [QUERY_KEY_ROOMTYPE.LIST_ROOMTYPE],
        queryFn: async () => (await getRoomTypesList()),
        refetchOnWindowFocus: true
    })
}

const useGetRoomTypeInfo = (roomtypeId: Ref<number | undefined>, open: Ref<Boolean>) => {
    return useQuery({
        queryKey: [QUERY_KEY_ROOMTYPE.ROOMTYPE_INFO, roomtypeId],
        queryFn: async () => {

            const response = await getRoomTypeById(roomtypeId);
            return response.data.data
        },
        enabled: computed(() => open.value && !!roomtypeId),
    })
}
export {
    useGetRoomTypeList,
    useGetRoomTypeInfo
}