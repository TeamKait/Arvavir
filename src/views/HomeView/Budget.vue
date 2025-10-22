<script setup lang="ts">
import {Card, CardContent} from "@/components/ui/card";
import {Icon} from "@iconify/vue"
import WithLabel from "@/utils/components/WithLabel.vue";
import BudgetOtherFunctions from "@/views/HomeView/BudgetOtherFunctions.vue";
import CircleButton from "@/components/customUI/buttons/CircleButton.vue";
import {ComponentWithProps, useCommonDialog} from "@/stores/CommonDialog.ts";
import ChangeBudgetDialog from "@/components/dialogs/ChangeBudgetDialog.vue";
import SpendingSelect from "@/components/dialogs/spending/SpendingSelect.vue";
import {ref} from "vue";
import SpendingCategory from "@/components/dialogs/spending/SpendingCategory.vue";
import {SpendingCategories} from "@/ts/AccountData/SpendingCategoriesData.ts";

const dialog = useCommonDialog();

const results = ref<Array<any>>([])

async function GetResults() {
  results.value = await dialog.GetResults('Новая трата',
      new ComponentWithProps(ChangeBudgetDialog,
          {defaultValue: 0, options: [-500, -200, -100, 0, 100, 200, 500], mode: 'change'}),
      new ComponentWithProps(SpendingSelect))
}
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
        <WithLabel label="Зачисление" position="bottom" class="w-20 flex-center">
          <CircleButton
              @click="dialog.GetResults('Новое зачисление',
              new ComponentWithProps(ChangeBudgetDialog,
                  {defaultValue: 0, options: [-500, -100, 0, 100, 500], mode: 'change'}))"
              class="size-18">
            <Icon icon="radix-icons:double-arrow-up" class="size-7"/>
          </CircleButton>
        </WithLabel>

        <!-- трата -->
        <WithLabel label="Трата" position="bottom" class="w-20 flex-center">
          <CircleButton
              @click="GetResults"
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