<script setup lang="ts">
import {useRouter} from "vue-router";
import SafeIcon from "@/components/customUI/SafeIcon.vue";

const routes = useRouter().options.routes;
</script>

<template>
  <div class="flex flex-col items-start p-5 w-full gap-2 border-t-2 bg-secondary/10 text-muted-foreground/50 group">
    <RouterLink to="/about" class="hover:text-foreground transition-colors">О проекте</RouterLink>

    <a class="flex-center gap-2 transition-colors hover:text-foreground" href="https://github.com/TeamKait/Arvavir" target="_blank">
      <SafeIcon icon="radix-icons:github-logo"/>
      Репозиторий проекта
    </a>
  </div>
</template>