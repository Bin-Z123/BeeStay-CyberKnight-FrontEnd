<script setup lang="ts">
import { RouterView } from "vue-router";
import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/sonner";
import "vue-sonner/style.css"; // vue-sonner v2 requires this import
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
  <!-- <Toaster> </Toaster> -->
  <RouterView />
  <!-- <RouterView></RouterView> -->
  <!-- <div>
    <Button
      variant="outline"
      @click="
        () => {
          toast('Đây là thông báo toast', {
            description:
              'Bạn có thể tùy chỉnh nội dung và hành động của thông báo này.',
            duration: 5000,
            action: {
              label: 'Thoát',
              onClick: () => console.log('Action clicked!'),
            },
          });
        }
      "
      >Click me</Button
    >
  </div> -->
</template>

<style scoped></style>
