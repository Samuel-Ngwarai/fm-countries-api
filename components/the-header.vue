<template>
  <div
    class="sticky top-0 h-[80px] w-full flex px-8 md:px-16 items-center"
    :class="headerColors"
  >
    <NuxtLink to="/">
      <h1 class="text-2xl font-semibold">Where in the world?</h1>
    </NuxtLink>

    <div class="ml-auto">
      <font-awesome-icon class="pr-2" :class="{ 'text-very-dark-blue-lm': !darkMode }" :icon="moonIcon" />
      <button @click="countriesStore.toggleDarkMode">Dark Mode</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCountriesStore } from "../stores";

const countriesStore = useCountriesStore();

const darkMode = computed(() => {
  return countriesStore.getDarkMode;
});

const headerColors = computed(() => ({
  "bg-dark-blue text-white": darkMode.value,
  "bg-white text-very-dark-blue-lm shadow-md": !darkMode.value,
}));

const moonIcon = computed(() => 
  darkMode.value ? ['fas', 'moon'] : ['far', 'moon']
);

</script>
