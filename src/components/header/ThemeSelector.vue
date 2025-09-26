<script setup lang="ts">
import IconButton from "@/components/customUI/IconButton.vue";
import {ref, watch} from "vue";
import {Card} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {Icon} from "@iconify/vue";
import {useColorMode} from "@vueuse/core";

const modes = {
  "light": "radix-icons:sun",
  "dark": "radix-icons:moon",
  "auto": "radix-icons:cube",
}

const russianModes = {
  'light': 'светлая',
  'dark': 'темная',
  'auto': 'авто'
}

// common button class
const commonBC = 'size-6 transition-transform'

// TODO: fetch from UserPrefs
const selected = ref('auto');
const open = ref(false);

function GetIcon(mode: string): string {
  return modes[mode]
}

function GetTitle(mode: string): string {
  return russianModes[mode]
}

const mode = useColorMode({
  disableTransition: false
});
watch(selected, () => {
  mode.value = selected.value;
})
</script>

<template>
  <div class="relative" v-click-outside="() => open = false">
    <!-- open menu button -->
    <Button @click="open = !open"
            :icon="GetIcon(selected)"
            size="icon"
            class="size-13"
            variant="outline">
      <Icon
          :icon="GetIcon(selected)"
          class="transition-transform duration-500 size-6"
          :class="{'rotate-360':open}"/>
    </Button>

    <!-- select theme -->
    <transition name="menu">
      <Card v-if="open" class="absolute gap-3 p-4 -left-20 mt-2">
        <IconButton v-for="(icon, mode) in modes"
                    @click="selected = mode"
                    :icon="icon"
                    :variant="selected == mode ? 'default' : 'outline'">
          {{ GetTitle(mode) }}
        </IconButton>
      </Card>
    </transition>
  </div>
</template>