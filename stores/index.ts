import { defineStore } from "pinia";
import axios from "axios";
import { Countries } from "../entities/countries";

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
    async setCountriesData() {
      if (!this.countryDataExists) {
        this.countryDataExists = true;
        const countriesRawData = await axios.get('https://restcountries.com/v3.1/all');
        const countries = Countries.createCountries(countriesRawData.data);
        
        this.countries = countries.countries;
        this.ccaToName = countries.ccaToName;
      }
    },
  },
  getters: {
    getCountries: (state) => state.countries,
    getCcaToName: (state) => state.ccaToName,
    getCountryDataExists: (state) => state.countryDataExists,
  },
});
