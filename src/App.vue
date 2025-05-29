<script setup>
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
  <h1 class="dark:text-white">Hello</h1>
  <button class="px-3 py-2 bg-amber-900" @click="toggleDarkMode()">
    Click
  </button>
</template>

<style scoped></style>
