<template>
    <SidebarProvider>
        <div class="flex h-screen w-full ">
            <div class="py-5">
                <Sidebar class="lg:hidden md:hidden" />
            </div>
            <div class="flex-1 flex flex-col bg-white">
                <div class="flex-1  flex flex-col">
                    <HeaderUser />
                    <div class="sticky top-0 z-30 bg-white shadow-md">
                        <HeaderUserTwo />
                    </div>
                    <div class="flex-1 bg-gray-100 over">
                        <RouterView />

                    </div>
                    <div>
                        <Footer></Footer>
                    </div>
                </div>
            </div>
            <Chatbot v-if="authStore.user" />
        </div>
        <!-- <button v-if="showScrollButton" @click.prevent="scrollToTop"
            class="fixed bottom-5 right-5 bg-muesli-400 hover:bg-muesli-600 text-white p-3 rounded-full">
            <ArrowUp />
        </button> -->
    </SidebarProvider>
</template>

<script setup>
import HeaderUser from '@/components/user/HeaderUser.vue';
import HeaderUserTwo from '@/components/user/HeaderUserTwo.vue';
import Sidebar from '@/components/user/SidebarUser.vue';
import Footer from '@/components/user/Footer.vue';
import { SidebarProvider } from "@/components/ui/sidebar";
import { onMounted, ref, onUnmounted } from "vue";
import { ArrowUp } from 'lucide-vue-next';
import Chatbot from '@/pages/user/Chatbot.vue';
import { useAuthStore } from '@/stores/auth/login';
const authStore = useAuthStore();

// const scrollContainer = ref(null);
// const showScrollButton = ref(false);

// const handleScroll = () => {
//     showScrollButton.value = scrollContainer.value.scrollTop > 300;
// };

// onMounted(() => {
//     if (scrollContainer.value) {
//         scrollContainer.value.addEventListener('scroll', handleScroll);
//     }
// });

// onUnmounted(() => {
//     if (scrollContainer.value) {
//         scrollContainer.value.removeEventListener('scroll', handleScroll);
//     }
// });

// const scrollToTop = () => {
//     if (scrollContainer.value) {
//         scrollContainer.value.scrollTo({
//             top: 0,
//             behavior: 'smooth',
//         });
//     }
// };
</script>