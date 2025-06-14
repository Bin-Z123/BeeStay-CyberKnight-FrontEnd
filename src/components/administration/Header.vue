<template>
    <section>
        <div class="h-12 px-4 border-b flex items-center justify-between">
            <SidebarTrigger asChild>
                <button class="p-2 rounded hover:bg-gray-200">
                    <Menu class="w-4 h-4" />
                </button>
            </SidebarTrigger>
            <h1>
                <CircleUserRound class="inline-block" /> Võ Thanh Bin
            </h1>
        </div>
        <hr class="text-muesli-400 bg-muesli-400 h-1">
    </section>
</template>
<script setup>
import { CircleUserRound, Menu } from 'lucide-vue-next';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
</script>