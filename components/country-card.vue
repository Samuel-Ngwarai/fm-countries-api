<template>
  <div class="text-white bg-dark-blue">
    <NuxtLink :to="`countries/${countryName}`" class="grid grid-rows-countryCard">
      <div class="bg-no-repeat bg-contain" :style="countryFlag"></div>
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
</script>
