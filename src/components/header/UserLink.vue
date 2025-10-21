<script setup lang="ts">
import {ref} from 'vue'
import {Icon} from "@iconify/vue"
import {Avatar, AvatarFallback} from "@/components/ui/avatar"
import {getAuth, onAuthStateChanged, type User} from "firebase/auth"
import IconButton from "@/components/customUI/buttons/IconButton.vue";
import {DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem} from "@/components/ui/dropdown-menu";
import {logOut} from "@/ts/firebase/users/user.controller.ts";

const auth = getAuth()
const user = ref<User | null>(null)
const loading = ref(true)

onAuthStateChanged(auth, (u) => {
  user.value = u
  loading.value = false
})
</script>


<template>
  <RouterLink to="/login" class="flex items-center px-10 gap-3 hover:underline border-l h-full">
    <Avatar class="size-15">
      <AvatarFallback class="text-3xl">
        <Icon icon="radix-icons:person"/>
      </AvatarFallback>
    </Avatar>
    <!-- TODO: burger menu for log out etc -->
    <p class="text-2xl">{{ user?.email?.split('@')[0] ?? 'Войти' }}</p>

    <DropdownMenu v-if="auth.currentUser">
      <DropdownMenuTrigger as-child>
        <IconButton
            icon="radix-icons:dots-vertical"
            size="icon"
            variant="outline"
            class="flex-center rounded-full"/>
      </DropdownMenuTrigger>

      <DropdownMenuContent>
        <!-- account settings -->
        <DropdownMenuItem @click="logOut">
          <Icon icon="radix-icons:gear"/>
          <p>Настройки</p>
        </DropdownMenuItem>

        <!-- log out-->
        <DropdownMenuItem @click="logOut">
          <Icon icon="radix-icons:exit"/>
          <p>Выйти</p>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  </RouterLink>
</template>