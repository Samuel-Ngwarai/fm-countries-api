<template>
  <div class="text-white px-16">
    <div class="h-36 flex items-center">
      <basic-button @click="router.back()">BackIcon Back</basic-button>
    </div>

    <div class="grid grid-cols-2 gap-10 h-[500px]">
      <div
        class="h-full bg-no-repeat bg-contain bg-center"
        :style="countryFlag"
      ></div>
      <div class="p-10">
        <h1 class="text-3xl font-bold pb-6">{{ countryData.commonName }}</h1>
        <div class="grid grid-cols-2 gap-10 pb-16 text-[16px]">
          <div>
            <p class="font-thin">
              <span class="font-semibold ">Native Name:</span>
              {{ countryData.nativeName }}
            </p>
            <p>
              <span class="font-semibold">Population:</span>
              {{ countryData.population }}
            </p>
            <p>
              <span class="font-semibold">Region:</span>
              {{ countryData.region }}
            </p>
            <p>
              <span class="font-semibold">Sub Region:</span>
              {{ countryData.subRegion }}
            </p>
            <p>
              <span class="font-semibold">Capital:</span>
              {{ countryData.capital.join(", ") }}
            </p>
          </div>
          <div>
            <p>
              <span class="font-semibold">Top Level Domian:</span>
              {{ countryData.topLevelDomain.join(", ") }}
            </p>
            <p>
              <span class="font-semibold">Currencies:</span>
              {{ countryData.currencies.join(", ") }}
            </p>
            <p>
              <span class="font-semibold">Languages:</span>
              {{ countryData.languages.join(", ") }}
            </p>
          </div>
        </div>
        <div>
          <strong>Border Countries:</strong>
          <span v-for="country in countryData.borderCountries" :key="country"
            >&ensp;
            <NuxtLink :to="`${getCommonName(country)}`"
              ><basic-button class="px-3 my-1.5">{{
                getCommonName(country)
              }}</basic-button></NuxtLink
            >
            &ensp;</span
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCountriesStore } from "../../stores";
import { Country } from "../../entities/countries";

const countriesStore = useCountriesStore();
// a computed ref
const countryFlag = computed(() => {
  return {
    'background-image': `url(${countryData.flag})`,
  }
})

if (!countriesStore.getCountryDataExists) {
  await countriesStore.setCountriesData();
}

const route = useRoute();
const router = useRouter();

const getCommonName = (code) => {
  return countriesStore.ccaToName[code];
};

const countryData: Country =
  reactive(countriesStore.getCountries[(route.params.countryId as string).toLowerCase()]) || {};

</script>
