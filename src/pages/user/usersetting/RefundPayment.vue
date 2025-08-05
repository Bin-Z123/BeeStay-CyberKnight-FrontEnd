<template>
    <section>
        <div class="ps-4 pt-5 flex flex-col gap-5">
            <div>
                <h1 class="text-2xl font-bold">Yêu Cầu Hoàn Tiền</h1>
                <p class="text-gray-500">Vui lòng cung cấp thông tin đặt phòng muốn hoàn tiền.</p>
            </div>
            <!-- <div class="flex justify-center items-center py-40">
                <RouterLink to="/user/setting/historypayment" class="bg-muesli-400 text-white py-2 px-4 rounded-md hover:bg-muesli-500">Hoàn Tiền</RouterLink>
            </div> -->
            <div class="bg-white rounded-2xl shadow-lg py-5">
                <div class="flex p-5 gap-5">
                    <div class="w-1/2">
                        <h1 class="font-bold text-lg">Thông tin đặt phòng</h1>
                        <div class="bg-gray-50 p-5 my-5 flex flex-col gap-3 rounded-2xl">
                            <h1>Mã đặt phòng <span class="float-end">#BK-00001</span></h1>
                            <h1>Loại phòng <span class="float-end">VIP</span></h1>
                            <h1>Ngày đặt <span class="float-end">08/08/2023</span></h1>
                            <h1>Tên khách <span class="float-end">Võ Thanh Bin</span></h1>
                        </div>
                    </div>
                    <div class="w-1/2">
                        <h1 class="font-bold text-lg">Chi tiết hoàn tiền</h1>
                        <div class="bg-gray-50 p-5 my-5 flex flex-col gap-3 rounded-2xl">
                            <h1>Số tiền đã thanh toán <span class="float-end font-bold">1.500.000 VND</span></h1>
                            <h1>Phí hủy <span class="float-end text-red-500 font-bold">200.000 VND</span></h1>
                            <hr>
                            <h1 class="font-bold text-lg">Số tiền được hoàn <span class="float-end">1.300.000 VND</span>
                            </h1>
                        </div>
                    </div>
                </div>
                <div class="px-4">
                    <hr>
                </div>
                <div>
                    <form action="" class="flex flex-col p-5 gap-5">
                        <div class="w-full">
                            <label for="">Lý Do Hoàn Tiền</label>
                            <select name="" id=""
                                class="w-full h-12 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-muesli-200 shadow-sm shadow-muesli-300">
                                <option value="" selected>Tất cả trạng thái</option>
                                <option value="1">Thay đổi lịch trình</option>
                                <option value="2">Lý do sức khỏe</option>
                                <option value="3">Khác</option>
                            </select>
                        </div>
                        <div class="w-full">
                            <label for="">Email Liên Hệ</label>
                            <input type="email"
                                class="w-full h-12 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-muesli-200 shadow-sm shadow-muesli-300"
                                placeholder="Nhập email của bạn">
                        </div>
                        <div class="w-full">
                            <label for="">Ghi chú (Không bắt buộc)</label>
                            <textarea name="" id=""
                                class="w-full p-5 h-32 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-muesli-200 shadow-sm shadow-muesli-300"></textarea>
                        </div>
                        <div class="w-full">
                            <button class="bg-muesli-400 text-white py-2 px-4 rounded-md hover:bg-muesli-500 float-end">Gửi Yêu Cầu Hoàn Tiền</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </section>
</template>