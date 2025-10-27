<script setup lang="ts">
import Author from "@/views/AboutView/Author.vue";
import {ref} from "vue";
import SafeIcon from "@/components/customUI/SafeIcon.vue";

const selected = ref([false, false, false])
</script>

<template>
  <div class="flex flex-col items-start gap-30 mt-20">
    <div class="flex-center flex-col">
      <h1 class="text-[100px] font-bold select-none">
      <span
          v-for="(text, i) in ['AR', 'VA', 'VIR']"
          :class="{'text-primary':selected[i]}"
          @mouseenter="selected[i] = true"
          @mouseleave="selected[i] = false">
        {{ text }}
      </span>
      </h1>
      <div class="flex gap-20">
        <Author
            v-model="selected[0]"
            name="Артём Лющенко"
            :highlighted-indices="[0, 1]"
            description="Разработка сайта"
            :highlighted="true"/>
        <Author
            v-model="selected[1]"
            name="Валерий Сергеев"
            :highlighted-indices="[0, 1]"
            description="Напишите про себя че нить"
            :highlighted="true"/>
        <Author
            v-model="selected[2]"
            name="Виктор Буянкин"
            :highlighted-indices="[0, 1, 5]"
            description="Напишите про себя че нить"
            :highlighted="true"/>
      </div>
    </div>

    <a class="flex-center gap-2 text-2xl hover:underline" href="https://github.com/TeamKait/Arvavir" target="_blank">
      <SafeIcon icon="radix-icons:github-logo"/>
      Репозиторий проекта
    </a>
  </div>
</template>