<script setup lang="ts">
import {Button} from "@/components/ui/button";

const props = defineProps({
  options: {type: Array<number>, default: [0, 100, 200, 500, 1000]}
})

const model = defineModel<number>();
</script>

<template>
  <div class="flex-center gap-2">
    <Button v-for="option in props.options"
            @click="model = option"
            :key="option"
            variant="outline"
            class="text-xl flex-1 font-bold hover:text-primary">
      {{ option }}
    </Button>
  </div>
</template>