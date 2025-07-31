export interface ConsultarInformacionCreditoResponse {
  operationResultItem: ResultConsultarInformacionCreditoResponse[]
  code: string
  failure: boolean
  success: boolean
  displayableError: boolean
  userMessage: string
  message: string
  systemNumber: any
}

export interface ResultConsultarInformacionCreditoResponse {
  numeroCredito: string
  estatusCredito: string
  numeroCliente: string
  nombreCliente: string
  numeroProducto: string
  nombreProducto: string
  periodoPlazo: string
  plazo: string
  ejecutivo: string
  nombreEjecutivo: string
  fechaApertura: string
  fechaVencimiento: string
  fechaMinistracion: string
  montoOtorgado: number
  montoMinistrado: number
  sucursal: string
  nombreSucursal: string
  cuenta: string
  factoraje: string
  existenSolicitudesPendientesAutorizar: boolean
}
