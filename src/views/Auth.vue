<script setup lang="ts">
import {Tabs, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {computed, ref} from "vue";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {Checkbox} from "@/components/ui/checkbox";
import {createUser} from "@/ts/firebase/users/user.controller.ts";
import {toast} from "vue-sonner";
import {useRouter} from "vue-router";
import {Spinner} from "@/components/ui/spinner";
import {LoadingAction} from "@/ts/TryAction.ts";
import {getAuth, signInWithEmailAndPassword} from "firebase/auth";

const props = defineProps({
  login: Boolean
})

const router = useRouter();

const label = computed(() => props.login ? 'Войти' : 'Регистрация')

const emailInput = ref("");
const passwordInput = ref("");
const repeatPasswordInput = ref("");

const loading = ref(false);

const auth = getAuth();
async function HandleButton(){
  //login
  if(props.login){
    await Login()
  }
  //register
  else{
    if(passwordInput.value !=  repeatPasswordInput.value){
      toast.error("Пароли не сходятся")
      return
    }

    await LoadingAction(() => createUser(emailInput.value, passwordInput.value), loading)
    await Login()
  }
  await router.push("/")
}

async function Login(){
  await LoadingAction(async () => {
    await signInWithEmailAndPassword(auth, emailInput.value, passwordInput.value)
    toast.success("Добро пожаловать!")
  }, loading)
}
</script>

<template>
  <div class="flex flex-col gap-1">
    <Tabs class="flex-1">
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
            <Label for="login">email</Label>
            <Input v-model="emailInput" id="login" placeholder="email"/>
          </div>

          <div>
            <Label for="password">Пароль</Label>
            <Input v-model="passwordInput" type="password" id="password" placeholder="Пароль"/>
          </div>

          <div v-if="!login">
            <Label for="password-repeat">Повтор пароля</Label>
            <Input v-model="repeatPasswordInput" type="password" id="password-repeat" placeholder="Повтор пароля"/>
          </div>
        </div>

        <div class="flex flex-col gap-2">
          <div v-if="!login" class="flex items-center gap-2">
            <Checkbox id="remember-me-cb"/>
            <Label for="remember-me-cb" class="select-none">Запомнить меня</Label>
          </div>
          <Button @click="HandleButton" class="w-full">
            <div class="flex-center relative">
              {{ label }}
              <Spinner v-if="loading" class="absolute -right-5"/>
            </div>
          </Button>
        </div>
      </CardContent>
    </Card>
  </div>
</template>