<template>
  <div>
    <div class="h-[70px] bg-dark-blue text-white flex items-center px-16">
      <h1>Where in the world?</h1>
      <div class="ml-auto">Dark Mode</div>
    </div>

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
import axios from 'axios';
import { useCountriesStore } from '../stores';
import { Countries, Country } from '../entities/countries';

const countriesStore = useCountriesStore();

if (!countriesStore.getCountryDataExists) {
  countriesStore.setCountryDataExists();
  const countriesRawData = await axios.get('https://restcountries.com/v3.1/all');
  const countries = Countries.createCountries(countriesRawData.data);

  countriesStore.setCountriesData(countries.countries);
  countriesStore.setCcaToName(countries.ccaToName);
}

const countriesData = Object.values(countriesStore.getCountries) as Country[];

</script>
