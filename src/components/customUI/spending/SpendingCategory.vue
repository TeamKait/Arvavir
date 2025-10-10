<script setup lang="ts">
import {Icon} from "@iconify/vue"
import {SpendingCategories, SpendingCategory} from "@/ts/SpendingCategoriesData.ts";

const props = defineProps({
  category: {type: SpendingCategory, default: SpendingCategories[0]}
})
</script>

<template>
<div class="flex items-center gap-2 w-35 p-1 rounded-md">
  <div class="p-0.5 flex-center text-center rounded-md text-white" :style="'background-color: ' + props.category.color">
    <Icon :icon="props.category.icon" class="text-3xl"/>
  </div>
  <p>{{ props.category.name }}</p>
</div>
</template>