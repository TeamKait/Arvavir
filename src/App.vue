<script setup lang="ts">
import Header from "@/components/header/Header.vue";
import CommonDialog from "@/components/CommonDialog.vue";
import {Toaster} from '@/components/ui/sonner'
import 'vue-sonner/style.css'
</script>

<template>
  <Header/>
  <div class="flex-center mt-5">
    <RouterView/>
  </div>

  <!-- диалог на весь экран -->
  <CommonDialog/>

  <!-- уведомления -->
  <Toaster theme="system" :close-button="true" :rich-colors="true" :toast-options="{
    class: '!text-xl flex items-center'
  }"/>
</template>