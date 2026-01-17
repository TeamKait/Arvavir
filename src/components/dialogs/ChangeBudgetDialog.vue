<script setup lang="ts">
import NumberSetSuggestions from "@/components/customUI/suggestions/NumberSetSuggestions.vue";
import NumberChangeSuggestions from "@/components/customUI/suggestions/NumberChangeSuggestions.vue";
import {nextTick, onMounted, watch} from "vue";
import {Clamp} from "@/ts/utils.ts";


const props = defineProps<{
  defaultValue?: number
  options?: number[]
  mode?: 'set' | 'change'
}>()

const model = defineModel<number>({default: 0});
const condition = defineModel<boolean>('condition')

onMounted(async () => {
  model.value = props.defaultValue ?? 0
  await nextTick()
})
</script>

<template>
  <div class="flex-center justify-between gap-10 w-full py-5">
    <div class="flex-center flex-col w-40">
      <input v-model="model" tabindex="-1" class="text-7xl text-primary max-w-[7ch] text-center"/>
    </div>
  </div>

  <NumberChangeSuggestions v-if="props.mode == 'change'" v-model="model" :options="props.options"/>
  <NumberSetSuggestions v-else v-model="model" :options="props.options"/>
</template>