<template>
  <div>
    <div class="bg-very-dark-blue-dm px-16">
      <div class="text-white sm:flex items-center py-6">
        <div class="bg-dark-blue flex items-center rounded-md">
          <input
            v-model="searchInput"
            class="appearance-none bg-dark-blue h-14 w-[300px] block p-4 pl-10 text-sm text-white border border-very-dark-blue-dm focus:ring-blue-500 focus:border-blue-500 outline-none"
            type="search"
            placeholder="Search for a country..."
          />
        </div>
        <div class="ml-auto">
          <select class="appearance-none bg-dark-blue px-6 py-4 focus:bg-dark-blue" v-model="selectedRegion">
            <option disabled value="">Filter by Region</option>
            <option v-for="region in regions">{{ region }}</option>
          </select>
        </div>
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-24">
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
