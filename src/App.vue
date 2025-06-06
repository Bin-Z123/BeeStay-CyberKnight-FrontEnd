<script setup>
import { RouterView } from 'vue-router';

const toggleDarkMode = () => {
  const htmlElement = document.documentElement;
  htmlElement.classList.toggle("dark");
  localStorage.setItem(
    "darkMode",
    htmlElement.classList.contains("dark") ? "enabled" : "disabled"
  );
};
</script>

<template>
  <RouterView />
  <!-- <RouterView></RouterView> -->
</template>

<style scoped></style>
