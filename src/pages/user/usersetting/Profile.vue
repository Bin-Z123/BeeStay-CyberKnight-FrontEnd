<template>
    <section>
        <div class="pt-5 ms-5 lg:me-25 me-5">
            <h1 class="text-2xl font-bold">Cài Đặt Tài Khoản</h1>
            <Tabs default-value="tab1">
                <TabsList>
                    <TabsTrigger value="tab1" class="font-bold rounded-b-none p-3 data-[state=active]:bg-muesli-300 data-[state=active]:text-white">Thông Tin Tài Khoản</TabsTrigger>
                    <TabsTrigger value="tab2" class="font-bold rounded-b-none p-3 data-[state=active]:bg-muesli-300 data-[state=active]:text-white">Mật Khẩu & Bảo Mật</TabsTrigger>
                </TabsList>
                <TabsContent value="tab1">
                    <div class="bg-white rounded-lg shadow-lg">
                        <h1 class="font-bold p-5 border-b">Dữ Liệu Cá Nhân</h1>
                        <div class="p-5">
                            <form action="">
                                <div>
                                    <label for="">Tên đầy đủ</label>
                                    <input type="text"
                                        class="w-full h-12 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-muesli-200 mb-3 shadow-sm shadow-muesli-300">
                                </div>
                                <div class="flex gap-5">
                                    <div class="w-1/2 flex flex-col">
                                        <label for="">Giới tính</label>
                                        <select name="" id=""
                                            class="w-full h-12 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-muesli-200 mb-3 shadow-sm shadow-muesli-300">
                                            <option value="">Nam</option>
                                            <option value="">Nữ</option>
                                        </select>
                                    </div>
                                    <div class="w-1/2">
                                        <label for="">Ngày sinh</label>
                                        <input type="date"
                                            class="w-full h-12 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-muesli-200 mb-3 shadow-sm shadow-muesli-300">
                                    </div>
                                </div>
                                <div>
                                    <label for="">SĐT</label>
                                    <input type="text"
                                        class="w-full h-12 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-muesli-200 mb-3 shadow-sm shadow-muesli-300">
                                </div>
                                <div>
                                    <label for="">Email</label>
                                    <input type="email"
                                        class="w-full h-12 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-muesli-200 mb-3 shadow-sm shadow-muesli-300">
                                </div>
                                <div class="flex gap-3 justify-end">
                                    <button class="px-4 py-2 bg-gray-100 rounded-lg text-gray-500 hover:bg-gray-200 transition-all duration-300 hover:scale-105">Để Sau</button>
                                    <button class="px-4 py-2 bg-muesli-400 rounded-lg text-white border border-muesli-400 hover:bg-white hover:text-muesli-400 transition-all duration-300 hover:scale-105">Lưu</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </TabsContent>
                <TabsContent value="tab2">
                    <div class="bg-white rounded-lg shadow-lg">
                        <h1 class="font-bold p-5 border-b">Đổi Mật Khẩu</h1>
                        <div class="p-5">
                            <form action="">
                                <div>
                                    <label>Mật Khẩu Hiện Tại</label>
                                    <input type="password" v-model="form.oldPassword"
                                        :class="['w-full h-12 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-muesli-200 mb-3 shadow-sm shadow-muesli-300', errors.oldPassword ? 'border-red-300 focus:ring-red-200 shadow-red-300 text-red-600' : '']" placeholder="Nhập mật khẩu hiện tại">
                                </div>
                                <div>
                                    <label>Mật Khẩu Mới</label>
                                    <input type="password" v-model="form.newPassword"
                                        :class="['w-full h-12 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-muesli-200 mb-3 shadow-sm shadow-muesli-300', errors.newPassword ? 'border-red-300 focus:ring-red-200 shadow-red-300 text-red-600' : '']" placeholder="Nhập mật khẩu mới">
                                </div>
                                <div>
                                    <label>Nhập Lại Mật Khẩu Mới</label>
                                    <input type="password" v-model="form.confirmPassword"
                                        :class="['w-full h-12 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-muesli-200 mb-3 shadow-sm shadow-muesli-300', errors.confirmPassword ? 'border-red-300 focus:ring-red-200 shadow-red-300 text-red-600' : '']" placeholder="Nhập lại mật khẩu mới">
                                </div>
                                <div class="flex gap-3 justify-end">
                                    <button class="px-4 py-2 bg-gray-100 rounded-lg text-gray-500 hover:bg-gray-200 transition-all duration-300 hover:scale-105" @click.prevent="reset">Để Sau</button>
                                    <button class="px-4 py-2 bg-muesli-400 rounded-lg text-white border border-muesli-400 hover:bg-white hover:text-muesli-400 transition-all duration-300 hover:scale-105" @click.prevent="handleChangePassword">Lưu</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    </section>
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useAuthStore } from '@/stores/auth/login';
import { useChangePasswordStore } from '@/stores/auth/changepassword';
import { toast } from 'vue-sonner';
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from '@/components/ui/tabs'
const authStore = useAuthStore();
const changePasswordStore = useChangePasswordStore();

const form = ref({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
});

const errors = ref({
    oldPassword: false,
    newPassword: false,
    confirmPassword: false,
});

const reset = () => {
    form.value.oldPassword = '';
    form.value.newPassword = '';
    form.value.confirmPassword = '';

    errors.value.oldPassword = false;
    errors.value.newPassword = false;
    errors.value.confirmPassword = false;
}

const handleChangePassword = () => {
    errors.value.oldPassword = !form.value.oldPassword.trim();
    errors.value.newPassword = !form.value.newPassword.trim();
    errors.value.confirmPassword = !form.value.confirmPassword.trim();

    if (errors.value.oldPassword || errors.value.newPassword || errors.value.confirmPassword) {
        toast.error('Vui lòng nhập đầy đủ thông tin!');
        return;
    }
    changePasswordStore.changePassword(form.value.oldPassword, form.value.newPassword, form.value.confirmPassword);
    reset();
};

onMounted(async () => {
    await authStore.fetchUser();
});
</script>