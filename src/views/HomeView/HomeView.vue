<script setup lang="ts">
import Budget from "@/views/HomeView/Budget.vue";
import SpendingHistory from "@/views/HomeView/SpendingHistory/SpendingHistory.vue";
</script>

<template>
  <div class="flex gap-5">
    <SpendingHistory/>
    <Budget/>
  </div>
</template>