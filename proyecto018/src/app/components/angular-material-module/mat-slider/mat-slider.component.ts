import { Component } from '@angular/core';

@Component({
  selector: 'app-mat-slider',
  standalone: false,
  templateUrl: './mat-slider.component.html',
  styleUrl: './mat-slider.component.css'
})
export class MatSliderComponent {
  slider1 = 0;
  slider2 = 0;
  slider3 = 0;
  suma = 0;

  cambiar() {
    this.suma = this.slider1 + this.slider2 + this.slider3;
  }

  gridsize: number = 30;
  updateSetting(event: { value: number; }) {
    this.gridsize = event.value;
  }
}
