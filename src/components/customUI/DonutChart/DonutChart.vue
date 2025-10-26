<script setup lang="ts">
import { computed } from 'vue'
import {Pie} from 'vue-chartjs'
import {Chart as ChartJS, Title, Tooltip, Legend, ArcElement} from 'chart.js'
import type {ChartItem} from "@/components/customUI/DonutChart/ChartItem.ts";

ChartJS.register(Title, Tooltip, Legend, ArcElement)

const props = defineProps<{
  data: Array<ChartItem>
}>()

const chartData = computed(() => ({
  labels: props.data.map(item => item.label),
  datasets: [
    {
      backgroundColor: props.data.map(item => item.color),
      data: props.data.map(item => item.data),
      borderWidth: 0
    }
  ]
}))

const options = {
  responsive: true,
  maintainAspectRatio: false,
  cutout: '70%',
  plugins: {
    legend: {display: false},
  }
}
</script>

<template>
  <div>
    <Pie :data="chartData" :options="options"/>
  </div>
</template>
