<script setup lang="ts">
import DonutChart from "@/components/customUI/DonutChart/DonutChart.vue";
import {useAccountData} from "@/stores/AccountData.store.ts";
import {computed} from "vue";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {IsSpending} from "@/ts/AccountData/SpendingCategoriesData.ts";

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
const totalSpendings = computed(() => data.data.spendings.filter(item => IsSpending({category: item.category})).reduce((acc, curr) => acc += curr.amount, 0))
const totalIncomes = computed(() => data.data.spendings.filter(item => !IsSpending({category: item.category})).reduce((acc, curr) => acc += curr.amount, 0))
</script>

<template>
  <Card>
    <CardHeader>
      <CardTitle>Статистика</CardTitle>
    </CardHeader>

    <!-- TODO: absolute position for chart and -z-100 -->
    <CardContent>
      <div class="relative flex-center">
        <div class="size-70">
          <DonutChart v-if="notEmpty" :data="chartData" class="size-70 absolute inset-0 z-0"/>
        </div>
        <!-- spent money -->
        <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex-center flex-col">
          <p :class="{'money text-3xl':notEmpty, 'text-muted-foreground':!notEmpty}">
            {{ notEmpty ? totalSpendings : 'Пока пусто...' }}</p>
          <p v-if="totalIncomes > 0" class="money text-3xl income">{{ totalIncomes }}</p>
        </div>
      </div>
    </CardContent>
  </Card>
</template>