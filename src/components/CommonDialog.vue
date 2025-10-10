<script setup lang="ts">
import {useCommonDialog} from "@/stores/CommonDialog.ts";
import {Dialog, DialogContent, DialogHeader, DialogTitle} from "@/components/ui/dialog";

const config = useCommonDialog();

function handleOpenChange(value: boolean) {
  config.open = value;
}
</script>

<template>
<Dialog :open="config.open" @update:open="handleOpenChange">
  <DialogContent>
    <DialogHeader>
      <DialogTitle>{{ config.label }}</DialogTitle>
    </DialogHeader>

    <component v-for="(c, i) in config.components" :is="c.component" v-bind="c.props" :key="i"/>
  </DialogContent>
</Dialog>
</template>