import { Component, inject, resource } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { CountryService } from '../../services/country.service';
import { NotFoundComponent } from '../../../shared/components/not-found/not-found.component';
import { CountryInfoComponent } from './components/country-info/country-info.component';

@Component({
  selector: 'app-country-page',
  imports: [NotFoundComponent, CountryInfoComponent],
  templateUrl: './country-page.component.html',
})
export class CountryPageComponent {
  countryCode = inject(ActivatedRoute).snapshot.params['code'];
  countryService = inject(CountryService);

  countryResource = rxResource({
    request: () => ({
      code: this.countryCode,
    }),
    loader: ({ request }) =>
      this.countryService.searchCountryByAlphaCode(request.code),
  });
}
