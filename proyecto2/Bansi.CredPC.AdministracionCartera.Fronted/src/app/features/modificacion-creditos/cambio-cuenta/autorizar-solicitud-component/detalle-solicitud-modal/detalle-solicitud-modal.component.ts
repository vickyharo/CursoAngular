import { Component, EventEmitter, Input } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

//->Angular material
import { MatTableDataSource } from '@angular/material/table';

//->Modelos
import { DetalleConsultarSolicitudesCambioCuentaResponse } from '@models/modificacion-creditos-models/cambio-cuenta/ConsultarSolicitudesCambioCuentaResponse';

@Component({
  selector: 'app-detalle-solicitud-modal',
  templateUrl: './detalle-solicitud-modal.component.html',
  styleUrl: './detalle-solicitud-modal.component.css',
})
export class DetalleSolicitudModalComponent {

  /**
   * Input
   */
  @Input() lista: any = new EventEmitter<any>();

  detalleSolicitud = {} as DetalleConsultarSolicitudesCambioCuentaResponse[];
  dataSource = new MatTableDataSource<DetalleConsultarSolicitudesCambioCuentaResponse>();

  displayedColumns: string[] = [
    'naturaleza',
    'tipocuenta',
    'descdivctanueva',
    'descpdctoctanueva',
    'cuentanueva',
    'descdivctaoriginal',
    'descpdctoctaoriginal',
    'cuentaoriginal',
  ];

  constructor(private bsModalRef: BsModalRef) { }

  ngOnInit(): void {
    this.detalleSolicitud = this.lista;
    this.dataSource = new MatTableDataSource<DetalleConsultarSolicitudesCambioCuentaResponse>(this.detalleSolicitud);
  }

  onClose() {
    this.bsModalRef.hide();
  }

  concatenateValues(value1: string, value2: string): string {
    return value1 + ' ' + value2;
  }
}//->Cierre de la clase
