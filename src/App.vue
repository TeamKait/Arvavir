<script setup lang="ts">
import Header from "@/components/header/Header.vue";
import Main from "@/components/Main.vue";
import CommonDialog from "@/components/CommonDialog.vue";
import {Toaster} from '@/components/ui/sonner'
import 'vue-sonner/style.css'
</script>

<template>
  <Header/>
  <Main class="m-3"/>

  <!-- диалог на весь экран -->
  <CommonDialog/>

  <!-- уведомления -->
  <Toaster theme="system" :close-button="true" :toast-options="{
    class: '!text-xl flex items-center'
  }"/>
</template>