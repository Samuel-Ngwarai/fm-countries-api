export type Country = {
  commonName: string;
  officialName: string;
  nativeName: string;
  population: number;
  region: string;
  subRegion: string;
  capital: string[];
  topLevelDomain: string[];
  currencies: string[];
  languages: string[];
  borderCountries: string[];
  flag: string;
}

export class Countries {
  public countries: { [key: string]: Country } = {};
  public ccaToName: { [key: string]: string } = {};

  constructor() {}

  public static createCountries(data: any[]) {
    const newCountries = new Countries();

    data.forEach((rawCountryData) => {
      let country: Country = {} as Country;
      const commonName = rawCountryData.name.common;
      country.commonName = commonName;
      newCountries.ccaToName[rawCountryData.cca3] = commonName;

      country.officialName = rawCountryData.name.official;
      country.nativeName = newCountries.getNativeName(
        rawCountryData.name.nativeName
      );
      country.population = rawCountryData.population;

      country.region = rawCountryData.region;
      country.subRegion = rawCountryData.subRegion;
      country.capital = rawCountryData.capital;
      country.topLevelDomain = rawCountryData.tld;

      country.currencies = Object.keys(rawCountryData?.currencies || {});
      country.languages = Object.values(
        rawCountryData.languages || {}
      ) as string[];
      country.borderCountries = rawCountryData.borders;

      country.flag = rawCountryData.flags.svg;

      newCountries.countries[commonName] = country;
    });

    return newCountries;
  }

  getNativeName(nativeNames: any) {
    if (!nativeNames) return "";

    let officialName: string;
    Object.keys(nativeNames).every((key: any) => {
      officialName = nativeNames[key].official;
      if (key !== "eng") return;
    });

    return officialName;
  }
}
