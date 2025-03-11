import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';

import type { RESTCountry } from '../interfaces/res-countries.interface';
import { CountryMapper } from '../mappers/country.mapper';
import { catchError, delay, map, Observable, of, tap, throwError } from 'rxjs';
import { Country, Region } from '../interfaces/country.interfaces';

const API_URL = 'https://restcountries.com/v3.1';

@Injectable({
  providedIn: 'root',
})
export class CountryService {
  private http = inject(HttpClient);

  private queryCacheCapital = new Map<string, Country[]>();
  private queryCacheCountry = new Map<string, Country[]>();
  private queryCacheRegion = new Map<Region, Country[]>();

  searchByCapital(query: string): Observable<Country[]> {
    const lowerQuery = this.lowerQuery(query);

    if (this.queryCacheCapital.has(query)) {
      return of(this.queryCacheCapital.get(query) ?? []);
    }

    return this.http
      .get<RESTCountry[]>(`${API_URL}/capital/${lowerQuery}`)
      .pipe(
        map((data) => CountryMapper.mapperRESTCountryArray(data)),
        tap((countries) => this.queryCacheCapital.set(query, countries)),
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

    if (this.queryCacheCountry.has(query)) {
      return of(this.queryCacheCountry.get(query) ?? []);
    }

    return this.http.get<RESTCountry[]>(`${API_URL}/name/${lowerQuery}`).pipe(
      delay(500),
      map((data) => CountryMapper.mapperRESTCountryArray(data)),
      tap((countries) => this.queryCacheCountry.set(query, countries)),
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

  searchByRegion(region: Region) {
    const url = `${API_URL}/region/${region}`;

    if (this.queryCacheRegion.has(region)) {
      return of(this.queryCacheRegion.get(region));
    }

    return this.http.get<RESTCountry[]>(url).pipe(
      map((data) => CountryMapper.mapperRESTCountryArray(data)),
      tap((countries) => this.queryCacheRegion.set(region, countries)),
      catchError((error) => {
        return throwError(
          () => new Error(`Not Found Country with the name: ${region}`)
        );
      })
    );
  }
}
