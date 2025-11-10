<script setup lang="ts">
import {Spending, IsSpending} from "@/ts/AccountData/SpendingCategoriesData.ts";
import SpendingCategoryComponent from "@/components/dialogs/spending/SpendingCategoryComponent.vue";
import CircleButton from "@/components/customUI/buttons/CircleButton.vue";
import DropdownFunctions from "@/components/customUI/DropdownFunctions/DropdownFunctions.vue";
import {DropdownFunction} from "@/components/customUI/DropdownFunctions/DropdownFunction.ts";
import {CopyToClipboard, FormatDate} from "@/ts/utils.ts";
import SafeIcon from "@/components/customUI/SafeIcon.vue";
import {computed} from "vue";

const props = defineProps({
  spending: Spending
})

const emit = defineEmits(['delete', 'edit'])
const copyText = computed(() => {
  const isSpending = IsSpending(props.spending!)
  let commonText = `${isSpending ? 'Трата' : 'Зачисление'} за ${FormatDate(props.spending?.date!)}\nСумма: ${props.spending?.amount}₽`
  if(isSpending){
    commonText += `\nКатегория: ${props.spending?.category.name}`
  }
  return commonText
})

const imSpending = IsSpending(props.spending!)

const functions = [new DropdownFunction('Скопировать', 'radix-icons:copy', () => CopyToClipboard(copyText.value)),
  new DropdownFunction('Редактировать', 'radix-icons:pencil-1', () => emit('edit')),
  new DropdownFunction('Удалить', 'radix-icons:trash', () => emit('delete'))]
</script>

<template>
  <div class="flex items-center justify-between border-2 p-2 rounded-xl hover:bg-secondary/20 group">
    <div class="flex-center">
      <div class="w-40 border-r-2">
        <SpendingCategoryComponent :category="spending?.category" class="whitespace-nowrap"/>
      </div>
      <p class="text-2xl w-23 flex items-center money ml-2" :class="{'income':!imSpending}">{{ spending?.amount }}</p>
    </div>

    <!-- TODO: functions -->
    <DropdownFunctions
        :functions="functions">
      <CircleButton class="size-7 opacity-0 group-hover:opacity-100">
        <SafeIcon icon="radix-icons:dots-vertical"/>
      </CircleButton>
    </DropdownFunctions>
  </div>
</template>