<!-- src/components/ui/BarChart.vue -->
<template>
  <Bar :data="chartData" :options="chartOptions" />
</template>

<script setup lang="ts">
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  type ChartOptions
} from 'chart.js'
import { Bar } from 'vue-chartjs'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

const props = defineProps<{
  data: { name: string; total: number; predicted: number }[]
}>()

// 🔄 Dữ liệu biểu đồ cột đơn (chỉ dùng 'total' chẳng hạn)
const chartData = {
  labels: props.data.map((d) => d.name),
  datasets: [
    {
      label: 'Doanh thu',
      backgroundColor: '#4f46e5',
      data: props.data.map((d) => d.total),
      barPercentage: 0.5, // nhỏ lại để tránh dính nhau
      categoryPercentage: 0.5, // căn giữa tốt hơn
    },
  ],
}

const chartOptions: ChartOptions<'bar'> = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Doanh thu theo tháng',
    },
  },
  scales: {
    x: {
      ticks: {
        align: 'center', // 📌 căn giữa text label
      },
    },
    y: {
      beginAtZero: true,
    },
  },
}
</script>
