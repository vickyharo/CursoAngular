import { Component } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-form-builder',
  standalone: false,
  templateUrl: './form-builder.component.html',
  styleUrl: './form-builder.component.css'
})
export class FormBuilderComponent {
  resultado!: string;
  formularioContacto!: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.formularioContacto = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(10)]],
      mail: ['', [Validators.required, Validators.email]],
      mensaje: ['', [Validators.required, Validators.maxLength(500)]]
    });
  }

  submit() {
    if (this.formularioContacto.valid)
      this.resultado = "Todos los datos son válidos";
    else
      this.resultado = "Hay datos inválidos en el formulario";
  }
}
