import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-peticion-json-servidor',
  standalone: false,
  templateUrl: './peticion-json-servidor.component.html',
  styleUrl: './peticion-json-servidor.component.css'
})
export class PeticionJsonServidorComponent {
  articulos: any;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.http.get("https://ejerciciostutorialesya.com/vue/datos.php")
      .subscribe(
        resultado => {
          this.articulos = resultado;
        }
      );
  }
}
