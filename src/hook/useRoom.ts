import { getRoomProfile, getRoomsList } from "@/api/room";
import { useQuery } from "@tanstack/vue-query";
import { QUERY_KEY_ROOM } from "@/constants/query-keys";
import { Ref } from "vue";
import { computed } from "vue";

const useGetRoomList = () => {
    return useQuery({
        queryKey: [QUERY_KEY_ROOM.LIST_ROOM],
        queryFn: async () => (await getRoomsList()),
        refetchOnWindowFocus: false
    })
}

const useGetRoomProfile = (roomId: Ref<number | undefined>, open: Ref<Boolean>) => {
    return useQuery({
        queryKey: [QUERY_KEY_ROOM.ROOM_INFO, roomId],
        queryFn: async () => {
            const response = await getRoomProfile(roomId)
            return response.data?.data
        },
        enabled: computed(() => open.value && !!roomId),
    })
}

export {
    useGetRoomList,
    useGetRoomProfile
}