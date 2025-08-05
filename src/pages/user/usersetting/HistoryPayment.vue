<template>
    <section class="ps-4 pt-4 flex flex-col gap-5">
        <div>
            <h1 class="text-2xl font-bold">Lịch sử Giao dịch</h1>
            <p class="text-gray-500">Xem lại tất cả giao dịch gần đây của bạn</p>
        </div>
        <div class="bg-white rounded-2xl shadow-lg">
            <div>
                <form>
                    <div class="flex gap-4 p-5">
                        <div class="w-full">
                            <input type="text"
                                class="text-center w-full h-12 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-muesli-200 shadow-sm shadow-muesli-300"
                                placeholder="Tìm kiếm giao dịch">
                        </div>
                        <div class="w-full">
                            <input type="date"
                                class="text-center w-full h-12 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-muesli-200 shadow-sm shadow-muesli-300">
                        </div>
                        <div class="w-full">
                            <select name="" id=""
                                class="text-center w-full h-12 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-muesli-200 shadow-sm shadow-muesli-300">
                                <option value="" selected>Tất cả trạng thái</option>
                                <option value="1">Thanh toán</option>
                                <option value="2">Chưa thanh toán</option>
                                <option value="3">Huy</option>
                            </select>
                        </div>
                    </div>
                </form>
                <div class="px-5">
                    <table class="w-full">
                        <thead>
                            <tr class="bg-gray-200">
                                <th class="text-left p-5">Ngày Giao Dịch</th>
                                <th class="text-left p-5">Mã Đặt Phòng</th>
                                <th class="text-left p-5">Chi Tiết Đặt Phòng</th>
                                <th class="text-left p-5">Thanh toán</th>
                                <th class="text-left p-5">Trạng thái</th>
                                <th class="text-left p-5"></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr class="border-b">
                                <td class="p-5">10/10/2023</td>
                                <td class="p-5 text-gray-500">Tìm kiếm 1</td>
                                <td class="p-5 w-60">Khách sạn Majestic Sài Gòn
                                    Nhận phòng: 10/09/2025
                                    Trả phòng: 15/09/2025</td>
                                <td class="p-5">10000đ</td>
                                <td class="p-5">Đã Thanh Toán</td>
                                <td class="p-5"><RouterLink to="" class="text-blue-500 underline">Xem chi tiết</RouterLink></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </section>
</template>
<script setup>

</script>