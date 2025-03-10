import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

import type { RESTCountry } from '../interfaces/res-countries.interface';
import { CountryMapper } from '../mappers/country.mapper';
import { catchError, delay, map, Observable, retry, throwError } from 'rxjs';
import { Country } from '../interfaces/country.interfaces';

const API_URL = 'https://restcountries.com/v3.1';

@Injectable({
  providedIn: 'root',
})
export class CountryService {
  private http = inject(HttpClient);

  searchByCapital(query: string): Observable<Country[]> {
    const lowerQuery = this.lowerQuery(query);
    return this.http
      .get<RESTCountry[]>(`${API_URL}/capital/${lowerQuery}`)
      .pipe(
        map((data) => CountryMapper.mapperRESTCountryArray(data)),
        catchError((error) => {
          console.log(error);
          return throwError(
            () =>
              new Error(`Not Found Country with the name of capital: ${query}`)
          );
        })
      );
  }

  searchByCountry(query: string): Observable<Country[]> {
    const lowerQuery = this.lowerQuery(query);
    return this.http.get<RESTCountry[]>(`${API_URL}/name/${lowerQuery}`).pipe(
      delay(2000),
      map((data) => CountryMapper.mapperRESTCountryArray(data)),
      catchError((error) => {
        console.log(error);
        return throwError(
          () => new Error(`Not Found Country with the name: ${query}`)
        );
      })
    );
  }

  searchCountryByAlphaCode(code: string) {
    const lowerQuery = this.lowerQuery(code);
    return this.http.get<RESTCountry[]>(`${API_URL}/alpha/${lowerQuery}`).pipe(
      map((data) => CountryMapper.mapperRESTCountryArray(data)),
      map((countries) => countries.at(0)),
      catchError((error) => {
        console.log(error);
        return throwError(
          () => new Error(`Not Found Country with the name: ${code}`)
        );
      })
    );
  }

  lowerQuery(query: string) {
    return query.toLowerCase();
  }
}
