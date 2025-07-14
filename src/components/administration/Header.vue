<template>
    <section>
        <div class="h-12 px-4 border-b flex items-center justify-between">
            <SidebarTrigger asChild></SidebarTrigger>
            <h1>
                <CircleUserRound class="inline-block" /> Võ Thanh Bin
            </h1>
        </div>
        <hr class="text-muesli-400 bg-muesli-400 h-1">
    </section>
</template>
<script setup>
import { CircleUserRound } from 'lucide-vue-next';
import { SidebarTrigger } from '@/components/ui/sidebar'
</script>