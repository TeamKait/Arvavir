<script setup lang="ts">
import {Icon} from "@iconify/vue";
import {Button} from "@/components/ui/button";
import {useCommonDialog} from "@/stores/CommonDialog.ts";
import {ref} from "vue";
import NumberSetSuggestions from "@/components/customUI/NumberSetSuggestions.vue";
import NumberChangeSuggestions from "@/components/customUI/NumberChangeSuggestions.vue";

const commonDialog = useCommonDialog();

const budget = ref(500);
</script>

<template>
  <div class="flex-center justify-between gap-10 w-full py-5">
    <div class="flex-center flex-col w-40">
      <input v-model="budget" type="number" class="text-7xl text-primary max-w-[11ch] text-center"/>
      <p class="text-muted-foreground">На месяц</p>
    </div>
  </div>

  <NumberChangeSuggestions v-model="budget" :options="[-10000, -1000, 0, 1000, 10000]"/>

  <div class="flex items-center justify-end w-full pt-5 gap-2 border-t">
    <Button @click="commonDialog.Close" variant="outline">Отмена</Button>
    <Button @click="commonDialog.Close">Подтвердить</Button>
  </div>
</template>