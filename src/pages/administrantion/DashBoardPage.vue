<template>
  <section>
    <div class="bg-white my-3">
      <div class="flex mx-5 gap-2 items-center justify-center py-3">
        <div class="bg-muesli-300 h-38 w-1/5 rounded-2xl relative">
          <UserRoundCheck class="absolute right-0 m-3" />
        </div>
        <div class="bg-muesli-200 h-38 w-1/5 rounded-2xl">heheh</div>
        <div class="bg-blue-400 h-38 w-1/5 rounded-2xl">heheh</div>
        <div class="bg-red-400 h-38 w-1/5 rounded-2xl">heheh</div>
        <div class="bg-green-400 h-38 w-1/5 rounded-2xl">heheh</div>
      </div>
    </div>
    <div class="flex">
      <div class="w-1/2 py-2 px-4">
        <div class="border-15 h-115 border-white rounded-2xl">
          <iframe
            width="100%"
            height="100%"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d21301.168989155052!2d106.6171142580535!3d10.840257303855612!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752a35d7ac0871%3A0x3e3049f42134f17d!2zMUYgMTYsIELDoCDEkGnhu4NtLCBIw7NjIE3DtG4sIEjhu5MgQ2jDrSBNaW5oLCBWaeG7h3QgTmFt!5e1!3m2!1svi!2s!4v1749474727461!5m2!1svi!2s"
            style="border: 0"
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </div>
  </section>
</template>
<script setup>
import { UserRoundCheck } from "lucide-vue-next";
</script>
