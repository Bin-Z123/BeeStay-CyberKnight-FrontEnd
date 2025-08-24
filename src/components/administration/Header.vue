<template>
    <section>
        <div class="h-12 px-4 border-b flex items-center justify-between " v-if="authStore.isAuthenticated">
            <SidebarTrigger asChild></SidebarTrigger>
            <div class=" relative border border-muesli-500 px-2 py-1 rounded-sm  group w-fit flex ">
                <h1 class="flex flex-row items-center gap-1">
                    <CircleUserRound class="inline-block" />{{ authStore.user.role.roleName }} | {{
                        authStore.user.fullname }}
                    <ChevronRight class="inline-block group-hover:rotate-90 transition-all duration-200" />
                </h1>
                <div
                    class="absolute backdrop-blur-xs flex flex-col gap-1  top-full  right-0 rounded-xs invisible group-hover:visible group-hover:translate-y-0 w-full h-fit border border-muesli-500  transition-all translate-y-[-10px]  transform ">
                    <button @click="viewWeb"
                        class="text-start hover:bg-muesli-100/80 hover:underline rounded-b-sm px-2 py-1 gap-1 flex items-center">
                        <Globe class="inline-block" /><span>Xem Web</span>
                    </button>
                    <button
                        class="text-start hover:bg-muesli-100/80 hover:underline rounded-t-sm px-2 py-1 gap-1 flex items-center" @click.prevent="handleLogout">
                        <LogOut class="inline-block" /> <span>
                            Đăng Xuất
                        </span>
                    </button>


                </div>
            </div>
        </div>
        <hr class="text-muesli-400 bg-muesli-400 h-1">
    </section>
</template>
<script setup>
import { ChevronRight, LogOut, Globe } from 'lucide-vue-next';
import { CircleUserRound } from 'lucide-vue-next';
import { SidebarTrigger } from '@/components/ui/sidebar'
import { useAuthStore } from '@/stores/auth/login';
import { useRouter } from 'vue-router';


const router = useRouter();

const viewWeb = () => {
    const routerData = router.resolve({
        name: "home",

    })
    window.open(routerData.href, '_blank');
}
const authStore = useAuthStore();

const handleLogout = () => {
    authStore.logout();
    router.push({ name: "login" });
};
</script>