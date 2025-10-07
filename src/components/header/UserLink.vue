<script setup lang="ts">
import {Icon} from "@iconify/vue";
import {Avatar, AvatarFallback} from "@/components/ui/avatar";
</script>

<template>
  <RouterLink to="/login" class="flex items-center px-10 gap-3 hover:underline border-l h-full">
    <Avatar class="size-15">
      <AvatarFallback class="text-3xl">
        <Icon icon="radix-icons:person"/>
      </AvatarFallback>
    </Avatar>
    <!-- TODO: user fetch -->
    <!-- TODO: burger menu for log out etc -->
    <p class="text-2xl">User</p>
  </RouterLink>
</template>