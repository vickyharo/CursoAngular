import { Component } from '@angular/core';

@Component({
  selector: 'app-disparo-de-eventos-de-la-componente-hija-a-la-componente-padre',
  standalone: false,
  templateUrl: './disparo-de-eventos-de-la-componente-hija-a-la-componente-padre.component.html',
  styleUrl: './disparo-de-eventos-de-la-componente-hija-a-la-componente-padre.component.css'
})
export class DisparoDeEventosDeLaComponenteHijaALaComponentePadreComponent {
  mensaje='';

  actualizar(t: number) {
    this.mensaje = t + '(se actualiza cada 10 segundos)';
  }
}
