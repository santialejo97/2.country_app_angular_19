import type { Country } from '../interfaces/country.interfaces';
import type { RESTCountry } from '../interfaces/res-countries.interface';

export class CountryMapper {
  static mapperRESTCountry(params: RESTCountry): Country {
    return {
      cca2: params.cca2,
      flag: params.flag,
      flagSvg: params.flags.svg,
      name: params.translations['spa'].common ?? 'No Spanish Name',
      capital: params.capital?.join(','),
      population: params.population,
      region: params.region,
      subRegion: params.subregion,
      independent: params.independent,
    };
  }

  static mapperRESTCountryArray(params: RESTCountry[]): Country[] {
    return params.map(this.mapperRESTCountry);
  }
}
