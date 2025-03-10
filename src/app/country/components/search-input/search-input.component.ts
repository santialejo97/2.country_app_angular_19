import { Component, input, output } from '@angular/core';

@Component({
  selector: 'country-search-input',
  imports: [],
  templateUrl: './search-input.component.html',
})
export class SearchInputComponent {
  search = output<string>();
  placeholder = input.required<string>();

  onSearchCapital(value: string) {
    this.search.emit(value);
  }
}
