<script setup lang="ts">
import Header from "@/components/header/Header.vue";
import Main from "@/components/main/Main.vue";
import CommonDialog from "@/components/CommonDialog.vue";
</script>

<template>
  <Header/>
  <Main class="m-3"/>

  <!-- чтобы не делать диалог на каждый раз-->
  <CommonDialog>

  </CommonDialog>
</template>

<style scoped></style>
