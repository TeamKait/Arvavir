<script setup lang="ts">
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select"
import SpendingCategory from "@/components/dialogs/spending/SpendingCategory.vue";
import {SpendingCategories} from "@/ts/AccountData/SpendingCategoriesData.ts";

const selected = defineModel({default: 0});
</script>

<template>
  <Select v-model="selected">
    <SelectTrigger class="w-[180px]">
      <SpendingCategory :category="SpendingCategories[selected]"/>
    </SelectTrigger>
    <SelectContent>
      <SelectGroup>
        <SelectItem v-for="(c, i) in SpendingCategories" :value="i" :key="i">
          <SpendingCategory :category="c"/>
        </SelectItem>
      </SelectGroup>
    </SelectContent>
  </Select>
</template>