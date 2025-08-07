<template>
    <div class="flex h-[58rem] overflow-hidden">
        <!-- Main -->
        <main class="flex-1 flex flex-col">
            <!-- Nội dung chat -->
            <div class="flex-1 overflow-y-auto p-4">
                <h1 class="justify-self-center">Chat</h1>
                <div v-for="(msg, i) in messages" :key="i" class="mb-2">
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
                    <input v-model="message" @keyup.enter="sendMessage()" placeholder="Nhắn tin..."
                        class="flex-1 h-10 px-4 border rounded" />
                    <button class="px-4 bg-blue-500 text-white rounded" @click="sendMessage()">Gửi</button>
                </label>
            </div>
        </main>
    </div>
</template>


<script setup>
import { onMounted, ref } from 'vue';
import SockJS from 'sockjs-client'
import { Client } from '@stomp/stompjs'
import { toast } from 'vue-sonner';
import { useAuthStore } from '@/stores/auth/login';

const baseUrl = import.meta.env.VITE_API_BASE_URL_NOAPI;
const message = ref('')
const messages = ref([])
let stompClient = null;
const token = localStorage.getItem('acccessToken')
const notification = ref([])
const authStore = useAuthStore();


const client = new Client({

    webSocketFactory: () => new SockJS(`${baseUrl}/ws`),
    connectHeaders: {
        Authorization: `Bearer ${token}`,
    },
    reconnectDelay: 5000,
    onConnect: () => {
        stompClient = client
        toast.success('Kết nối Socket thành công!')
        message.value = ' đã tham gia'
        joinChat()
        console.log(client)
        client.subscribe('/topic/messages', (message) => {
            const chatMessage = JSON.parse(message.body);
            console.log(chatMessage)
            messages.value.push(chatMessage)
        })
    },
    onDisconnect: () => {
        message.value = ' đã rời khỏi'
        sendMessage()
    },
    onStompError: (frame) => {
        console.error('Lỗi Socket', frame)
    },
    // debug: (str) => console.log(str)
})

onMounted(() => {
    const user = authStore.user;
    // console.log(user)
    client.activate()
    // console.log('Token:', token)
})

const sendMessage = () => {
    if (message.value.trim() && stompClient) {
        // stompClient.send('/app/chat', {}, message.value)
        stompClient?.publish({
            destination: '/app/chat',
            body: message.value
        });
        message.value = ''
    }
}
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
</script>