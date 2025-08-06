<template>
    <div class="flex h-[59rem] overflow-hidden">

        <!-- Main -->
        <main class="flex-1 flex flex-col">
            <!-- Nội dung chat -->
            <div class="flex-1 overflow-y-auto p-4">
                <h1 class="justify-self-center">Chat</h1>
                <div v-for="(msg, i) in messages" :key="i" class="mb-2"><template v-if="msg.includes(':')">
                        <span class="font-bold">{{ msg.slice(0, msg.indexOf(':')) }}</span>:<span>{{
                            msg.slice(msg.indexOf(':') + 1) }}</span>
                    </template>
                    <template v-else>
                        {{ msg }}
                    </template>
                </div>

            </div>

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

const baseUrl = import.meta.env.VITE_API_BASE_URL;
const message = ref('')
const messages = ref([])
let stompClient = null;
const token = localStorage.getItem('acccessToken')
const notification = ref([])

const client = new Client({

    webSocketFactory: () => new SockJS('http://localhost:8080/ws'),
    connectHeaders: {
        Authorization: `Bearer ${token}`,
    },
    reconnectDelay: 5000,
    onConnect: () => {
        stompClient = client
        toast.success('Kết nối Socket thành công!')
        message.value = 'Đã tham gia'
        sendMessage()
        client.subscribe('/topic/messages', (message) => {
            messages.value.push(message.body)
        })
    },
    onDisconnect: () => {
        message.value = 'Đã rời khỏi'
        sendMessage()
    },
    onStompError: (frame) => {
        console.error('Lỗi Socket', frame)
    },
    // debug: (str) => console.log(str)
})

onMounted(() => {
    client.activate()
    console.log('Token:', token)
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
</script>