<template>
    <Dialog>
        <DialogContent class="max-w-2xl">
            <div>
                <form class="flex flex-col gap-4">
                    <div>
                        <h1 class="text-2xl text-muesli-400 font-bold">Thông tin khách hàng</h1>
                    </div>
                    <hr>
                    <div class="flex lg:flex-row flex-col gap-4">
                        <div class="lg:w-1/2">
                            <div class="mb-4">
                                <label for="name" class="block text-sm font-medium text-gray-700">Họ và Tên</label>
                                <input type="text" v-model="user.fullname"
                                    :class="['w-full h-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-muesli-200 shadow-sm shadow-muesli-300 px-5 text-center', error.fullname ? 'border-red-300 focus:ring-red-200 shadow-red-300 text-red-600' : '']"
                                    placeholder="Nhập họ và tên" />
                            </div>
                            <div class="mb-4">
                                <label for="sdt" class="block text-sm font-medium text-gray-700">Số Điện Thoại</label>
                                <input type="text" v-model="user.phone"
                                    :class="['w-full h-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-muesli-200 shadow-sm shadow-muesli-300 px-5 text-center', error.phone ? 'border-red-300 focus:ring-red-200 shadow-red-300 text-red-600' : '']"
                                    placeholder="Nhập số điện thoại" />
                            </div>
                        </div>
                        <div class="lg:w-1/2">
                            <div class="mb-4">
                                <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
                                <input type="email" v-model="user.email"
                                    :class="['w-full h-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-muesli-200 shadow-sm shadow-muesli-300 px-5 text-center', error.email ? 'border-red-300 focus:ring-red-200 shadow-red-300 text-red-600' : '']"
                                    placeholder="Nhập email" />
                            </div>
                            <div class="mb-4">
                                <label for="cccd" class="block text-sm font-medium text-gray-700">CCCD</label>
                                <input type="text" v-model="user.cccd"
                                    :class="['w-full h-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-muesli-200 shadow-sm shadow-muesli-300 px-5 text-center', error.cccd ? 'border-red-300 focus:ring-red-200 shadow-red-300 text-red-600' : '']"
                                    placeholder="Nhập cccd" />
                            </div>
                        </div>
                    </div>
                    <hr>
                    <!-- <div>
                        <h1 class="text-2xl text-muesli-400 font-bold">Dịch Vụ Đi Kèm</h1>
                        <div class="flex">
                            <div></div>
                        </div>
                    </div> -->
                    <div class="flex justify-end gap-2">
                        <button @click.prevent="handleConfirmBooking()"
                            class="px-6 py-2 bg-green-600 text-white font-semibold rounded-md hover:bg-green-700">Xác
                            Nhận Đặt Phòng</button>
                    </div>
                </form>
            </div>
        </DialogContent>
    </Dialog>
</template>
<script setup lang="ts">
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { useAuthStore } from "@/stores/auth/login";
import { ref, computed, onMounted } from "vue";
import { Bookings } from "@/api/booking";
import { toast } from "vue-sonner";
import { useRouter } from "vue-router";

const router = useRouter();
const authStore = useAuthStore();
const bookings = Bookings();


const user = ref({
    fullname: "",
    phone: "",
    email: "",
    cccd: ""
});

const asyncUserData = () => {
    user.value.fullname = authStore.user?.fullname || "";
    user.value.phone = authStore.user?.phone || "";
    user.value.email = authStore.user?.email || "";
    user.value.cccd = authStore.user?.cccd || "";
};

const error = ref({
    fullname: "",
    phone: "",
    email: "",
    cccd: "",
});

const validateForm = () => {
    const fullname = (user.value.fullname ?? "").toString().trim();
    const phone = (user.value.phone ?? "").toString().trim();
    const email = (user.value.email ?? "").toString().trim();
    const cccd = (user.value.cccd ?? "").toString().trim();

    if (!fullname) {
        error.value.fullname = "Vui lòng nhập họ và tên";
    }
    if (!phone) {
        error.value.phone = "Vui lòng nhập số điện thoại";
    }
    if (!email) {
        error.value.email = "Vui lòng nhập email";
    }
    if (!cccd) {
        error.value.cccd = "Vui lòng nhập cccd";
    }
    return fullname && phone && email && cccd;
}

const resetError = () => {
    error.value.fullname = "";
    error.value.phone = "";
    error.value.email = "";
    error.value.cccd = "";
}

const handleConfirmBooking = async () => {
    if (!user.value.fullname || !user.value.phone || !user.value.email || !user.value.cccd) {
        if (user.value.email == authStore.user?.email) {
            if (authStore.user?.cccd && authStore.user?.phone != null) {
                toast.error("Vui lòng nhập đầy đủ thông tin trước khi đặt phòng!");
                if (!validateForm()) { return; }
            }else{
                toast.warning("Vui lòng cập nhật đầy đủ thông tin trước khi đặt phòng!");
                router.push({ path: '/user/setting/profile' });
            }
        } else {
            toast.error("Vui lòng nhập đầy đủ thông tin trước khi đặt phòng!");
            if (!validateForm()) { return; }
            return;
        }
        return;
    }
    resetError();
    try {
        const response = await bookings.processAndConfirmBooking({
            fullname: user.value.fullname,
            phone: user.value.phone,
            email: user.value.email,
            cccd: user.value.cccd,
        });
        console.log("Booking response:", JSON.stringify(response, null, 2));
        const routerData = router.resolve({
            name: 'booking-payment',
            params: { id: response.data.id }
        })
        window.open(routerData.href, '_blank');

        toast.success("Yêu cầu đặt phòng đã được tạo. Vui lòng hoàn tất thanh toán.");
        router.push({ path: '/user/home' });
        // location.reload();
    } catch (error) {
        console.error("Lỗi khi xác nhận đặt phòng:", error);
    }
};

onMounted(async () => {
    await authStore.fetchUser();
    asyncUserData();
});
</script>