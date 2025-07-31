export interface ConsultarSolicitudesCambioLineaResponse {
  code: string
  failure: boolean
  success: boolean
  displayableError: boolean
  userMessage: any
  message: any
  systemNumber: any
  operationResultItem: ResultConsultarSolicitudesCambioLineaResponse[]
}

export interface ResultConsultarSolicitudesCambioLineaResponse {
  idSolicitud: number
  idTipoSolicitud: number
  descripcionTipoSolicitud: string
  idEstatus: number
  descripcionStatus: string
  numeroLinea: string
  codProducto: string
  descProducto: string
  numeroCliente: string
  nombreCliente: string
  codDivisa: string
  descDivisa: string
  codEjecutivo: string
  nombreEjecutivo: string
  codSucursal: string
  nombreSucursal: string
  montoAutorizado: number
  montoUtilizado: number
  fechaAlta: string
  fechaVencimiento: string
  fechaAutorizacionLinea: string
  plazoDias: number
  estatusLinea: string
  descEstatusLinea: string
  usuarioSolicita: string
  fechaSolicitud: string
  usuarioAutoriza: string
  fechaAutorizacion: string
  comentarios: string
  detalleSolicitudCambioLinea: DetalleConsultarSolicitudesCambioLineaResponse
}

export interface DetalleConsultarSolicitudesCambioLineaResponse {
  idDetalle: number
  idSolicitud: number
  montoOriginal: number
  montoNuevo: number
}