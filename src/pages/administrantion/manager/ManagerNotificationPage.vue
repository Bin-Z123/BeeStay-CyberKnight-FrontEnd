<template>
    <div class="grid grid-cols-10 ">
        <!-- Sidebar Chat -->
        <div class="h-[58rem] overflow-y-auto border-r-2 border-gray-200 col-span-2">
            <div v-if="!userStore.users.length" class="flex justify-center items-center h-full">
                <div class="loader"></div>
            </div>
            <ul v-if="userStore.users.length">
                <li class="p-2 user-active active:bg-gray-100  hover:bg-gray-200 flex gap-2 items-center cursor-pointer"
                    v-for="(user, i) in userStore.users" :class="{ 'bg-gray-200': user.id == currentUser?.id }"
                    @click="selectUser(user)">
                    <div class="w-10 h-10 flex justify-center items-center rounded-full "
                        :class="`bg-${getUserColor(user.id)}-400`">
                        <div class="font-extrabold">{{ getInitials(user.fullname) }}</div>
                    </div>
                    <div>
                        <h2 v-if="authStore.user.id == user.id" class="font-bold text-lg">Cloud của tôi ☁️</h2>
                        <h2 v-else class="font-bold text-lg">{{ user.fullname }}</h2>
                        <p>Tin Nhắn</p>
                    </div>

                </li>
            </ul>
        </div>
        <!-- Khung Chat -->
        <div class="flex h-[58rem] overflow-hidden col-span-8">
            <!-- Main -->
            <main class="flex-1 flex flex-col">
                <!-- Nội dung chat -->
                <div class="flex-1 overflow-y-auto p-4">
                    <h1 class="justify-self-start font-bold text-2xl mb-2">BeeStay Chat {{ currentUser?.fullname }}</h1>
                    <div v-for="(msg, i) in currentConversationMessages" :key="i" class="mb-2">
                        <div v-if="msg.type == 'JOIN'"
                            class="justify-self-center italic text-sm -mb-1 bg-gray-200 rounded p-1"><span
                                class="font-bold">{{
                                    msg.senderFullName }}</span>
                            {{
                                msg.content
                            }}</div>

                        <div v-else-if="msg.type == 'CHAT'">
                            <div v-if="authStore.user.id == msg.senderId"
                                class="bg-blue-200 p-2 rounded relative lg:max-w-[70rem] md:max-w-[30rem] sm:max-w-[20rem] max-w-[20rem] w-fit justify-self-end">
                                <!-- CONTENT -->
                                <div class="font-bold  justify-self-end">Bạn </div><span class="break-words ">{{
                                    msg.content }}</span>
                                <!-- TIME -->
                                <div class=" justify-self-end"><span class=" text-gray-600 font-bold p-1 rounded">{{
                                    new
                                        Date(msg.timestamp).toLocaleTimeString()
                                }}</span></div>
                            </div>
                            <!-- CONTENT -->
                            <div v-else
                                class="bg-muesli-200 p-2 rounded relative lg:max-w-[70rem] md:max-w-[30rem] sm:max-w-[20rem] max-w-[20rem] w-fit">
                                <div class="font-bold ">{{ msg.senderFullName }}: </div><span class="break-words ">{{
                                    msg.content }}</span>
                                <!-- TIME -->
                                <div class="  justify-self-end "><span class="text-gray-600 font-bold p-1 rounded">{{
                                    new
                                        Date(msg.timestamp).toLocaleTimeString()
                                }}</span></div>
                            </div>
                        </div>

                    </div>
                </div>
                <!-- <template v-if="msg.content.includes(':')">
                        <span class="font-bold">{{ msg.content.slice(0, msg.content.indexOf(':')) }}</span>:<span>{{
                            msg.content.slice(msg.content.indexOf(':') + 1) }}</span>
                    </template>
<template v-else>
                        {{ msg.content }}
                    </template> -->
                <!-- Thanh chat (nằm dưới cùng vì margin-top: auto) -->
                <div class="w-full bg-white border-t border-gray-200 p-4">
                    <label class="flex gap-2">
                        <input v-model="message" @keyup.enter="sendPrivateMessage()" placeholder="Nhắn tin..."
                            class="flex-1 h-10 px-4 border rounded" />
                        <button class="px-4 bg-muesli-500 text-white rounded" @click="sendPrivateMessage()">Gửi</button>
                    </label>
                </div>
            </main>
        </div>
    </div>

</template>


<script setup>
import { computed, onMounted, ref } from 'vue';
import SockJS from 'sockjs-client'
import { Client } from '@stomp/stompjs'
import { toast } from 'vue-sonner';
import { useAuthStore } from '@/stores/auth/login';
import { User } from '@/api/user';
import colorMap from '../../../assets/ColorMap.json';

const baseUrl = import.meta.env.VITE_API_BASE_URL_NOAPI;
const message = ref('')
const messages = ref([])
let stompClient = null;
const token = localStorage.getItem('acccessToken')
const authStore = useAuthStore();
const userStore = User();
const currentUser = ref()
const currentRecipientId = ref()
const conversations = ref({});
const red = "red";

const getUserColor = (userID) => {
    const lastDigit = userID % 10;
    return colorMap[lastDigit];
}
const getInitials = (name) => {
    if (!name) return "";

    const parts = name.trim().split(/\s+/); // tách theo khoảng trắng

    if (parts.length === 1) {
        return parts[0].substring(0, 2).toUpperCase();
    } else {
        return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    }
}

const currentConversationMessages = computed(() => {
    if (!currentRecipientId.value) {
        return []
    }
    return conversations.value[currentRecipientId.value] || [];
})

const client = new Client({

    webSocketFactory: () => new SockJS(`${baseUrl}/ws`),
    connectHeaders: {
        Authorization: `Bearer ${token}`,
    },
    reconnectDelay: 5000,

    onConnect: () => {
        stompClient = client
        toast.success('Kết nối Socket thành công!')
        client.subscribe('/user/queue/messages', (message) => {
            const chatMessage = JSON.parse(message.body);

            // Xác định ID của đối tác trò chuyện (luôn là số)
            const partnerId = (chatMessage.senderId === authStore.user.id)
                ? chatMessage.recipientId
                : chatMessage.senderId;

            // *** Sửa ở đây: Dùng partnerId (là số) làm key cho cuộc trò chuyện
            const conversationKey = partnerId;
            if (!conversations.value[conversationKey]) {
                conversations.value[conversationKey] = [];
            }
            conversations.value[conversationKey].push(chatMessage);
        })
    },
    onStompError: (frame) => {
        console.error('Lỗi Socket', frame)
    },
    debug: (str) => console.log(str)
    // onConnect: () => {
    //     stompClient = client
    //     toast.success('Kết nối Socket thành công!')
    //     message.value = ' đã tham gia'
    //     joinChat()
    //     console.log(client)
    //     client.subscribe('/topic/messages', (message) => {
    //         const chatMessage = JSON.parse(message.body);
    //         console.log(chatMessage)
    //         messages.value.push(chatMessage)
    //     })
    // },
    // debug: (str) => console.log(str)
})

onMounted(async () => {
    const user = authStore.user;
    await userStore.getAllUser();
    // console.log(user)
    client.activate()
    // console.log('Token:', token)
})

const sendPrivateMessage = () => {
    if (message.value.trim() && stompClient && client.active && currentRecipientId.value) {
        const payload = {
            content: message.value,
            recipientId: currentRecipientId.value
        }
        client.publish({
            destination: "/app/private-chat",
            body: JSON.stringify(payload)
        })
        message.value = ''
    } else {
        toast.error('Vui lòng chọn người nhắn!')
    }

}

// const sendMessage = () => {
//     if (message.value.trim() && stompClient) {
//         // stompClient.send('/app/chat', {}, message.value)
//         stompClient?.publish({
//             destination: '/app/chat',
//             body: message.value
//         });
//         message.value = ''
//     }
// }
const joinChat = () => {
    if (message.value.trim() && stompClient) {
        // stompClient.send('/app/chat', {}, message.value)
        stompClient?.publish({
            destination: '/app/join',
            body: message.value
        });
        message.value = ''
    }
}

const selectUser = (user) => {
    currentRecipientId.value = user.id
    currentUser.value = user
    message.value = ''
}
</script>