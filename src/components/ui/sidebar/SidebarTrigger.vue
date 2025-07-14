<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { PanelLeft, AlignJustify  } from "lucide-vue-next";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useSidebar } from "./utils";

const props = defineProps<{
  class?: HTMLAttributes["class"];
}>();

const { toggleSidebar } = useSidebar();
</script>

<template>
  <Button
    data-sidebar="trigger"
    data-slot="sidebar-trigger"
    variant="ghost"
    size="icon"
    :class="cn('h-7 w-7', props.class)"
    @click="toggleSidebar"
    class="hover:text-muesli-400 hover:bg-white border border-muesli-400 bg-muesli-400 text-white w-10 h-10 p-2 transition-all duration-300 hover:scale-105 hover:shadow-md">
    <AlignJustify  />
    <span class="sr-only">Toggle Sidebar</span>
  </Button>
</template>
