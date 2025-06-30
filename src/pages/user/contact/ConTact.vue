<template>
    <section>
        <div class="bg-white">
            <div class="w-full h-[700px] relative">
                <div class="bg-[url('@/assets/images/header__bg.webp')] bg-cover bg-center h-full w-full"></div>
                <div class="absolute inset-0 bg-blue-900/40"></div>
            </div>

            <div class="flex flex-col md:flex-row container mx-auto py-20 gap-15">
                <div class="md:w-1/2 flex items-center justify-center flex-col gap-8 px-4 md:px-0">
                    <h1 class="text-4xl text-center">Rất mong nhận được phản hồi từ bạn. Hãy liên lạc với chúng tôi!
                    </h1>
                    <form class="flex flex-col gap-3 w-full">
                        <div>
                            <label for="yourname">Tên Của Bạn</label>
                            <input type="text" name="yourname" id="yourname" placeholder="Nhập tên của bạn"
                                class="w-full h-12 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-muesli-200 mb-3 shadow-sm shadow-muesli-300">
                        </div>
                        <div>
                            <label for="yourmail">Email Của Bạn</label>
                            <input type="email" name="yourmail" id="yourmail" placeholder="Nhập email của bạn"
                                class="w-full h-12 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-muesli-200 mb-3 shadow-sm shadow-muesli-300">
                        </div>
                        <div>
                            <label for="yourmessage">Nội dung</label>
                            <textarea name="yourmessage" id="yourmessage" cols="30" rows="10"
                                placeholder="Nhập nội dung"
                                class="w-full p-5 h-32 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-muesli-200 mb-3 shadow-sm shadow-muesli-300"></textarea>
                        </div>
                        <button class="w-full h-12 bg-muesli-400 text-white rounded-lg">Gửi</button>
                    </form>
                </div>
                <div class="md:w-1/2 mx-4 md:mx-0">
                    <img src="@/assets/images/room4.png" alt="" class="h-full rounded-2xl">
                </div>
            </div>

            <div class="flex flex-col md:flex-row container mx-auto pb-20 gap-15">
                <div class="md:w-1/2 h-[400px] px-4 md:px-0">
                    <iframe class="w-full h-full"
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d21301.168989155052!2d106.6171142580535!3d10.840257303855612!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752a35d7ac0871%3A0x3e3049f42134f17d!2zMUYgMTYsIELDoCDEkGnhu4NtLCBIw7NjIE3DtG4sIEjhu5MgQ2jDrCBNaW5oLCBWaeG7h3QgTmFt!5e1!3m2!1svi!2s!4v1749474727461!5m2!1svi!2s"
                        style="border:0" allowfullscreen loading="lazy"
                        referrerpolicy="no-referrer-when-downgrade"></iframe>
                </div>
                <div class="md:w-1/2 flex flex-col gap-5 justify-center px-4 md:px-0">
                    <h1 class="text-4xl">Thông Tin Khách Sạn BeeStay</h1>
                    <div class="text-gray-500">
                        <p>Số Điện Thoại: 0123456789</p>
                        <p>Email: 2a6lH@example.com</p>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>