<template>
  <div>
    <div class="px-8 md:px-16">
      <div class="grid grid-rows-2 gap-12 md:flex md:items-center py-12">
        <div class="flex items-center rounded-md">
          <input
            v-model="searchInput"
            class="appearance-none h-14 w-full md:w-[300px] block p-4 pl-10 text-sm border shadow-md focus:ring-blue-500 focus:border-blue-500 outline-none"
            :class="inputColors"
            type="search"
            placeholder="Search for a country..."
          />
        </div>
        <div class="ml-auto shadow-md">
          <select class="appearance-none px-6 py-4" :class="filterColors" v-model="selectedRegion">
            <option disabled value="">Filter by Region</option>
            <option v-for="region in regions">{{ region }}</option>
          </select>
        </div>
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-24">
        <country-card
          v-for="country in countriesData"
          :key="country.commonName"
          :flag="country.flag"
          :country-name="country.commonName"
          :population="country.population"
          :region="country.region"
          :capital="country.capital"
        ></country-card>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCountriesStore } from "../stores";
import { Country } from "../entities/countries";

const countriesStore = useCountriesStore();

const darkMode = computed(() => {
  return countriesStore.getDarkMode;
});

const inputColors = computed(() => ({
  'bg-dark-blue text-white': darkMode.value,
  'bg-white text-dark-gray': !darkMode.value,
}));

const filterColors = computed(() => ({
  'bg-dark-blue text-white focus:bg-dark-blue': darkMode.value,
  'bg-white text-very-dark-blue-lm': !darkMode.value,
}));


if (!countriesStore.getCountryDataExists) {
  await countriesStore.setCountriesData();
}

const searchInput = ref("");
const selectedRegion = ref("");

const rawCountriesData = Object.values(
  countriesStore.getCountries
) as Country[];

const regions = countriesStore.getRegions.sort();

const countriesData = computed(() => {
  let countryData = rawCountriesData;

  if (selectedRegion.value) {
    countryData = countryData.filter((country) => 
      country.region
        .startsWith(selectedRegion.value)
    );
  }

  if (searchInput.value) {
    countryData = countryData.filter((country) =>
      country.commonName
        .toLowerCase()
        .includes(searchInput.value.toLowerCase())
    );
  }

  // sort countries array by country commonName
  return countryData.sort((a,b) => (a.commonName > b.commonName) ? 1 : ((b.commonName > a.commonName) ? -1 : 0))
});
</script>
