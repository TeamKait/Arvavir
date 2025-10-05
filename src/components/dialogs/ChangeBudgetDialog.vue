<script setup lang="ts">
import CircleButton from "@/components/customUI/CircleButton.vue";
import {Icon} from "@iconify/vue";
import {Button} from "@/components/ui/button";
import {useCommonDialog} from "@/stores/CommonDialog.ts";

const commonDialog = useCommonDialog();
</script>

<template>
  <div class="flex-center justify-between gap-10 w-full py-5">
    <Button size="icon" variant="outline" class="rounded-full size-10 text-2xl">
      <Icon icon="radix-icons:minus"/>
    </Button>

    <div class="flex-center flex-col">
      <h1 class="text-7xl text-primary">500₽</h1>
      <p class="text-muted-foreground">На месяц</p>
    </div>

    <Button size="icon" variant="outline" class="rounded-full size-10 text-2xl">
      <Icon icon="radix-icons:plus"/>
    </Button>
  </div>

  <div class="flex items-center justify-end w-full pt-5 gap-2 border-t">
    <Button @click="commonDialog.Close" variant="outline">Отмена</Button>
    <Button @click="commonDialog.Close">Подтвердить</Button>
  </div>
</template>