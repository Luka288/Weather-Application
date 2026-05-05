import { Component, inject, output } from '@angular/core';
import { StateService } from '../../../core/services/state.service';
import { NgxCubeLoaderComponent } from 'ngx-cube-loader';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslocoPipe } from '@jsverse/transloco';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [
    NgxCubeLoaderComponent,
    ReactiveFormsModule,
    FormsModule,
    TranslocoPipe,
  ],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
})
export class SearchComponent {
  readonly stateService = inject(StateService);

  searchValue = output<string>();

  locationSearch = new FormControl('', { nonNullable: true });

  submitUserSearch(event: Event) {
    event.preventDefault();

    const val = this.locationSearch.value;

    this.searchValue.emit(val);
  }
}
