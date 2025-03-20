import { observable } from './../../../../node_modules/rxjs/src/internal/symbol/observable';
import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {FormControl} from '@angular/forms';
import {BehaviorSubject, Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {MatAutocompleteTrigger} from '@angular/material/autocomplete';

export interface User {
  name: string;
}

@Component({
  selector: 'app-mat-autocomplete',
  standalone: false,
  templateUrl: './mat-autocomplete.component.html',
  styleUrl: './mat-autocomplete.component.css'
})
export class MatAutocompleteComponent implements OnInit {
  @ViewChild('inputAutoComplete') inputAutoComplete: any;

  arrowIconSubject = new BehaviorSubject('arrow_drop_down');
  myControl = new FormControl();
  options: User[] = [{name: 'Mary'}, {name: 'Shelley'}, {name: 'Igor'}];
  filteredOptions: Observable<User[]> = new Observable<User[]>;


  constructor() {
  }

  ngOnInit() {
    this.filteredOptions=this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => typeof value === 'string' ? value : value?.name),
        map(name => (name ? this.options.filter(option => option.name.toLowerCase().indexOf(name.toLowerCase()) === 0) : this.options.slice()))
      );
  }

  clearInput(evt: any): void {
    evt.stopPropagation();
    this.myControl?.reset();
    this.inputAutoComplete?.nativeElement.focus();
  }


  openOrClosePanel(evt: any, trigger: MatAutocompleteTrigger): void {
    evt.stopPropagation();
    if(trigger.panelOpen)
      trigger.closePanel();
    else
      trigger.openPanel();
  }

  displayFn(user: User): string {
    return user && user?.name ? user.name : '';
  }

}
