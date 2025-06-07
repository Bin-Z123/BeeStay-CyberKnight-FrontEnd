<template>
  <div class="relative h-screen w-full">
    <div
      class="absolute inset-0 bg-[url('@/assets/images/bg_auth1.png')] bg-cover bg-center z-[-2]"
    ></div>
    <div class="absolute inset-0 bg-blue-500/18 z-[-1]"></div>
    <div
      class="absolute w-60 h-100 bg-muesli-400 rotate-[55deg] -mt-60 rounded-br-[100px] ml-25"
    ></div>
    <div class="absolute w-45 ml-17 mt-3">
      <RouterLink to=""
        ><img
          src="/src/assets/images/LogoBeeStay.svg"
          alt=""
          class="rounded-[40px]"
      /></RouterLink>
    </div>
    <RouterView />
  </div>
</template>
