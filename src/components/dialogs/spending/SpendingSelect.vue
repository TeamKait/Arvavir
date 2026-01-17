<script setup lang="ts">
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select"
import SpendingCategoryComponent from "@/components/dialogs/spending/SpendingCategoryComponent.vue";
import {SpendingCategories} from "@/ts/AccountData/SpendingCategoriesData.ts";
import {onMounted} from "vue";

const props = defineProps({
  defaultValue: {type: Number, required: false},
})

const selected = defineModel<number>({default: 0});

onMounted(() => {
  selected.value = props.defaultValue ?? 0
})
</script>

<template>
  <Select v-model="selected">
    <SelectTrigger class="w-[180px]">
      <SpendingCategoryComponent :category="SpendingCategories[selected]"/>
    </SelectTrigger>
    <SelectContent>
      <SelectGroup>
        <SelectItem v-for="(c, i) in SpendingCategories" :value="i" :key="i">
          <SpendingCategoryComponent :category="c"/>
        </SelectItem>
      </SelectGroup>
    </SelectContent>
  </Select>
</template>