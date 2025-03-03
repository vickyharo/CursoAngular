import { AfterViewInit, Component, viewChild } from '@angular/core';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInput, MatInputModule} from '@angular/material/input';
import {MatAutocompleteModule} from '@angular/material/autocomplete';

@Component({
  selector: 'app-autocomplete',
  templateUrl: './autocomplete.component.html',
  imports: [
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
  ],
})
export class AutocompleteComponent implements AfterViewInit {
  myControl = new FormControl('');
  options: string[] = ['hello', 'hello world'];

  readonly input = viewChild.required(MatInput);

  ngAfterViewInit() {
    this.input().focus();
  }
}
