import { Component } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  standalone: true,
  selector: 'button-back',
  templateUrl: './button-back.component.html',
})
export class ButtonBackComponent {
  constructor(private location: Location) {}

  volver() {
    this.location.back();
  }
}
