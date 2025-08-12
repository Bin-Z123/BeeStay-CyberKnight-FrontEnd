<template>
    <button @click="open = !open" ref="chatbotButton"
        class="fixed bottom-4 right-4 inline-flex items-center justify-center text-sm font-medium disabled:pointer-events-none disabled:opacity-50 border rounded-full w-16 h-16 bg-muesli-400 hover:bg-muesli-700 m-0 cursor-pointer border-gray-200 bg-none p-0 normal-case leading-5 hover:text-gray-900"
        type="button" aria-haspopup="dialog" aria-expanded="false" data-state="closed">
        <svg xmlns=" http://www.w3.org/2000/svg" width="30" height="40" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
            class="text-white block border-gray-200 align-middle">
            <path d="m3 21 1.9-5.7a8.5 8.5 0 1 1 3.8 3.8z" class="border-gray-200">
            </path>
        </svg>
    </button>


    <div v-if="open" ref="chatbotWindow" style="box-shadow: 0 0 #0000, 0 0 #0000, 0 1px 2px 0 rgb(0 0 0 / 0.05);"
        class="fixed z-30 bottom-[calc(4rem+1.5rem)] right-0 mr-4 bg-white p-6 rounded-lg border border-[#e5e7eb] w-[440px] h-[634px]">

        <!-- Heading -->
        <div class="flex flex-col space-y-1.5 pb-6">
            <h2 class="font-semibold text-lg tracking-tight">Chatbot</h2>
            <p class="text-sm text-[#6b7280] leading-3">Được cung cấp bởi Mr.Bin và Bin</p>
        </div>




        <!-- Chat Container -->
        <div class="pr-4 h-[470px] bg-gray-100 overflow-y-auto rounded-lg" style="min-width: 100%;">
            <!-- Chat Message AI -->
            <div v-for="(msg, i) in messages" :key="i" class="flex gap-3 my-4 text-gray-600 text-sm flex-1 ">
                <span class="relative flex shrink-0 overflow-hidden rounded-full w-8 h-8">
                    <div v-if="msg.type != 'JOIN' && authStore.user.id !== msg.senderId"
                        class="rounded-full bg-gray-100 border p-1"><svg stroke="none" fill="black" stroke-width="1.5"
                            viewBox="0 0 24 24" aria-hidden="true" height="20" width="20"
                            xmlns="http://www.w3.org/2000/svg">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z">
                            </path>
                        </svg></div>
                    <div v-if="authStore.user.id == msg.senderId && msg.type != 'JOIN'"
                        class="rounded-full bg-gray-100 border p-1"><svg stroke="none" fill="black" stroke-width="0"
                            viewBox="0 0 16 16" height="20" width="20" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4Zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10Z">
                            </path>
                        </svg></div>
                </span>
                <p v-if="msg.type == 'JOIN'" class="flex w-full justify-center space-x-1 text-gray-700"><span>{{
                    msg.senderFullName
                        }}</span><span>{{ msg.content }}</span>
                </p>
                <p v-else-if="msg.type == 'CHAT'" class="leading-relaxed">
                    <span v-if="authStore.user.id == msg.senderId"><span class="block font-bold text-muesli-700">Bạn
                            <span class="text-gray-700 italic font-medium text-xs">{{ new
                                Date(msg.timestamp).toLocaleTimeString() }}</span></span> {{
                                    msg.content }}
                    </span>
                    <span v-else><span class="block font-bold text-gray-700">{{
                        msg.senderFullName }} <span class="text-gray-700 italic font-medium text-xs">{{ new
                                Date(msg.timestamp).toLocaleTimeString() }}</span></span>{{ msg.content }}
                    </span>
                </p>
            </div>


        </div>
        <!-- Input box  -->
        <div class="flex items-center pt-3">
            <div class="flex items-center justify-center w-full space-x-2" @submit.prevent>
                <input v-model="message" @keyup.enter="sendPrivateMessage()"
                    class="flex h-10 w-full rounded-md border border-[#e5e7eb] px-3 py-2 text-sm placeholder-[#6b7280] focus:outline-none focus:ring-2 focus:ring-muesli-200 disabled:cursor-not-allowed disabled:opacity-50 text-[#030712] focus-visible:ring-offset-2"
                    placeholder="Nhập nội dung của bạn" value="">
                <button @click="sendPrivateMessage()" type="button"
                    class="inline-flex items-center justify-center rounded-md text-sm font-medium text-[#f9fafb] disabled:pointer-events-none disabled:opacity-50 bg-muesli-400 hover:bg-muesli-700 h-10 px-4 py-2">
                    Gửi</button>
            </div>
        </div>

    </div>
</template>
<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import SockJS from 'sockjs-client'
import { Client } from '@stomp/stompjs'
import { useAuthStore } from '@/stores/auth/login';
import { toast } from 'vue-sonner';

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
    onConnect: () => {
        stompClient = client
        toast.success('Kết nối Socket thành công!')
        client.subscribe('/user/queue/messages', (message) => {
            const chatMessage = JSON.parse(message.body);

            console.log("Tin Nhắn Private")
            console.log(chatMessage)
            messages.value.push(chatMessage)
        })
    },
    // onDisconnect: () => {
    //     message.value = ' đã rời khỏi'
    //     sendMessage()
    // },
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
const currentRecipientId = ref(1001)
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
const open = ref(false);
const chatbotWindow = ref(null);
const chatbotButton = ref(null); // Ref cho nút bấm

// Hàm xử lý sự kiện click
const handleClickOutside = (event) => {
    // Nếu chatbot đang không mở thì không làm gì cả
    if (!open.value) return;

    // Kiểm tra xem cú click có nằm ngoài cửa sổ chat VÀ ngoài nút bấm không
    if (
        chatbotWindow.value &&
        !chatbotWindow.value.contains(event.target) &&
        chatbotButton.value &&
        !chatbotButton.value.contains(event.target)
    ) {
        open.value = false;
    }
};

// Thêm event listener khi component được mounted
onMounted(() => {
    document.addEventListener('click', handleClickOutside);
});

// Gỡ bỏ event listener trước khi component bị unmounted
onBeforeUnmount(() => {
    document.removeEventListener('click', handleClickOutside);
});
</script>