<template>
    <section>
        <div class="flex flex-col md:flex-row">
            <div class="w-1/2"></div>
            <div class="md:w-1/2 flex items-center h-screen mx-3 justify-center md:justify-start">
                <div class="bg-white w-120 rounded-2xl p-10">
                    <h1 class="text-muesli-400 font-bold text-2xl flex justify-center">Đăng Ký</h1>
                    <form action="">
                        <div>
                            <label class="text-muesli-400">Họ tên</label>
                            <input type="text" placeholder="Nhập họ tên"
                                class="w-full h-12 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-muesli-200 mb-3 shadow-sm shadow-muesli-300">
                        </div>
                        <div>
                            <label class="text-muesli-400">Số điện thoại</label>
                            <input type="number" placeholder="Nhập số điện thoại"
                                class="w-full h-12 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-muesli-200 mb-3 shadow-sm shadow-muesli-300">
                        </div>
                        <div>
                            <label class="text-muesli-400">Email</label>
                            <input type="email" placeholder="Nhập email"
                                class="w-full h-12 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-muesli-200 mb-3 shadow-sm shadow-muesli-300">
                        </div>
                        <div>
                            <label class="text-muesli-400">Mật khẩu</label>
                            <input type="number" placeholder="Nhập mật khẩu"
                                class="w-full h-12 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-muesli-200 mb-3 shadow-sm shadow-muesli-300">
                        </div>
                        <div class="flex mb-4">
                            <div class="w-1/2 flex items-center">
                                <input type="checkbox" name="remember" id="remember" class="h-4 w-4 rounded">
                                <label for="remember" class="ml-2 text-sm text-gray-500 select-none">Nhớ mật
                                    khẩu</label>
                            </div>
                            <div class="w-1/2 text-right">
                                <div class="text-sm text-muesli-400 hover:underline">
                                    <RouterLink to="">Quên mật khẩu?</RouterLink>
                                </div>
                            </div>
                        </div>
                        <div>
                            <button class="bg-muesli-400 hover:bg-white hover:text-muesli-400 border border-muesli-400 text-white font-bold py-2 px-4 w-full rounded duration-300">Đăng Ký</button>
                        </div>
                        <div>
                            <p class="text-center text-gray-500 mt-4">Tôi đã có tài khoản? <RouterLink to="/auth/login" class="text-muesli-400 hover:underline">Đăng nhập</RouterLink></p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </section>
</template>