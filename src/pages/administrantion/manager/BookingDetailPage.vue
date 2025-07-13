<template>
    <h1>Booking Detail {{ props.id }}</h1>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { toast } from 'vue-sonner';


const props = defineProps<{
    id: number;
}>();

onMounted(() => {
    console.log('Booking Detail Page Mounted with ID:', props.id);
    // Fetch booking details using props.id
    toast.success(`Booking Detail for ID: ${props.id} loaded successfully!`);
});
</script>