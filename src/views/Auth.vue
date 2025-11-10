<script setup lang="ts">
import {Tabs, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {computed, ref} from "vue";
import {Button} from "@/components/ui/button";
import {Checkbox} from "@/components/ui/checkbox";
import {createUser} from "@/ts/firebase/users/user.controller.ts";
import {toast} from "vue-sonner";
import {useRouter} from "vue-router";
import {Spinner} from "@/components/ui/spinner";
import {LoadingAction} from "@/ts/TryAction.ts";
import {getAuth, signInWithEmailAndPassword} from "firebase/auth";
import IconButton from "@/components/customUI/buttons/IconButton.vue";
import InputWithCondition from "@/components/customUI/InputWithCondition/InputWithCondition.vue";
import {NotEmpty, ValidEmail} from "@/components/customUI/InputWithCondition/InputConditions.ts";
import { FirebaseError } from "firebase/app";
import {setPersistence, inMemoryPersistence, browserLocalPersistence} from "firebase/auth";
import WithLabel from "@/components/customUI/WithLabel.vue";
import {useAccountData} from "@/stores/AccountData.store.ts";

const props = defineProps({
  login: Boolean
})

const router = useRouter();
const data = useAccountData();

// card label
const label = computed(() => props.login ? 'Войти' : 'Регистрация')

// email
const emailInput = ref("");
const emailInputRef = ref<InstanceType<typeof InputWithCondition> | null>(null);

// password
const passwordInput = ref("");
const passwordInputRef = ref<InstanceType<typeof InputWithCondition> | null>(null);

// repeat password
const repeatPasswordInput = ref("");
const repeatPasswordInputRef = ref<InstanceType<typeof InputWithCondition> | null>(null);

const loading = ref(false);
const passwordVisible = ref(false);
const rememberMe = ref(true);

const auth = getAuth();

async function HandleButton() {
  try {
    loading.value = true
    if (!CheckConditions()) return;

    if (props.login) {
      await Login()
    } else {
      await Register()
    }

    data.loaded = false;
    await router.push("/")
  } catch (err) {
    handleFirebaseError(err);
    data.loaded = true;
  } finally {
    loading.value = false
    passwordInput.value = ""
    repeatPasswordInput.value = ""
  }
}

function CheckConditions(): boolean {
  let valid = true;

  for (const input of [emailInputRef, passwordInputRef, repeatPasswordInputRef]) {
    if (!input) continue;

    valid = (input.value?.CheckCondition() ?? true) && valid;
  }
  return valid;
}

function handleFirebaseError(error: unknown) {
  if (error instanceof FirebaseError) {
    switch (error.code) {
      case "auth/email-already-in-use":
        emailInputRef.value?.ShowError("Почта уже используется");
        break;
      case "auth/invalid-email":
        emailInputRef.value?.ShowError("Некорректный адрес почты");
        break;
      case "auth/weak-password":
        passwordInputRef.value?.ShowError("Слишком простой пароль");
        break;
      case "auth/user-not-found":
        toast.error("Пользователь не найден");
        break;
      case "auth/invalid-credential":
        emailInputRef.value?.ShowError("Неверные данные");
        passwordInputRef.value?.ShowError("Неверные данные");
        break;
      case "auth/wrong-password":
        passwordInputRef.value?.ShowError("Неверный пароль");
        break;
      default:
        toast.error("Произошла неизвестная ошибка");
        console.error(error);
    }
  } else {
    toast.error("Произошла неизвестная ошибка");
    console.error("Не FirebaseError:", error);
  }
}

async function Login() {
  await LoadingAction(async () => {
    await setPersistence(auth, rememberMe.value ? browserLocalPersistence : inMemoryPersistence);

    await signInWithEmailAndPassword(auth, emailInput.value, passwordInput.value)
    toast.success("Добро пожаловать!")
  }, loading)
}

async function Register() {
  await createUser(emailInput.value, passwordInput.value)
}

function GeneratePassword() {
  const letters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$*'
  let password = ''
  for (let i = 0; i < 12; i++) {
    password += letters[Math.floor(Math.random() * letters.length)]
  }

  passwordInput.value = password
  repeatPasswordInput.value = password

  passwordVisible.value = true;
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
          <!-- email input -->
          <WithLabel label="email" position="top">
            <InputWithCondition
                v-model="emailInput"
                ref="emailInputRef"
                placeholder="email"
                :conditions="[
                    {condition: () => NotEmpty(emailInput), error: 'Пустой ввод'},
                    {condition: () => ValidEmail(emailInput), error: 'Неверное значение'}
                ]"/>
          </WithLabel>

          <!-- password input -->
          <WithLabel label="Пароль" position="top">
            <div class="relative">
              <InputWithCondition
                  v-model="passwordInput"
                  :type="passwordVisible ? 'text' : 'password'"
                  :conditions="[
                    {condition: () => NotEmpty(passwordInput), error: 'Пустой ввод'},
                    {condition: () => login || passwordInput.length >= 6, error: 'Слабый пароль'}
                  ]"
                  id="password"
                  placeholder="Пароль"
                  ref="passwordInputRef"/>
              <div class="flex-center absolute right-0 top-0 flex">
                <IconButton v-if="!login" @click="GeneratePassword" icon="lucide:dice-5" variant="ghost" size="icon"
                            class="flex-center"/>
                <IconButton @click="passwordVisible = !passwordVisible"
                            :icon="passwordVisible ? 'radix-icons:eye-open' : 'radix-icons:eye-closed'" variant="ghost"
                            size="icon" class="flex-center"/>
              </div>
            </div>
          </WithLabel>

          <!-- repeat password input -->
          <WithLabel v-if="!login" label="Повтор пароля" position="top">
            <InputWithCondition
                v-model="repeatPasswordInput"
                :type="passwordVisible ? 'text' : 'password'"
                :conditions="[
                    {condition: () => passwordInput === repeatPasswordInput, error: 'Пароли не сходятся'}
                ]"
                id="password-repeat"
                placeholder="Повтор пароля"
                ref="repeatPasswordInputRef"/>
          </WithLabel>
        </div>

        <!-- buttons -->
        <div class="flex flex-col gap-2">
          <div v-if="login" class="flex items-center gap-2">
            <Checkbox v-model="rememberMe" id="remember-me-cb"/>
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