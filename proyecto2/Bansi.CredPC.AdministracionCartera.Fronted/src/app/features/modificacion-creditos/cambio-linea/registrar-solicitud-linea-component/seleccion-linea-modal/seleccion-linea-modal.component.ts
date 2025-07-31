import { Component, EventEmitter, Output } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

//->Servicios
import { SpinnerService } from '@services/shared-services/spinner.service';

//->Funciones
import { ReordenarArrayObjetos } from '@functions/genericas'

//->Models
import { ResultConsultarInformacionLineaResponse } from '@models/modificacion-creditos-models/cambio-linea/ConsultarInformacionLineaResponse';
import { ColumnConfig } from '@models/shared-models/ColumnConfig';

@Component({
  selector: 'app-seleccion-linea-modal',
  templateUrl: './seleccion-linea-modal.component.html',
  styleUrl: './seleccion-linea-modal.component.css'
})
export class SeleccionLineaModalComponent {
  /**
   * Output e input
   */
  @Output() lineaSeleccionada: any = new EventEmitter<any>();

  /**
   * Propiedades
   */
  lineasRecibidas: ResultConsultarInformacionLineaResponse[] = {} as ResultConsultarInformacionLineaResponse[];
  lineasMostradas: ResultConsultarInformacionLineaResponse[] = {} as ResultConsultarInformacionLineaResponse[];
  selectedRow: any | null = null;

  /**
   * Reordenamos las columnas para mostrar en la tabla dinamica
   */
  ordenDeseado: Array<keyof ResultConsultarInformacionLineaResponse> = [
    "numeroLinea",
    "numeroCliente",
    "nombreCliente",
    "codEjecutivo",
    "nombreEjecutivo",
    "estatus",
    "codSucursal",
    "nombreSucursal",
    "codProducto",
    "descProducto",
    "codDivisa",
    "descDivisa",
    "montoAutorizado",
    "montoUtilizado",
    "plazoDias",
    "descEstatusLinea",
    "fechaAlta",
    "fechaVencimiento",
    "fechaAutorizacionLinea",
    "existenSolicitudesPendientesAutorizar"
  ];

  /**
   * Configuramos los nombres de las columnas
   */
  columnConfig: ColumnConfig =
    {
      "numeroLinea": {
        "valor": "Número de linea",
        "visible": true
      },
      "numeroCliente": {
        "valor": "Cliente",
        "visible": true
      },
      "nombreCliente": {
        "valor": "Nombre del cliente",
        "visible": true
      },
      "codEjecutivo": {
        "valor": "Ejecutivo",
        "visible": true
      },
      "nombreEjecutivo": {
        "valor": "Nombre ejecutivo",
        "visible": true
      },
      "codSucursal": {
        "valor": "Sucursal",
        "visible": true
      },
      "nombreSucursal": {
        "valor": "Nombre sucursal",
        "visible": true
      },
      "codProducto": {
        "valor": "Producto",
        "visible": true
      },
      "descProducto": {
        "valor": "Descripción producto",
        "visible": true
      },
      "codDivisa": {
        "valor": "Divisa",
        "visible": true
      },
      "descDivisa": {
        "valor": "Descripción divisa",
        "visible": true
      },
      "montoAutorizado": {
        "valor": "Monto autorizado",
        "visible": true
      },
      "montoUtilizado": {
        "valor": "Monto utilizado",
        "visible": true
      },
      "plazoDias": {
        "valor": "Plazo dias",
        "visible": true
      },
      "estatus": {
        "valor": "Estatus",
        "visible": true
      },
      "descEstatusLinea": {
        "valor": "Descripción estatus",
        "visible": true
      },
      "fechaAlta": {
        "valor": "Fecha Alta",
        "visible": true
      },
      "fechaVencimiento": {
        "valor": "Fecha Vencimiento",
        "visible": true
      },
      "fechaAutorizacionLinea": {
        "valor": "Fecha Autorización",
        "visible": true
      },
      "existenSolicitudesPendientesAutorizar": {
        "valor": "Solicitudes Pendientes",
        "visible": false
      }
    };


  /**
   ***************************************
   */
  constructor(
    private bsModalRef: BsModalRef,
    public spinnerService: SpinnerService
  ) { }

  ngOnInit(): void {
    this.lineasMostradas = ReordenarArrayObjetos(this.lineasRecibidas, this.ordenDeseado);
  }

  onClose() {
    this.selectedRow = null;
    this.bsModalRef.hide();
  }

  cerrarSeleccionCliente() {
    this.lineaSeleccionada.emit(this.selectedRow);
    this.bsModalRef.hide();
  }

  onRowSelected(row: any): void {
    this.selectedRow = row;
  }
}//->Cierre de la clase
