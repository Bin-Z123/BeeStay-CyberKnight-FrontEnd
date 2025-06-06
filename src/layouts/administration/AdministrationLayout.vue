<template>
  <div class="flex h-screen">
    <div class="bg-muesli-400 text-white p-3 pt-5"><Sidebar /></div>
    <div class="bg-muesli-950 w-full @container px-3 pt-2"><RouterView /></div>
  </div>
</template>
<script setup lang="ts">
import Sidebar from "../../components/administration/Sidebar.vue";
</script>
