<script setup lang="ts">
import {Input} from "@/components/ui/input";
import WithLabel from "@/components/customUI/WithLabel.vue";
import {ref} from "vue";
import type {ConditionWithError} from "@/components/customUI/InputWithCondition/InputConditions.ts";

const props = defineProps({
  placeholder: {type: String, required: false},
  min: {type: Number, required: false},
  max: {type: Number, required: false},
  type: {type: String, required: false},

  conditions: {type: Array<ConditionWithError>, required: true},
  ignoreEmpty: {type: Boolean, default: false},
  autoCheck: {type: Boolean, default: false},
})

const model = defineModel<string | number>();
const displayError = ref("");
const emit = defineEmits(['input']);

function ShowError(text: string) {
  displayError.value = text;
}

function CheckCondition() {
  // valid if no conditions
  if (!props.conditions) {
    ShowError("");
    return true;
  }

  // valid if empty and ignore empty
  if (props.ignoreEmpty && model.value?.toString().length == 0){
    ShowError("");
    return true;
  }

  // check conditions
  for (const condition of props.conditions) {
    if (!condition.condition(model.value)) {
      ShowError(condition.error);
      return false;
    }
  }

  ShowError("");
  return true;
}

function HandleInput() {
  emit("input");

  if (props.autoCheck) {
    CheckCondition();
  }
}

defineExpose({ShowError, CheckCondition, model});
</script>

<template>
  <WithLabel :label="displayError" position="bottom" label-class="text-destructive !-mt-1 h-0 pb-5">
    <Input
        @input="HandleInput"
        v-model="model"
        :placeholder="placeholder"
        :min="min"
        :max="max"
        :type="type"/>
  </WithLabel>
</template>