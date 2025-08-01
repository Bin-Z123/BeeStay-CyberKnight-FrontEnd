<script setup lang="ts">
import { RouterView } from "vue-router";
import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/sonner";
import { VueQueryDevtools } from "@tanstack/vue-query-devtools";
import "vue-sonner/style.css";
import { toast } from "vue-sonner";
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
  <Toaster richColors position="top-right"></Toaster>
  <RouterView />
  <VueQueryDevtools />
</template>

<style scoped></style>
