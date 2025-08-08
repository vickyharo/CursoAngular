export interface ConsultarSolicitudesCambioCuentaResponse {
  operationResultItem: ResultConsultarSolicitudesCambioCuentaResponse[]
  code: string
  failure: boolean
  success: boolean
  displayableError: boolean
  userMessage: string
  message: string
  systemNumber: any
}

export interface ResultConsultarSolicitudesCambioCuentaResponse {
  idSolicitud: number
  idTipoSolicitud: number
  descripcionTipoSolicitud: string
  idEstatus: number
  descripcionStatus: string
  numeroCredito: string
  productoCredito: string
  codigoEjecutivo: string
  ejecutivo: string
  numeroCliente: string
  codDivisa: string
  divisa: string
  codigoSucursal: string
  sucursal: string
  statusCredito: string
  usuarioSolicita: string
  fechaSolicitud: string
  usuarioAutoriza: string
  fechaAutorizacion: any
  comentarios: string
  detalleSolicitud: DetalleConsultarSolicitudesCambioCuentaResponse[]
}

export interface DetalleConsultarSolicitudesCambioCuentaResponse {
  clavenaturaleza: string
  clavetipocuenta: string
  coddivctanueva: string
  coddivctaoriginal: string
  codpdctoctanueva: string
  codpdctoctaoriginal: string
  cuentanueva: string
  cuentaoriginal: string
  descdivctanueva: string
  descdivctaoriginal: string
  descpdctoctanueva: string
  descpdctoctaoriginal: string
  iddetalle: number
  idsolicitud: number
  naturaleza: string
  tipocuenta: string
}
