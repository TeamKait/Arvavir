<script setup lang="ts">
import {Card, CardContent} from "@/components/ui/card";
import {Icon} from "@iconify/vue"
import WithLabel from "@/utils/components/WithLabel.vue";
import BudgetOtherFunctions from "@/views/HomeView/BudgetOtherFunctions.vue";
import CircleButton from "@/components/customUI/buttons/CircleButton.vue";
import {ComponentWithProps, useCommonDialog} from "@/stores/CommonDialog.ts";
import ChangeBudgetDialog from "@/components/dialogs/ChangeBudgetDialog.vue";

const dialog = useCommonDialog();
</script>

<template>
  <Card>
    <CardContent class="flex-center flex-col gap-10">
      <div class="flex-center flex-col">
        <h1 class="text-xl text-muted-foreground">На сегодня</h1>
        <h1 class="text-7xl text-primary">+500₽</h1>
        <h2 class="text-md">Всего: 5000₽</h2>
      </div>

      <div class="flex gap-2">
        <!-- зачисление -->
        <WithLabel label="Зачисление" position="bottom" class="w-20">
          <CircleButton
              @click="dialog.Open('Новое зачисление',
              new ComponentWithProps(ChangeBudgetDialog,
                  {defaultValue: 0, options: [-500, -100, 0, 100, 500], mode: 'change'}))"
              class="size-18">
            <Icon icon="radix-icons:double-arrow-up" class="size-7"/>
          </CircleButton>
        </WithLabel>

        <!-- трата -->
        <WithLabel label="Трата" position="bottom" class="w-20">
          <CircleButton
              @click="dialog.Open('Новая трата',
              new ComponentWithProps(ChangeBudgetDialog,
              {defaultValue: 0, options: [-500, -200, -100, 0, 100, 200, 500], mode: 'change'}))"
              class="size-18">
            <Icon icon="radix-icons:double-arrow-down" class="size-7"/>
          </CircleButton>
        </WithLabel>

        <!-- другие функции -->
        <BudgetOtherFunctions/>
      </div>
    </CardContent>
  </Card>
</template>