import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  selector: 'action-buttons',
  imports: [],
  templateUrl: './action-buttons.component.html',
})
export class ActionButtonsComponent {

  //Banderas de visibilidad
  @Input() showCrudButtons = true;
  @Input() showImport = true;
  @Output() newClicked = new EventEmitter<void>();
  @Output() editClicked = new EventEmitter<void>();
  @Output() deleteClicked = new EventEmitter<void>();

  onDelete() {
    this.deleteClicked.emit();
  }

  goToNew() {
    this.newClicked.emit();
  }

  goToEdit() {
    this.editClicked.emit();
  }
}
