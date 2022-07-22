<template>
  <div>

    <div class="bg-very-dark-blue-dm">
      <div class="text-white flex items-center px-16 py-6">
        <div>Search bar</div>
        <div class="ml-auto">Filter</div>
      </div>
      <div class="grid grid-cols-4 gap-24 px-16">
          <country-card v-for="country in countriesData" :key="country.commonName" :flag="country.flag" :country-name="country.commonName" :population="country.population" :region="country.region" :capital="country.capital"></country-card>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCountriesStore } from '../stores';
import { Country } from "../entities/countries";

const countriesStore = useCountriesStore();

if (!countriesStore.getCountryDataExists) {
  await countriesStore.setCountriesData();
}

const countriesData = Object.values(countriesStore.getCountries) as Country[];

</script>
