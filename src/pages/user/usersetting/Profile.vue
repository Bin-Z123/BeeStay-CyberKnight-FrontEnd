<template>
    <section>
        <div class="pt-5 ms-5 lg:me-25 me-5">
            <h1 class="text-2xl font-bold">Cài Đặt Tài Khoản</h1>
            <div class="bg-white rounded-lg shadow-lg my-5">
                <h1 class="font-bold p-5 border-b">Thông Tin Cá Nhân</h1>
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
                            <button class="px-4 py-2 bg-gray-100 rounded-lg text-gray-300">Để Sau</button>
                            <button class="px-4 py-2 bg-gray-100 rounded-lg text-gray-300">Lưu</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </section>
</template>