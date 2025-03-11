import { Component, inject, linkedSignal, signal } from '@angular/core';
import { ListComponent } from '../../components/list/list.component';
import type { Region } from '../../interfaces/country.interfaces';
import { rxResource } from '@angular/core/rxjs-interop';
import { CountryService } from '../../services/country.service';
import { of } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-by-region-page',
  imports: [ListComponent],
  templateUrl: './by-region-page.component.html',
})
export class ByRegionPageComponent {
  countryService = inject(CountryService);
  activateRoute = inject(ActivatedRoute);
  router = inject(Router);

  public regions: Region[] = [
    'Africa',
    'Americas',
    'Asia',
    'Europe',
    'Oceania',
    'Antarctic',
  ];

  queryParams = this.activateRoute.snapshot.queryParamMap.get('query') ?? '';
  currentRegion = linkedSignal<Region | null>(
    () =>
      this.regions.find((region) => region == this.queryParams) ?? 'Americas'
  );

  regionResource = rxResource({
    request: () => ({
      region: this.currentRegion(),
    }),
    loader: ({ request }) => {
      if (request.region == null) return of([]);

      this.router.navigate(['/country/by-region'], {
        queryParams: { query: request.region },
      });

      return this.countryService.searchByRegion(request.region);
    },
  });
}
