import { defineStore } from "pinia";

export const useCountriesStore = defineStore({
  id: "countries-store",
  state: () => {
    return {
      countries: {},
      ccaToName: {},
      countryDataExists: false,
    };
  },
  actions: {
    setCountryDataExists() {
      this.countryDataExists = true;
    },
    setCountriesData(newData) {
      this.countries = newData;
    },
    setCcaToName(newData) {
      this.ccaToName = newData;
    },
  },
  getters: {
    getCountries: (state) => state.countries,
    getCcaToName: (state) => state.ccaToName,
    getCountryDataExists: (state) => state.countryDataExists,
  },
});
