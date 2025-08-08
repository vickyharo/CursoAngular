import { Component, EventEmitter, Input } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { CurrencyPipe } from '@angular/common';

//->Interfaces
import { DetalleConsultarSolicitudesCambioLineaResponse } from '@models/modificacion-creditos-models/cambio-linea/ConsultarSolicitudesCambioLineaResponse';

@Component({
  selector: 'app-detalle-solicitud-linea-modal',
  providers: [CurrencyPipe],
  templateUrl: './detalle-solicitud-linea-modal.component.html'
})
export class DetalleSolicitudLineaModalComponent {
  /**
    * Input
    */
  @Input() detalle: any = new EventEmitter<any>();

  /**
    * Propiedades
    */
  txtMontoOriginal: string = '';
  txtMontoNuevo: string = '';

  constructor(private bsModalRef: BsModalRef, private currencyPipe: CurrencyPipe) { }

  ngOnInit(): void {
    let detalleConsultarSolicitudesCambioLineaResponse: DetalleConsultarSolicitudesCambioLineaResponse = this.detalle;

    const montoOriginal = this.currencyPipe.transform(detalleConsultarSolicitudesCambioLineaResponse.montoOriginal, '$');
    const montoNuevo = this.currencyPipe.transform(detalleConsultarSolicitudesCambioLineaResponse.montoNuevo, '$');
    this.txtMontoOriginal = `${montoOriginal}`;
    this.txtMontoNuevo = `${montoNuevo}`;
  }

  onClose() {
    this.bsModalRef.hide();
  }
}//->Cierre de la clase
