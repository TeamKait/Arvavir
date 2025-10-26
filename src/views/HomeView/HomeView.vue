<script setup lang="ts">
import Budget from "@/views/HomeView/Budget.vue";
import SpendingHistory from "@/views/HomeView/SpendingHistory/SpendingHistory.vue";
import Statistics from "@/views/HomeView/Statistics.vue";
</script>

<template>
  <div class="flex gap-5">
    <SpendingHistory/>
    <Budget/>
    <Statistics/>
  </div>
</template>