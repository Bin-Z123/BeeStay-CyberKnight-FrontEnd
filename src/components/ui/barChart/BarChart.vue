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

// Đăng ký các thành phần cần thiết
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

// Nhận props từ component cha
const props = defineProps<{
  data: { name: string; total: number; predicted: number }[]
}>()

// Dữ liệu cho biểu đồ
const chartData = {
  labels: props.data.map((d) => d.name),
  datasets: [
    {
      label: 'Total',
      backgroundColor: '#4f46e5',
      data: props.data.map((d) => d.total),
    },
    {
      label: 'Predicted',
      backgroundColor: '#22c55e',
      data: props.data.map((d) => d.predicted),
    },
  ],
}

// Sửa lỗi type bằng cách ép kiểu options rõ ràng
const chartOptions: ChartOptions<'bar'> = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top', // <-- hợp lệ với ChartOptions<'bar'>
    },
    title: {
      display: true,
      text: 'Doanh thu theo tháng',
    },
  },
}
</script>
