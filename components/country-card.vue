<template>
  <div class="text-white bg-dark-blue max-w-[227px]">
    <img class="h-[150px] object-cover" :src="flag" alt="" />
    <div class="p-4 leading-6">
      <h3 class="text-2xl my-4">{{ countryName }}</h3>
      <p>Population: {{ population }}</p>
      <p>Region: {{ region }}</p>
      <p>Capital: {{ capital ? capital[0] : 'nothing here' }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  flag: String,
  countryName: String,
  population: Number,
  region: String,
  capital: Array,
})
</script>