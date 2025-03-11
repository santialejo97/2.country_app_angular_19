import {
  Component,
  effect,
  input,
  linkedSignal,
  output,
  signal,
} from '@angular/core';

@Component({
  selector: 'country-search-input',
  imports: [],
  templateUrl: './search-input.component.html',
})
export class SearchInputComponent {
  search = output<string>();
  placeholder = input.required<string>();
  inicialValue = input<string>('');
  inputValue = linkedSignal<string>(() => this.inicialValue() ?? '');

  debounceEffect = effect((onCleanup) => {
    const value = this.inputValue();
    const timeout = setTimeout(() => {
      this.search.emit(value);
    }, 1000);
    onCleanup(() => {
      clearTimeout(timeout);
    });
  });

  onSearchCapital(value: string) {
    this.search.emit(value);
  }
}
