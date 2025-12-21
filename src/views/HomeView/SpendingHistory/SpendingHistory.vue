<script setup lang="ts">
import SpendingComponent from "@/views/HomeView/SpendingHistory/SpendingComponent.vue";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {ScrollArea} from "@/components/ui/scroll-area";
import {useAccountData} from "@/stores/AccountData.store.ts";
import {Skeleton} from "@/components/ui/skeleton";
import {computed} from "vue";

const data = useAccountData();

// Group spendings by calendar date (desc)
const groupedByDate = computed(() => {
  const map = new Map<string, { items: any[]; time: number }>();
  for (const s of data.data.spendings) {
    const d = new Date((s as any).date);
    // format like 21.12.2025
    const key = d.toLocaleDateString('ru-RU');
    const dayTime = new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime();
    const bucket = map.get(key) ?? { items: [], time: dayTime };
    bucket.items.push(s);
    map.set(key, bucket);
  }
  return Array.from(map.entries()).sort((a, b) => b[1].time - a[1].time);
});
</script>

<template>
  <Card>
    <CardHeader>
      <CardTitle>История</CardTitle>
    </CardHeader>

    <CardContent class="w-100">
      <Skeleton v-if="!data.loaded" class="w-full h-90 rounded-xl"/>
      <ScrollArea v-else class="h-100 p-3">
        <div class="flex flex-col gap-3 w-80">
          <template v-for="([dateLabel, group], gi) in groupedByDate" :key="dateLabel">
            <div class="text-sm text-muted-foreground mt-2">{{ dateLabel }}</div>
            <div class="flex flex-col gap-2">
              <SpendingComponent
                v-for="(s, i) in group.items"
                :key="i"
                :spending="s"
                @delete="() => data.DeleteSpending(data.data.spendings.indexOf(s))"
                @edit="() => data.EditSpending(data.data.spendings.indexOf(s))"
              />
            </div>
          </template>
          <p v-if="data.data.spendings.length == 0" class="flex-center text-muted-foreground">Пока пусто...</p>
        </div>
      </ScrollArea>
    </CardContent>
  </Card>
</template>