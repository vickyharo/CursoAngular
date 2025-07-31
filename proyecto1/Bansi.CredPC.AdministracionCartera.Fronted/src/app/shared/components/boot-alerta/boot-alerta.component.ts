import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-boot-alerta',
  templateUrl: './boot-alerta.component.html',
  styleUrl: './boot-alerta.component.scss'
})
export class BootAlertaComponent {

  @Input() color!: string;
  @Input() mensaje!: string;

  constructor() { }

  ngOnInit(): void {
  }
}
