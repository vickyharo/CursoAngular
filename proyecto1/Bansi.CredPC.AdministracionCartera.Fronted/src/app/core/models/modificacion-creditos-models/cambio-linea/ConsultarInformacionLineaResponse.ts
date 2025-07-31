export interface ConsultarInformacionLineaResponse {
  code: string
  failure: boolean
  success: boolean
  displayableError: boolean
  userMessage: any
  message: any
  systemNumber: any
  operationResultItem: ResultConsultarInformacionLineaResponse[]
}

export interface ResultConsultarInformacionLineaResponse {
  numeroLinea: string
  codProducto: string
  numeroCliente: string
  codDivisa: string
  codEjecutivo: string
  codSucursal: string
  montoAutorizado: number
  montoUtilizado: number
  fechaAlta: string
  fechaVencimiento: string
  fechaAutorizacionLinea: string
  plazoDias: number
  estatus: string
  descProducto: string
  nombreCliente: string
  descDivisa: string
  nombreEjecutivo: string
  nombreSucursal: string
  descEstatusLinea: string
  existenSolicitudesPendientesAutorizar:boolean
}
