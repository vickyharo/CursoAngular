import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'proyecto016';

  ngOnInit() {
    //** Tipos de datos **//

    //-> Number
    let edad: number = 23;
    let altura: number = 1.92;

    console.log('Number');
    console.log(edad);
    console.log(altura);

    //-> String
    let estudios: string = 'primarios';
    console.log('String');
    console.log(estudios);

    //-> Boolean
    let activo: boolean = true;
    console.log('Boolean');
    console.log(activo);

    //--> Arreglos
    let vector: number[] = [1, 4, 2];
    // o tambien
    // let vector: Array<number> = [1, 4, 2];
    vector.push(33);
    console.log('Arreglos');
    for (let elemento of vector) {
      console.log(elemento);
    }

    //--> Enum
    enum Operacion {
      Sumar,
      Resta,
      Multiplicacion,
      Division,
    }

    let actual: Operacion ;//= Operacion.Multiplicacion;

    switch (actual) {
      case Operacion.Multiplicacion: {
        console.log('Operación actual: Multiplicacion ');
        break;
      }
      case Operacion.Sumar: {
        console.log('Operación actual: Suma ');
        break;
      }
      case Operacion.Resta: {
        console.log('Operación actual: Resta ');
        break;
      }
     
      case Operacion.Division: {
        console.log('Operación actual: Division ');
        break;
      }
    }
  }
}
