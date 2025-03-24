import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-form-group',
  standalone: false,
  templateUrl: './form-group.component.html',
  styleUrl: './form-group.component.css'
})
export class FormGroupComponent {
  datos!: string;

  formularioContacto = new FormGroup({
    nombre: new FormControl(''),
    mail: new FormControl(''),
    mensaje: new FormControl('')
  });

  submit() {
    this.datos = `Nombre=${this.formularioContacto.value.nombre}
                Mail=${this.formularioContacto.value.mail}
                Mensaje=${this.formularioContacto.value.mensaje}
                `;
  }
}
