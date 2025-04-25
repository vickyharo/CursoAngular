import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-form-group-anidados',
  standalone: false,
  templateUrl: './form-group-anidados.component.html',
  styleUrl: './form-group-anidados.component.css',
})
export class FormGroupAnidadosComponent {
  resultado!: string;

  formAlumno = new FormGroup({
    dni: new FormControl(''),
    nombre: new FormControl(''),
    notas: new FormGroup({
      nota1: new FormControl(''),
      nota2: new FormControl(''),
      nota3: new FormControl(''),
    }),
  });

  submit() {

    let nota1: number = 0;
    let nota2: number = 0;
    let nota3: number = 0;

    let notas = this.formAlumno.value.notas;

    if (notas == null && notas == undefined) return;

    if (notas.nota1 !== null && notas.nota1 !== undefined)
      nota1 = parseInt(notas.nota1);

    if (notas.nota2 !== null && notas.nota2 !== undefined)
      nota2 = parseInt(notas.nota2);

    if (notas.nota3 !== null && notas.nota3 !== undefined)
      nota3 = parseInt(notas.nota3);

    if (nota1 >= 4 && nota2 >= 4 && nota3 >= 4)
      this.resultado = 'El alumno queda aprobado por esas notas';
    else this.resultado = 'El alumno no aprueba por esas notas';
  }
}
