import { Component } from '@angular/core';

@Component({
  selector: 'app-ngif-ngfor',
  standalone: false,
  templateUrl: './ngif-ngfor.component.html',
  styleUrl: './ngif-ngfor.component.css'
})
export class NgifNgforComponent {
  nombre = 'Rodriguez Pablo';
  edad = 40;
  sueldos = [1700, 1600, 1900];
}
