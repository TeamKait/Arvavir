<script setup lang="ts">
import DonutChart from "@/components/customUI/DonutChart/DonutChart.vue";
import {useAccountData} from "@/stores/AccountData.store.ts";
import {computed} from "vue";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";

const data = useAccountData();

const chartData = computed(() => {
  const grouped: Record<string, { data: number; label: string; color: string }> = {};

  data.data.spendings.forEach(item => {
    const category = item.category.name;
    if (!grouped[category]) {
      grouped[category] = {
        data: item.amount,
        label: category,
        color: item.category.color
      };
    } else {
      grouped[category].data += item.amount;
    }
  });

  return Object.values(grouped);
});

const notEmpty = computed(() => chartData.value.length > 0)
const total = computed(() => data.data.spendings.reduce((acc, curr) => acc += curr.amount, 0))
</script>

<template>
  <Card>
    <CardHeader>
      <CardTitle>Статистика</CardTitle>
    </CardHeader>

    <CardContent>
      <div class="relative flex-center">
        <div class="size-70">
          <DonutChart v-if="notEmpty" :data="chartData"/>
        </div>
        <p class="absolute" :class="{'money text-3xl':notEmpty, 'text-muted-foreground':!notEmpty}">
          {{ notEmpty ? total : 'Пока пусто...' }}</p>
      </div>
    </CardContent>
  </Card>
</template>