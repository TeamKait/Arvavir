<script setup lang="ts">
import {Button} from "@/components/ui/button";

const props = defineProps({
  options: {type: Array<number>, default: [-1000, -500, -100, 0, 100, 500, 1000]}
})

const model = defineModel({default: 0});

function ChangeModel(val:number){
  if(val == 0){
    model.value = 0;
  }
  else{
    model.value += val;
  }
}
</script>

<template>
  <div class="flex-center gap-2">
    <Button v-for="option in props.options"
            @click="ChangeModel(option)"
            :key="option"
            variant="outline"
            class="text-sm flex-1 font-bold"
            :class="{'text-destructive':option < 0, 'text-primary':option > 0}">
      {{ option > 0 ? '+' : '' }}{{ option }}
    </Button>
  </div>
</template>