<template>
  <div :class="cardColors">
    <NuxtLink :to="`countries/${countryName}`" class="grid grid-rows-countryCard rounded-lg">
      <div class="bg-no-repeat bg-cover rounded-t-lg" :style="countryFlag"></div>
      <div class="px-4 pb-4 leading-6 text-[14px]">
        <h2 class="text-2xl my-4 font-semibold">{{ countryName }}</h2>
        <p>Population: {{ population }}</p>
        <p>Region: {{ region }}</p>
        <p>Capital: {{ capital ? capital[0] : "--" }}</p>
      </div>
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
import { useCountriesStore } from "../stores";

const props = defineProps({
  flag: String,
  countryName: String,
  population: Number,
  region: String,
  capital: Array,
});

const countryFlag = computed(() => {
  return {
    "background-image": `url(${props.flag})`,
  };
});

const countriesStore = useCountriesStore();

const darkMode = computed(() => {
  return countriesStore.getDarkMode;
});

const cardColors = computed(() => ({
  'bg-dark-blue text-white shadow-md': darkMode.value,
  'bg-white text-very-dark-blue-lm shadow-md': !darkMode.value,
}));

</script>
