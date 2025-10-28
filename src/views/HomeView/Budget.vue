<script setup lang="ts">
import {Card, CardContent} from "@/components/ui/card";
import WithLabel from "@/components/customUI/WithLabel.vue";
import CircleButton from "@/components/customUI/buttons/CircleButton.vue";
import {DialogComponent, useCommonDialog} from "@/stores/CommonDialog.ts";
import ChangeBudgetDialog from "@/components/dialogs/ChangeBudgetDialog.vue";
import {DropdownFunction} from "@/components/customUI/DropdownFunctions/DropdownFunction.ts";
import DropdownFunctions from "@/components/customUI/DropdownFunctions/DropdownFunctions.vue";
import {useAccountData} from "@/stores/AccountData.store.ts";
import SafeIcon from "@/components/customUI/SafeIcon.vue";
import PillSelect from "@/components/customUI/PillSelect.vue";
import {PERIOD_LABELS, type PeriodType, SPENDING_MODE_LABELS, type SpendingMode} from "@/ts/AccountData/AccountData.ts";
import {computed} from "vue";
import {IsSpending} from "@/ts/AccountData/SpendingCategoriesData.ts";

const data = useAccountData();
const dialog = useCommonDialog();

const periodLabel = computed({
  get: () => PERIOD_LABELS[data.data.periodType],
  set: (val: string) => {
    const entry = (Object.entries(PERIOD_LABELS) as [PeriodType, string][]).find(([, v]) => v === val);
    if (entry) data.data.periodType = entry[0];
  }
});

const spendingModeLabel = computed({
  get: () => SPENDING_MODE_LABELS[data.data.spendingMode],
  set: (val: string) => {
    const entry = (Object.entries(SPENDING_MODE_LABELS) as [SpendingMode, string][]).find(([, v]) => v === val);
    if (entry) data.data.spendingMode = entry[0];
  }
});

const devisor = computed(() => data.data.periodType == 'day' ? 30 : 7)

// Start of the current period (local time): today 00:00 for day, Monday 00:00 for week
const periodStart = computed(() => {
  const now = new Date();
  const start = new Date(now);
  start.setHours(0, 0, 0, 0);
  if (data.data.periodType === 'day') return start;
  // For a week: go back to Monday of the current week
  const day = (start.getDay() + 6) % 7; // 0 = Monday, 6 = Sunday
  start.setDate(start.getDate() - day);
  return start;
});

// Sum of spendings within the current period
const spendingsSum = computed(() => {
  const from = periodStart.value.getTime();
  return data.data.spendings
    .filter(s => IsSpending(s) && new Date(s.date).getTime() >= from)
    .reduce((acc, s) => acc + Math.abs(s.amount), 0);
});

// Total left budget for the whole account (budget - period spendings)
// KEEP: left budget value for later use (do not persist to store)
const leftBudget = computed(() => data.data.budget - spendingsSum.value);

// Today's budget to display, depends on spending mode
const todayBudget = computed(() => {
  return Math.round(
    data.data.spendingMode === 'period'
      ? (data.data.budget / devisor.value) - spendingsSum.value
      : leftBudget.value / devisor.value
  );
});
</script>

<template>
  <Card>
    <CardContent class="flex-center flex-col gap-5">
      <div class="flex-center flex-col">
        <!-- today budget -->
        <h1 class="text-xl text-muted-foreground">На {{ data.data.periodType == 'day' ? 'сегодня' : 'неделю' }}</h1>
        <!-- TODO: store devisor in account data -->
        <h1 class="text-7xl text-primary money">{{ todayBudget }}</h1>

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
            <SafeIcon icon="radix-icons:double-arrow-up" class="size-7"/>
          </CircleButton>
        </WithLabel>

        <!-- трата -->
        <WithLabel label="Трата" position="bottom" class="w-20 flex-center">
          <CircleButton
              @click="data.AddSpending"
              class="size-18">
            <SafeIcon icon="radix-icons:double-arrow-down" class="size-7"/>
          </CircleButton>
        </WithLabel>

        <!-- другие функции -->
        <WithLabel label="Другое" position="bottom" class="w-20 flex-center">
          <DropdownFunctions
              :functions="[new DropdownFunction('Изменить бюджет', 'radix-icons:pencil-1', data.ChangeBudget)]">
            <CircleButton class="size-18">
              <SafeIcon icon="radix-icons:dots-vertical" class="size-7"/>
            </CircleButton>
          </DropdownFunctions>
        </WithLabel>
      </div>

      <div class="flex flex-col gap-3 w-full border-t-2 pt-5">
        <WithLabel label="Период" position="top">
          <PillSelect
              v-model="periodLabel"
              :options="Object.values(PERIOD_LABELS)"/>
        </WithLabel>
        <WithLabel label="Списывать траты из" position="top">
          <PillSelect
              v-model="spendingModeLabel"
              :options="Object.values(SPENDING_MODE_LABELS)"/>
        </WithLabel>
      </div>
    </CardContent>
  </Card>
</template>