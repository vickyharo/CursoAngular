import { Component } from '@angular/core';
import { UsuarioService } from '../../../core/services/usuario.service';
@Component({
  selector: 'app-mat-card',
  standalone: false,
  templateUrl: './mat-card.component.html',
  styleUrl: './mat-card.component.css'
})
export class MatCardComponent {
  usuario: any;

  constructor(private usuarioService: UsuarioService) { }

  ngOnInit() {
    this.recuperarPersona();
  }

  recargar() {
    this.recuperarPersona();
  }

  recuperarPersona() {
    this.usuarioService.retornar()
      .subscribe(result => { this.usuario = result });
  }
}
