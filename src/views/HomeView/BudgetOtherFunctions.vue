<script setup lang="ts">
import {Icon} from "@iconify/vue";
import WithLabel from "@/utils/components/WithLabel.vue";
import {DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem} from "@/components/ui/dropdown-menu";
import {ComponentWithProps, useCommonDialog} from "@/stores/CommonDialog.ts";
import {Button} from "@/components/ui/button";
import ChangeBudgetDialog from "@/components/dialogs/ChangeBudgetDialog.vue";
import CircleButton from "@/components/customUI/buttons/CircleButton.vue";

const dialog = useCommonDialog();
</script>

<template>
  <WithLabel label="Другое" position="bottom" class="w-20">
    <DropdownMenu>
      <DropdownMenuTrigger as-child>
        <CircleButton class="size-18">
          <Icon icon="radix-icons:dots-vertical" class="size-7"/>
        </CircleButton>
      </DropdownMenuTrigger>

      <DropdownMenuContent>
        <DropdownMenuItem as-child>
          <button @click="dialog.Open(
              'Изменить бюджет',
              new ComponentWithProps(ChangeBudgetDialog,
              {defaultValue: 0, options: [-10000, -1000, 0, 1000, 10000], mode: 'change'}))">
            <Icon icon="radix-icons:pencil-1"/>
            <p>Изменить бюджет</p>
          </button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  </WithLabel>
</template>