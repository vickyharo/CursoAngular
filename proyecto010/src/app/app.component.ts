import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'proyecto010';

  articulos: any;
  naturalezas: any;

  constructor(private http: HttpClient) { }


  ngOnInit() {
    //De bansi
    this.http.get("https://localhost:7152/api/ModificacionCuenta/ObtenerNaturalezas")
    .subscribe(
      resultado => {
        this.naturalezas = resultado;
      }
    );

    //Ejemplo
    this.http.get("https://ejerciciostutorialesya.com/vue/datos.php")
      .subscribe(
        resultado => {
          this.articulos = resultado;
        }
      );
  }
}
