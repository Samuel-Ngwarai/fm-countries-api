<template>
    <button class=" px-10 py-2" :class="buttonColors">
        <slot /> 
    </button>
</template>

<script setup lang="ts">
import { useCountriesStore } from "../stores";

const countriesStore = useCountriesStore();

const darkMode = computed(() => {
  return countriesStore.getDarkMode;
});

const buttonColors = computed(() => ({
  'bg-dark-blue text-white': darkMode.value,
  'bg-white text-very-dark-blue-lm shadow-md': !darkMode.value,
}));
</script>