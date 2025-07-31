import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'base-modal',
    standalone: true,
    imports: [
        CommonModule
    ],
    templateUrl: './base-modal.component.html'
})
export class BaseModalComponent {
    //Titulos y textos
    @Input() title = 'Título modal';
    @Input() btnText1 = 'Si';
    @Input() btnText2 = 'No';
    //Banderas de visibilidad
    @Input() buttons: boolean = false;
    //Emite eventos
    @Output() close = new EventEmitter<void>();
    
    cerrar() {
        this.close.emit();
    }
}
