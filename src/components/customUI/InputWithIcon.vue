<script setup lang="ts">
import {Input} from "@/components/ui/input";
import SafeIcon from "@/components/customUI/SafeIcon.vue";

const props = defineProps<{
  icon: string
}>()

const model = defineModel<any>();
</script>

<template>
  <div class="relative w-full max-w-sm items-center">
    <Input v-model="model" v-bind="$attrs" class="pl-10" />
    <span class="absolute start-0 inset-y-0 flex items-center justify-center px-2">
      <SafeIcon :icon="props.icon" class="size-6 text-muted-foreground" />
    </span>
  </div>
</template>