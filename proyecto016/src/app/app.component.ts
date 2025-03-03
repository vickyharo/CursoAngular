import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'proyecto016';

  //-> Parametros de metodos
  mayor(valor1: number, valor2: number): number {
    if (valor1 > valor2)
      return valor1;
    else
      return valor2;
  }

  mostrarMensaje(mensaje: string): void {
    alert(mensaje);
  }

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
    enum Operacion { Suma, Resta, Multiplicacion, Division };

    let actual: Operacion = Operacion.Multiplicacion;

    switch (+actual) {
      case Operacion.Suma: {
        console.log('Operación actual: Suma ');
        break;
      }
      case Operacion.Resta: {
        console.log('Operación actual: Resta ');
        break;
      }
      case Operacion.Multiplicacion: {
        console.log('Operación actual: Multiplicacion ');
        break;
      }
      case Operacion.Division: {
        console.log('Operación actual: Division ');
        break;
      }
    }

    //--> Any
    let dato: any;
    dato = 10;
    console.log(dato);
    dato = 'Hola';
    console.log(dato);
    dato = true;
    console.log(dato);
    dato = [1, 2, 3];
    console.log(dato);

    //-> Parametros de metodos
    this.mayor(8, 10);
    this.mostrarMensaje('Hola mundo');

    //->Variable de tipo unión
    let edad2: number | string;
    edad2=34;
    console.log(edad2);
    edad2='20 años';
    console.log(edad2);

  }//->Init
}//->Export
