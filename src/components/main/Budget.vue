<script setup lang="ts">
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Icon} from "@iconify/vue"
import CircleButton from "@/components/customUI/CircleButton.vue";
import WithLabel from "@/utils/components/WithLabel.vue";
</script>

<template>
  <Card>
    <CardHeader>
      <CardTitle>Бюджет</CardTitle>
    </CardHeader>
    <CardContent class="flex-center flex-col gap-10">
      <div class="flex-center flex-col">
        <h1 class="text-xl text-muted-foreground">На сегодня</h1>
        <h1 class="text-7xl text-primary">+500₽</h1>
        <h2 class="text-md">Всего: 5000₽</h2>
      </div>

      <div class="flex gap-2">
        <!-- зачисление -->
        <WithLabel label="Зачисление" position="bottom" class="w-20">
          <CircleButton>
            <Icon icon="radix-icons:double-arrow-up" class="size-7"/>
          </CircleButton>
        </WithLabel>

        <!-- трата -->
        <WithLabel label="Трата" position="bottom" class="w-20">
          <CircleButton>
            <Icon icon="radix-icons:double-arrow-down" class="size-7"/>
          </CircleButton>
        </WithLabel>

        <!-- другие функции -->
        <WithLabel label="Другое" position="bottom" class="w-20">
          <CircleButton>
            <Icon icon="radix-icons:dots-vertical" class="size-7"/>
          </CircleButton>
        </WithLabel>
      </div>
    </CardContent>
  </Card>
</template>