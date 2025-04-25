import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ValidacionesPropiasFormulario } from '../../../shared/validations/validaciones-propias-formulario';

@Component({
  selector: 'app-validaciones-personalizadas',
  standalone: false,
  templateUrl: './validaciones-personalizadas.component.html',
  styleUrl: './validaciones-personalizadas.component.css'
})
export class ValidacionesPersonalizadasComponent {
  formularioContacto = new FormGroup({
    numero: new FormControl('', [ValidacionesPropiasFormulario.multiplo5])
  });

  submit() {
    alert('dato correcto');
  }
}
