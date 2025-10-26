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

const max = 999999
const model = defineModel<number>({default: 0});
const condition = defineModel<boolean>('condition')

function UpdateModel(){
  model.value = Clamp(model.value!, 0, max)
  condition.value = model.value > 0
}
onMounted(async () => {
  model.value = props.defaultValue ?? 0
  await nextTick()
  UpdateModel()
})
watch(model, UpdateModel)
</script>

<template>
  <div class="flex-center justify-between gap-10 w-full py-5">
    <div class="flex-center flex-col w-40">
      <input v-model="model" :min="0" :max="max" type="number" tabindex="-1" class="text-7xl text-primary max-w-[7ch] text-center"/>
    </div>
  </div>

  <NumberChangeSuggestions v-if="props.mode == 'change'" v-model="model" :options="props.options"/>
  <NumberSetSuggestions v-else v-model="model" :options="props.options"/>
</template>