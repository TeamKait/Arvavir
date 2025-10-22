<script setup lang="ts">
import {useCommonDialog} from "@/stores/CommonDialog.ts";
import NumberSetSuggestions from "@/components/customUI/suggestions/NumberSetSuggestions.vue";
import NumberChangeSuggestions from "@/components/customUI/suggestions/NumberChangeSuggestions.vue";
import {onMounted, ref, watch} from "vue";
import {Clamp} from "@/ts/utils.ts";


const props = defineProps<{
  defaultValue?: number
  options?: number[]
  mode?: 'set' | 'change',
  min?: number,
  max?: number
}>()

const rawModel = ref<number>(props.defaultValue ?? 0)
const model = defineModel<number>();

function UpdateModel(){
  model.value = Clamp(rawModel.value, props.min, props.max)
}
onMounted(UpdateModel)
watch(rawModel, UpdateModel)
</script>

<template>
  <div class="flex-center justify-between gap-10 w-full py-5">
    <div class="flex-center flex-col w-40">
      <input v-model="rawModel" type="number" class="text-7xl text-primary max-w-[11ch] text-center"/>
    </div>
  </div>

  <NumberChangeSuggestions v-if="props.mode == 'change'" v-model="rawModel" :options="props.options"/>
  <NumberSetSuggestions v-else v-model="rawModel" :options="props.options"/>
</template>