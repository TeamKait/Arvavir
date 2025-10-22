<script setup lang="ts">
import {useCommonDialog} from "@/stores/CommonDialog.ts";
import {Dialog, DialogContent, DialogHeader, DialogTitle} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";

const config = useCommonDialog();

function handleOpenChange(value: boolean) {
  config.open = value;
}
</script>

<template>
<Dialog :open="config.open" @update:open="handleOpenChange">
  <DialogContent class="w-auto max-w-none sm:max-w-none">
    <DialogHeader>
      <DialogTitle>{{ config.label }}</DialogTitle>
    </DialogHeader>

    <component v-for="(c, i) in config.components"
               :is="c.component"
               v-bind="c.props"
               v-model="config.results[i]"
               :key="i"/>

    <div class="flex items-center justify-end w-full pt-5 gap-2 border-t">
      <Button @click="config.Cancel" variant="outline">Отмена</Button>
      <Button @click="config.Confirm">Подтвердить</Button>
    </div>
  </DialogContent>
</Dialog>
</template>