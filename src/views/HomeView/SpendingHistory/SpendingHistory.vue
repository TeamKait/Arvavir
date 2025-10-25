<script setup lang="ts">
import SpendingComponent from "@/views/HomeView/SpendingHistory/SpendingComponent.vue";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {ScrollArea} from "@/components/ui/scroll-area";
import {useAccountData} from "@/stores/AccountData.store.ts";

const data = useAccountData();
</script>

<template>
  <Card>
    <CardHeader>
      <CardTitle>История</CardTitle>
    </CardHeader>

    <CardContent>
      <ScrollArea class="h-60 p-3">
        <div class="flex flex-col gap-1 w-80">
          <SpendingComponent
              v-for="(s, i) in data.data.spendings"
              :spending="s"
              @delete="() => data.DeleteSpending(i)"
              @edit="() => data.EditSpending(i)"/>
          <p v-if="data.data.spendings.length == 0" class="flex-center text-muted-foreground">Пока пусто...</p>
        </div>
      </ScrollArea>
    </CardContent>
  </Card>
</template>