<script setup lang="ts">
import {Button} from "@/components/ui/button";
import {Icon} from "@iconify/vue";

const props = defineProps({
  icon: {type: String, required: true},
  textStart: {type: Boolean, default: false},
  iconClass: {type: String, default: 'size-6'}
})
</script>

<template>
  <Button class="text-xl flex justify-start">
    <template v-if="props.textStart">
      <slot/>
    </template>

    <Icon :icon="props.icon" :class="props.iconClass"/>

    <template v-if="!props.textStart">
      <slot/>
    </template>
  </Button>
</template>