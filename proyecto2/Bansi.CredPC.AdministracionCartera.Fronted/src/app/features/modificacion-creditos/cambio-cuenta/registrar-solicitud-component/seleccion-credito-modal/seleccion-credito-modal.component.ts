import { Component, EventEmitter, Output } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

//->Funciones
import { ReordenarArrayObjetos } from '@functions/genericas'

//->Models
import { ResultConsultarInformacionCreditoResponse } from '@models/modificacion-creditos-models/cambio-cuenta/ConsultarInformacionCreditoResponse';
import { ColumnConfig } from '@models/shared-models/ColumnConfig';

//->Servicios
import { SpinnerService } from '@services/shared-services/spinner.service';

@Component({
  selector: 'app-seleccion-credito-modal',
  templateUrl: './seleccion-credito-modal.component.html',
  styleUrl: './seleccion-credito-modal.component.css',
})
export class SeleccionCreditoModalComponent {

  /**
   * Output e input
   */
  @Output() creditoSeleccionado: any = new EventEmitter<any>();

  /**
   * Propiedades
   */
  creditosRecibidos: ResultConsultarInformacionCreditoResponse[] = {} as ResultConsultarInformacionCreditoResponse[];
  creditosMostrados: ResultConsultarInformacionCreditoResponse[] = {} as ResultConsultarInformacionCreditoResponse[];
  selectedRow: any | null = null;

  /**
     * Reordenamos las columnas para mostrar en la tabla dinamica
     */
  ordenDeseado: Array<keyof ResultConsultarInformacionCreditoResponse> = [
    "numeroCredito",
    "numeroCliente",
    "nombreCliente",
    "numeroProducto",
    "nombreProducto",
    "fechaApertura",
    "fechaVencimiento",
    "estatusCredito",//** Solo estas se muestran */
    "periodoPlazo",
    "plazo",
    "ejecutivo",
    "nombreEjecutivo",
    "fechaMinistracion",
    "montoOtorgado",
    "montoMinistrado",
    "sucursal",
    "nombreSucursal",
    "cuenta",
    "factoraje",
    "existenSolicitudesPendientesAutorizar"
  ];

  /**
 * Configuramos los nombres de las columnas
 */
  columnConfig: ColumnConfig =
    {
      "numeroCredito": {
        "valor": "Número de Credito",
        "visible": true
      },
      "numeroCliente": {
        "valor": "Cliente",
        "visible": true
      },
      "nombreCliente": {
        "valor": "Nombre Cliente",
        "visible": true
      },

      "estatusCredito": {
        "valor": "Estatus Credito",
        "visible": true
      },

      "numeroProducto": {
        "valor": "Número Producto",
        "visible": true
      },
      "nombreProducto": {
        "valor": "Producto",
        "visible": true
      },
      "periodoPlazo": {
        "valor": "Plazo",
        "visible": false
      },
      "plazo": {
        "valor": "Plazo",
        "visible": false
      },
      "ejecutivo": {
        "valor": "Ejecutivo",
        "visible": false
      },
      "nombreEjecutivo": {
        "valor": "Nombre Ejecutivo",
        "visible": false
      },
      "fechaApertura": {
        "valor": "Fecha Apertura",
        "visible": true
      },
      "fechaVencimiento": {
        "valor": "Fecha Vencimiento",
        "visible": true
      },
      "fechaMinistracion": {
        "valor": "Fecha Ministracion",
        "visible": false
      },
      "montoOtorgado": {
        "valor": "Monto Otorgado",
        "visible": false
      },
      "montoMinistrado": {
        "valor": "Monto Ministrado",
        "visible": false
      },
      "sucursal": {
        "valor": "Sucursal",
        "visible": false
      },
      "nombreSucursal": {
        "valor": "Nombre Sucursal",
        "visible": false
      },
      "cuenta": {
        "valor": "Cuenta",
        "visible": false
      },
      "factoraje": {
        "valor": "factoraje",
        "visible": false
      },
      "existenSolicitudesPendientesAutorizar": {
        "valor": "existenSolicitudesPendientesAutorizar",
        "visible": false
      },
    };

  /**
   ***************************************
   */
  constructor(
    private bsModalRef: BsModalRef,
    public spinnerService: SpinnerService
  ) { }

  ngOnInit(): void {
    this.creditosMostrados = ReordenarArrayObjetos(this.creditosRecibidos, this.ordenDeseado);
  }

  onClose() {
    this.selectedRow = null;
    this.bsModalRef.hide();
  }

  cerrarSeleccionCliente() {
    this.creditoSeleccionado.emit(this.selectedRow);
    this.bsModalRef.hide();
  }

  onRowSelected(row: any): void {
    this.selectedRow = row;
  }
}//->Cierre de la clase
