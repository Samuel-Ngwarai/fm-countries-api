<template>
  <div class="min-h-screen" :class="backgroundColors">
    <the-header></the-header>
    <slot />
  </div>
</template>

<style>
html {
  font-family: "Nunito Sans", sans-serif;
}
</style>

<script setup lang="ts">
import { useCountriesStore } from "../stores";

const countriesStore = useCountriesStore();

const darkMode = computed(() => {
  return countriesStore.getDarkMode;
});

const backgroundColors = computed(() => ({
  'bg-very-dark-blue-dm': darkMode.value,
  'bg-very-light-gray': !darkMode.value,
}));
</script>