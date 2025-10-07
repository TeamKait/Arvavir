<script setup lang="ts">
import {useRoute, useRouter} from 'vue-router';
import {Tabs, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {computed, ref} from "vue";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {Checkbox} from "@/components/ui/checkbox";

const router = useRouter();
const props = defineProps({
  login: Boolean
})

const label = computed(() => props.login ? 'Войти' : 'Регистрация')
</script>

<template>
  <div class="flex flex-col gap-1">
    <Tabs>
      <TabsList class="w-full">
        <TabsTrigger value="Войти" as-child>
          <RouterLink to="/login">
            Войти
          </RouterLink>
        </TabsTrigger>

        <TabsTrigger value="Регистрация" as-child>
          <RouterLink to="/register">
            Регистрация
          </RouterLink>
        </TabsTrigger>
      </TabsList>
    </Tabs>

    <Card>
      <CardHeader>
        <CardTitle class="text-2xl">{{ label }}</CardTitle>
      </CardHeader>

      <CardContent class="flex flex-col justify-between h-80 w-100">
        <div class="flex flex-col gap-2">
          <div>
            <Label for="login">Логин</Label>
            <Input id="login" placeholder="Логин"/>
          </div>

          <div>
            <Label for="password">Пароль</Label>
            <Input id="password" placeholder="Пароль"/>
          </div>

          <div v-if="!login">
            <Label for="password-repeat">Повтор пароля</Label>
            <Input id="password-repeat" placeholder="Повтор пароля"/>
          </div>
        </div>

        <div class="flex flex-col gap-2">
          <div v-if="!login" class="flex items-center gap-2">
            <Checkbox id="remember-me-cb"/>
            <Label for="remember-me-cb" class="select-none">Запомнить меня</Label>
          </div>
          <Button class="w-full">{{ label }}</Button>
        </div>
      </CardContent>
    </Card>
  </div>
</template>