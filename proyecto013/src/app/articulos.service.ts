import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ArticulosService {

  constructor(private http: HttpClient) { }

  retornarEjemploCurso() {
    return this.http.get("https:///vue/datos.php");
  }  

  retornarEjemploBansi() {
    return this.http.get("https://localhost:7152/api/ModificacionCuenta/ObtenerNaturalezas");
  }  
}
