<template>
    <h1>Booking Detail {{ props.id }}</h1>
    <div class="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
        <div class="bg-white rounded-lg shadow-lg overflow-hidden">
            <div class="p-6 sm:p-8">
                <!-- Header: Logo, Title, Booking ID & Status -->
                <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-6 border-b">
                    <div>
                        <h1 class="text-2xl font-bold text-gray-800">Xác Nhận Đặt Phòng</h1>
                        <p class="text-sm text-gray-500 mt-1">Mã Booking: <span
                                class="font-semibold text-gray-700">#BK-17182935</span></p>
                        <p class="text-sm text-gray-500">Ngày đặt: 14/07/2025</p>
                    </div>
                    <div class="mt-4 sm:mt-0">
                        <span
                            class="inline-block px-3 py-1 text-sm font-semibold text-green-800 bg-green-100 rounded-full">Đã
                            xác nhận</span>
                    </div>
                </div>

                <!-- Trip Summary: Check-in, Check-out, Duration -->
                <div class="grid grid-cols-1 sm:grid-cols-3 gap-6 py-6 border-b">
                    <div>
                        <h3 class="text-sm font-semibold text-gray-500 uppercase">Nhận phòng</h3>
                        <p class="text-lg font-semibold text-gray-800">Thứ Sáu, 20/12/2025</p>
                        <p class="text-sm text-gray-500">Từ 14:00</p>
                    </div>
                    <div>
                        <h3 class="text-sm font-semibold text-gray-500 uppercase">Trả phòng</h3>
                        <p class="text-lg font-semibold text-gray-800">Thứ Ba, 24/12/2025</p>
                        <p class="text-sm text-gray-500">Trước 12:00</p>
                    </div>
                    <div>
                        <h3 class="text-sm font-semibold text-gray-500 uppercase">Tổng thời gian</h3>
                        <p class="text-lg font-semibold text-gray-800">4 đêm, 3 khách</p>
                    </div>
                </div>

                <!-- Booker Information -->
                <div class="py-6 border-b">
                    <h3 class="text-lg font-bold text-gray-800 mb-4">Thông Tin Người Đặt</h3>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                        <div><span class="font-semibold">Họ và tên:</span> Nguyễn Văn A</div>
                        <div><span class="font-semibold">Hạng thành viên:</span> Vàng (Giảm 10%)</div>
                        <div><span class="font-semibold">Email:</span> nguyenvana@email.com</div>
                        <div><span class="font-semibold">Số điện thoại:</span> 0987 654 321</div>
                        <div><span class="font-semibold">CCCD/CMND:</span> 012345678910</div>
                    </div>
                </div>

                <!-- Booking Details: Rooms -->
                <div class="py-6 border-b">
                    <h3 class="text-lg font-bold text-gray-800 mb-4">Chi Tiết Phòng Đã Đặt</h3>
                    <div class="overflow-x-auto">
                        <table class="w-full text-left">
                            <thead>
                                <tr class="border-b bg-gray-50">
                                    <th class="p-3 text-sm font-semibold text-gray-600">Loại Phòng</th>
                                    <th class="p-3 text-sm font-semibold text-gray-600 text-center">Số Lượng</th>
                                    <th class="p-3 text-sm font-semibold text-gray-600 text-right">Đơn Giá / Đêm</th>
                                    <th class="p-3 text-sm font-semibold text-gray-600 text-right">Thành Tiền</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr class="border-b">
                                    <td class="p-3">
                                        <p class="font-semibold text-gray-800">Deluxe King Ocean View</p>
                                        <p class="text-sm text-gray-500">35m², 1 giường King, tối đa 2 người lớn</p>
                                    </td>
                                    <td class="p-3 text-center">2</td>
                                    <td class="p-3 text-right">2.500.000 ₫</td>
                                    <td class="p-3 text-right">20.000.000 ₫</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <!-- Booking Details: Facilities -->
                <div class="py-6 border-b">
                    <h3 class="text-lg font-bold text-gray-800 mb-4">Dịch Vụ Đi Kèm</h3>
                    <div class="overflow-x-auto">
                        <table class="w-full text-left">
                            <thead>
                                <tr class="border-b bg-gray-50">
                                    <th class="p-3 text-sm font-semibold text-gray-600">Tên Dịch Vụ</th>
                                    <th class="p-3 text-sm font-semibold text-gray-600 text-center">Số Lượng</th>
                                    <th class="p-3 text-sm font-semibold text-gray-600 text-right">Đơn Giá</th>
                                    <th class="p-3 text-sm font-semibold text-gray-600 text-right">Thành Tiền</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr class="border-b">
                                    <td class="p-3">
                                        <p class="font-semibold text-gray-800">Đưa đón sân bay</p>
                                    </td>
                                    <td class="p-3 text-center">1</td>
                                    <td class="p-3 text-right">500.000 ₫</td>
                                    <td class="p-3 text-right">500.000 ₫</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <!-- Guest & Room Assignment -->
                <div class="py-6 border-b">
                    <h3 class="text-lg font-bold text-gray-800 mb-4">Thông Tin Khách Lưu Trú</h3>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div class="bg-gray-50 p-4 rounded-lg">
                            <h4 class="font-semibold text-gray-700">Phòng 101 - Deluxe King Ocean View</h4>
                            <ul class="mt-2 text-sm text-gray-600 list-disc list-inside">
                                <li>Nguyễn Văn A (CCCD: 012345678910)</li>
                                <li>Trần Thị B (CCCD: 098765432109)</li>
                            </ul>
                        </div>
                        <div class="bg-gray-50 p-4 rounded-lg">
                            <h4 class="font-semibold text-gray-700">Phòng 102 - Deluxe King Ocean View</h4>
                            <ul class="mt-2 text-sm text-gray-600 list-disc list-inside">
                                <li>Lê Văn C (CCCD: 055544433322)</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <!-- Payment Summary -->
                <div class="pt-6 flex justify-end">
                    <div class="w-full max-w-sm">
                        <h3 class="text-lg font-bold text-gray-800 mb-4">Tổng Kết Thanh Toán</h3>
                        <div class="space-y-3">
                            <div class="flex justify-between">
                                <span class="text-gray-600">Tiền phòng (2 phòng x 4 đêm)</span>
                                <span class="font-medium text-gray-800">20.000.000 ₫</span>
                            </div>
                            <div class="flex justify-between">
                                <span class="text-gray-600">Tiền dịch vụ</span>
                                <span class="font-medium text-gray-800">500.000 ₫</span>
                            </div>
                            <div class="flex justify-between">
                                <span class="text-gray-600">Tạm tính</span>
                                <span class="font-medium text-gray-800">20.500.000 ₫</span>
                            </div>
                            <div class="flex justify-between">
                                <span class="text-gray-600">Giảm giá (Hạng Vàng 10%)</span>
                                <span class="font-medium text-red-600">- 2.050.000 ₫</span>
                            </div>
                            <div class="flex justify-between">
                                <span class="text-gray-600">Thuế & Phí (10%)</span>
                                <span class="font-medium text-gray-800">1.845.000 ₫</span>
                            </div>
                            <div class="border-t my-2"></div>
                            <div class="flex justify-between text-xl font-bold">
                                <span class="text-gray-900">Tổng Cộng</span>
                                <span class="text-blue-600">20.295.000 ₫</span>
                            </div>
                            <div class="flex justify-between">
                                <span class="text-gray-600">Đã thanh toán (Cọc 50%)</span>
                                <span class="font-medium text-gray-800">10.147.500 ₫</span>
                            </div>
                            <div class="flex justify-between text-lg font-bold bg-yellow-100 p-3 rounded-lg">
                                <span class="text-yellow-800">Cần thanh toán khi nhận phòng</span>
                                <span class="text-yellow-800">10.147.500 ₫</span>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            <!-- Footer & Actions -->
            <div class="bg-gray-50 p-6 text-center no-print">
                <button onclick="window.print()"
                    class="bg-blue-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-blue-700 transition duration-300">
                    In Phiếu Xác Nhận
                </button>
                <p class="text-xs text-gray-500 mt-4">Cảm ơn bạn đã lựa chọn dịch vụ của chúng tôi. Vui lòng liên hệ bộ
                    phận hỗ trợ nếu có bất kỳ thắc mắc nào.</p>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { toast } from 'vue-sonner';


const props = defineProps<{
    id: number;
}>();

onMounted(() => {
    console.log('Booking Detail Page Mounted with ID:', props.id);
    // Fetch booking details using props.id
    toast.success(`Booking Detail for ID: ${props.id} loaded successfully!`);
});
</script>