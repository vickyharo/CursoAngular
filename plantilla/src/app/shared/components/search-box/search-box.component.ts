import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'search-box',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './search-box.component.html'
})
export class SearchBoxComponent implements OnInit {
  //Banderas de visualziacion
  @Input() alternativa: boolean = true;
  @Input() label: string = 'Fideicomiso';
  @Input() showFilter1: boolean = false;
  @Input() showFilter2: boolean = false;
  @Input() placeholder: string = 'Buscar...';
  @Output() search = new EventEmitter<string>();

  searchControl = new FormControl('');

  ngOnInit(): void {
    if (!this.alternativa) {
      this.searchControl.valueChanges.subscribe(value => {
        this.search.emit(value?.trim() ?? '');
      });
    }
  }


  onSearch(): void {
    const value = this.searchControl.value?.trim();
    if (value) {
      this.search.emit(value?.trim());
    }
  }

  clearSearch(): void {
  this.searchControl.setValue('');
  this.search.emit('');
}
}
