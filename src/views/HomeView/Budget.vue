<script setup lang="ts">
import {Card, CardContent} from "@/components/ui/card";
import {Icon} from "@iconify/vue"
import WithLabel from "@/utils/components/WithLabel.vue";
import CircleButton from "@/components/customUI/buttons/CircleButton.vue";
import {DialogComponent, useCommonDialog} from "@/stores/CommonDialog.ts";
import ChangeBudgetDialog from "@/components/dialogs/ChangeBudgetDialog.vue";
import {DropdownFunction} from "@/components/customUI/DropdownFunctions/DropdownFunction.ts";
import DropdownFunctions from "@/components/customUI/DropdownFunctions/DropdownFunctions.vue";
import {useAccountData} from "@/stores/AccountData.store.ts";

const data = useAccountData();
const dialog = useCommonDialog();

async function ChangeBudget() {
  const results = await dialog.DialogResults(
      'Изменить бюджет',
      new DialogComponent(ChangeBudgetDialog,
          {defaultValue: data.data.budget, options: [-10000, -1000, 0, 1000, 10000], mode: 'change'}))

  if (!results) return;

  data.SetBudget(results[0])
}
</script>

<template>
  <Card>
    <CardContent class="flex-center flex-col gap-10">
      <div class="flex-center flex-col">
        <!-- today budget -->
        <h1 class="text-xl text-muted-foreground">На сегодня</h1>
        <!-- TODO: store devisor in account data -->
        <h1 class="text-7xl text-primary money">{{ Math.round(data.data.budget / 30) }}</h1>

        <!-- budget -->
        <!-- TODO: refactor it to LEFT_BUDGET/BUDGET -->
        <h2 class="text-md money">Всего: {{ data.data.budget }}</h2>
      </div>

      <div class="flex gap-2">
        <!-- зачисление -->
        <WithLabel label="Зачисление" position="bottom" class="w-20 flex-center">
          <CircleButton
              @click="data.AddIncome"
              class="size-18">
            <Icon icon="radix-icons:double-arrow-up" class="size-7"/>
          </CircleButton>
        </WithLabel>

        <!-- трата -->
        <WithLabel label="Трата" position="bottom" class="w-20 flex-center">
          <CircleButton
              @click="data.AddSpending"
              class="size-18">
            <Icon icon="radix-icons:double-arrow-down" class="size-7"/>
          </CircleButton>
        </WithLabel>

        <!-- другие функции -->
        <WithLabel label="Другое" position="bottom" class="w-20 flex-center">
          <DropdownFunctions
              :functions="[new DropdownFunction('Изменить бюджет', 'radix-icons:pencil-1', ChangeBudget)]">
            <CircleButton class="size-18">
              <Icon icon="radix-icons:dots-vertical" class="size-7"/>
            </CircleButton>
          </DropdownFunctions>
        </WithLabel>
      </div>
    </CardContent>
  </Card>
</template>