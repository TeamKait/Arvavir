<script setup lang="ts">
import RouteButton from "@/components/customUI/buttons/RouteButton.vue";
import UserLink from "@/components/header/UserLink.vue";
import ThemeSelector from "@/components/header/ThemeSelector.vue";

const otherRoutes = ['/settings', '/about', '/admin'];
</script>

<template>
  <div class="w-full h-25 flex items-center justify-between border-b">
    <!-- home route -->
    <RouteButton to="/" class="text-6xl font-semibold border-r h-full flex-center px-10"/>

    <!-- other routes -->
    <!-- TODO: remake some router links to simple functions on main page -->
    <div class="flex-center w-full !justify-evenly text-3xl h-full">
      <RouteButton v-for="(route, i) in otherRoutes"
                   :to="route"
                   :key="route"
                   class="size-full flex-center uppercase font-thin"
                   :class="{'border-l':i != 0}"/>
    </div>

    <div class="flex-center h-full">
      <!-- Theme selector -->
      <div class="flex-center h-full px-5 border-l">
        <ThemeSelector/>
      </div>

      <!-- user route -->
      <UserLink/>
    </div>
  </div>
</template>